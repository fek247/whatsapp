import { ArrowLeft } from "lucide-react";

export default function Community({ onBack }: { onBack: () => void }) {
    return (
        <div className="flex flex-1">
            <div className="nav-header">
                <div className="flex items-center mb-4">
                    <div role="button" onClick={onBack}>
                        <ArrowLeft />
                    </div>
                    <p className="text-base ml-3">Cộng đồng mới</p>
                </div>
            </div>
        </div>
    )
}