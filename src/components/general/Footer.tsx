
export default function Footer() {
    return (
        <footer className="relative border-t border-[#2dd4bf]/10 py-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px bg-linear-to-r from-transparent via-[#2dd4bf]/60 to-transparent"></div>
            <div className="px-4 text-center text-[#eaf6f6] text-sm">
                &copy; {new Date().getFullYear()} Ayush Neupane. All rights reserved.
            </div>
        </footer>
    )
}