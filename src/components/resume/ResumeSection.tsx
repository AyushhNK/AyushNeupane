import { LuGraduationCap } from "react-icons/lu";
import Header from "../general/Header";
import ResumeCard from "./ResumeCard";
import { SiDjango } from "react-icons/si";

export default function ResumeSection() {
    return (
        <section id="section" className="my-12">
            <div className="w-[90%] sm:w-[70%] mx-auto grid grid-cols-1 xl:grid-cols-2">
                <div data-aos="zoom-out">
                    <Header title="My Education" as="h2" />
                    <div className="space-y-6">
                        <ResumeCard 
                        icon={LuGraduationCap}
                        role="Bachelor of Science in Computer Science And Information Technology"
                        description="Bhaktapur Multiple Campus, Tribhuvan University, Nepal." 
                        date="2020 - 2025"/>
                        <ResumeCard 
                        icon={LuGraduationCap}
                        role="+2 in Science"
                        description="Greenfield National Higher Secondary School, Nepal." 
                        date="2018 - 2020"/>
                        <ResumeCard 
                        icon={LuGraduationCap}
                        role="Secondary Evaluation Examination"
                        description="Greenfield National Higher Secondary School, Nepal." 
                        date=" - 2018"/>
                    </div>
                </div>
                <div data-aos="zoom-in" data-aos-delay="200">
                    <Header title="My Work Experience" as="h2" />
                    <div className="space-y-6">
                        <ResumeCard 
                        icon={SiDjango}
                        role="Junior Backend Developer"
                        description="Factdigi pvt ltd, Nepal." 
                        date="sep 2024 - present"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}