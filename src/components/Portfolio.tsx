"use client";
import Image from 'next/image';
import {motion} from 'framer-motion';
import project from '../assets/proj3.png';
import project1 from '../assets/proj2.jpg';

const projects=[
    {
        title:"Service Provider Platform",
        desc:"A robust and user-friendly platform for connecting service providers with customers, enabling service listings, bookings, and payments.",
        devstack:"Django, Django REST Framework, React, Tailwind CSS",
        link:"#", // Add live link if available
        git:"https://github.com/AyushhNK/service-provider-platform",
        src:project1
    },
    {
        title:"Korean Color Analysis App",
        desc:"Interactive web app for personalized fashion recommendations based on Korean color theory, analyzing users&#39; features to suggest matching outfits from Amazon.",
        devstack:"Django, Django REST Framework, React, Tailwind CSS",
        link:"#", // Add live link if available
        git:"https://github.com/AyushhNK/korean-color-analysis",
        src:project1
    },
    {
        title:"Doctor Appointment System",
        desc:"Web application for patients to book appointments with doctors, view available time slots, and receive reminders. Simplifies scheduling for both patients and healthcare providers.",
        devstack:"Django, React, MySQL",
        link:"#", // Add live link if available
        git:"https://github.com/AyushhNK/doctor-appointment-system",
        src:project
    },
    {
        title:"Ecommerce Site",
        desc:"Online platform for users to browse and purchase products, manage their shopping cart, and track orders. Features product search, user reviews, and secure payment processing.",
        devstack:"Django, Jinja, SQLite",
        link:"#", // Add live link if available
        git:"https://github.com/AyushhNK/ecommerce-site",
        src:project1
    },
    {
        title:"Gym Management Site",
        desc:"Modern and responsive UI for gym members to view schedules, book classes, manage memberships, and track progress.",
        devstack:"Django, Django REST Framework, React, Tailwind CSS",
        link:"#", // Add live link if available
        git:"https://github.com/AyushhNK/gym-management-site",
        src:project1
    },
    {
        title:"Social Media App",
        desc:"Platform enabling users to create profiles, share posts, connect with friends, real-time notifications, news feed, and direct messaging.",
        devstack:"Django, Django REST Framework, WebSocket, Jinja",
        link:"#", // Add live link if available
        git:"https://github.com/AyushhNK/social-media-app",
        src:project1
    },
]

const Portfolio = () => {
    return (
        <div className='text-white bg-gradient-to-b from-[#0a1026] to-[#23284a] py-18 mt-52' id="portfolio">
            <h1 className='text-white text-6xl max-w-[420px] mx-auto font-extrabold my-12 text-center bg-gradient-to-r from-[#5f6fff] via-[#a259ff] to-[#43e8d8] bg-clip-text text-transparent drop-shadow-lg'>Selected <span className='text-[#43e8d8]'>Projects</span></h1>
            <div className='max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 mt-32'>
                {projects.map((project,index)=>(
                    <motion.div
                        key={index}
                        initial={{opacity:0, y:75}}
                        whileInView={{opacity:1, y:0}}
                        viewport={{once:true}}
                        transition={{duration:0.5, delay:0.15*index}}
                        className="relative group bg-[var(--glass-bg)] backdrop-blur-lg border-2 border-[var(--glass-border)] rounded-3xl shadow-2xl overflow-hidden flex flex-col hover:scale-[1.025] transition-transform duration-300"
                    >
                        <div className="relative w-full h-64 overflow-hidden">
                            <Image src={project.src} alt="project" fill className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"/>
                            <span className="absolute top-4 left-4 bg-gradient-to-r from-[#5f6fff] via-[#a259ff] to-[#43e8d8] text-black font-bold px-5 py-2 rounded-full text-lg shadow-lg">{`0${index+1}`}</span>
                        </div>
                        <div className="p-8 flex flex-col flex-1">
                            <h2 className='text-3xl font-extrabold mb-2 bg-gradient-to-r from-[#a259ff] via-[#43e8d8] to-[#5f6fff] bg-clip-text text-transparent drop-shadow-lg'>{project.title}</h2>
                            <p className='text-lg text-white/80 mb-4'>{project.desc}</p>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.devstack.split(',').map((tech, i) => (
                                    <span key={i} className="bg-[#23284a]/80 text-[#43e8d8] px-3 py-1 rounded-full text-sm font-semibold shadow-md border border-[#5f6fff]/30">{tech.trim()}</span>
                                ))}
                            </div>
                            <div className="flex gap-4 mt-auto">
                                {project.link && project.link !== "#" && (
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-[#5f6fff] to-[#43e8d8] text-black font-bold px-6 py-2 rounded-xl shadow-lg hover:from-[#43e8d8] hover:to-[#5f6fff] transition-all duration-300">Live</a>
                                )}
                                <a href={project.git} target="_blank" rel="noopener noreferrer" className="bg-[#23284a] text-white font-bold px-6 py-2 rounded-xl shadow-lg hover:bg-[#3a3f6b] transition-all duration-300">GitHub</a>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default Portfolio;