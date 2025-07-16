"use client";
import React from 'react';
import { FaUserGraduate, FaServer, FaEnvelope, FaUniversity } from 'react-icons/fa';

const About = () => {
    return (
        <div className="relative max-w-5xl mx-auto px-4 py-24" id="about">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute w-96 h-96 bg-gradient-to-br from-[#5f6fff]/30 via-[#a259ff]/20 to-[#43e8d8]/10 rounded-full blur-3xl top-0 left-0 animate-gradient-xy"/>
                <div className="absolute w-80 h-80 bg-gradient-to-tr from-[#a259ff]/30 via-[#5f6fff]/20 to-[#43e8d8]/10 rounded-full blur-2xl bottom-0 right-0 animate-gradient-xy"/>
            </div>
            <h1 className='text-white text-6xl max-w-[420px] mx-auto font-extrabold p-4 mb-12 text-center bg-gradient-to-r from-[#5f6fff] via-[#a259ff] to-[#43e8d8] bg-clip-text text-transparent drop-shadow-lg'>About <span className='text-[#43e8d8]'>Me</span></h1>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 place-items-center'>
                {/* Introduction */}
                <div className='relative bg-[var(--glass-bg)] border-2 border-[var(--glass-border)] rounded-3xl overflow-hidden shadow-2xl p-10 flex flex-col items-center animate-fade-in'>
                    <FaUserGraduate size={40} className="mb-4 text-orange-400"/>
                    <h2 className='text-3xl font-extrabold text-transparent bg-gradient-to-r from-orange-400 via-yellow-400 to-purple-500 bg-clip-text mb-4 drop-shadow-lg'>Introduction</h2>
                    <p className='text-lg text-white/80 text-center'>
                        Passionate and dedicated web developer with a strong desire to push personal limits and continuously learn new technologies. Adept at problem-solving and committed to professional development through building innovative projects. Skilled in Django, Django REST Framework (DRF), FastAPI, React, and Redux, and able to deploy them to the web with a solid foundation in both front-end and back-end development.
                    </p>
                </div>
                {/* Education */}
                <div className='relative bg-[var(--glass-bg)] border-2 border-[var(--glass-border)] rounded-3xl overflow-hidden shadow-2xl p-10 flex flex-col items-center animate-fade-in'>
                    <FaUniversity size={40} className="mb-4 text-yellow-400"/>
                    <h2 className='text-3xl font-extrabold text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-purple-500 bg-clip-text mb-4 drop-shadow-lg'>Education</h2>
                    <ul className='text-lg text-white/80 space-y-2 text-center'>
                        <li><span className='font-semibold'>BSc CSIT</span>, Bhaktapur Multiple Campus, 2020-Present</li>
                        <li><span className='font-semibold'>+2 Science</span>, Greenfield National College, 2018-2020</li>
                    </ul>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 place-items-center mt-10'>
                {/* Backend Journey */}
                <div className='relative bg-[var(--glass-bg)] border-2 border-[var(--glass-border)] rounded-3xl overflow-hidden shadow-2xl p-10 flex flex-col items-center animate-fade-in'>
                    <FaServer size={40} className="mb-4 text-purple-400"/>
                    <h2 className='text-3xl font-extrabold text-transparent bg-gradient-to-r from-orange-400 via-yellow-400 to-purple-500 bg-clip-text mb-4 drop-shadow-lg'>Backend Journey</h2>
                    <p className='text-lg text-white/80 text-center'>
                        Experienced in building and maintaining web applications, creating RESTful APIs, and deploying scalable solutions to AWS. Strong background in integrating payment gateways, working with databases, and collaborating in team environments. Always eager to tackle new challenges and deliver high-quality backend solutions.
                    </p>
                </div>
                {/* Contact */}
                <div className='relative bg-[var(--glass-bg)] border-2 border-[var(--glass-border)] rounded-3xl overflow-hidden shadow-2xl p-10 flex flex-col items-center animate-fade-in'>
                    <FaEnvelope size={40} className="mb-4 text-orange-300"/>
                    <h2 className='text-3xl font-extrabold text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-purple-500 bg-clip-text mb-4 drop-shadow-lg'>Contact</h2>
                    <ul className='text-lg text-white/80 space-y-2 text-center'>
                        <li><span className='font-semibold'>Email:</span> neupaneayush3@gmail.com</li>
                        <li><span className='font-semibold'>Phone:</span> (+977) 9744388789</li>
                        <li><span className='font-semibold'>Portfolio:</span> <a href="https://ayushneupanekhatri.up.railway.app/" className="text-orange-400 underline" target="_blank" rel="noopener noreferrer">ayushneupanekhatri.up.railway.app</a></li>
                        <li><span className='font-semibold'>GitHub:</span> <a href="https://github.com/AyushhNK" className="text-orange-400 underline" target="_blank" rel="noopener noreferrer">github.com/AyushhNK</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default About;

/* Add this to your global CSS for fade-in animation:
@keyframes fade-in {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: none; }
}
.animate-fade-in {
  animation: fade-in 1s cubic-bezier(0.4,0,0.2,1);
}
*/