import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, UsersRound } from "lucide-react";
import { useState } from "react";
import { Group, Contact, Community } from './new'

type SubScreen = "main" | "new-group" | "new-contact" | "new-community"

export default function NewChat({ onBack }: { onBack: () => void }) {
    const [subScreen, setSubScreen] = useState<SubScreen>("main")

    if (subScreen == "new-group") {
        return <Group onBack={() => setSubScreen("main")}/>
    }
    
    if (subScreen == "new-contact") {
        return <Contact onBack={() => setSubScreen("main")}/>
    }

    if (subScreen == "new-community") {
        return <Community onBack={() => setSubScreen("main")}/>
    }

    return (
        <div className="flex flex-1">
            <div className="nav-header">
                <div className="flex items-center mb-4">
                    <div role="button" onClick={onBack}>
                        <ArrowLeft />
                    </div>
                    <p className="text-base ml-3">Đoạn chat mới</p>
                </div>

                <div className="relative mb-4">
                    <Search
                        size={20}
                        className="absolute top-1/2 -translate-y-1/2 left-3"
                    />
                    <Input
                        placeholder="Tìm kiếm tên hoặc email"
                        className="h-10 pl-10 focus-visible:border-primary rounded-full bg-navbar"
                    />
                </div>

                <div className="rounded-xl py-3 h-16 flex hover:bg-navbar" role="button" onClick={() => setSubScreen("new-group")}>
                    <div className="w-16 flex justify-center items-center">
                        <div className="h-12 w-12 rounded-full bg-primary flex justify-center items-center">
                            <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" fill="none"><title>new-group-refreshed-filled</title><path d="M12.5 11.95C12.9833 11.4167 13.3542 10.8083 13.6125 10.125C13.8708 9.44167 14 8.73333 14 8C14 7.26667 13.8708 6.55833 13.6125 5.875C13.3542 5.19167 12.9833 4.58333 12.5 4.05C13.5 4.18333 14.3333 4.625 15 5.375C15.6667 6.125 16 7 16 8C16 9 15.6667 9.875 15 10.625C14.3333 11.375 13.5 11.8167 12.5 11.95ZM17.45 20C17.6333 19.7 17.7708 19.3792 17.8625 19.0375C17.9542 18.6958 18 18.35 18 18V17C18 16.4 17.8667 15.8292 17.6 15.2875C17.3333 14.7458 16.9833 14.2667 16.55 13.85C17.4 14.15 18.1875 14.5375 18.9125 15.0125C19.6375 15.4875 20 16.15 20 17V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H17.45ZM20 11H19C18.7167 11 18.4792 10.9042 18.2875 10.7125C18.0958 10.5208 18 10.2833 18 10C18 9.71667 18.0958 9.47917 18.2875 9.2875C18.4792 9.09583 18.7167 9 19 9H20V8C20 7.71667 20.0958 7.47917 20.2875 7.2875C20.4792 7.09583 20.7167 7 21 7C21.2833 7 21.5208 7.09583 21.7125 7.2875C21.9042 7.47917 22 7.71667 22 8V9H23C23.2833 9 23.5208 9.09583 23.7125 9.2875C23.9042 9.47917 24 9.71667 24 10C24 10.2833 23.9042 10.5208 23.7125 10.7125C23.5208 10.9042 23.2833 11 23 11H22V12C22 12.2833 21.9042 12.5208 21.7125 12.7125C21.5208 12.9042 21.2833 13 21 13C20.7167 13 20.4792 12.9042 20.2875 12.7125C20.0958 12.5208 20 12.2833 20 12V11ZM8 12C6.9 12 5.95833 11.6083 5.175 10.825C4.39167 10.0417 4 9.1 4 8C4 6.9 4.39167 5.95833 5.175 5.175C5.95833 4.39167 6.9 4 8 4C9.1 4 10.0417 4.39167 10.825 5.175C11.6083 5.95833 12 6.9 12 8C12 9.1 11.6083 10.0417 10.825 10.825C10.0417 11.6083 9.1 12 8 12ZM0 18V17.2C0 16.6333 0.145833 16.1125 0.4375 15.6375C0.729167 15.1625 1.11667 14.8 1.6 14.55C2.63333 14.0333 3.68333 13.6458 4.75 13.3875C5.81667 13.1292 6.9 13 8 13C9.1 13 10.1833 13.1292 11.25 13.3875C12.3167 13.6458 13.3667 14.0333 14.4 14.55C14.8833 14.8 15.2708 15.1625 15.5625 15.6375C15.8542 16.1125 16 16.6333 16 17.2V18C16 18.55 15.8042 19.0208 15.4125 19.4125C15.0208 19.8042 14.55 20 14 20H2C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18Z" fill="#FFFFFF"></path></svg>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="text-base">Nhóm mới</p>
                    </div>
                </div>

                <div className="rounded-xl py-3 h-16 flex hover:bg-navbar" role="button" onClick={() => setSubScreen("new-contact")}>
                    <div className="w-16 flex justify-center items-center">
                        <div className="h-12 w-12 rounded-full bg-primary flex justify-center items-center">
                            <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" fill="none"><title>new-contact-refreshed-filled</title><path d="M18 11H16C15.7167 11 15.4792 10.9042 15.2875 10.7125C15.0958 10.5208 15 10.2833 15 10C15 9.71667 15.0958 9.47917 15.2875 9.2875C15.4792 9.09583 15.7167 9 16 9H18V7C18 6.71667 18.0958 6.47917 18.2875 6.2875C18.4792 6.09583 18.7167 6 19 6C19.2833 6 19.5208 6.09583 19.7125 6.2875C19.9042 6.47917 20 6.71667 20 7V9H22C22.2833 9 22.5208 9.09583 22.7125 9.2875C22.9042 9.47917 23 9.71667 23 10C23 10.2833 22.9042 10.5208 22.7125 10.7125C22.5208 10.9042 22.2833 11 22 11H20V13C20 13.2833 19.9042 13.5208 19.7125 13.7125C19.5208 13.9042 19.2833 14 19 14C18.7167 14 18.4792 13.9042 18.2875 13.7125C18.0958 13.5208 18 13.2833 18 13V11ZM9 12C7.9 12 6.95833 11.6083 6.175 10.825C5.39167 10.0417 5 9.1 5 8C5 6.9 5.39167 5.95833 6.175 5.175C6.95833 4.39167 7.9 4 9 4C10.1 4 11.0417 4.39167 11.825 5.175C12.6083 5.95833 13 6.9 13 8C13 9.1 12.6083 10.0417 11.825 10.825C11.0417 11.6083 10.1 12 9 12ZM1 18V17.2C1 16.6333 1.14583 16.1125 1.4375 15.6375C1.72917 15.1625 2.11667 14.8 2.6 14.55C3.63333 14.0333 4.68333 13.6458 5.75 13.3875C6.81667 13.1292 7.9 13 9 13C10.1 13 11.1833 13.1292 12.25 13.3875C13.3167 13.6458 14.3667 14.0333 15.4 14.55C15.8833 14.8 16.2708 15.1625 16.5625 15.6375C16.8542 16.1125 17 16.6333 17 17.2V18C17 18.55 16.8042 19.0208 16.4125 19.4125C16.0208 19.8042 15.55 20 15 20H3C2.45 20 1.97917 19.8042 1.5875 19.4125C1.19583 19.0208 1 18.55 1 18Z" fill="#FFFFFF"></path></svg>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="text-base">Người liên hệ mới</p>
                    </div>
                </div>

                <div className="flex rounded-xl py-3 hover:bg-navbar" role="button" onClick={() => setSubScreen("new-community")}>
                    <div className="w-16 flex justify-center items-center">
                        <div className="h-12 w-12 rounded-full bg-primary flex justify-center items-center">
                            <UsersRound color="white"/>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="text-base">Cộng đồng mới</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
