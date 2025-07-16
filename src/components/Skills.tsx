import React from 'react';
import { FaReact, FaPython, FaGitAlt, FaGitlab } from 'react-icons/fa';
import { SiDotnet, SiDjango, SiFastapi, SiRedux, SiTailwindcss, SiPostman, SiGithub } from 'react-icons/si';
import { DiTerminal } from 'react-icons/di';

const backendSkills = [
    { icon: <SiDotnet size={60} className="text-[#5f6fff]" />, label: ".NET" },
    { icon: <SiDjango size={60} className="text-[#43e8d8]" />, label: "Django" },
    { icon: <SiFastapi size={60} className="text-[#a259ff]" />, label: "FastAPI" },
];
const frontendSkills = [
    { icon: <FaReact size={60} className="text-[#5f6fff] animate-spin-slow" />, label: "React" },
    { icon: <SiRedux size={60} className="text-[#a259ff]" />, label: "Redux" },
    { icon: <SiTailwindcss size={60} className="text-[#43e8d8]" />, label: "Tailwind" },
];
const tools = [
    { icon: <SiPostman size={60} className="text-[#ff6c37]" />, label: "Postman" },
    { icon: <FaGitAlt size={60} className="text-[#f34f29]" />, label: "Git" },
    { icon: <SiGithub size={60} className="text-[#5f6fff]" />, label: "GitHub" },
];

const Skills = () => {
    return (
        <section className="bg-gradient-to-t from-[#0a1026] to-[#23284a] py-32">
            <div className="max-w-5xl mx-auto p-8 text-center">
                <h2 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight bg-gradient-to-r from-[#5f6fff] via-[#a259ff] to-[#43e8d8] bg-clip-text text-transparent drop-shadow-lg">Skills & Tools</h2>
                <p className="text-lg text-white/70 mb-10">Technologies I use to build robust, scalable, and modern web applications</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Backend */}
                    <div className="bg-[var(--glass-bg)] border-2 border-[var(--glass-border)] rounded-3xl shadow-xl p-8 flex flex-col items-center animate-fade-in">
                        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#5f6fff] via-[#a259ff] to-[#43e8d8] bg-clip-text text-transparent">Backend</h3>
                        <div className="flex flex-wrap justify-center gap-6">
                            {backendSkills.map((skill, i) => (
                                <div key={i} className="flex flex-col items-center gap-2">
                                    {skill.icon}
                                    <span className="text-lg text-white/80 font-semibold mt-1">{skill.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Frontend */}
                    <div className="bg-[var(--glass-bg)] border-2 border-[var(--glass-border)] rounded-3xl shadow-xl p-8 flex flex-col items-center animate-fade-in">
                        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#a259ff] via-[#43e8d8] to-[#5f6fff] bg-clip-text text-transparent">Frontend</h3>
                        <div className="flex flex-wrap justify-center gap-6">
                            {frontendSkills.map((skill, i) => (
                                <div key={i} className="flex flex-col items-center gap-2">
                                    {skill.icon}
                                    <span className="text-lg text-white/80 font-semibold mt-1">{skill.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Tools */}
                    <div className="bg-[var(--glass-bg)] border-2 border-[var(--glass-border)] rounded-3xl shadow-xl p-8 flex flex-col items-center animate-fade-in">
                        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#43e8d8] via-[#5f6fff] to-[#a259ff] bg-clip-text text-transparent">Tools</h3>
                        <div className="flex flex-wrap justify-center gap-6">
                            {tools.map((tool, i) => (
                                <div key={i} className="flex flex-col items-center gap-2">
                                    {tool.icon}
                                    <span className="text-lg text-white/80 font-semibold mt-1">{tool.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;