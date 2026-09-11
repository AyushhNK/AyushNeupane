import { DiPython } from "react-icons/di";
import Header from "../general/Header";
import {  SiApachekafka, SiDjango,SiExpress,SiReact} from "react-icons/si";
import TiltCard from "../general/TiltCard";


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
                        <div key={index} data-aos="flip-right" data-aos-delay={index*200}>
                            <TiltCard className="hud-frame glass-panel text-center w-40 h-48 rounded-3xl
                            flex flex-col items-center justify-center">
                                <div className="text-5xl text-[#2dd4bf]">
                                    {skill.icon}
                                </div>
                                <p className="font-heading text-2xl font-semibold my-4 text-gray-200">
                                    {skill.skillLevel}%
                                </p>
                                <p className="text-[#e6b94d] font-semibold">
                                    {skill.name}
                                </p>
                            </TiltCard>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}