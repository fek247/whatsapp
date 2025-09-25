import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/types/types";
import {
    BadgeCheck,
    Search,
    EllipsisVertical,
    Info,
    SquareCheck,
    BellOff,
    ClockFading,
    CircleX,
    ThumbsDown,
    UserMinus,
    CircleMinus,
    Trash2,
} from "lucide-react";
import Image from "next/image";

type ConversationHeaderProp = {
    user: User
}

export default function ConversationHeader({user}: ConversationHeaderProp) {
    return (
        <div className="h-16 p-4 flex justify-between border-1">
            <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-4">
                    <Image
                        src={user.image_url}
                        alt="channel-logo"
                        width={40}
                        height={40}
                    />
                </div>
                <div className="flex items-center">
                    <p className="mr-1">{user.name}</p>
                    <BadgeCheck color="#00DA60" />
                </div>
            </div>

            <div className="flex">
                <div className="w-10 h-10 mr-2 flex items-center justify-center">
                    <Search size={24} />
                </div>
                <DropdownMenu>
                    <div
                        role="button"
                        className="w-10 h-10 mr-2 flex items-center justify-center"
                    >
                        <DropdownMenuTrigger asChild>
                            <EllipsisVertical size={24} />
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
                                    <p className="text-gray text-base">Chặn</p>
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
    );
}
