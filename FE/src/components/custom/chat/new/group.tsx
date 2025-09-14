import { ArrowLeft } from "lucide-react";

export default function Group({ onBack }: { onBack: () => void }) {
    return (
        <div className="flex flex-1">
            <div className="nav-header">
                <div className="flex items-center mb-4">
                    <div role="button" onClick={onBack}>
                        <ArrowLeft />
                    </div>
                    <p className="text-base ml-3">Thêm thành viên nhóm</p>
                </div>
            </div>
        </div>
    )
}