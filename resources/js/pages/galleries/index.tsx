import AppLayout from "@/layouts/AppLayout";
import { Gallery } from "@/types";

interface Props {
    galleries: Gallery[];
}

export default function Galleries({ galleries }: Props) {
    return (
        <AppLayout title="Gallery">
            <div className="my-3 text-center">
                <h1 className="text-xl font-semibold">Our Gallery</h1>
            </div>
            <div className="grid grid-cols-4 grid-rows- masonry gap-4 ">
                {galleries.map((gallery, i) => (
                    <div
                        key={gallery.id}
                        className={`
                overflow-hidden rounded-xl shadow-sm
                ${i % 5 === 0 ? 'col-span-2 row-span-2' : ''}
                ${i % 3 === 0 ? 'col-span-1 row-span-2' : ''}
                ${i % 7 === 0 ? 'row-span-2' : ''}
            `}
                    >
                        <img
                            src={`/storage/${gallery.img_url}`}
                            alt={gallery.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}
