import Header from "../general/Header";
import ProjectCard from "./projectCard";


export default function ProjectSection() {
    return (
        <section id="projects">
            <Header title="My Projects" as="h2" />
            <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10
            ">
                <div data-aos="fade-right">
                    <ProjectCard 
                title="Service Provider Platform" 
                description="A robust and user-friendly platform for connecting service providers with customers, enabling service listings, bookings, and payments." 
                imagePath="/images/proj1.jpg"/>
                </div>
                <div data-aos="fade-left" data-aos-delay="200">
                    <ProjectCard 
                title="Korean Color Analysis App" 
                description="Interactive web app for personalized fashion recommendations based on Korean color theory, analyzing users&#39; features to suggest matching outfits from Amazon." 
                imagePath="/images/proj2.jpg"/>
                </div>
                <div data-aos="fade-right" data-aos-delay="400">
                    <ProjectCard 
                title="Sales and Finance Management System" 
                description="Comprehensive system for managing sales, inventory, and financial transactions, providing real-time insights and streamlined operations." 
                imagePath="/images/proj5.jpg"/>
                </div>
                <div data-aos="fade-left" data-aos-delay="600">
                    <ProjectCard 
                title="E-Commerce Platform" 
                description="Online platform for users to browse and purchase products, manage their shopping cart, and track orders. Features product search, user reviews, and secure payment processing." 
                imagePath="/images/proj4.jpg"/>
                </div>
            </div>
        </section>
    )
}