import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const bgScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.3]);
    const textOpacity = useTransform(scrollYProgress, [0.2, 0.5], [1, 0]);

    return (
        <div
            ref={containerRef}
            className="h-[200vh] relative -mt-[102px]"
        >
            <div className="sticky top-0 h-screen overflow-hidden">
                <motion.div
                    style={{ scale: bgScale }}
                    className="absolute inset-0 bg-cover bg-center bg-[url('/home_bg.png')]"
                />
                <div className="relative h-full flex justify-center items-center">
                    <motion.div
                        style={{ opacity: textOpacity }}
                        className="rounded-2xl flex gap-20 items-center justify-between p-16"
                    >
                        <motion.img
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 0.95, x: 0 }}
                            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                            className="scale-105 rounded-md"
                            src="/home_matcha.jpg"
                            alt="Matcha drink"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                            className="text-white space-y-10"
                        >
                            <h1 className="text-8xl font-bold opacity-80">
                                Omi's <br />Cafe
                            </h1>
                            <div className="space-y-5">
                                <p className="text-2xl">You can find your favourite drink's here</p>
                                <p className="text-lg opacity-80">You can find your favourite drink's here</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
