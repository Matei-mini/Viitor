import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await fetch(
            "https://api.rss2json.com/v1/api.json?rss_url=https://rss.app/feeds/t2mcVZieWcVjRbwY.xml"
        );
        const data = await res.json();

        if (!data.items) {
            return NextResponse.json({ error: "Nu s-au găsit articole." }, { status: 404 });
        }

        return NextResponse.json(data.items);
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
