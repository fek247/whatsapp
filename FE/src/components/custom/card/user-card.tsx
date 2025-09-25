import { Button } from "@/components/ui/button";
import { User } from "@/types/types";
import Image from "next/image";
import React from "react";

type UserCardProps = {
    user: User;
    selectedUser: User | undefined,
    setSelectedUser: (user: User) => void,
};

export default function UserCard({user, selectedUser, setSelectedUser}: UserCardProps) {
    const isSelected = user.id === selectedUser?.id
    return (
        <div className={`flex h-full justify-between p-4 bg-navbar rounded-xl mb-3 ${isSelected ? "bg-navbar" : "bg-white"}`}>
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

            <div className="flex items-center">
                <Button onClick={() => {setSelectedUser(user)}} className="h-8 bg-primary-light text-primary rounded-full hover:bg-primary-light-hover">
                    Nhắn tin
                </Button>
            </div>
        </div>
    );
}
