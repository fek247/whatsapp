import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/ui/floating-input";
import { ArrowLeft, Mail, Mic, Plus, SmilePlus, User } from "lucide-react";
import UserCard from "../../card/user-card";
import { useState } from "react";
import useApi from "@/lib/useApi";
import { User as UserType } from "@/types/types";
import ConversationHeader from "../conversation-header";
import { Input } from "@/components/ui/input";

export default function Contact({ onBack }: { onBack: () => void }) {
    const [email, setEmail] = useState<string | null>("");
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState<UserType>();
    const api = useApi();

    const onClickSearch = async () => {
        api.post("/search", {
            email,
        })
            .then((res) => {
                setUsers(res.data.data);
            })
            .catch((err) => alert(err));
    };

    return (
        <div className="flex flex-1">
            <div className="nav-header">
                <div className="flex items-center mb-16">
                    <div role="button" onClick={onBack}>
                        <ArrowLeft />
                    </div>
                    <p className="text-base ml-3">Người liên hệ mới</p>
                </div>

                <div className="mb-10">
                    <div className="flex justify-center items- mb-6">
                        <Mail className="mr-2" />
                        <FloatingInput
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            label="Email"
                        />
                    </div>
                    <div className="flex justify-center h-10">
                        <Button
                            disabled={!email?.trim()}
                            onClick={onClickSearch}
                            className="bg-primary rounded-full h-full"
                        >
                            Tìm kiếm
                        </Button>
                    </div>
                </div>

                <div>
                    {users.length > 0 ? (
                        users.map((user, index) => (
                            <UserCard
                                selectedUser={selectedUser}
                                setSelectedUser={setSelectedUser}
                                key={index}
                                user={user}
                            />
                        ))
                    ) : (
                        <p>No Content</p>
                    )}
                </div>
            </div>
            {selectedUser == null ? (
                <div className="text-center h-full">Channel</div>
            ) : (
                <div className="flex flex-1">
                    <div className="flex flex-col justify-between flex-1">
                        <ConversationHeader user={selectedUser} />
                        <div className="h-13 relative m-3 flex items-center">
                            <div className="absolute top-1/2 -translate-y-1/2 left-3">
                                <Plus size={24} />
                            </div>
                            <div className="absolute top-1/2 -translate-y-1/2 left-13">
                                <SmilePlus size={24} />
                            </div>
                            <Input
                                placeholder="Soạn tin nhắn"
                                className="pl-23 h-13 focus-visible:border-primary rounded-full bg-white"
                            />
                            <div className="absolute top-1/2 -translate-y-1/2 right-3">
                                <Mic size={24} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
