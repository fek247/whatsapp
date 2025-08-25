import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    CircleDotDashed,
    EllipsisVertical,
    MessageCircle,
    MessageSquare,
    MessageSquarePlus,
    Search,
    Settings,
    UsersRound,
} from "lucide-react";

export default function Home() {
    return (
        <div>
            <div className="h-screen flex">
                <div className="h-full w-18 flex flex-col bg-navbar justify-between items-center py-3">
                    <div className="flex flex-col items-center">
                        <div
                            role="button"
                            className="w-10 h-10 flex items-center justify-center hover:bg-border rounded-full mb-1"
                        >
                            <MessageCircle className="text-black" />
                        </div>
                        <div
                            role="button"
                            className="w-10 h-10 flex items-center justify-center hover:bg-border rounded-full mb-1"
                        >
                            <CircleDotDashed className="text-black" />
                        </div>
                        <div
                            role="button"
                            className="w-10 h-10 flex items-center justify-center hover:bg-border rounded-full mb-1"
                        >
                            <MessageSquare className="text-black" />
                        </div>
                        <div
                            role="button"
                            className="w-10 h-10 flex items-center justify-center hover:bg-border rounded-full mb-1"
                        >
                            <UsersRound className="text-black" />
                        </div>
                        <hr />
                    </div>
                    <div>
                        <div
                            role="button"
                            className="w-10 h-10 flex items-center justify-center hover:bg-border rounded-full"
                        >
                            <Settings className="text-black" />
                        </div>
                    </div>
                </div>
                <div className="px-5 py-3 w-100">
                    <div className="flex justify-between mb-4">
                        <p className="text-xl text-primary font-medium">WhatsApp</p>
                        <div className="flex items-center px-3">
                            <div role="button" className="h-10 w-10 hover:bg-navbar rounded-full flex items-center justify-center mr-4">
                                <MessageSquarePlus size={22} className="text-black"/>
                            </div>
                            <div role="button" className="h-10 w-10 hover:bg-navbar rounded-full flex items-center justify-center">
                                <EllipsisVertical size={22} className="text-black" />
                            </div>
                        </div>
                    </div>
                    <div className="relative mb-4">
                        <Search size={20} className="absolute top-1/2 -translate-y-1/2 left-3"/>
                        <Input placeholder="Tìm kiếm hoặc bắt đầu đoạn chat mới" className="h-10 pl-10 focus-visible:border-primary rounded-full bg-navbar"/>
                    </div>
                    <div className="flex flex-wrap gap-y-2">
                        <Button size="sm" className="rounded-full border-1 border-ring mr-2 hover:bg-navbar">
                            <p className="text-base font-normal text-black">Tấc cả</p>
                        </Button>
                        <Button size="sm" className="rounded-full border-1 border-ring mr-2 hover:bg-navbar">
                            <p className="text-base font-normal text-black">Chưa đọc</p>
                        </Button>
                        <Button size="sm" className="rounded-full border-1 border-ring mr-2 hover:bg-navbar">
                            <p className="text-base font-normal text-black">Mục ưa thích</p>
                        </Button>
                        <Button size="sm" className="rounded-full border-1 border-ring hover:bg-navbar">
                            <p className="text-base font-normal text-black">Chưa đọc</p>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
