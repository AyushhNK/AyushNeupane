import Link from "next/link"
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa"
import { LuSend } from "react-icons/lu"

const contactInfo=[
    {
        icon:<FaEnvelope className="w-6 h-6"/>,
        title:"Email",
        value:"neupaneayush3@gmail.com",
        link:"mailto:neupaneayush3@gmail.com",
    },
    {
        icon:<FaPhone className="w-6 h-6"/>,
        title:"Phone",
        value:"(+977)9744388789",
        link:"tel:(+977)9744388789",
    },
    {
        icon:<FaMapMarkerAlt className="w-6 h-6"/>,
        title:"Location",
        value:"Bafal, Kathmandu, Nepal",
        link:"https://maps.google.com/?q=Bafal, Kathmandu, Nepal"
    },
]
export default function ContactSection() {
    const inputStyles="px-4 py-3.5 my-4 bg-white/5 border border-white/10 focus:border-[#2dd4bf]/50 outline-none rounded-md w-full text-[#eaf6f6] placeholder-gray-400 transition-colors duration-300"
    return (
        <section id="contact" className="py-16 lg:py-30">
            <div className="w-[90%] md:w-[80%] lg:w-[70%] mx-auto grid grid-cols-1 lg:grid-cols-2
            gap-6 lg:gap-12">
                <div data-aos="fade-right">
                    <h2 className={ `font-heading py-3 text-3xl md:text-4xl font-bold tracking-wide text-transparent bg-clip-text
           bg-linear-to-r from-[#2dd4bf] to-[#e6b94d] mb-6`}>
                        Ready to Collaborate?
                    </h2>
                    <p className="text-gray-400 mb-10 text-base lg:text-lg
                    leading-relaxed">
                        I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out through any of the platforms below, and let&apos;s create something amazing together!
                    </p>
                    <div className="space-y-5 mb-12">
                        {contactInfo.map((item, index)=>{
                            return (
                                <Link href={item.link} key={index} className="group flex items-center
                                gap-4 px-2 py-3
                                transition-colors rounded-lg hover:bg-white/5">
                                    <div className="h-15 w-15 rounded-full bg-white/5 border border-[#2dd4bf]/15
                                    text-[#2dd4bf] transition-transform
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
                    <form className="hud-frame glass-panel rounded-lg px-4 py-8">
                        <input type="text" placeholder="Your name" className={inputStyles} required/>
                        <input type="email" placeholder="Your email" className={inputStyles} required/>
                        <input type="text" placeholder="Subject of your message" className={inputStyles} required/>
                        <textarea placeholder="Message" required className={`${inputStyles} resize-none`} rows={5}/>
                        <button className="w-full bg-linear-to-r from-[#2dd4bf] to-[#e6b94d]
                        hover:shadow-[0_0_24px_-4px_rgba(230,185,77,0.6)] text-[#031b2e] font-semibold py-4
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