import axios from "axios";
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
        async signIn({ user, account, profile }) {
            axios.post('http://localhost:4000/login', {
                google_id: user.id,
                email: user.email
            }).then(function(res) {
                console.log(res.data)
            }).catch(function(error) {
                console.log(error.response.data)
            })
            return true
        },
    }
})

export { handler as GET, handler as POST }
