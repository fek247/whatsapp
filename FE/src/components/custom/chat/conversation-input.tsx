import { Input } from "@/components/ui/input";
import { Mic, Plus, SmilePlus } from "lucide-react";

export default function ConversationInput() {
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
            />
            <div className="absolute top-1/2 -translate-y-1/2 right-3">
                <Mic size={24} />
            </div>
        </div>
    );
}
