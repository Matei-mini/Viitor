"use client"
import { useEffect } from "react";
import Link from "next/link";

export default function LogIn(){
   /* useEffect(() => {
        const form = document.getElementById("form");
        const name = document.getElementById("name");
        const password = document.getElementById("password");
        const errorEl = document.getElementById("error");
        if (!form) return;

        const onSubmit = async (e) => {
            const msgs = [];
            if (!name.value.trim()) msgs.push("Name is required");
            if (!password.value.trim()) msgs.push("Password is required");
            if (msgs.length) {
                e.preventDefault();
                errorEl.textContent = msgs.join(", ");
            } else {
                e.preventDefault();
                errorEl.textContent = "";
                try {
                    const res = await fetch("/Account/api/save", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ name: name.value, password: password.value }),
                    });
                    if (!res.ok) throw new Error("Request failed");
                    alert("Saved successfully! ✅");
                    form.reset();
                } catch (err) {
                    errorEl.textContent = "Failed to save. Check server logs.";
                }
            }
        };

        form.addEventListener("submit", onSubmit);
        return () => form.removeEventListener("submit", onSubmit);
    }, []);*/

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            <form
                id="form"
                className="p-6 w-full max-w-md rounded-2xl shadow-2xl bg-gray-800 space-y-4"
            >
                <h2 className="text-2xl font-bold text-center text-white">Log In</h2>

                <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-300">
                        Name
                    </label>
                    <input
                        id="name"
                        placeholder="YourAccountName"
                        className="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-900 text-white placeholder-gray-400 p-3 focus:ring-2 focus:ring-lime-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-300">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="YourAccountPassword"
                        className="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-900 text-white placeholder-gray-400 p-3 focus:ring-2 focus:ring-lime-500 focus:outline-none"
                    />
                </div>

                <div id="error" className="text-red-500 text-sm"></div>

                <button
                    type="submit"
                    className="w-full bg-lime-600 hover:bg-lime-700 text-white font-bold py-3 rounded-lg transition duration-200"
                >
                    Submit
                </button>
                <div className="flex justify-center">
                    <Link href="/Account" className="font-bold inline-block text-lime-800 hover:text-lime-500">Sing Up</Link>
                </div>
            </form>
        </div>
    )
}