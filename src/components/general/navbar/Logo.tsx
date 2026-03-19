import Link from "next/link";
import { LuCodeXml } from "react-icons/lu";


export default function Logo() {
    return (
        <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-[#00ADB5] rounded-full grid place-items-center">
                <LuCodeXml/>
            </div>
            <p className="text-[#EEEEEE] font-bold md:text-2xl hidden sm:block">ANK</p>
        </Link>
    )
}