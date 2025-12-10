import { Instagram, Mail, MapPin, PhoneCall, Pin } from "lucide-react";

export default function ContactUsSection() {
    return (
        <div className="flex flex-col space-y-5 justify-center min-h-screen bg-[#8b6341] text-white">

            {/* header */}
            <div className="text-center space-y-5 px-32">
                <h1 className="text-5xl font-semibold">Contact Us</h1>
                <p className="text-xl leading-10">Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam doloremque voluptates minus molestiae illo tempora error! At consectetur reprehenderit voluptatem.ipsum dolor sit amet consectetur adipisicing elit. Laboriosam quibusdam reprehenderit, suscipit dicta nisi commodi nihil qui aliquam accusantium voluptas.</p>
            </div>

            <div className="items-center flex gap-5 justify-center py-32 px-64">

                <div className="space-y-5 text-lg w-1/2">
                    <div className="flex items-center gap-6">
                        <MapPin className="size-8" />
                        <div className="space-y-1">
                            <h1 className="font-semibold text-3xl">Address</h1>
                            <p>Jl. Kebon Jeruk, West Jakarta</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <PhoneCall className="size-8" />
                        <div className="space-y-1">
                            <h1 className="font-semibold text-3xl">Phone Number</h1>
                            <p>0896888888321</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div>
                            <Mail className="size-8" />
                        </div>
                        <div className="space-y-1">
                            <h1 className="font-semibold text-3xl">Email</h1>
                            <p>omis_cafe@gmail.com</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <Instagram className="size-8" />
                        <div className="space-y-1">
                            <h1 className="font-semibold text-3xl">Instagram</h1>
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
                    className="w-1/2"
                />
            </div>
        </div>
    )
}
