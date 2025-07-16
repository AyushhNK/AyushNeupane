"use client";
import Image from "next/image";
import cursor from "../assets/icon1.png";
import lightning from "../assets/icon2.png";
import { motion } from "framer-motion";
import profilepic from "../assets/profilepic.png";

const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex flex-col justify-center items-center py-24 overflow-clip bg-gradient-to-b from-[#0a1026] via-[#23284a_60%] to-[#5f6fff_80%]">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute w-[700px] h-[700px] bg-gradient-to-br from-[#5f6fff]/30 via-[#a259ff]/20 to-[#43e8d8]/10 rounded-full blur-3xl top-[-200px] left-[-200px] animate-gradient-xy"/>
                <div className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-[#a259ff]/30 via-[#5f6fff]/20 to-[#43e8d8]/10 rounded-full blur-2xl bottom-[-100px] right-[-100px] animate-gradient-xy"/>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative w-full flex flex-col items-center"
            >
                <div className="text-5xl md:text-7xl font-extrabold text-center drop-shadow-lg mb-2">
                    <h1 className="text-transparent bg-gradient-to-r from-[#5f6fff] via-[#a259ff] to-[#43e8d8] bg-clip-text">Hi, I am</h1>
                    <h1 className="text-transparent bg-gradient-to-r from-[#a259ff] via-[#43e8d8] to-[#5f6fff] bg-clip-text">Ayush Neupane Khatri</h1>
                </div>
                <p className="text-center text-xl md:text-2xl font-semibold mt-4 text-[#43e8d8] tracking-wide bg-white/10 px-6 py-2 rounded-full shadow-lg backdrop-blur-sm inline-block">Backend Developer | Django & .NET Specialist</p>
                {/* Animated Icons */}
                <motion.div
                    className="absolute right-[10%] top-[120px] hidden md:block"
                    animate={{ y: [0, -20, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                >
                    <Image
                        src={cursor}
                        height={120}
                        width={120}
                        alt="cursor"
                        className="drop-shadow-xl"
                        draggable="false"
                    />
                </motion.div>
                <motion.div
                    className="absolute left-[10%] top-[120px] hidden md:block"
                    animate={{ y: [0, 20, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                >
                    <Image
                        src={lightning}
                        height={90}
                        width={90}
                        alt="lightning"
                        className="drop-shadow-xl"
                        draggable="false"
                    />
                </motion.div>
                <div className="max-w-2xl mx-auto mt-10 bg-[var(--glass-bg)] p-8 rounded-3xl shadow-2xl backdrop-blur-lg border-2 border-[var(--glass-border)] animate-fade-in">
                    <p className="text-center text-lg md:text-xl text-white/80">
                        I am a backend developer passionate about building robust, scalable, and secure web applications. My expertise lies in designing APIs, architecting microservices, and integrating modern technologies like Django, .NET, and FastAPI. I thrive on solving complex problems, optimizing performance, and delivering seamless digital experiences. Whether collaborating with teams or leading projects, I am committed to continuous learning and creating impactful solutions that power the web.
                    </p>
                </div>
                <div className="flex justify-center mt-8 gap-4 animate-fade-in">
                    <a href="mailto:neupaneayush3@gmail.com" className="bg-gradient-to-r from-[#5f6fff] to-[#43e8d8] hover:from-[#43e8d8] hover:to-[#5f6fff] text-black px-8 py-3 rounded-full text-lg font-bold shadow-lg transition-all duration-300">Contact Me</a>
                    <a href="https://github.com/AyushhNK" target="_blank" rel="noopener noreferrer" className="bg-[#23284a] hover:bg-[#3a3f6b] text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg transition-all duration-300">GitHub</a>
                </div>
                <div className="w-full flex justify-center mt-10 animate-fade-in">
                    <div className="h-1 w-40 bg-gradient-to-r from-[#5f6fff] via-[#a259ff] to-[#43e8d8] rounded-full opacity-60"></div>
                </div>
            </motion.div>
        </section>
    )
}

export default Hero;