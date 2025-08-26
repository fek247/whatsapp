"use client";

import React from "react";
import Navbar from "./navbar";
import { NavProvider, useNav } from "@/context/nav-context";
import Chat from "./chat";
import Status from "./status";

const Channel = () => <div className="p-3">📺 Đây là màn hình Channel</div>;
const Community = () => <div className="p-3">👥 Đây là màn hình Community</div>;
const Setting = () => <div className="p-3">⚙️ Đây là màn hình Setting</div>;

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

export default function Home() {
    return (
        <NavProvider>
            <div className="h-screen flex">
                <Navbar />
                <Content />
            </div>
        </NavProvider>
    );
}
