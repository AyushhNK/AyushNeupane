import React from 'react';
import {FaLinkedin, FaTwitter, FaGithub} from 'react-icons/fa';

const Footer = () => {
    return (
        <div className='mt-12 text-white/70 py-8 max-w-[1000px] mx-auto border-t border-gray-700 pt-4 flex flex-col md:flex-row justify-between items-center'>
            <h1 className='text-2xl font-bold mb-4 md:mb-0'>Ayush Neupane Khatri</h1>
            <div className='flex space-x-6'>
                <a href="https://ayushneupanekhatri.up.railway.app/" target="_blank" rel="noopener noreferrer" className='hover:text-orange-400 text-lg font-semibold'>Portfolio</a>
                <a href="https://github.com/AyushhNK" target="_blank" rel="noopener noreferrer" className='hover:text-gray-300'>
                    <FaGithub size={24}/>
                </a>
                {/* Add LinkedIn if available */}
            </div>
        </div>
    )
}

export default Footer;