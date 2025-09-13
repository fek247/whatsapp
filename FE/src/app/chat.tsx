import { useState } from "react";
import New from "@/components/custom/chat/new";
import Main from "@/components/custom/chat/main";

type ChatScreen = "main" | "newChat"

export default function Chat() {
    const [screen, setScreen] = useState<ChatScreen>("main")

    if (screen == "newChat") {
        return <New onBack={() => setScreen("main")}/>
    }

    return <Main onNewChat={() => setScreen("newChat")}/>
}