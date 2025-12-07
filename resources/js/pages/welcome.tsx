import AppLayout from "@/layouts/AppLayout";

export default function Welcome() {
    return (
        <AppLayout title="Welcome">
            <div className="min-h-screen bg-pink-100"></div>
            <div className="min-h-screen bg-orange-100"></div>
            <div className="min-h-screen bg-blue-100"></div>
        </AppLayout>
    );
}
