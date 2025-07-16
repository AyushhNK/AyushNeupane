"use client";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { title: "About", path: "#about" },
    { title: "Portfolio", path: "#portfolio" },
    { title: "Contact", path: "#contact" },
];

const Navbar = () => {
    const [nav, setNav] = useState(false);

    const toggleNav = () => setNav(!nav);
    const closeNav = () => setNav(false);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-[var(--glass-bg)]/90 backdrop-blur-lg shadow-xl border-b-2 border-b-gradient-to-r from-[#5f6fff] via-[#a259ff] to-[#43e8d8]">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
                {/* Logo/Name */}
                <a href="#hero" className="text-2xl font-extrabold bg-gradient-to-r from-[#5f6fff] via-[#a259ff] to-[#43e8d8] bg-clip-text text-transparent drop-shadow-lg tracking-tight">Ayush NK</a>
                {/* Desktop Nav */}
                <ul className="hidden md:flex items-center gap-10">
                    {navLinks.map((link, index) => (
                        <li key={index}>
                            <Link href={link.path} className="relative group text-lg font-semibold text-white/90 px-2 py-1 transition">
                                <span>{link.title}</span>
                                <span className="block h-0.5 w-0 group-hover:w-full transition-all duration-300 bg-gradient-to-r from-[#5f6fff] via-[#a259ff] to-[#43e8d8] rounded-full mt-1"></span>
                            </Link>
                        </li>
                    ))}
                </ul>
                {/* Mobile Menu Button */}
                <div onClick={toggleNav} className="md:hidden flex items-center justify-center border border-white/20 rounded-full text-white/80 p-2 cursor-pointer transition hover:bg-white/10">
                    {nav ? <AiOutlineClose size={28} /> : <AiOutlineMenu size={28} />}
                </div>
            </div>
            {/* Mobile Dropdown */}
            <AnimatePresence>
                {nav && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-40 bg-[var(--glass-bg)]/95 backdrop-blur-2xl flex flex-col items-center justify-center md:hidden border-t-4 border-t-gradient-to-r from-[#5f6fff] via-[#a259ff] to-[#43e8d8]"
                    >
                        <ul className="flex flex-col items-center gap-10 text-3xl font-semibold">
                            {navLinks.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.path} onClick={closeNav} className="bg-gradient-to-r from-[#5f6fff] via-[#a259ff] to-[#43e8d8] bg-clip-text text-transparent hover:text-[#43e8d8] transition-colors duration-200">
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;