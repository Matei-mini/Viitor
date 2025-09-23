"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ButtonHm from "../components/buttonHm";

export default function SignUpPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setErr("");

        const msgs = [];
        if (!username.trim()) msgs.push("Username is required");
        if (!password.trim()) msgs.push("Password is required");
        else if (password.trim().length < 8) msgs.push("Password must be at least 8 characters");

        if (msgs.length) {
            setErr(msgs.join(", "));
            return;
        }

        try {
            setLoading(true);

            const res = await fetch("/Account/api/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: username.trim(), password }),
            });


            let data = null;
            try {
                data = await res.json();
            } catch {
                data = null;
            }

            if (!res.ok || !data?.ok) {
                setErr(data?.error || "Failed to sign up");
                return;
            }

            setUsername("");
            setPassword("");
            router.push("/login");
        } catch {
            setErr("Server error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            <form
                onSubmit={onSubmit}
                className="p-6 w-full max-w-md rounded-2xl shadow-2xl bg-gray-800 space-y-4"
            >
                <h2 className="text-2xl font-bold text-center text-white">Sign Up</h2>

                <div>
                    <label htmlFor="username" className="block text-sm font-semibold text-gray-300">
                        Username
                    </label>
                    <input
                        id="username"
                        placeholder="YourAccountName"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-900 text-white placeholder-gray-400 p-3 focus:ring-2 focus:ring-lime-500 focus:outline-none"
                        autoComplete="username"
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-900 text-white placeholder-gray-400 p-3 focus:ring-2 focus:ring-lime-500 focus:outline-none"
                        autoComplete="new-password"
                    />
                    <p className="text-xs text-gray-400 mt-1">Minim 8 caractere.</p>
                </div>

                {err ? <div className="text-red-500 text-sm">{err}</div> : null}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-lime-600 hover:bg-lime-700 disabled:opacity-60 text-white font-bold py-3 rounded-lg transition duration-200"
                >
                    {loading ? "Creating account..." : "Create account"}
                </button>

                <div className="flex justify-center gap-1 text-sm">
                    <span className="text-gray-300">Ai deja cont?</span>
                    <Link href="/login" className="font-bold text-lime-400 hover:text-lime-300">
                        Log In
                    </Link>
                </div>
            </form>

            <ButtonHm />
        </div>
    );
}
