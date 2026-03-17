import { LuGraduationCap } from "react-icons/lu";
import Header from "../general/Header";
import ResumeCard from "./ResumeCard";
import { RiNextjsFill } from "react-icons/ri";

export default function ResumeSection() {
    return (
        <section id="section" className="my-12">
            <div className="w-[90%] sm:w-[70%] mx-auto grid grid-cols-1 xl:grid-cols-2">
                <div data-aos="zoom-out">
                    <Header title="My Education" as="h2" />
                    <div className="space-y-6">
                        <ResumeCard 
                        icon={LuGraduationCap}
                        role="Bachelor of Science in Computer Science"
                        description="Graduated with honors from the University of Technology." 
                        date="jan 2020 - April 2025"/>
                        <ResumeCard 
                        icon={LuGraduationCap}
                        role="Bachelor of Science in Computer Science"
                        description="Graduated with honors from the University of Technology." 
                        date="jan 2020 - April 2025"/>
                        <ResumeCard 
                        icon={LuGraduationCap}
                        role="Bachelor of Science in Computer Science"
                        description="Graduated with honors from the University of Technology." 
                        date="jan 2020 - April 2025"/>
                    </div>
                </div>
                <div data-aos="zoom-in" data-aos-delay="200">
                    <Header title="My Work Experience" as="h2" />
                    <div className="space-y-6">
                        <ResumeCard 
                        icon={RiNextjsFill}
                        role="Software Engineer"
                        description="Worked as a software engineer at a tech company." 
                        />
                        <ResumeCard 
                        icon={RiNextjsFill}
                        role="Software Engineer"
                        description="Worked as a software engineer at a tech company." 
                        />
                        <ResumeCard 
                        icon={RiNextjsFill}
                        role="Software Engineer"
                        description="Worked as a software engineer at a tech company." 
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}