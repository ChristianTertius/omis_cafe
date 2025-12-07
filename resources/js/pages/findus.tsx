import AppLayout from "@/layouts/AppLayout";
import { PinIcon } from "lucide-react";

export default function FindUs() {
    return (
        <AppLayout title="Find Us">
            <div className="p-5 flex gap-3 items-center">
                <div className="space-y-3">
                    <h1 className="text-xl font-bold">Our Location</h1>
                    <img src="/map.jpg" alt="map" />
                    <div className="flex items-center gap-3">
                        <PinIcon />
                        <h1 className="font-medium">Jl. Budi Raya No. 21, Kebon Jeruk, Jakarta Barat 11530</h1>
                    </div>
                    <div>
                        <h1 className="font-medium">Operational Hours</h1>
                        <p>Monday: 08.00-23.00</p>
                        <p>Tuesday: 08.00-23.00</p>
                        <p>Wednesday: 08.00-23.00</p>
                        <p>Thursday: 08.00-23.00</p>
                        <p>Friday: 08.00-23.00</p>
                        <p>Saturday: 08.00-23.00</p>
                        <p>Monday: 08.00-23.00</p>
                    </div>

                </div>

                <div>
                    <img src="/findus.jpg" className="object-cover h-[800px] w-[500px]" alt="outlet" />
                </div>
            </div>
        </AppLayout>
    );
}
