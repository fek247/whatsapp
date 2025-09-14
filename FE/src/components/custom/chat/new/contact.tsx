import { FloatingInput } from "@/components/ui/floating-input";
import { ArrowLeft, User } from "lucide-react";

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
                    <div className="flex justify-center items-center">
                        <User className="mr-2"/>
                        <FloatingInput id="name" label="Tên"/>
                    </div>
                </div>
            </div>
        </div>
    )
}