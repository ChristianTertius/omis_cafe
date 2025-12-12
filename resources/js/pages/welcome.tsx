import AppLayout from "@/layouts/AppLayout";
import HeroSection from "@/components/HeroSection";
import GallerySection from "@/components/GallerySection";
import FindUsSection from "@/components/FindUsSection";
import AboutSection from "@/components/AboutSection";
import { Gallery } from "@/types";
import ContactUsSection from "@/components/ContactFindUsSection";
import ContactFindUsSection from "@/components/ContactFindUsSection";

interface Props {
    galleries: Gallery[]
}

export default function Welcome({ galleries }: Props) {
    return (
        <AppLayout>
            <HeroSection />
            <AboutSection />
            <GallerySection galleries={galleries} />
            {/* <div className="h-3 bg-gradient-to-r from-transparent via-white/30 to-transparent" /> */}
            {/* <FindUsSection /> */}
            <ContactFindUsSection />
        </AppLayout>
    );
}
