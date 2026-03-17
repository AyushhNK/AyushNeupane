"use client";
import Image from "next/image";
import AnimatedIntro from "./AnimatedIntro";
import LinkButton from "@/components/general/LinkButton";
import {LuArrowRight } from "react-icons/lu";
import Particles from "./Particles";


export default function HeroSection() {
    return (
        <section id="home" className="h-screen relative flex justify-center items-center
        overflow-hidden flex-col">
            <div style={{ width: '100%', height: '600px', position: 'relative' }}>
            <Particles
                particleColors={["#ffffff"]}
                particleCount={200}
                particleSpread={10}
                speed={0.1}
                particleBaseSize={100}
                moveParticlesOnHover
                alphaParticles={false}
                disableRotation={false}
                pixelRatio={1}
            />
            </div>
            <div className="absolute z-10 flex flex-col items-center">
                <div className="w-37.5 h-37.5 relative"data-aos="fade-up">
                    <div className="absolute inset-0 rounded-full bg-linear-to-r from-blue-500 
                    to-purple-600 blur-lg animate-pulse opacity-50"></div>
                        <Image src="/images/hero-bg.jpg" alt="Background" className="rounded-full object-cover" fill/>
                </div>
                <h1 data-aos="fade-up" data-aos-delay="200" className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                my-6 font-bold tracking-wide text-transparent bg-clip-text bg-linear-to-r
                from-indigo-500 to-gray-300">Hi I&apos;m a Backend Developer</h1>
                <AnimatedIntro/>
                <LinkButton href="#projects" 
                text="See my work" 
                icon={LuArrowRight}
                rounded
                aosType="fade-up"
                aosDelay={600}
                animate
                />
            </div>

            
        </section>
    )
}