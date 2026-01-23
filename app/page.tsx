import Link from "next/link";
import { redirect } from "next/navigation";
import { authServer } from "@/lib/auth/server";

const Home = async () => {
    // Check if user is logged-in
    const {data}  = await authServer.getSession();
    
    if(data?.user) {
        redirect("/dashboard");
    }

    return (
        <div className="min-h-screen bg-white dark:bg-[#121212] flex items-center justify-center">
            <div className="container mx-auto px-4 py-20">
                <div className="max-w-3xl mx-auto text-center">
                    {/* Glass card */}
                    <div className="dark:bg-black border-8 rounded-2xl p-12 shadow-xl">

                        {/* Badge */}
                        <span className="block mb-6 rounded-full px-4 py-1 text-sm font-semibold dark:text-white">
                            Inventory • Analytics • Control
                        </span>

                        {/* Title */}
                        <h1 className="text-5xl md:text-6xl font-extrabold dark:text-white mb-6 tracking-tight">
                            Flow<span className="text-gray-500 relative">lytics</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-lg md:text-xl dark:text-white mb-10 leading-relaxed">
                            Track inventory, manage stock movements, and visualize insights with a clean, production-ready system built for scale.
                        </p>

                        {/* Sign-In */}
                        <div className="flex justify-center gap-4">
                            <Link
                                href="/auth/sign-in"
                                className="flex items-center justify-center bg-gray-500 text-black px-12 py-3 rounded-xl font-semibold"
                            >
                                <div className="z-10">Sign In</div>
                            </Link>

                            <Link
                                href="/auth/sign-up"
                                className="flex items-center justify-center border-2 border-black dark:bg-white dark:text-black px-12 py-3 rounded-xl font-semibold"
                            >
                                <div className="z-10">Sign Up</div>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
};

export default Home;
