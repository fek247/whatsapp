import { Plus } from "lucide-react";
import Image from "next/image";

export default function Conversation() {
    return (
        <div className="flex h-full justify-between p-4 bg-navbar rounded-xl">
            <div className="flex items-center">
                <div className="w-12 h-12 rounded-full mr-4 overflow-hidden">
                    <Image
                        src={"/barca.jpg"}
                        alt="channel logo"
                        width={49}
                        height={49}
                    />
                </div>
                <div className="flex flex-col">
                    <p className="text-base">Barca</p>
                    <p className="text-base text-gray truncate max-w-xs">
                        Hi Ngô Thank you for choosing upGrad as your upskilling
                        partner. Let us help you make an informed choice and
                        find a program best suited to your career goals.
                    </p>
                </div>
            </div>

            <div>
                <p className="text-sm">thứ bảy</p>
            </div>
        </div>
    );
}
