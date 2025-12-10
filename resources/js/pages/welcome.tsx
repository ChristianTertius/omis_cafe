import AppLayout from "@/layouts/AppLayout";
import HeroSection from "@/components/HeroSection";
import GallerySection from "@/components/GallerySection";
import FindUsSection from "@/components/FindUsSection";
import AboutSection from "@/components/AboutSection";
import { Gallery } from "@/types";
import ContactUsSection from "@/components/contactus";

interface Props {
    galleries: Gallery[]
}

export default function Welcome({ galleries }: Props) {
    return (
        <AppLayout>
            <HeroSection />
            <AboutSection />
            <GallerySection galleries={galleries} />
            <FindUsSection />
            <ContactUsSection />
        </AppLayout>
    );
}
