import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { fontWeight } from "html2canvas/dist/types/css/property-descriptors/font-weight";

const quicksand = Quicksand({
    variable: "--font-quicksand",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "Daily Routine ✨",
    description: "Your cute kawaii daily routine tracker",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${quicksand.variable} font-sans antialiased min-h-screen themed-background`}
            >
                <ThemeProvider>
                    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/30 border-b border-white/50 shadow-sm">
                        <div className="container mx-auto px-4 py-4">
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <h1 className="text-3xl font-bold text-purple-600">
                                    ✨ Daily Routine
                                    <span className="text-sm font-normal">
                                        By SpiderBrain
                                    </span>
                                </h1>

                                <ThemeSwitcher />
                            </div>
                        </div>
                    </nav>
                    <main className="container mx-auto px-4 py-8">
                        {children}
                    </main>
                </ThemeProvider>
            </body>
        </html>
    );
}
