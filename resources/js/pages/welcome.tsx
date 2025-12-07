import AppLayout from "@/layouts/AppLayout";

export default function Welcome() {
    return (
        <AppLayout title="Welcome">
            <h1 className="text-xl">THIS IS OMI'S CAFEE || HOME PAGE</h1>
            <div className="min-h-screen bg-pink-100"></div>
            <div className="min-h-screen bg-orange-100"></div>
            <div className="min-h-screen bg-blue-100"></div>
        </AppLayout>
    );
}
