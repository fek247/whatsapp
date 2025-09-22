"use client";

import api from "@/api";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function useApi() {
    const { data: session } = useSession();

    useEffect(() => {
        if (session?.accessToken) {
            api.defaults.headers.common["Authorization"] = `Bearer ${session.accessToken}`;
        } else {
            delete api.defaults.headers.common["Authorization"];
        }
    }, [session]);

    return api;
}
