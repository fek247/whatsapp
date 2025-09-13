import { Input } from "@/components/ui/input";
import { Bell, CircleQuestionMark, Dock, Key, Keyboard, KeyRound, Lock, LogOut, Search, Settings } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";

export default function Setting() {
    return (
        <div className="flex flex-1">
            <div className="nav-header">
                <div className="mb-4">
                    <p className="text-xl text-black font-medium">Cài đặt</p>
                </div>
                <div className="relative mb-4">
                    <Search
                        size={20}
                        className="absolute top-1/2 -translate-y-1/2 left-3"
                    />
                    <Input
                        placeholder="Tìm kiếm cài đặt"
                        className="h-10 pl-10 focus-visible:border-primary rounded-full bg-navbar"
                    />
                </div>
                <div className="rounded-xl py-3 h-22 flex hover:bg-navbar">
                    <Image className="h-16 w-16 rounded-full mr-3" src={'/nature.jpg'} alt="" width={16} height={16}/>
                    <div className="flex flex-col justify-center">
                        <p className="text-base">Tai Ngo</p>
                        <p className="text-base text-gray">Xin chào! Mình đang dùng Whatsapp nè.</p>
                    </div>
                </div>
                <hr className="my-2"/>
                <div className="flex rounded-xl py-3 hover:bg-navbar">
                    <div className="w-16 flex justify-center items-center">
                        <KeyRound />
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="text-base">Tài khoản</p>
                        <p className="text-base text-gray">Thông báo bảo mật, thông tin tài khoản</p>
                    </div>
                </div>
                <div className="flex rounded-xl py-3 hover:bg-navbar">
                    <div className="w-16 flex justify-center items-center">
                        <Lock />
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="text-base">Quyền riêng tư</p>
                        <p className="text-base text-gray">Người liên hệ đã chặn, tin nhắn tự hủy</p>
                    </div>
                </div>
                <div className="flex rounded-xl py-3 hover:bg-navbar">
                    <div className="w-16 flex justify-center items-center">
                        <Dock />
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="text-base">Đoạn chat</p>
                        <p className="text-base text-gray">Chủ đề, hình nền, cài đặt chat</p>
                    </div>
                </div>
                <div className="flex rounded-xl py-3 hover:bg-navbar">
                    <div className="w-16 flex justify-center items-center">
                        <Bell />
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="text-base">Thông báo</p>
                        <p className="text-base text-gray">Thông báo về tin nhắn</p>
                    </div>
                </div>
                <div className="flex rounded-xl py-3 hover:bg-navbar">
                    <div className="w-16 flex justify-center items-center">
                        <Keyboard />
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="text-base">Phím tắt</p>
                        <p className="text-base text-gray">Hành động nhanh</p>
                    </div>
                </div>
                <div className="flex rounded-xl py-3 hover:bg-navbar">
                    <div className="w-16 flex justify-center items-center">
                        <CircleQuestionMark />
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="text-base">Trợ giúp</p>
                        <p className="text-base text-gray">Trung tâm trợ giúp, liên hệ với chúng tôi, chính sách quyền riêng tư</p>
                    </div>
                </div>
                <div role="button" onClick={() => signOut({ callbackUrl: "/login" })} className="flex rounded-xl py-3 hover:bg-navbar">
                    <div className="w-16 flex justify-center items-center">
                        <LogOut color="red"/>
                    </div>
                    <p className="text-base text-red-500">Đăng xuất</p>
                </div>
            </div>

            <div className="flex flex-col flex-1 justify-center items-center">
                <Settings className="w-16 h-16 mb-6" color="gray"/>
                <h1 className="text-4xl font-thin">Cài đặt</h1>
            </div>
        </div>
    )
}