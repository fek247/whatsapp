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
    BadgeCheck,
    BellOff,
    CircleMinus,
    CircleX,
    ClockFading,
    EllipsisVertical,
    Info,
    LogOut,
    MessageSquarePlus,
    Mic,
    Plus,
    Search,
    SmilePlus,
    SquareCheck,
    Star,
    ThumbsDown,
    Trash2,
    UserMinus,
    Users,
} from "lucide-react";
import Conversation from "@/components/custom/conversation";
import Image from "next/image";

export default function Chat() {
    return (
        <div className="flex flex-1">
            <div className="px-5 py-3 w-140 border-1">
                <div className="flex justify-between mb-4">
                    <p className="text-xl text-primary font-medium">WhatsApp</p>
                    <div className="flex items-center px-3">
                        <div
                            role="button"
                            className="h-10 w-10 hover:bg-navbar rounded-full flex items-center justify-center mr-4"
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
                                        <div className="flex items-center">
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
                    <Conversation />
                </div>
            </div>

            <div className="flex flex-col justify-between flex-1">
                <div className="h-16 p-4 flex justify-between border-1">
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden mr-4">
                            <Image src={'/barca.jpg'} alt="channel-logo" width={40} height={40}/>
                        </div>
                        <div className="flex items-center">
                            <p className="mr-1">Barca</p>
                            <BadgeCheck color="#00DA60"/>
                        </div>
                    </div>

                    <div className="flex">
                        <div className="w-10 h-10 mr-2 flex items-center justify-center">
                            <Search size={24}/>
                        </div>
                        <DropdownMenu>
                            <div role="button" className="w-10 h-10 mr-2 flex items-center justify-center">
                                <DropdownMenuTrigger asChild>
                                <EllipsisVertical size={24}/>
                                </DropdownMenuTrigger>
                            </div>
                            <DropdownMenuContent>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <div className="flex items-center">
                                            <Info className="mr-3" />
                                            <p className="text-gray text-base">
                                                Thông tin liên hệ
                                            </p>
                                        </div>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem>
                                        <div className="flex items-center">
                                            <SquareCheck className="mr-3" />
                                            <p className="text-gray text-base">
                                                Chọn tin nhắn
                                            </p>
                                        </div>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem>
                                        <div className="flex items-center">
                                            <BellOff className="mr-3" />
                                            <p className="text-gray text-base">
                                                Bật thông báo
                                            </p>
                                        </div>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem>
                                        <div className="flex items-center">
                                            <ClockFading className="mr-3" />
                                            <p className="text-gray text-base">
                                                Tin nhắn tự hủy
                                            </p>
                                        </div>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem>
                                        <div className="flex items-center">
                                            <CircleX className="mr-3" />
                                            <p className="text-gray text-base">
                                                Đóng đoạn chat
                                            </p>
                                        </div>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>

                                <DropdownMenuSeparator />

                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <div className="flex items-center">
                                            <ThumbsDown className="mr-3" />
                                            <p className="text-gray text-base">
                                                Báo cáo
                                            </p>
                                        </div>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <div className="flex items-center">
                                            <UserMinus className="mr-3" />
                                            <p className="text-gray text-base">
                                                Chặn
                                            </p>
                                        </div>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <div className="flex items-center">
                                            <CircleMinus className="mr-3" />
                                            <p className="text-gray text-base">
                                                Xóa nội dung đoạn chat
                                            </p>
                                        </div>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <div className="flex items-center">
                                            <Trash2 className="mr-3" />
                                            <p className="text-gray text-base">
                                                Xóa đoạn chat
                                            </p>
                                        </div>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div className="h-13 relative m-3 flex items-center">
                    <div className="absolute top-1/2 -translate-y-1/2 left-3">
                        <Plus size={24}/>
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 left-13">
                        <SmilePlus size={24}/>
                    </div>
                    <Input placeholder="Soạn tin nhắn" className="pl-23 h-13 focus-visible:border-primary rounded-full bg-white"/>
                    <div className="absolute top-1/2 -translate-y-1/2 right-3">
                        <Mic size={24}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
