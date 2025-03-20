"use client";
import Image from 'next/image';
import {motion} from 'framer-motion';
import project from '../assets/proj3.png';
import project1 from '../assets/proj2.jpg';

const projects=[
    {
        title:"Project 1",
        desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus.",
        devstack:"React, TailwindCSS, Framer Motion",
        link:"#",
        git:"#",
        src:project1
    },
    {
        title:"Project 2",
        desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus.",
        devstack:"React, TailwindCSS, Framer Motion",
        link:"#",
        git:"#",
        src:project1
    },
    {
        title:"Project 3",
        desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus.",
        devstack:"React, TailwindCSS, Framer Motion",
        link:"#",
        git:"#",
        src:project
    },
    {
        title:"Project 4",
        desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus.",
        devstack:"React, TailwindCSS, Framer Motion",
        link:"#",
        git:"#",
        src:project1
    }
]

const Portfolio = () => {
    return (
        <div className='text-white bg-gradient-to-b from-black to-[#381a5f] py-18 mt-52' id="portfolio">
            <h1 className='text-white text-6xl max-w-[320px] mx-auto font-semibold my-12'>Selected <span className='text-orange-400'>Project</span></h1>
            <div className='max-w-[1200px] mx-auto mt-40 space-y-24'>
                {projects.map((project,index)=>(
                    <motion.div
                    key={index}
                    initial={{opacity:0,y:75}}
                    whileInView={{opacity:1,y:0}}
                    viewport={{once:true}}
                    transition={{duration:0.5,delay:0.25}}
                    className={`flex ${index%2 ===1 ? "flex-col-reverse md:flex-row-reverse gap-12":"flex-col md:flex-row"}`}
                    >
                        <div className="space-y-2 max-w-[550px]">
                            <h2 className="text-7xl my-4 text-white/70">{`0${index+1}`}</h2>
                            <h2 className='text-4xl'>{project.title}</h2>
                            <p className='text-lg text-white/70 break-words p-4'>{project.desc}</p>
                            <p className='w-64 h-[1px] text-orange-400 my-4'>{project.devstack}</p>
                            <div className="w-64 h-[1px] my-4">
                                <a href={project.link} className="mr-6">Link</a>
                                <a href={project.git}>Git</a>
                            </div>
                        </div>

                        <div className='flex justify-center items-center'>
                            <Image src={project.src} alt="project" className='h-[350px] w-auto object-cover border rounder border-gray-700'/>
                        </div>
                    </motion.div>    
                ))}
            </div>
        </div>
    )
}

export default Portfolio;