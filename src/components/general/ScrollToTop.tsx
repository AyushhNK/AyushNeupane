"use client";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTop() {
    const [showButton, setShowButton] = useState(false);
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
    return (
        <>
        {showButton && (
            <button onClick={scrollToTop} className="fixed bottom-4 right-4 z-40 w-12 h-12
            bg-[#031b2e]/80 backdrop-blur-md border border-[#2dd4bf]/20 text-[#2dd4bf]
            shadow-[0_0_16px_-4px_rgba(45,212,191,0.5)] cursor-pointer
            rounded-full grid place-items-center hover:border-[#2dd4bf]/60 transition-colors duration-300">
            <FaArrowUp/>
        </button>
        )
        }
        
        </>
    );  
}