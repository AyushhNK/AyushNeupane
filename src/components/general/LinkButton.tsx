
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
        className={`px-8 py-3  bg-linear-to-r from-[#00ADB5] to-[#393E46] hover:from-[#00ADB5] hover:to-[#393E46]
        text-white font-medium
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