"use client";
import React from 'react';
import Image from 'next/image';
import book from '../assets/book.png';
import pc from '../assets/pc.png';
import card from '../assets/card.png';
import finance from '../assets/finance.png';

const About = () => {
    return (
        <div className="max-w-5xl mx-auto px-4 py-20" id="about">
            <h1 className='text-white text-6xl max-w-[420px] mx-auto font-extrabold p-4 mb-8 text-center bg-gradient-to-r from-yellow-400 via-orange-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg'>About <span className='text-orange-400'>Me</span></h1>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 place-items-center'>
                <div className='relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-xl p-8'>
                    <div className='absolute inset-0 bg-gradient-to-r from-orange-400 via-purple-700 opacity-20 animate-gradient-xy'></div>
                    <div className='relative z-10'>
                        <h2 className='text-3xl font-bold text-white/90 mb-4'>Introduction</h2>
                        <p className='text-lg text-white/80'>
                            Passionate and dedicated web developer with a strong desire to push personal limits and continuously learn new technologies. Adept at problem-solving and committed to professional development through building innovative projects. Skilled in Django, Django REST Framework (DRF), FastAPI, React, and Redux, and able to deploy them to the web with a solid foundation in both front-end and back-end development.
                        </p>
                    </div>
                </div>
                <div className='relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-xl p-8'>
                    <div className='absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 opacity-20 animate-gradient-xy'></div>
                    <div className='relative z-10'>
                        <h2 className='text-3xl font-bold text-white/90 mb-4'>Education</h2>
                        <ul className='text-lg text-white/80 space-y-2'>
                            <li><span className='font-semibold'>BSc CSIT</span>, Bhaktapur Multiple Campus, 2020-Present</li>
                            <li><span className='font-semibold'>+2 Science</span>, Greenfield National College, 2018-2020</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 place-items-center mt-10'>
                <div className='relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-xl p-8'>
                    <div className='absolute inset-0 bg-gradient-to-r from-orange-400 via-purple-700 opacity-20 animate-gradient-xy'></div>
                    <div className='relative z-10'>
                        <h2 className='text-3xl font-bold text-white/90 mb-4'>Backend Journey</h2>
                        <p className='text-lg text-white/80'>
                            Experienced in building and maintaining web applications, creating RESTful APIs, and deploying scalable solutions to AWS. Strong background in integrating payment gateways, working with databases, and collaborating in team environments. Always eager to tackle new challenges and deliver high-quality backend solutions.
                        </p>
                    </div>
                </div>
                <div className='relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-xl p-8'>
                    <div className='absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 opacity-20 animate-gradient-xy'></div>
                    <div className='relative z-10'>
                        <h2 className='text-3xl font-bold text-white/90 mb-4'>Contact</h2>
                        <ul className='text-lg text-white/80 space-y-2'>
                            <li><span className='font-semibold'>Email:</span> neupaneayush3@gmail.com</li>
                            <li><span className='font-semibold'>Phone:</span> (+977) 9744388789</li>
                            <li><span className='font-semibold'>Portfolio:</span> <a href="https://ayushneupanekhatri.up.railway.app/" className="text-orange-400 underline" target="_blank" rel="noopener noreferrer">ayushneupanekhatri.up.railway.app</a></li>
                            <li><span className='font-semibold'>GitHub:</span> <a href="https://github.com/AyushhNK" className="text-orange-400 underline" target="_blank" rel="noopener noreferrer">github.com/AyushhNK</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default About;