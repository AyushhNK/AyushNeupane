import Link from "next/link"
import { navLinks } from "./Navbar"
import LinkButton from "../LinkButton";
import { LuDownload } from "react-icons/lu";
interface MobileNavProps {
    navOpen:boolean,
}

export default function MobileNav({navOpen}:MobileNavProps) {
    const showMobileNav = navOpen ? "translate-x-0" : "translate-x-[100%]";
    return (
        <>
            <div className={`fixed inset-0 transform righ-0 z-50 bg-black 
                opacity-30 w-full h-screen 
                transition-all duration-500 ${showMobileNav} lg-hidden`}></div>
            <ul className={`fixed flex items-center justify-center text-white
            flex-col h-full transform transition-all duration-500 dalay-300
            w-[80%] sm:w-[60%] bg-[#031b2e]/95 backdrop-blur-xl border-l border-[#2dd4bf]/10 space-y-1 z-80 right-0 top-0 ${showMobileNav} lg:hidden`}>
                {navLinks.map((link) => {
                    return(
                        <li key={link.url}>
                            <Link href={link.url} className="flex justify-center
                            items-center text-xl
                            font-medium text-white py-4 px-6
                            rounded-lg hover:bg-[#2dd4bf]/5
                            hover:text-[#2dd4bf] transition-all duration-300 border-b
                            border-white/5 w-full text-center">{link.label}</Link>
                        </li>
                    )}
                )}
                <div className="my-4">
                    <LinkButton 
                href="/documents/cv.pdf" 
                text="Download CV" 
                download icon={LuDownload} 
                iconPosition="left"/>
                </div>
                
            </ul>
        </>
    )
}