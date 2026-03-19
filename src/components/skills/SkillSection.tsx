import { DiJavascript, DiPython } from "react-icons/di";
import Header from "../general/Header";
import { FaNodeJs } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import {  SiApachekafka, SiDjango,SiExpress,SiReact} from "react-icons/si";


const skills=[
    {
        name:"Django",
        icon:<SiDjango/>,
        skillLevel:90,
    },
    {
        name:"Python",
        icon:<DiPython/>,
        skillLevel:85,
    },
    {
        name:"Express js",
        icon:<SiExpress />,
        skillLevel:90,
    },
    {
        name:"React js",
        icon:<SiReact/>,
        skillLevel:80,
    },
    {
        name:"Apache Kafka",
        icon:<SiApachekafka />,
        skillLevel:80,
    }
]

export default function SkillSection() {
    return (
        <section id="skills" className="py-16">
            <Header title="My Skills"/>
            <div className="flex flex-wrap justify-center gap-6 opacity-90">
                {skills.map((skill, index)=>{
                    return (
                        <div 
                        key={index} 
                        data-aos="flip-right"
                        data-aos-delay={index*200}
                        className="bg-[#393E46] text-center w-40 h-48 rounded-3xl
                        flex flex-col items-center justify-center shadow-lg transition:hover:scale-110">
                            <div className="text-5xl text-gray-300">
                                {skill.icon}
                            </div>
                            <p className="text-2xl font-semibold my-4 text-gray-200">
                                {skill.skillLevel}%
                            </p>
                            <p className="text-[#00ADB5] font-semibold">
                                {skill.name}
                            </p>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}