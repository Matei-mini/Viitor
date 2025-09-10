"use client";
import { TrendingUp } from "lucide-react";

export function Logo() {
    return (
        <div className="flex items-center gap-2">
            <div
                className="p-2 rounded-lg flex items-center justify-center"
                style={{
                    background: "linear-gradient(135deg, hsl(48, 100%, 47%), hsl(171, 100%, 42%))",
                    boxShadow: "0 0 40px hsl(48, 100%, 47% / 0.15)",
                }}
            >
                <TrendingUp className="w-6 h-6" style={{ color: "#ffffff" }} />
            </div>

            <h1 className="text-2xl font-bold text-gradient">
                CryptoNews
            </h1>
        </div>
    );
}
