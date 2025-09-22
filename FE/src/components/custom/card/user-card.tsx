import { Button } from "@/components/ui/button";
import Image from "next/image";

type User = {
    id: number,
    email: string,
    image_url: string,
    name: string
};

type UserCardProps = {
    user: User;
};

export default function UserCard({user}: UserCardProps) {
    return (
        <div className="flex h-full justify-between p-4 bg-navbar rounded-xl">
            <div className="flex items-center">
                <div className="w-12 h-12 rounded-full mr-4 overflow-hidden">
                    <Image
                        src={user.image_url}
                        alt="channel logo"
                        width={49}
                        height={49}
                    />
                </div>
                <div className="flex flex-col">
                    <p className="text-base">{user.name}</p>
                </div>
            </div>

            <div>
                <Button className="bg-primary rounded-full h-full">
                    Nhắn tin
                </Button>
            </div>
        </div>
    );
}
