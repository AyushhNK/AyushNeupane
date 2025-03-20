"use client";
import Image from "next/image";
import cursor from "../assets/icon1.png";
import lightning from "../assets/icon2.png";
import {motion} from "framer-motion";
import profilepic from "../assets/profilepic.png";

const Hero = () => {
    return (
        <div className="py-24 relative overflow-clip bg-[linear-gradient(to_bottom,#000,#2B1942_35%,#8F5C55_60%,#DBAF6E_80%)]">
            <div className="absolute rounded-[50%] w-[3000px] h-[1300px] top-[550px] left-[50%] -translate-x-1/2 bg-[radial-gradient(closest-side,#000_80%,#2B1942)]"></div>
            <div className="relative">
                <div className="text-8xl font-bold text-center">
                    <h1 className="text-[#98B4CE]">HI, I am</h1>
                    <h1 className="text-[#E4BA57]">Ayush Neupane</h1>
                </div>

                <motion.div
                className="absolute right-[280px] top-[170px]"
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
                className="absolute left-[220px] top-[170px]"
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
            
            <p className="text-center text-xl max-w-[500px] mx-auto mt-8 text-white/80">
                I am a Backend devloper focused on creating api's and microservices for an interactive user experience.
            </p>
            <Image
            src={profilepic}
            alt="profilepic"
            className="h-120 w-120 mx-auto"/>
            </div>
        </div>
    )
}

export default Hero;