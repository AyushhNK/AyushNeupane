import Link from "next/link";
import { GiSeaDragon } from "react-icons/gi";


export default function Logo() {
    return (
        <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-linear-to-br from-[#2dd4bf] to-[#e6b94d] text-[#031b2e] rounded-full grid place-items-center shadow-[0_0_14px_-2px_rgba(45,212,191,0.6)]">
                <GiSeaDragon size={20}/>
            </div>
            <p className="font-heading text-[#eaf6f6] font-bold md:text-2xl hidden sm:block tracking-wide">ANK</p>
        </Link>
    )
}