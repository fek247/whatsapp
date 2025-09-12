"use client"

import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
    const router = useRouter()
    const { data: session, status } = useSession()

    useEffect(() => {
        if (status == "authenticated") {
            router.replace("/")
        }
    }, [status, router])

    return (
        <div className="h-screen flex justify-center items-center">
            <Button onClick={() => signIn("google")} variant={"secondary"}>Login with google</Button>
        </div>
    )
}