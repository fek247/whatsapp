use std::{collections::HashSet, env};

use axum::{body::Body, extract::Request, http::{self, StatusCode}, middleware::Next, response::{IntoResponse, Response}, Json};
use serde::{Serialize, Deserialize};
use jsonwebtoken::{decode, encode, Algorithm, DecodingKey, EncodingKey, Header, Validation};
use serde_json::json;

/// Our claims struct, it needs to derive `Serialize` and/or `Deserialize`
#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String,
    pub exp: i64,
}

#[derive(Debug, Deserialize)]
pub struct GoogleClaims {
    pub sub: String,
    pub email: Option<String>,
    pub name: Option<String>,
    #[serde(rename = "picture")]
    pub image_url: Option<String>,
    pub aud: String,
    pub exp: usize,
}

pub enum Provider {
    Google
}

pub enum AuthError {
    MissingCredentials,
    InvalidToken,
}

#[derive(Debug, Deserialize)]
struct Jwk {
    kid: String,
    n: String,
    e: String,
}

#[derive(Debug, Deserialize)]
struct Jwks {
    keys: Vec<Jwk>,
}

pub fn handle_encode(claims: &Claims) -> Result<String, jsonwebtoken::errors::Error> {
    encode(&Header::default(), claims, &EncodingKey::from_secret(env::var("JWT_SECRET").expect("Not found JWT_SECRET").as_ref()))
}

pub fn handle_decode(token: &str) -> Result<jsonwebtoken::TokenData<Claims>, jsonwebtoken::errors::Error> {
    decode(&token, &DecodingKey::from_secret(env::var("JWT_SECRET").expect("Not found JWT_SECRET").as_ref()), &Validation::default())
}

pub async fn verify_token(token: &str, provider: Provider) -> Result<GoogleClaims, Box<dyn std::error::Error>> {
    match provider {
        Provider::Google => {
            let jwks_url = "https://www.googleapis.com/oauth2/v3/certs";
            let jwks: Jwks = reqwest::get(jwks_url).await?.json().await.unwrap();
            let header = jsonwebtoken::decode_header(token)?;
            let kid = header.kid.ok_or("No kid in token header")?;
            let key = jwks.keys.iter().find(|k: &&Jwk| {
                k.kid == kid
            }).ok_or("No matching key found")?;
            let decoding_key = DecodingKey::from_rsa_components(&key.n, &key.e).unwrap();
            let mut validation = Validation::new(Algorithm::RS256);
            let client_id = env::var("GOOGLE_CLIENT_ID").expect("Not found Google client id");
            validation.set_audience(&[client_id.as_str()]);
            validation.validate_exp = true;
            let mut iss_set = HashSet::new();
            iss_set.insert("https://accounts.google.com".to_string());
            validation.iss = Some(iss_set);

            let token_data = decode::<GoogleClaims>(
                token,
                &decoding_key,
                &validation
            )?;

            Ok(token_data.claims)
        }
    }
}

pub async fn auth_midldleware(mut req: Request, next: Next) -> Result<Response<Body>, AuthError> {
    let auth_header = req.headers_mut().get(http::header::AUTHORIZATION);
    let auth_header = match auth_header {
        Some(header) => {
            header.to_str().map_err(|_| AuthError::MissingCredentials )?
        },
        None => return Err(AuthError::MissingCredentials),
    };

    let mut header = auth_header.split_whitespace();
    let (_bearer, token) = (header.next(), header.next());
    let token = match token {
        Some(data) => data,
        None => return Err(AuthError::MissingCredentials)
    };

    let _token_data = match handle_decode(token) {
        Ok(data) => data,
        Err(_) => return Err(AuthError::InvalidToken)
    };
    
    // req.extensions_mut().insert(&'static token_data);
    Ok(next.run(req).await)
}

impl IntoResponse for AuthError {
    fn into_response(self) -> Response {
        let (status, error_message) = match self {
            AuthError::MissingCredentials => (StatusCode::BAD_REQUEST, "Missing credentials"),
            AuthError::InvalidToken => (StatusCode::BAD_REQUEST, "Invalid token"),
        };

        let body = Json(json!({
            "error": error_message
        }));
        (status, body).into_response()
    }
}