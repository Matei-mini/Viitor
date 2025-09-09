"use client";
import { useEffect } from "react";

export default function AccountPage() {
    useEffect(() => {
        const form = document.getElementById("form");
        const name = document.getElementById("name");
        const password = document.getElementById("password");
        const errorEl = document.getElementById("error");
        if (!form) return;

        const onSubmit = (e) => {
            const msgs = [];
            if (!name.value.trim()) msgs.push("Name is required");
            if (!password.value.trim()) msgs.push("Password is required");
            if (msgs.length) {
                e.preventDefault();
                errorEl.textContent = msgs.join(", ");
            } else {
                errorEl.textContent = "";
            }
        };

        form.addEventListener("submit", onSubmit);
        return () => form.removeEventListener("submit", onSubmit);
    }, []);

    return (
        <form id="form" className="p-6 max-w-sm mx-auto">
            <div id="error" className="text-red-600 mb-3"></div>
            <label htmlFor="name">Name</label>
            <input id="name" className="block w-full mb-3 border p-2" />
            <label htmlFor="password">Password</label>
            <input id="password" type="password" className="block w-full mb-4 border p-2" />
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Submit</button>
        </form>
    );
}
