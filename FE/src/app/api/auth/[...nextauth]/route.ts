import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.JWT_SECRET,
    callbacks: {
        async redirect({url, baseUrl}) {
            return '/'
        },
        async jwt({ token, account, profile }) {
            if (account && profile) {
                token.userId = profile.sub
                token.email = profile.email
            }
            return token
        },
        async session({ session, token }) {
            session.user.id = token.userId
            session.user.email = token.email
            return session
        },
    }
})

export { handler as GET, handler as POST }
