import Header from "../general/Header";
import ServiceCard from "./ServiceCard";
export default function ServiceSection() {
    return (
        <section id="services">
            <Header title="What I Offer" />
            <div className="w-[90%] sm:w-[80%] mx-auto grid grid-cols-1
            md:grid-cols-2 xl:grid-cols-4 gap-20">
                <div data-aos="fade-right">
                    <ServiceCard
                name="Design and Creative"
                icon="/images/s2.png"
                description="I create visually appealing designs that capture your brand's essence and resonate with your audience."
                />
                </div>
                <div data-aos="fade-right" data-aos-delay="100">
                    <ServiceCard
                name="Design and Creative"
                icon="/images/s2.png"
                description="I create visually appealing designs that capture your brand's essence and resonate with your audience."
                />
                </div>
                <div data-aos="fade-right" data-aos-delay="200">
                    <ServiceCard
                name="Design and Creative"
                icon="/images/s2.png"
                description="I create visually appealing designs that capture your brand's essence and resonate with your audience."
                />
                </div>
                <div data-aos="fade-right" data-aos-delay="300">
                    <ServiceCard
                name="Design and Creative"
                icon="/images/s2.png"
                description="I create visually appealing designs that capture your brand's essence and resonate with your audience."
                />
                </div>
            </div>
        </section>
    )
}