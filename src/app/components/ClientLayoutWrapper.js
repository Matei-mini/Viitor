"use client";
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";

export default function ClientLayoutWrapper({ children }) {
    const pathname = usePathname();
    const showNavbar = !pathname.startsWith("/account");

    return (
        <>
            {showNavbar && <Navbar />}
            {children}
        </>
    );
}