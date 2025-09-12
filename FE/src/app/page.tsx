"use client";

import React, { useEffect } from "react";
import Navbar from "./navbar";
import { NavProvider, useNav } from "@/context/nav-context";
import Chat from "./chat";
import Status from "./status";
import Setting from "./setting";
import { useSession } from "next-auth/react";
import axios from "axios";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

const Channel = () => <div className="p-3">📺 Đây là màn hình Channel</div>;
const Community = () => <div className="p-3">👥 Đây là màn hình Community</div>;

const components: Record<string, React.ReactNode> = {
    chat: <Chat />,
    status: <Status />,
    channel: <Channel />,
    community: <Community />,
    setting: <Setting />,
};

function Content() {
    const { activeNav } = useNav();
    const component = components[activeNav];

    return component;
}

export default async function Home(req: NextRequest) {
    const { status } = useSession()
    const token = await getToken({req, secret: process.env.JWT_SECRET})

    useEffect(() => {
        if (status == "authenticated") {
            axios.post("http://localhost:4000/login", {
                access_token: token,
                google_id: "1234",
                email: "test@gmail.com"
            }).then(response => {
                console.log(response)
            }).catch(err  => {
                console.log(err)
            })
        }
    }, [status])

    return (
        <NavProvider>
            <div className="h-screen flex">
                <Navbar />
                <Content />
            </div>
        </NavProvider>
    );
}
