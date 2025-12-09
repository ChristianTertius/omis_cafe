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

    const y = useTransform(scrollYProgress, [0, 1], ['100vh', '0vh'])

    // Text fade out: opacity dari 1 ke 0
    const textOpacity = useTransform(scrollYProgress, [0.2, 0.5], [1, 0]);

    // Gallery section ref
    const gallerySectionRef = useRef(null);
    const { scrollYProgress: galleryProgress } = useScroll({
        target: gallerySectionRef,
        offset: ["start start", "end end"]
    });

    // Generate posisi random untuk setiap image yang tidak tumpang tindih
    const generatePositions = (count) => {
        const positions = [];
        const minDistance = 400; // Jarak minimum antar gambar
        const maxAttempts = 100;

        for (let i = 0; i < count; i++) {
            let attempts = 0;
            let validPosition = false;
            let newPos;

            while (!validPosition && attempts < maxAttempts) {
                // Random posisi dalam range yang lebih besar
                const x = (Math.random() - 0.5) * 1400; // -700 to 700
                const y = (Math.random() - 0.5) * 800; // -400 to 400
                const rotate = (Math.random() - 0.5) * 40; // -20 to 20 degrees

                newPos = { x, y, rotate };

                // Cek jarak dengan posisi yang sudah ada
                validPosition = positions.every(pos => {
                    const distance = Math.sqrt(
                        Math.pow(pos.x - newPos.x, 2) +
                        Math.pow(pos.y - newPos.y, 2)
                    );
                    return distance >= minDistance;
                });

                attempts++;
            }

            // Jika tidak menemukan posisi valid setelah maxAttempts, gunakan fallback
            if (!validPosition) {
                const angle = (i / count) * Math.PI * 2;
                const radius = 500 + (i % 3) * 150;
                newPos = {
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius,
                    rotate: (Math.random() - 0.5) * 40
                };
            }

            positions.push(newPos);
        }

        return positions;
    };

    const positions = generatePositions(galleries.length);

    return (
        <AppLayout>
            {/* section 01 */}
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

                {/* section 02 */}
                <motion.div style={{ y }} className="h-[150vh] bg-[#4d6443] flex items-center justify-center flex-col gap-5" id="about">
                    <h1 className="text-[12rem] font-[1000] uppercase text-center">About Us</h1>
                    <p className="text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ducimus hic cum nesciunt minima saepe fuga nobis accusantium, dolore maxime.</p>
                    <p className="text-xl font-semibold">that's why we are Omi's cafe</p>
                </motion.div>
            </div>

            {/* section 03 - Gallery dengan scatter effect */}
            <div
                ref={gallerySectionRef}
                className="h-[300vh] relative bg-[#8b6341]"
                id="gallery"
            >
                <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                    <motion.h1
                        style={{
                            opacity: useTransform(galleryProgress, [0, 0.15, 0.2, 0.25], [0, 1, 1, 0])
                        }}
                        className="text-3xl uppercase font-extrabold absolute text-white z-10"
                    >
                        Gallery
                    </motion.h1>

                    {/* Images yang menyebar */}
                    <div className="relative w-full h-full flex items-center justify-center">
                        {galleries.map((gallery, index) => {
                            const pos = positions[index];

                            // Transform berdasarkan scroll - mulai dari 0.2 sampai 0.7
                            const x = useTransform(
                                galleryProgress,
                                [0.2, 0.7],
                                [0, pos.x]
                            );

                            const yPos = useTransform(
                                galleryProgress,
                                [0.2, 0.7],
                                [0, pos.y]
                            );

                            const rotate = useTransform(
                                galleryProgress,
                                [0.2, 0.7],
                                [0, pos.rotate]
                            );

                            // Opacity: muncul di awal, tetap visible
                            const opacity = useTransform(
                                galleryProgress,
                                [0.15, 0.25],
                                [0, 1]
                            );

                            return (
                                <motion.div
                                    key={gallery.name}
                                    style={{
                                        x,
                                        y: yPos,
                                        rotate,
                                        opacity
                                    }}
                                    className="absolute shadow-lg p-3 space-y-3 border border-black/30 rounded-sm bg-white"
                                >
                                    <img
                                        src={gallery.img_url ? `/storage/${gallery.img_url}` : `/default-img.png`}
                                        alt={gallery.name}
                                        className="aspect-square size-72 object-cover border"
                                    />
                                    <p className="font-bold">{gallery.name}</p>
                                    <p className="text-sm">{gallery.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* section 04 */}
            <section className="min-h-screen flex items-center justify-center bg-blue-100">section 04</section>

        </AppLayout>
    );
}
