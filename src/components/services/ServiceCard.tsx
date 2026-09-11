import Image from "next/image";
import TiltCard from "@/components/general/TiltCard";

interface ServiceCardProps {
    icon:string,
    name:string,
    description:string,
}
export default function ServiceCard({icon, name, description}:ServiceCardProps) {
    return (
        <TiltCard className="hud-frame glass-panel rounded-xl p-6 h-full">
            <Image src={icon} alt="service-icon" width={60} height={60}/>
            <h3 className="font-heading my-4 text-xl md:text-2xl font-bold text-[#eaf6f6]">{name}</h3>
            <p className="text-gray-300">{description}</p>
        </TiltCard>
    )
}
