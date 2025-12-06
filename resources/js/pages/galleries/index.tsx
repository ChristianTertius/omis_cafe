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
            <div className="grid gap-5 grid-cols-4">
                {galleries.map((gallery) => (
                    <div
                        key={gallery.id}
                        className="rounded-xl border p-4 dark:border-neutral-700 max-w-2xl"
                    >
                        <img
                            src={`/storage/${gallery.img_url}`}
                            alt={gallery.name}
                            className="w-full h-48 object-cover"
                        />
                        <h2 className="font-semibold text-lg">{gallery.name}</h2>
                        <p className="text-sm">{gallery.description}</p>

                        <img src={`${gallery.img_url}`} alt={`${gallery.name}`} />

                    </div>
                ))}
            </div>
        </AppLayout>
    );
}
