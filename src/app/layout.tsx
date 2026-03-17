import type { Metadata } from "next";
import {Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/general/navbar/Navbar";
import Footer from "@/components/general/Footer";
import ScrollToTop from "@/components/general/ScrollToTop";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight:["300", "400", "500", "600", "700", ],
});



export const metadata: Metadata = {
  title: "Ayush Portfolio",
  description: "Ayush Neupane Khatri's Portfolio - Backend Developer specializing in Django and .NET. Explore projects, skills, and contact information showcasing expertise in building robust web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased bg-slate-950`}
      >
        <Navbar />
        {children}
        <Footer />
        <ScrollToTop/>
      </body>
    </html>
  );
}
