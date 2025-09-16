import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/ui/floating-input";
import { ArrowLeft, Mail, User } from "lucide-react";

export default function Contact({ onBack }: { onBack: () => void }) {
    return (
        <div className="flex flex-1">
            <div className="nav-header">
                <div className="flex items-center mb-16">
                    <div role="button" onClick={onBack}>
                        <ArrowLeft />
                    </div>
                    <p className="text-base ml-3">Người liên hệ mới</p>
                </div>

                <div>
                    <div className="flex justify-center items-center mb-6">
                        <User className="mr-2"/>
                        <FloatingInput id="name" label="Tên"/>
                    </div>
                    <div className="flex justify-center items- mb-6">
                        <Mail className="mr-2"/>
                        <FloatingInput id="email" label="Email"/>
                    </div>
                    <div className="flex justify-center h-10">
                        <Button className="bg-primary rounded-full h-full">Tìm kiếm</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}