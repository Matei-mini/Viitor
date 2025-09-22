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

        const [rows] = await db.execute(
            "SELECT id, username, password_hash FROM users WHERE username = ? LIMIT 1",
            [u]
        );
        const user = rows?.[0];
        if (!user) return Response.json({ ok: false, error: "invalid credentials" }, { status: 401 });

        const ok = await bcrypt.compare(p, user.password_hash);
        if (!ok) return Response.json({ ok: false, error: "invalid credentials" }, { status: 401 });

        return Response.json({ ok: true, user: { id: user.id, username: user.username } });
    } catch (err) {
        console.error("LOGIN_ERROR:", err);
        return Response.json(
            { ok: false, error: process.env.NODE_ENV === "development" ? err.message : "server error" },
            { status: 500 }
        );
    }
}
