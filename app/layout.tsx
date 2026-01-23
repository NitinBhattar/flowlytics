import type { Metadata } from "next";
import { authClient } from '@/lib/auth/client'; 
import { NeonAuthUIProvider } from '@neondatabase/auth/react'; 
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"]
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"]
});

export const metadata: Metadata = {
    title: "Flowlytics",
    description: "Flowlytics is a modern inventory management platform for tracking products, monitoring stock levels, and gaining real-time operational insights."
};

const RootLayout = ({children}: Readonly<{children: React.ReactNode;}>) => {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <NeonAuthUIProvider
                    authClient={authClient} 
                    redirectTo="/"
                    social={{providers: ["github", "google"]}}
                >
                    {children}
                </NeonAuthUIProvider>
            </body>
        </html>
    )
};

export default RootLayout;
