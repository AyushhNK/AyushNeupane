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
        desc:"Interactive web app for personalized fashion recommendations based on Korean color theory, analyzing users' features to suggest matching outfits from Amazon.",
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
        <div className='text-white bg-gradient-to-b from-black to-[#381a5f] py-18 mt-52' id="portfolio">
            <h1 className='text-white text-6xl max-w-[420px] mx-auto font-extrabold my-12 text-center bg-gradient-to-r from-yellow-400 via-orange-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg'>Selected <span className='text-orange-400'>Projects</span></h1>
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