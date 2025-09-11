"use client";
import { useEffect, useState } from "react";

export default function RssFeedQuick() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    useEffect(() => {
        fetch(
            "https://api.rss2json.com/v1/api.json?rss_url=https://rss.app/feeds/ttVWpxevQpa7ioLZ.xml"
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.items) setItems(data.items);
                else setErr("Nu s-au găsit articole.");
            })
            .catch((e) => setErr(e.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading)
        return <div className="text-gray-500 text-center mt-10">Se încarcă știrile…</div>;
    if (err)
        return (
            <div className="text-red-500 text-center mt-10">
                Eroare: {err}
            </div>
        );

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-8 text-center">Ultimele Știri</h1>

            {/* Grid de carduri */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((it, i) => (
                    <div
                        key={i}
                        className="p-4 bg-gray-700 rounded-lg shadow flex flex-col justify-between hover:shadow-2xl transition-shadow group"
                    >
                        {/* Titlu */}
                        <h2 className="text-lg font-semibold text-white group-hover:text-yellow-400 transition-colors">
                            {it.title}
                        </h2>

                        {/* Data */}
                        <p className="text-sm text-gray-300 mt-1">{it.pubDate}</p>

                        {/* Descriere */}
                        <p
                            className="mt-2 text-gray-200 flex-1"
                            dangerouslySetInnerHTML={{ __html: it.description }}
                        ></p>

                        {/* Buton centrat */}
                        <div className="mt-4 flex justify-center">
                            <a
                                href={it.link}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-block bg-gray-950 text-white px-4 py-2 rounded
                           group-hover:bg-yellow-300 group-hover:text-white transition-colors"
                            >
                                Read Full Article 🔗
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
