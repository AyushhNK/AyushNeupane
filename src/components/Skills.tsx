import React from 'react';
import { FaHtml5,FaCss3Alt,FaReact,FaJsSquare, FaPython } from 'react-icons/fa';
import { SiDotnet, SiDjango } from 'react-icons/si';

const skillIcons=[
    {icon:<FaPython size={80} className="text-yellow-400"/>,label:"Python"},
    {icon:<SiDotnet size={80} className="text-blue-500"/>,label:".NET"},
    {icon:<SiDjango size={80} className="text-green-700"/>,label:"Django"},
    {icon:<FaReact size={80} className="text-cyan-400 animate-spin-slow"/>,label:"React"},
]

const Skills=()=>{
    return (
        <div className="bg-gradient-to-t from-black to-[#381a5f] py-32">
            <div className='text-white max-w-3xl mx-auto p-8 text-center'>
                <h2 className='text-6xl font-extrabold mb-4 tracking-tight bg-gradient-to-r from-yellow-400 via-orange-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg'>Backend Skills</h2>
                <p className="text-lg text-white/70 mb-10">Technologies I use to build robust, scalable, and secure backend systems</p>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
                    {skillIcons.map((skill,index)=>(
                        <div key={index} className='h-[160px] w-[160px] md:h-[200px] md:w-[200px] flex flex-col justify-center items-center bg-white/10 hover:bg-white/20 transition-all duration-300 shadow-lg p-6 rounded-2xl border border-purple-900/30 backdrop-blur-sm'>
                            <div className="mb-3">{skill.icon}</div>
                            <p className='mt-2 text-xl font-semibold tracking-wide'>{skill.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Skills;