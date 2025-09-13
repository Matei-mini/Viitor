"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { usePathname } from "next/navigation";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }) {
    const pathname = usePathname(); // obținem ruta curentă
    const showNavbar = !pathname.startsWith("/account"); // Navbar nu apare pe /account

    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {showNavbar && <Navbar />}
        {children}
        </body>
        </html>
    );
}
