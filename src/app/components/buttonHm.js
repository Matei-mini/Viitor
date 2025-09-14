"use client"

import Link from "next/link";

export default function ButtonHm(){
    return (
        <div className="fixed bottom-0 left-0 w-full text-center p-4 text-white">
            <Link href="/" className="text-lime-800 hover:text-lime-500">Home</Link>
        </div>
    )
}