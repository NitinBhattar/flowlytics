import Link from "next/link";
import { AuthView } from "@neondatabase/auth/react";

const AuthPage = async ({ params }: { params: Promise<{ path: string }> }) => {
    const { path } = await params;

    return (
        <div className="min-h-screen flex items-center justify-center dark:bg-[#121212]">
            <div className="max-w-md w-full space-y-8">
                <AuthView path={path}/>
                {
                    path !== "sign-out" ?
                    (
                        <Link href="/" className= "dark:text-white underline">
                            Go Back Home
                        </Link>
                    ) :
                    (
                        <></>
                    )
                }
            </div>
        </div>
    )
};

export default AuthPage;
