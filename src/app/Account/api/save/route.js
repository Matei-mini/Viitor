import { db } from "@/db_lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { username, password } = await req.json();

        const u = (username || "").trim();
        const p = (password || "").trim();

        if (!u || !p) {
            return Response.json({ ok: false, error: "username and password are required" }, { status: 400 });
        }
        if (p.length < 8) {
            return Response.json({ ok: false, error: "password must be at least 8 characters" }, { status: 400 });
        }

        const hash = await bcrypt.hash(p, 12);

        const [result] = await db.execute(
            "INSERT INTO users (username, password_hash) VALUES (?, ?)",
            [u, hash]
        );

        return Response.json({ ok: true, userId: result.insertId }, { status: 201 });
    } catch (err) {
        console.error("SIGNUP_ERROR:", err);
        if (err?.code === "ER_DUP_ENTRY") {
            return Response.json({ ok: false, error: "username already exists" }, { status: 409 });
        }
        return Response.json(
            { ok: false, error: process.env.NODE_ENV === "development" ? err.message : "server error" },
            { status: 500 }
        );
    }
}
