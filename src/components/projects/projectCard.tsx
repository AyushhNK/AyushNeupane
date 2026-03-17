import Image from "next/image";

interface ProjectCardProps {
    title:string;
    description:string;
    imagePath:string;
}

export default function ProjectCard({ title, description, imagePath }: ProjectCardProps){
        return (
            <div>
                <Image
                src={imagePath}
                alt="project-image"
                width={800}
                height={600}
                className="rounded-lg"
                />
                <p className="my-4 text-xl sm:text-2xl font-semibold text-gray-200">{title}</p>
                <p className="font-medium text-gray-400">{description}</p>
            </div>
        )
}