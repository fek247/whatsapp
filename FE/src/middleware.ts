import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET })

    const { pathname } = req.nextUrl

    if (pathname.startsWith("/api/auth") || pathname.startsWith("/login")) {
        return NextResponse.next()
    }

    if (!token) {
        const loginUrl = new URL("/login", req.url)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/((?!_next|favicon.ico).*)"],
}