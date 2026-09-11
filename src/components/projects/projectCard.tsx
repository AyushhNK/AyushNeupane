import Image from "next/image";
import TiltCard from "@/components/general/TiltCard";

interface ProjectCardProps {
    title:string;
    description:string;
    imagePath:string;
}

export default function ProjectCard({ title, description, imagePath }: ProjectCardProps){
        return (
            <TiltCard className="hud-frame glass-panel rounded-xl p-4 h-full">
                <div className="overflow-hidden rounded-lg">
                    <Image
                    src={imagePath}
                    alt="project-image"
                    width={800}
                    height={600}
                    className="rounded-lg transition-transform duration-500 hover:scale-105"
                    />
                </div>
                <p className="font-heading my-4 text-xl sm:text-2xl font-semibold text-[#eaf6f6]">{title}</p>
                <p className="font-medium text-gray-300">{description}</p>
            </TiltCard>
        )
}