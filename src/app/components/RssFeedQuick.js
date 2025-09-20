"use client";
import { useEffect, useState } from "react";

export default function RssFeedQuick() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRSSFeed = async () => {
            try {
                setLoading(true);
                setError(null);

                // Folosim RSS2JSON API cu link-ul tău
                const rssUrl = "https://www.coindesk.com/arc/outboundfeeds/rss/?_gl=1*10n4j7v*_up*MQ..*_ga*NDA2NTY3OTI5LjE3NTgzNTQyMzM.*_ga_VM3STRYVN8*czE3NTgzNTQyMzIkbzEkZzAkdDE3NTgzNTQyMzIkajYwJGwwJGg2MzQ1MTQwNzE.";
                const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (data.status !== 'ok') {
                    throw new Error(data.message || 'Eroare la încărcarea RSS feed-ului');
                }

                // RSS2JSON returnează datele în format items
                setItems(data.items || []);

                // Pentru debugging - să vedem ce structură avem
                console.log('RSS Data:', data.items?.[0]);

            } catch (err) {
                console.error('RSS Feed Error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRSSFeed();
    }, []);

    // Funcție pentru formatarea datei
    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('ro-RO', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return dateString;
        }
    };

    // Funcție pentru curățarea și limitarea descrierii
    const cleanDescription = (html) => {
        if (!html) return 'Descriere indisponibilă';

        // Eliminăm tag-urile HTML și limităm la 150 caractere
        const text = html.replace(/<[^>]*>/g, '');
        return text.length > 150 ? text.substring(0, 150) + '...' : text;
    };

    // Funcție pentru găsirea imaginii din diferite surse
    const getImageUrl = (item) => {
        // Verificăm mai multe surse posibile pentru imagini
        return item.enclosure?.link ||
            item.thumbnail ||
            item.image ||
            item["media:thumbnail"]?.url ||
            item["media:content"]?.url ||
            null;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center mt-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
                <span className="ml-3 text-gray-300">Se încarcă știrile…</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-400 text-center mt-10 p-4 bg-red-900/20 rounded-lg border border-red-500/30 max-w-md mx-auto">
                <p className="font-semibold">Eroare la încărcarea știrilor:</p>
                <p className="text-sm mt-2">{error}</p>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="text-gray-400 text-center mt-10">
                Nu s-au găsit știri disponibile.
            </div>
        );
    }

    return (
        <div className="p-6 max-w-6xl mx-auto min-h-screen">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-white mb-2">Ultimele Știri Crypto</h1>
                <p className="text-gray-300">Află ultimele noutăți din lumea criptomonedelor</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item, index) => {
                    const imageUrl = getImageUrl(item);

                    return (
                        <div
                            key={item.guid || index}
                            className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-700 group hover:border-yellow-400/50"
                        >
                            {/* Imagine (dacă există) */}
                            {imageUrl && (
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={imageUrl}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.parentElement.style.display = 'none';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent"></div>
                                </div>
                            )}

                            {/* Header cu data */}
                            <div className="px-6 pt-6 pb-2">
                                <div className="flex justify-between items-start mb-3">
                                    <span className="text-xs font-medium text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">
                                        CRYPTO NEWS
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        {formatDate(item.pubDate)}
                                    </span>
                                </div>
                            </div>

                            {/* Conținut principal */}
                            <div className="px-6 pb-6">
                                <h2 className="text-lg font-bold text-white mb-3 leading-tight group-hover:text-yellow-400 transition-colors">
                                    {item.title}
                                </h2>

                                <p className="text-sm text-gray-300 leading-relaxed mb-4">
                                    {cleanDescription(item.description)}
                                </p>

                                {/* Button */}
                                <div className="flex justify-end">
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-500 hover:text-gray-900 transition-all duration-200 group/btn border border-gray-600 hover:border-yellow-500"
                                    >
                                        <span>Citește mai mult</span>
                                        <svg
                                            className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer info */}
            <div className="text-center mt-12 pt-8 border-t border-gray-700">
                <p className="text-sm text-gray-400">
                    Știri actualizate în timp real • Surse verificate
                </p>
            </div>
        </div>
    );
}