import { motion, Variants, useScroll, useTransform } from "framer-motion";
import { Link } from "@inertiajs/react";
import { useRef } from "react";

export default function AboutSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 30
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.div
            ref={containerRef}
            style={{ y }}
            className="min-h-screen relative text-white flex items-center z-10 -mt-[100vh]"
            id="about"
        >
            <motion.div
                className="flex items-center justify-center w-1/2 h-screen bg-[url('/about_matcha.png')] bg-cover p-32"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
            >
                <div className="space-y-5">
                    <motion.h1
                        className="text-8xl font-semibold"
                        variants={itemVariants}
                    >
                        Matcha
                    </motion.h1>
                    <motion.p
                        className="text-lg"
                        variants={itemVariants}
                    >
                        Lorem, Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae delectus officiis quas obcaecati facere blanditiis illum pariatur? Perspiciatis, hic voluptates.ipsum dolor sit amet consectetur adipisicing elit. Mollitia at eos sit minus quod libero fuga commodi ad tenetur repudiandae?
                    </motion.p>
                    <motion.div variants={itemVariants}>
                        <Link
                            href="/drinks"
                            className="bg-[#4d6443] py-2 px-4 text-white inline-block"
                        >
                            Buy Now
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
            <motion.div
                className="bg-pink-500 w-1/2 flex items-center justify-center h-screen bg-[url('/about_coffee.png')] bg-cover p-32"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
            >
                <div className="space-y-5">
                    <motion.h1
                        className="text-8xl font-semibold"
                        variants={itemVariants}
                    >
                        Coffee
                    </motion.h1>
                    <motion.p
                        className="text-lg"
                        variants={itemVariants}
                    >
                        Lorem, Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio aliquid doloremque itaque blanditiis ullam harum aspernatur tenetur ratione, sit quo.ipsum dolor sit amet consectetur adipisicing elit. Mollitia at eos sit minus quod libero fuga commodi ad tenetur repudiandae?
                    </motion.p>
                    <motion.div variants={itemVariants}>
                        <Link
                            href="/drinks"
                            className="bg-[#8b6341] py-2 px-4 text-white inline-block"
                        >
                            Buy Now
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
}
