import Link from "next/link"
import { title } from "process"
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa"
import { LuSend } from "react-icons/lu"
import { text } from "stream/consumers"

const contactInfo=[
    {
        icon:<FaEnvelope className="w-6 h-6"/>,
        title:"Email",
        value:"contact@example.com",
        link:"mailto:contact@example.com",
    },
    {
        icon:<FaPhone className="w-6 h-6"/>,
        title:"Phone",
        value:"+1234567890",
        link:"tel:+1234567890",
    },
    {
        icon:<FaMapMarkerAlt className="w-6 h-6"/>,
        title:"Location",
        value:"San Francisco, CA",
        link:"https://maps.google.com/?q=San Francisco, CA"
    },
]
export default function ContactSection() {
    const inputStyles="px-4 py-3.5 my-4 bg-slate-800 outline-none rounded-md w-full text-[#EEEEEE] placeholder-gray-400"
    return (
        <section id="contact" className="py-16 lg:py-30">
            <div className="w-[90%] md:w-[80%] lg:w-[70%] mx-auto grid grid-cols-1 lg:grid-cols-2
            gap-6 lg:gap-12">
                <div data-aos="fade-right">
                    <h2 className={ `py-3 text-3xl md:text-4xlfont-bold tracking-wide text-transparent bg-clip-text
           bg-linear-to-r from-[#00ADB5] to-[#393E46] mb-6`}>
                        Ready to Collaborate?
                    </h2>
                    <p className="text-gray-400 mb-10 text-base lg:text-lg
                    leading-relaxed">
                        I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out through any of the platforms below, and let&aos;pos;s create something amazing together!
                    </p>
                    <div className="space-y-5 mb-12">
                        {contactInfo.map((item, index)=>{
                            return (
                                <Link href={item.link} key={index} className="group flex items-center
                                gap-4 px-2 py-3
                                transition-colors rounded-lg hover:bg-white/5">
                                    <div className="h-15 w-15 rounded-full bg-white/5
                                    text-white transition-transform
                                    group-hover:scale-105 grid place-items-center">
                                        {item.icon}
                                    </div>
                                    <div>
                                       <h4 className="text-md font-medium text-white">{item.title}</h4> 
                                       <p className="text-md text-gray-400">{item.value}</p>

                                    </div>
                                    </Link>
                            )
                        })}
                    </div>
                </div>
                <div data-aos="zoom-in" data-aos-delay="200" >
                    <form className="rounded-lg bg-[#393E46] px-4 py-8 opacity-90">
                        <input type="text" placeholder="Your name" className={inputStyles} required/>
                        <input type="email" placeholder="Your email" className={inputStyles} required/>
                        <input type="text" placeholder="Subject of your message" className={inputStyles} required/>
                        <textarea placeholder="Message" required className={`${inputStyles} resize-none`} rows={5}/>
                        <button className="w-full bg-linear-to-r from-[#00ADB5] to-[#222831]
                        hover:from-[#00ADB5] hover:to-[#222831] text-white font-semibold py-4
                        rounded-lg transition-all flex items-center justify-center gap-2
                        cursor-pointer disabled:cursor-not-allowed disabled:opacity-70">
                            <LuSend size={20}/>
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}