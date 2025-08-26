import { useNav } from "@/context/nav-context";
import {
    CircleDotDashed,
    MessageCircle,
    MessageSquare,
    Settings,
    UsersRound,
} from "lucide-react";

export default function Navbar() {
    const { activeNav, setActiveNav } = useNav();
    return (
        <div className="h-full w-18 flex flex-col bg-navbar justify-between items-center py-3">
            <div className="flex flex-col items-center">
                <div
                    role="button"
                    onClick={() => setActiveNav("chat")}
                    className={`w-10 h-10 flex items-center justify-center rounded-full mb-1 
                            ${
                                activeNav === "chat"
                                    ? "bg-border"
                                    : "hover:bg-border"
                            }`}
                >
                    <MessageCircle className="text-black" />
                </div>
                <div
                    role="button"
                    onClick={() => setActiveNav("status")}
                    className={`w-10 h-10 flex items-center justify-center rounded-full mb-1 
                            ${
                                activeNav === "status"
                                    ? "bg-border"
                                    : "hover:bg-border"
                            }`}
                >
                    <CircleDotDashed className="text-black" />
                </div>
                <div
                    role="button"
                    onClick={() => setActiveNav("channel")}
                    className={`w-10 h-10 flex items-center justify-center rounded-full mb-1 
                            ${
                                activeNav === "channel"
                                    ? "bg-border"
                                    : "hover:bg-border"
                            }`}
                >
                    <MessageSquare className="text-black" />
                </div>
                <div
                    role="button"
                    onClick={() => setActiveNav("community")}
                    className={`w-10 h-10 flex items-center justify-center rounded-full mb-1 
                            ${
                                activeNav === "community"
                                    ? "bg-border"
                                    : "hover:bg-border"
                            }`}
                >
                    <UsersRound className="text-black" />
                </div>
                <hr />
            </div>

            <div>
                <div
                    role="button"
                    onClick={() => setActiveNav("setting")}
                    className="w-10 h-10 flex items-center justify-center hover:bg-border rounded-full"
                >
                    <Settings className="text-black" />
                </div>
            </div>
        </div>
    );
}
