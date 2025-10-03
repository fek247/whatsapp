import api from "@/api";
import { Input } from "@/components/ui/input";
import { Mic, Plus, Send, SmilePlus } from "lucide-react";
import { useState } from "react";

export default function ConversationInput() {
    const [message, setMessage] = useState<string | null>("");
    const isMessageEmpty = !message?.trim();
    const sendMessage = () => {
        api.post('/send-message', { message });
    }

    return (
        <div className="h-13 relative m-3 flex items-center">
            <div className="absolute top-1/2 -translate-y-1/2 left-3">
                <Plus size={24} />
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 left-13">
                <SmilePlus size={24} />
            </div>
            <Input
                placeholder="Soạn tin nhắn"
                className="pl-23 h-13 focus-visible:border-primary rounded-full bg-white"
                onChange={(e) => setMessage(e.target.value)}
            />
            <div role="button" onClick={sendMessage} className="absolute top-1/2 -translate-y-1/2 right-3">
                { isMessageEmpty ? <Mic size={24} /> : <Send size={24}/>}
            </div>
        </div>
    );
}
