"use client";
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";

export default function ClientLayoutWrapper({ children }) {
    const pathname = usePathname();
    const showNavbar = !pathname.startsWith("/account") && !pathname.startsWith("/Account");

    console.log("Current pathname:", pathname);
    console.log("Show navbar:", showNavbar);

    return (
        <>
            {showNavbar && <Navbar />}
            {children}
        </>
    );
}