"use client";
import { useEffect } from "react";

export default function AccountPage() {
    useEffect(() => {
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
    }, []);

    return (
        <div className="min-h-screen flex items-center bg-gray-900 justify-center ">
            <form id="form" className="p-6 max-w-sm w-full bg-black shadow-md rounded">
                <label htmlFor="name" className="block mb-1 font-medium">Name</label>
                <input id="name" className="block w-full mb-3 border p-2 rounded" />
                <label htmlFor="password" className="block mb-1 font-medium">Password</label>
                <input id="password" type="password" className="block w-full mb-4 border p-2 rounded" />
                <div id="error" className="text-red-600 mb-3"></div>
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
                    Submit
                </button>
            </form>
        </div>
    );
}
