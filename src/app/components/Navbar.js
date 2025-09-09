"use client";
import { useState } from "react";
import Link from "next/link";

export function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const menuItems = [
        { href: "/Home", label: "Home" },
        { href: "/News", label: "News" },
        { href: "/Account", label: "Account" },
    ];

    return (
        <nav className="bg-blue-600 font-serif text-white p-4 flex justify-between items-center relative">
            {/* Logo */}
            <h1 className="font-bold font-sans text-xl">CryptoNews</h1>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center gap-4">
            <ul className="flex gap-4">
                {menuItems.map((item) => (
                    <li key={item.href}>
                        <Link href={item.href}>{item.label}</Link>
                    </li>
                ))}
            </ul>

            <input
                type="text"
                placeholder="Search crypto news..."
                className="px-2 py-1 rounded text-black focus:outline-neutral-600"
                />
            </div>
            {/* Hamburger icon for mobile */}
            <div className="flex md:hidden items-center gap-2 flex-1">
                <input
                    type="text"
                    placeholder="Search crypto news..."
                    className="px-2 py-1 rounded text-black focus:outline-cyan-200 flex-1 w-1/6"
                />
                <button
                className="text-2xl"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? "✕" : "☰"}
            </button>
            </div>

            {/* Mobile menu dropdown */}
            {menuOpen &&(
                <div className="absolute top-16 right-4 bg-blue-700 p-4 rounded-md flex flex-col gap-3 md:hidden w-12">
                    {menuItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                        {item.label}
                    </Link>
                ))}
                </div>
                )}
        </nav>
    );
}
