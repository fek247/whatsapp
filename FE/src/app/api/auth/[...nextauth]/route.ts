import axios from "axios"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    callbacks: {
        async redirect({url, baseUrl}) {
            return '/'
        },
        async jwt({ token, account, profile }) {
            if (account?.id_token && profile) {
                const res = await axios.post("http://localhost:4000/login", {
                    token_id: account.id_token,
                });
                token.email = profile.email
                token.accessToken = res.data.access_token
            }
            return token
        },
        async session({ session, token }) {
            session.user.email = token.email
            session.accessToken = token.accessToken
            return session
        },
    }
})

export { handler as GET, handler as POST }
