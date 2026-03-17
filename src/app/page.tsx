import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/hero/HeroSection";
import ServiceSection from "@/components/services/ServiceSection";
import ResumeSection from "@/components/resume/ResumeSection";
import ProjectSection from "@/components/projects/ProjectSection";
import SkillSection from "@/components/skills/SkillSection";
import TestimonialSection from "@/components/testimonials/TestimonialSection";
import ContactSection from "@/components/contacts/ContactSection";
import AnimationLayout from "../../layouts/AnimationLayout";

export default function Home() {
  return (
    <AnimationLayout>
      <HeroSection />
      <ServiceSection />
      <ResumeSection />
      <ProjectSection />
      <SkillSection />
      <TestimonialSection />
      <ContactSection />
    </AnimationLayout>
    // <>
    //   {/* <Navbar />
    //   <Hero />
    //   <About />
    //   <Portfolio />
    //   <Skills />
    //   <Contact />
    //   <Footer /> */}
    // </>
  )
}
