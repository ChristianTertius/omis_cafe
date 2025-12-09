import { motion } from "framer-motion";

export default function FindUsSection() {
    return (
        <div className="flex items-center justify-center flex-col min-h-screen bg-[#4d6443] text-white">
            <motion.div
                className="space-y-3"
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-7xl font-semibold">Find Us</h1>
                <h2 className="text-center text-xl">Our Working Hours</h2>
            </motion.div>
            <div className="flex gap-32 my-10">
                {/* From Left */}
                <motion.div
                    className="flex flex-col items-center gap-5 border border-white rounded-md p-8"
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1 className="text-2xl font-semibold">Monday - Friday</h1>
                    <img className="size-52" src="/clock.png" alt="clock" />
                    <p className="font-semibold">12:00 - 19:00</p>
                </motion.div>

                {/* From Bottom */}
                <motion.div
                    className="flex flex-col items-center gap-5 border border-white rounded-md p-8"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <h1 className="text-2xl font-semibold">Saturday</h1>
                    <img className="size-52" src="/clock.png" alt="clock" />
                    <p className="font-semibold">13:00 - 23:00</p>
                </motion.div>

                {/* From Right */}
                <motion.div
                    className="flex flex-col items-center gap-5 border border-black/50 rounded-md p-8"
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <h1 className="text-2xl font-semibold text-black/50">Sunday</h1>
                    <img className="size-52 opacity-50" src="/clock.png" alt="clock" />
                    <p className="font-semibold text-black/50 italic">Day Off</p>
                </motion.div>
            </div>
        </div>
    )
}
