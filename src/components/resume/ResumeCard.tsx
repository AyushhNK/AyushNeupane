import { IconType } from "react-icons";
import TiltCard from "@/components/general/TiltCard";

interface ResumeCardProps {
    role: string;
    icon:IconType;
    date?:string;
    description: string;
}

export default function ResumeCard({role, icon:Icon, date, description}: ResumeCardProps) {
    return (
        <TiltCard maxTilt={4} className="hud-frame glass-panel flex items-start space-x-6 p-4 sm:p-8 rounded-md mx-2">
            <div className="w-10 h-10 sm:w-14 sm:h-14 bg-linear-to-br from-[#2dd4bf] to-[#e6b94d] rounded-full grid
            place-items-center shrink-0">
                <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#031b2e]" />
            </div>
            <div className="flex-1">
                {date && (
                    <p className="mb-2 px-4 py-1 sm:py-1.5 rounded-full
                    bg-[#2dd4bf]/10 text-[#2dd4bf] border border-[#2dd4bf]/20 w-fit text-sm sm:text-lg font-bold">{date}</p>

                )}
                <p className="font-heading text-gray-200 text-xl sm:text-2xl font-semibold tracking-wide">{role}</p>
                <p className="text-sm sm:text-base mt-3 text-gray-300 tracking-wide">{description}</p>
            </div>
        </TiltCard>
    )
}