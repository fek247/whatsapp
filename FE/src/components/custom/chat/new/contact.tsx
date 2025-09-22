import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/ui/floating-input";
import { ArrowLeft, Mail, User } from "lucide-react";
import UserCard from "../../card/user-card";
import { useState } from "react";
import useApi from "@/lib/useApi";

export default function Contact({ onBack }: { onBack: () => void }) {
    const [email, setEmail] = useState("");
    const [users, setUsers] = useState([]);
    const api = useApi();

    const onClickSearch = async () => {
        api.post("/search", {
            email
        }).then(res => {
            setUsers(res.data.data);
        }).catch(err => alert(err))
    }

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
                        <Mail className="mr-2"/>
                        <FloatingInput onChange={(e) => setEmail(e.target.value)} id="email" label="Email"/>
                    </div>
                    <div className="flex justify-center h-10">
                        <Button onClick={onClickSearch} className="bg-primary rounded-full h-full">Tìm kiếm</Button>
                    </div>
                </div>

                <div>
                    {users.length > 0 
                        ? users.map((user, index) => (
                            <UserCard key={index} user={user}/>
                        )) 
                        : <p>No Content</p> 
                    }
                </div>
            </div>
        </div>
    )
}