"use client"

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function Login() {
    return (
        <div className="h-screen flex justify-center items-center">
            <Button onClick={() => signIn("google")} variant={"secondary"}>Login with google</Button>
        </div>
    )
}