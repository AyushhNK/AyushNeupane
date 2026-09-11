
import Link from "next/link";
import { IconType } from "react-icons";

interface LinkButtonProps {
    href:string,
    text:string,
    icon?:IconType,
    iconPosition?: "left" | "right",
    rounded?:boolean,
    download?:boolean,

    animate?: boolean,
    aosType?:string,
    aosDelay?:number,
}


export default function LinkButton({
    href, 
    text, 
    icon:Icon, 
    iconPosition="right", 
    rounded, 
    download=false,
    animate=false,
    aosType="fade-up",
    aosDelay=0,
}:LinkButtonProps) {
    return (
        <Link 
        {...(animate && {
            "data-aos": aosType,
            "data-aos-delay": aosDelay,
        })}
        href={href}
        download={download}
        className={`px-8 py-3 bg-linear-to-r from-[#2dd4bf] to-[#e6b94d]
        text-[#031b2e] font-semibold
        shadow-[0_0_18px_-4px_rgba(45,212,191,0.6)]
        hover:shadow-[0_0_28px_-2px_rgba(230,185,77,0.75)]
        transition-all duration-300
        hover:scale-[1.02] active:scale-[0.98]
        inline-flex items-center justify-center gap-2
        ${rounded?'rounded-full':'rounded-lg'}`}>
            {Icon && iconPosition === "left" && <Icon className="w-5 h-5"/>}
            {text}
            {Icon && iconPosition === "right" && <Icon className="w-5 h-5"/>}
        </Link>
    )
}