import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function GallerySection({ galleries }) {
    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Posisi akhir untuk setiap image (menyebar ke berbagai arah)
    const positions = [
        { x: -400, y: -300, rotate: -15 },
        { x: 400, y: -250, rotate: 12 },
        { x: -350, y: 100, rotate: 8 },
        { x: 380, y: 150, rotate: -10 },
        { x: -300, y: -100, rotate: 18 },
        { x: 320, y: 50, rotate: -12 },
        { x: -420, y: 200, rotate: 15 },
        { x: 450, y: -100, rotate: -8 },
    ];

    return (
        <div
            ref={sectionRef}
            className="h-[200vh] relative bg-amber-100"
            id="gallery"
        >
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                {/* Title tetap di tengah */}
                <motion.h1
                    style={{
                        opacity: useTransform(scrollYProgress, [0.3, 0.5], [1, 0])
                    }}
                    className="text-3xl uppercase font-extrabold absolute z-10"
                >
                    Gallery
                </motion.h1>

                {/* Images yang menyebar */}
                <div className="relative w-full h-full flex items-center justify-center">
                    {galleries.map((gallery, index) => {
                        const pos = positions[index % positions.length];

                        // Transform berdasarkan scroll
                        const x = useTransform(
                            scrollYProgress,
                            [0.2, 0.8],
                            [0, pos.x]
                        );

                        const y = useTransform(
                            scrollYProgress,
                            [0.2, 0.8],
                            [0, pos.y]
                        );

                        const rotate = useTransform(
                            scrollYProgress,
                            [0.2, 0.8],
                            [0, pos.rotate]
                        );

                        const opacity = useTransform(
                            scrollYProgress,
                            [0.1, 0.3, 0.8, 0.9],
                            [0, 1, 1, 0]
                        );

                        return (
                            <motion.div
                                key={gallery.name}
                                style={{
                                    x,
                                    y,
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
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

// Example usage with dummy data
const dummyGalleries = [
    { name: "Matcha Latte", img_url: null },
    { name: "Espresso", img_url: null },
    { name: "Cappuccino", img_url: null },
    { name: "Americano", img_url: null },
    { name: "Latte Art", img_url: null },
    { name: "Cold Brew", img_url: null },
];

export function Demo() {
    return (
        <div>
            <section className="h-screen flex items-center justify-center bg-lime-100">
                <h1 className="text-4xl font-bold">Scroll Down</h1>
            </section>

            <GallerySection galleries={dummyGalleries} />

            <section className="min-h-screen flex items-center justify-center bg-blue-100">
                <h1 className="text-4xl font-bold">Section 04</h1>
            </section>
        </div>
    );
}
