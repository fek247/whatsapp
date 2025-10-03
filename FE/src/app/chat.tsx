import { useState } from "react";
import NewChat from "@/components/custom/chat/new-chat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    EllipsisVertical,
    LogOut,
    MessageSquarePlus,
    Mic,
    Plus,
    Search,
    SmilePlus,
    SquareCheck,
    Star,
    Users,
} from "lucide-react";
import ShortConversation from "@/components/custom/chat/short-conversation";
import { signOut } from "next-auth/react";
import ConversationHeader from "@/components/custom/chat/conversation-header";
import { User as UserType } from "@/types/types";
import ConversationInput from "@/components/custom/chat/conversation-input";

type ChatScreen = "main" | "newChat";

export default function Chat() {
    const [screen, setScreen] = useState<ChatScreen>("main");

    const mockUser : UserType = {
        id: 1,
        email: "a@gmail.com",
        image_url: "/barca.jpg",
        name: "Barca"
    }

    if (screen == "newChat") {
        return <NewChat onBack={() => setScreen("main")} />;
    }

    return (
        <div className="flex flex-1">
            <div className="nav-header">
                <div className="flex justify-between mb-4">
                    <p className="text-2xl text-primary font-medium">
                        WhatsApp
                    </p>
                    <div className="flex items-center px-3">
                        <div
                            role="button"
                            className="h-10 w-10 hover:bg-navbar rounded-full flex items-center justify-center mr-4"
                            onClick={() => setScreen("newChat")}
                        >
                            <MessageSquarePlus
                                size={22}
                                className="text-black"
                            />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div
                                    role="button"
                                    className="h-10 w-10 hover:bg-navbar rounded-full flex items-center justify-center"
                                >
                                    <EllipsisVertical
                                        size={22}
                                        className="text-black"
                                    />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-50 relative z-10"
                                align="start"
                            >
                                <DropdownMenuGroup>
                                    <DropdownMenuItem className="h-10">
                                        <div className="flex items-center">
                                            <Users className="mr-3" />
                                            <p className="text-gray text-base">
                                                Nhóm mới
                                            </p>
                                        </div>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="h-10">
                                        <div className="flex items-center">
                                            <Star className="mr-3" />
                                            <p className="text-gray text-base">
                                                Tin nhắn đã gắn sao
                                            </p>
                                        </div>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <div className="flex items-center">
                                            <SquareCheck className="mr-3" />
                                            <p className="text-gray text-base">
                                                Chọn đoạn chat
                                            </p>
                                        </div>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>

                                <DropdownMenuSeparator />

                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <div
                                            role="button"
                                            onClick={() =>
                                                signOut({
                                                    callbackUrl: "/login",
                                                })
                                            }
                                            className="flex items-center"
                                        >
                                            <LogOut className="mr-3" />
                                            <p className="text-gray text-base">
                                                Đăng xuất
                                            </p>
                                        </div>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
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
                <div className="flex flex-wrap gap-y-2 mb-4">
                    <Button
                        size="sm"
                        className="rounded-full border-1 border-ring mr-2 hover:bg-navbar"
                    >
                        <p className="text-base font-normal text-black">
                            Tấc cả
                        </p>
                    </Button>
                    <Button
                        size="sm"
                        className="rounded-full border-1 border-ring mr-2 hover:bg-navbar"
                    >
                        <p className="text-base font-normal text-black">
                            Chưa đọc
                        </p>
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
                        <p className="text-base font-normal text-black">Nhóm</p>
                    </Button>
                </div>
                <div className="h-18">
                    <ShortConversation />
                </div>
            </div>

            <div className="flex flex-col justify-between flex-1">
                <ConversationHeader user={mockUser} />
                <ConversationInput />
            </div>
        </div>
    );
}
