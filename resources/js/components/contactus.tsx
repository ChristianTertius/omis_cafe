import { Link } from "@inertiajs/react";
import { motion, Variants } from "framer-motion";
import { Instagram, Mail, MapPin, PhoneCall } from "lucide-react";

export default function ContactUsSection() {
    return (
        <div
            className="min-h-screen relative text-white flex items-center"
            id="about"
        >
            <h1 className="text-5xl absolute left-1/2 -translate-x-1/2 top-20 font-extrabold">Find Us</h1>

            <div
                className="flex items-center flex-col space-y-3 justify-center w-1/2 h-screen bg-[#8b6341] bg-cover p-3"
            >

                <h1 className="text-center text-2xl mb-10">Social Media</h1>
                <div className="flex gap-3 items-center">
                    <div className="space-y-5 text-lg w-1/2">
                        <div className="flex items-center gap-6">
                            <MapPin className="size-8" />
                            <div className="space-y-1">
                                <h1 className="font-semibold text-xl">Address</h1>
                                <p>Jl. Kebon Jeruk, West Jakarta</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <PhoneCall className="size-8" />
                            <div className="space-y-1">
                                <h1 className="font-semibold text-xl">Phone Number</h1>
                                <p>0896888888321</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div>
                                <Mail className="size-8" />
                            </div>
                            <div className="space-y-1">
                                <h1 className="font-semibold text-xl">Email</h1>
                                <p>omis_cafe@gmail.com</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <Instagram className="size-8" />
                            <div className="space-y-1">
                                <h1 className="font-semibold text-xl">Instagram</h1>
                                <p>@omis_cafe</p>
                            </div>
                        </div>
                    </div>

                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.666!2d106.8456!3d-6.2088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTInMzEuNyJTIDEwNsKwNTAnNDQuMiJF!5e0!3m2!1sen!2sid!4v1234567890"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        className="w-full"
                    />
                </div>

            </div>

            <div
                className="w-1/2 flex items-center justify-center flex-col h-screen bg-[#4d6443]  bg-cover p-3"
            >
                <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-center text-2xl">Our Working Hours</h2>
                </motion.div>
                <div className="flex gap-5 my-10">
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
                        <p className="font-semibold text-xl">12:00 - 19:00</p>
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
                        <p className="font-semibold text-xl">13:00 - 23:00</p>
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
                        <p className="font-semibold text-black/50 italic text-xl">Day Off</p>
                    </motion.div>
                </div>

            </div>
        </div>
    );
}
