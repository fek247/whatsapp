import { Button } from "@/components/ui/button"
import { CircleDotDashed, MessageCircle, MessageSquare, Settings, UsersRound } from "lucide-react"

export default function Home() {
    return (
        <div>
            <div className="h-screen w-18 flex flex-col bg-navbar justify-between items-center py-3">
                <div className="flex flex-col items-center">
                    <div role="button" className="w-10 h-10 flex items-center justify-center">
                        <MessageCircle className="text-black" />
                    </div>
                    <div role="button" className="w-10 h-10 flex items-center justify-center">
                        < CircleDotDashed className="text-black" />
                    </div>
                    <div role="button" className="w-10 h-10 flex items-center justify-center">
                        < MessageSquare className="text-black" />
                    </div>
                    <div role="button" className="w-10 h-10 flex items-center justify-center">
                        < UsersRound className="text-black" />
                    </div>
                    <hr />
                </div>
                <div>
                    <div role="button" className="w-10 h-10 flex items-center justify-center">
                        < Settings className="text-black" />
                    </div>
                </div>
            </div>
        </div>
    )
}