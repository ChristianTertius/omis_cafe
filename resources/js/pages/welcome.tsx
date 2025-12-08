import AppLayout from "@/layouts/AppLayout";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Welcome({ galleries }) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Background zoom: scale dari 1 ke 1.3
    const bgScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.3]);
    const scale = useTransform(scrollYProgress, [0, 1], [1.5, 0.5]);

    // Text fade out: opacity dari 1 ke 0
    const textOpacity = useTransform(scrollYProgress, [0.2, 0.5], [1, 0]);

    return (
        <AppLayout>
            <div className="-mt-[102px]">
                <div
                    ref={containerRef}
                    className="h-[200vh] relative"
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
                                {/* Image with fade-in animation */}
                                <motion.img
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 0.95, x: 0 }}
                                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                                    className="scale-105 rounded-md"
                                    src="/home_matcha.jpg"
                                    alt="Matcha drink"
                                />

                                {/* Text with fade-in animation */}
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

                <div className="min-h-screen bg-lime-100 flex items-center justify-center flex-col gap-5" id="about">
                    <motion.div transition={{ duration: 1, delay: 3, ease: "easeOut" }}
                        style={{ scale }} className="origin-top-right">
                        <h1 className="text-[12rem] font-[1000] uppercase">About Us</h1>
                    </motion.div>
                    <p className="text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ducimus hic cum nesciunt minima saepe fuga nobis accusantium, dolore maxime.</p>
                </div>

                <motion.div className="min-h-screen bg-amber-100 flex items-center justify-center flex-col gap-5" id="gallery">
                    {/* muncul dari tengah */}
                    <h1 className="text-3xl uppercase font-extrabold">Gallery</h1>
                    <div className="flex gap-5 flex-wrap justify-center">
                        {galleries.map((gallery) => (
                            <div className="shadow-sm p-3 space-y-3 border border-black/30 rounded-sm">
                                <img
                                    src={gallery.img_url ? `/storage/${gallery.img_url}` : `/default-img.png`}
                                    alt={gallery.name}
                                    className="aspect-square size-72 object-cover border"
                                />
                                <p className="font-bold">{gallery.name}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
                <motion.div className="min-h-screen bg-red-100 flex items-center justify-center flex-col gap-5" id="findus">
                    <h1 className="text-[12rem] uppercase font-extrabold">Find Us</h1>
                </motion.div>
                <motion.div className="min-h-screen bg-blue-100 flex items-center justify-center flex-col gap-5" id="contactus">
                    <h1 className="text-[12rem] uppercase font-extrabold">Contact Us</h1>
                </motion.div>
            </div>
        </AppLayout >
    );
}
