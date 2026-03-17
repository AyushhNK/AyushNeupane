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
            <button onClick={scrollToTop} className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full w-12 h-12 bg-slate-800 cursor-pointer text-white
            rounded-full grid place-items-center fixed bottom-4 right-4">
            <FaArrowUp className=""/>
        </button>   
        )
        }
        
        </>
    );  
}