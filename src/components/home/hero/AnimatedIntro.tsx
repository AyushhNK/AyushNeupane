import TypeWriter from "typewriter-effect";
export default function AnimatedIntro() {
    return (
        <div data-aos="fade-up" data-aos-delay="400" className="text-lg sm:text-2xl h-30 px-8 text-center font-medium
        text-gray-400">
            Hi I&apos;m Ayush, a passionate
            <span className="text-[#00ADB5] font-bold">
                <TypeWriter
                options={{
                    strings:[
                        "Full Stack Developer",
                        "Backend Developer",
                        "Django Developer",
                        "Express.js Developer",
                        "Tech Enthusiast"
                    ],
                    autoStart:true,
                    loop:true,
                    delay:75,
                    deleteSpeed:50,
                    wrapperClassName:"inline-block py-6"
                }}
                />
            </span>
        </div>
    )
}