import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            id?: string,
            email?: string
        } & DefaultSession["user"],
        accessToken?: String
    }

    interface User {
        id: string,
        email: string
    }
}

declare module "next-auth/jwt" {
  interface JWT {
    email?: string,
    accessToken?: string
  }
}