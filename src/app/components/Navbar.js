"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import CompStyle from "./SearchBar";
export function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname(); // ruta curentă

    const menuItems = [
        { href: "/", label: "Home" },
        { href: "/News", label: "News" },
        { href: "/Account", label: "Account" },
    ];

    return (
        <nav className="bg-gray-700 font-serif text-white p-4 flex justify-between items-center relative">
            <Logo />

            {/* Desktop menu */}
            <div className="hidden md:flex items-center gap-4">
                <ul className="flex gap-4">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href; // verificăm dacă link-ul este pagina curentă
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`
                    px-2 py-1 rounded transition-colors duration-200
                    ${isActive ? "bg-cyan-500 text-white" : "hover:bg-yellow-400 hover:text-black"}
                  `}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <CompStyle />
            </div>

            {/* Mobile menu */}
            <div className="flex md:hidden items-center gap-2 flex-1">
                <CompStyle />
                <button
                    className="text-2xl"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? "✕" : "☰"}
                </button>
            </div>

            {/* Mobile menu dropdown */}
            {menuOpen && (
                <div className="absolute top-16 right-4 bg-gray-700 p-4 rounded-md flex flex-col gap-3 md:hidden w-40">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                  px-2 py-1 rounded transition-colors duration-200
                  ${isActive ? "bg-cyan-500 text-white" : "hover:bg-yellow-400 hover:text-black"}
                `}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            )}
        </nav>
    );
}
