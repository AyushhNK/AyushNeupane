import React from 'react';
import { FaGithub, FaGlobe } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="relative z-10 mt-24">
            <div className="max-w-3xl mx-auto px-6 py-10 bg-[var(--glass-bg)] border-t-4 border-b-4 border-[var(--glass-border)] rounded-3xl shadow-2xl backdrop-blur-lg flex flex-col items-center">
                <h1 className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-[#5f6fff] via-[#a259ff] to-[#43e8d8] bg-clip-text mb-2 drop-shadow-lg">Ayush Neupane Khatri</h1>
                <div className="flex items-center gap-6 mb-4 mt-2">
                    <a href="https://ayushneupanekhatri.up.railway.app/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 text-2xl transition-colors" title="Portfolio">
                        <FaGlobe size={28} />
                    </a>
                    <a href="https://github.com/AyushhNK" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 text-2xl transition-colors" title="GitHub">
                        <FaGithub size={28} />
                    </a>
                </div>
                <div className="w-full h-px bg-gradient-to-r from-[#5f6fff] via-[#a259ff] to-[#43e8d8] opacity-40 my-4" />
                <p className="text-white/60 text-sm text-center">&copy; {new Date().getFullYear()} Ayush Neupane Khatri. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer;