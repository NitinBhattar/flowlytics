import Image from "next/image";
import Link from "next/link";
import { BarChart3, Package, Plus, Settings } from "lucide-react";
import { UserButton } from "@neondatabase/auth/react";

const Sidebar = ({currentPath = "/dashboard"}: {currentPath: string}) => {

    const navigation = [
        { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
        { name: "Inventory", href: "/inventory", icon: Package },
        { name: "Add Product", href: "/add-product", icon: Plus },
        { name: "Settings", href: "/account/settings", icon: Settings },
    ];

    return (
        <div className="fixed left-0 top-0 bg-[#121212] text-white w-16 md:w-64 min-h-screen p-6 z-10">
            {/* Logo + Name */}
            <div className="mb-8">
                <div className="flex items-center space-x-2 mb-4">
                    <Image src="/icon.png" alt="logo" width={25} height={25} />
                    <span className="hidden md:block text-lg font-semibold">Flowlytics</span>
                </div>
            </div>

            {/* NavBar */}
            <nav className="space-y-3">
                {
                    navigation.map((item, key) => {
                        // Can't directly render react component i.e from lucide-react
                        const IconComp = item.icon;
                        const isActive = currentPath === item.href;

                        return (
                            <Link
                                href={item.href}
                                key={key}
                                className={`flex md:justify-start justify-center items-center md:space-x-3 px-3 py-2 rounded-lg ${isActive ? "bg-white text-black" : "text-white hover:bg-gray-800"}`}
                            >
                                <IconComp className="w-5 h-5 shrink-0"/>
                                <span className="text-sm hidden md:block">{item.name}</span>
                            </Link>
                        )
                    })
                }
            </nav>
            
            {/* Acoount Setting Menu */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-500">
                {/* Desktop */}
                <div className="hidden md:flex items-center justify-center">
                    <UserButton />
                </div>

                {/* Mobile */}
                <div className="flex md:hidden items-center justify-center">
                    <UserButton size="icon" />
                </div>
            </div>

        </div>
    )
}

export default Sidebar;
