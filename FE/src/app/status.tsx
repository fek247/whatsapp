import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    EllipsisVertical,
    Images,
    LockKeyhole,
    Pencil,
    PlusCircle,
} from "lucide-react";

export default function Status() {
    return (
        <div>
            <div className="px-5 py-3 w-140">
                <div className="flex justify-between mb-4">
                    <p className="text-xl text-black font-medium">Trạng thái</p>
                    <div className="flex items-center px-3">
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <div
                                    role="button"
                                    className="h-10 w-10 hover:bg-navbar rounded-full flex items-center justify-center mr-4"
                                >
                                    <PlusCircle
                                        size={22}
                                        className="text-black"
                                    />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <div className="flex items-center">
                                        <Images className="mr-3" />
                                        <p className="text-gray text-base">
                                            Ảnh và video
                                        </p>
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <div className="flex items-center">
                                        <Pencil className="mr-3" />
                                        <p className="text-gray text-base">
                                            Văn bản
                                        </p>
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenu>
                            <DropdownMenuTrigger>
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
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <div className="flex items-center">
                                        <LockKeyhole className="mr-3" />
                                        <p className="text-gray text-base">
                                            Status Privacy
                                        </p>
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </div>
    );
}
