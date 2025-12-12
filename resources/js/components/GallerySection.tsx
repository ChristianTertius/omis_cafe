import { useScroll, useTransform, motion, useInView } from "framer-motion";
import { useRef } from "react";

// function calculate posisition
const generatePositions = (count) => {
    const positions = [];
    const minDistance = 400;
    const maxAttempts = 100;

    for (let i = 0; i < count; i++) {
        let attempts = 0;
        let validPosition = false;
        let newPos;

        while (!validPosition && attempts < maxAttempts) {
            const x = (Math.random() - 0.5) * 1400;
            const y = (Math.random() - 0.5) * 800;
            const rotate = (Math.random() - 0.5) * 40;

            newPos = { x, y, rotate };

            validPosition = positions.every(pos => {
                const distance = Math.sqrt(
                    Math.pow(pos.x - newPos.x, 2) +
                    Math.pow(pos.y - newPos.y, 2)
                );
                return distance >= minDistance;
            });

            attempts++;
        }

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

export default function GallerySection({ galleries }) {
    const gallerySectionRef = useRef(null);
    const { scrollYProgress: galleryProgress } = useScroll({
        target: gallerySectionRef,
        offset: ["start start", "end end"]
    });

    const isInView = useInView(gallerySectionRef, {
        once: true,
        amount: 0.1,
        margin: "0px 0px -100px 0px"
    });

    const titleOpacity = useTransform(
        galleryProgress,
        [0, 0.15, 0.2, 0.25],
        [1, 1, 1, 0]
    );

    const positions = generatePositions(galleries.length);

    return (
        <div
            ref={gallerySectionRef}
            className="h-[300vh] relative bg-[#8b6341]"
            id="gallery"
        >
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{
                        opacity: isInView ? titleOpacity : 0
                    }}
                    className="text-3xl uppercase font-extrabold absolute text-white z-10"
                >
                    Gallery
                </motion.h1>

                <div className="relative w-full h-full flex items-center justify-center">
                    {galleries.map((gallery, index) => {
                        const pos = positions[index];

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
    );
}
