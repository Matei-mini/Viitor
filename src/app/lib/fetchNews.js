// lib/fetchNews.js
export async function fetchNews() {
    const feeds = [
        "https://www.coindesk.com/arc/outboundfeeds/rss/",
        "https://cointelegraph.com/rss"
    ];

    try {
        const results = await Promise.all(
            feeds.map(rssUrl =>
                fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`)
                    .then(res => res.json())
            )
        );

        const allItems = results.flatMap(r => r.items || []);
        allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

        return allItems; // lista completă
    } catch (err) {
        console.error("Eroare la fetch:", err);
        return [];
    }
}
