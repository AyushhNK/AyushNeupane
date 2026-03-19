"use client";
import BlobCursor from "@/components/general/blob/BlobCursor";
import AOS from "aos";
import 'aos/dist/aos.css';
import { useEffect } from "react";


export default function AnimationLayout ({children,}:{children:React.ReactNode}) {
    useEffect(() => {
        const initAOS=async () => {
            await import("aos");
            AOS.init({
                duration:1000,
                easing:"ease",
                once:true,
                anchorPlacement:"top-center",
            });
        }
        initAOS();
    }, []);

    return (
        <>

        <BlobCursor
        blobType="circle"
        fillColor="#00adb5"
        trailCount={3}
        sizes={[101,125,75]}
        innerSizes={[98,35,25]}
        innerColor="rgba(213, 145, 145, 0.8)"
        opacities={[1,1,1]}
        shadowColor="rgba(227, 158, 158, 0.75)"
        shadowBlur={5}
        shadowOffsetX={10}
        shadowOffsetY={10}
        filterStdDeviation={50}
        useFilter={true}
        fastDuration={0.1}
        slowDuration={0.5}
        zIndex={-1}
        />
        {children}
        </>
    )
}