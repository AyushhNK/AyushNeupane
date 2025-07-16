import React from 'react';
import Image from 'next/image';
import phone from '../assets/phone.png';
import mail from '../assets/mail.png';
import { FaGithub, FaGlobe } from 'react-icons/fa';

const Contact=()=>{
    return (
        <div className='relative py-24 px-4 bg-gradient-to-br from-[#0a1026]/80 via-[#23284a]/80 to-[#5f6fff]/90' id='contact'>
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute w-96 h-96 bg-gradient-to-br from-[#5f6fff]/30 via-[#a259ff]/20 to-[#43e8d8]/10 rounded-full blur-3xl top-0 left-0 animate-gradient-xy"/>
                <div className="absolute w-80 h-80 bg-gradient-to-tr from-[#a259ff]/30 via-[#5f6fff]/20 to-[#43e8d8]/10 rounded-full blur-2xl bottom-0 right-0 animate-gradient-xy"/>
            </div>
            <div className='max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-center relative z-10 gap-12'>
                <div className='flex flex-col gap-6 w-full lg:w-1/2'>
                    <h2 className='text-5xl font-extrabold text-transparent bg-gradient-to-r from-orange-400 via-yellow-400 to-purple-500 bg-clip-text mb-2 drop-shadow-lg'>Let's Connect</h2>
                    <p className='text-white/80 text-lg mb-6'>Send me a message and let&#39;s schedule a call</p>
                    <div className='flex flex-col gap-4'>
                        <div className='flex items-center gap-4 bg-white/10 border border-orange-400/20 rounded-2xl p-4 shadow-lg hover:bg-white/20 transition'>
                            <Image src={phone} alt="phone" className='h-12 w-12'/>
                            <span className='text-xl font-semibold'>(+977) 9744388789</span>
                        </div>
                        <div className='flex items-center gap-4 bg-white/10 border border-orange-400/20 rounded-2xl p-4 shadow-lg hover:bg-white/20 transition'>
                            <Image src={mail} alt="mail" className='h-12 w-12'/>
                            <span className='text-xl font-semibold'>neupaneayush3@gmail.com</span>
                        </div>
                        <a href="https://ayush-neupane.vercel.app/" target="_blank" rel="noopener noreferrer" className='flex items-center gap-4 bg-white/10 border border-orange-400/20 rounded-2xl p-4 shadow-lg hover:bg-white/20 transition'>
                            <FaGlobe size={32} className='text-orange-400'/>
                            <span className='text-xl font-semibold text-orange-300'>Portfolio Site</span>
                        </a>
                        <a href="https://github.com/AyushhNK" target="_blank" rel="noopener noreferrer" className='flex items-center gap-4 bg-white/10 border border-orange-400/20 rounded-2xl p-4 shadow-lg hover:bg-white/20 transition'>
                            <FaGithub size={32} className='text-orange-400'/>
                            <span className='text-xl font-semibold text-orange-300'>GitHub Profile</span>
                        </a>
                    </div>
                </div>
                <div className='w-full lg:w-1/2 bg-[var(--glass-bg)] border-2 border-[var(--glass-border)] rounded-3xl shadow-2xl p-10 backdrop-blur-lg'>
                    <h3 className='text-3xl font-bold text-orange-400 mb-4'>Send a Message</h3>
                    <form className='space-y-5'>
                        <div className='grid md:grid-cols-2 gap-4'>
                            <input className='bg-black/70 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-orange-400 text-white placeholder:text-white/60 transition' placeholder="First Name"/>
                            <input className='bg-black/70 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-orange-400 text-white placeholder:text-white/60 transition' placeholder="Last Name"/>
                            <input className='bg-black/70 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-orange-400 text-white placeholder:text-white/60 transition' placeholder="Email"/>
                            <input className='bg-black/70 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-orange-400 text-white placeholder:text-white/60 transition' placeholder="Phone"/>
                        </div>
                        <textarea className='w-full bg-black/70 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-orange-400 text-white placeholder:text-white/60 transition' placeholder='Your Message' rows={4}/>
                        <button className='bg-gradient-to-r from-[#5f6fff] to-[#43e8d8] hover:from-[#43e8d8] hover:to-[#5f6fff] text-black px-8 py-3 w-full font-bold text-xl rounded-xl transition-all duration-300 shadow-lg'>Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact;