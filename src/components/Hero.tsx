"use client";
import Image from "next/image";
import cursor from "../assets/icon1.png";
import lightning from "../assets/icon2.png";
import {motion} from "framer-motion";
import profilepic from "../assets/profilepic.png";

const Hero = () => {
    return (
        <div className="py-24 relative overflow-clip bg-[linear-gradient(to_bottom,#0a0a0a,#2B1942_35%,#8F5C55_60%,#DBAF6E_80%)]">
            <div className="absolute rounded-[50%] w-[3000px] h-[1300px] top-[550px] left-[50%] -translate-x-1/2 bg-[radial-gradient(closest-side,#0a0a0a_80%,#2B1942)]"></div>
            <div className="relative">
                <div className="text-7xl md:text-8xl font-extrabold text-center drop-shadow-lg">
                    <h1 className="text-[#98B4CE]">Hi, I am</h1>
                    <h1 className="text-[#E4BA57]">Ayush Neupane Khatri</h1>
                </div>
                <p className="text-center text-2xl md:text-3xl font-semibold mt-6 text-orange-400 tracking-wide">Backend Developer | Django & FastAPI Specialist</p>
                <motion.div
                className="absolute right-[280px] top-[170px] hidden md:block"
                drag>
                <Image
                src={cursor}
                height="170"
                width="170"
                alt="cursor"
                className=""
                draggable="false"
                 />
                </motion.div>
                <motion.div
                className="absolute left-[220px] top-[170px] hidden md:block"
                drag>
                <Image
                src={lightning}
                height="120"
                width="120"
                alt="cursor"
                className=""
                draggable="false"
                 />
                </motion.div>
            <p className="text-center text-lg md:text-xl max-w-[700px] mx-auto mt-8 text-white/80 bg-black/30 p-6 rounded-xl shadow-lg backdrop-blur-sm">
                Passionate and dedicated web developer with a strong desire to push personal limits and continuously learn new technologies. Adept at problem-solving and committed to professional development through building innovative projects. Skilled in Django, Django REST Framework (DRF), FastAPI, React, and Redux, and able to deploy them to the web with a solid foundation in both front-end and back-end development.
            </p>
            <div className="flex justify-center mt-8">
                <a href="mailto:neupaneayush3@gmail.com" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg transition-all duration-300 mr-4">Contact Me</a>
                <a href="https://github.com/AyushhNK" target="_blank" rel="noopener noreferrer" className="bg-[#171717] hover:bg-[#222] text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg transition-all duration-300">GitHub</a>
            </div>
            <Image
            src={profilepic}
            alt="profilepic"
            className="h-40 w-40 md:h-60 md:w-60 mx-auto mt-10 rounded-full border-4 border-orange-400 shadow-xl object-cover"/>
            </div>
        </div>
    )
}

export default Hero;