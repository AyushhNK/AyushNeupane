"use client";
import Image from "next/image";
import AnimatedIntro from "./AnimatedIntro";
import LinkButton from "@/components/general/LinkButton";
import {LuArrowRight } from "react-icons/lu";
import FishHalo from "@/components/three/FishHalo";


export default function HeroSection() {
    return (
        <section id="home" className="h-screen relative flex justify-center items-center
        flex-col overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[26rem] h-[26rem] rounded-full bg-[#e6b94d]/10 blur-[100px]"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center">
                <div className="w-37.5 h-37.5 relative" data-aos="fade-up">
                    <FishHalo className="absolute -inset-[8rem] sm:-inset-[9rem]" />
                    <div className="absolute inset-0 rounded-full bg-linear-to-r from-[#2dd4bf] to-[#e6b94d] blur-lg animate-pulse opacity-40"></div>
                    <div className="absolute -inset-1.5 rounded-full border-[3px] border-[#e6b94d]/70"></div>
                        <Image src="/images/hero-bg.jpg" alt="Background" className="relative rounded-full object-cover" fill sizes="150px" priority/>
                </div>
                <h1 data-aos="fade-up" data-aos-delay="200" className="font-heading text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                my-6 font-bold tracking-wide text-transparent bg-clip-text bg-linear-to-r
                from-[#2dd4bf] to-[#e6b94d]">Hi I&apos;m a Backend Developer</h1>
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