import Sidebar from "@/components/sidebar";
import { AccountView } from "@neondatabase/auth/react";
import { accountViewPaths } from "@neondatabase/auth/react/ui/server";

const generateStaticParams = () => {
    return Object.values(accountViewPaths).map((path) => ({ path }));
}

const AccountPage = async ({ params }: { params: Promise<{ path: string }> }) => {
    const { path } = await params;

    return (
        <div className="min-h-screen">
            {/* Sidebar */}
            <Sidebar currentPath="/account/settings" />

            {/* Page */}
            <div className="ml-16 md:ml-64 p-6 md:p-8">
                {/* Heading */}
                <div className="mb-8">
                    <div className="flex flex-wrap items-center justify-between">
                        <div className= "">
                            <h1 className="text-2xl font-semibold dark:text-white">
                                Settings
                            </h1>

                            <p className="text-sm dark:text-white">
                                Manage your account settings and preferences.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="w-full p-4 md:p-6 dark:text-white">
                    <AccountView path={path} />
                </div>
            </div>
        </div>
    )
};

export default AccountPage;
export {generateStaticParams};
