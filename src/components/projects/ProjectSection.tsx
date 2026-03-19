import Header from "../general/Header";
import ProjectCard from "./projectCard";


export default function ProjectSection() {
    return (
        <section id="projects">
            <Header title="My Projects" as="h2" />
            <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10
            ">
                <div data-aos="fade-right">
                    <ProjectCard 
                title="Modern Dashboard UI" 
                description="A modern dashboard UI built with React and Tailwind CSS." 
                imagePath="/images/proj1.jpg"/>
                </div>
                <div data-aos="fade-left" data-aos-delay="200">
                    <ProjectCard 
                title="Modern Dashboard UI" 
                description="A modern dashboard UI built with React and Tailwind CSS." 
                imagePath="/images/proj1.jpg"/>
                </div>
                <div data-aos="fade-right" data-aos-delay="400">
                    <ProjectCard 
                title="Modern Dashboard UI" 
                description="A modern dashboard UI built with React and Tailwind CSS." 
                imagePath="/images/proj1.jpg"/>
                </div>
                <div data-aos="fade-left" data-aos-delay="600">
                    <ProjectCard 
                title="Modern Dashboard UI" 
                description="A modern dashboard UI built with React and Tailwind CSS." 
                imagePath="/images/proj1.jpg"/>
                </div>
            </div>
        </section>
    )
}