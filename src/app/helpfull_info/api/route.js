export async function GET() {
    // server-side fetch → no CORS issues
    const url = "https://storage.googleapis.com/hopefull_info/data.txt";
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return new Response("Upstream error", { status: 502 });

    const text = await res.text();
    return new Response(text, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
}
