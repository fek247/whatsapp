import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EllipsisVertical, MessageSquarePlus, Search } from "lucide-react";

export default function Chat() {
    return (
        <div>
            <div className="flex justify-between mb-4">
                <p className="text-xl text-primary font-medium">WhatsApp</p>
                <div className="flex items-center px-3">
                    <div
                        role="button"
                        className="h-10 w-10 hover:bg-navbar rounded-full flex items-center justify-center mr-4"
                    >
                        <MessageSquarePlus size={22} className="text-black" />
                    </div>
                    <div
                        role="button"
                        className="h-10 w-10 hover:bg-navbar rounded-full flex items-center justify-center"
                    >
                        <EllipsisVertical size={22} className="text-black" />
                    </div>
                </div>
            </div>
            <div className="relative mb-4">
                <Search
                    size={20}
                    className="absolute top-1/2 -translate-y-1/2 left-3"
                />
                <Input
                    placeholder="Tìm kiếm hoặc bắt đầu đoạn chat mới"
                    className="h-10 pl-10 focus-visible:border-primary rounded-full bg-navbar"
                />
            </div>
            <div className="flex flex-wrap gap-y-2">
                <Button
                    size="sm"
                    className="rounded-full border-1 border-ring mr-2 hover:bg-navbar"
                >
                    <p className="text-base font-normal text-black">Tấc cả</p>
                </Button>
                <Button
                    size="sm"
                    className="rounded-full border-1 border-ring mr-2 hover:bg-navbar"
                >
                    <p className="text-base font-normal text-black">Chưa đọc</p>
                </Button>
                <Button
                    size="sm"
                    className="rounded-full border-1 border-ring mr-2 hover:bg-navbar"
                >
                    <p className="text-base font-normal text-black">
                        Mục ưa thích
                    </p>
                </Button>
                <Button
                    size="sm"
                    className="rounded-full border-1 border-ring hover:bg-navbar"
                >
                    <p className="text-base font-normal text-black">Chưa đọc</p>
                </Button>
            </div>
        </div>
    );
}
