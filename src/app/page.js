"use client";
import { useEffect, useState } from "react";
import { fetchNews } from "./lib/fetchNews";
import Footer from "./components/Footer";

export default function Home() {
    const [item, setItem] = useState(null);
    const [coins, setCoins] = useState([]);
    useEffect(() => {
        const loadNews = async () => {
            const news = await fetchNews();

            // Găsim primul item care are imagine
            const firstWithImage = news.find(i =>
                i.enclosure?.link ||
                i.thumbnail ||
                i.image ||
                i["media:thumbnail"]?.url ||
                i["media:content"]?.url
            );

            // Dacă nu găsește, iei primul element
            setItem(firstWithImage || news[0] || null);
        };

        const loadCoins = async () => {
            try {
                const res = await fetch("/api/coins");
                const data = await res.json();
                setCoins([
                    {
                        id: "bitcoin",
                        name: "Bitcoin",
                        symbol: "BTC",
                        image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
                        current_price: data.bitcoin.usd,
                        market_cap: data.bitcoin.usd_market_cap,
                        price_change_percentage_24h: data.bitcoin.usd_24h_change,
                    },
                    {
                        id: "ethereum",
                        name: "Ethereum",
                        symbol: "ETH",
                        image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
                        current_price: data.ethereum.usd,
                        market_cap: data.ethereum.usd_market_cap,
                        price_change_percentage_24h: data.ethereum.usd_24h_change,
                    },
                    {
                        id: "solana",
                        name: "Solana",
                        symbol: "SOL",
                        image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
                        current_price: data.solana.usd,
                        market_cap: data.solana.usd_market_cap,
                        price_change_percentage_24h: data.solana.usd_24h_change,
                    },
                    {
                        id: "binancecoin",
                        name: "Binance C`oin",
                        symbol: "BNB",
                        image: "https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png",
                        current_price: data.binancecoin.usd,
                        market_cap: data.binancecoin.usd_market_cap,
                        price_change_percentage_24h: data.binancecoin.usd_24h_change,
                    },
                    {
                        id: "dogecoin",
                        name: "Dogecoin",
                        symbol: "DOGE",
                        image: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png",
                        current_price: data.dogecoin.usd,
                        market_cap: data.dogecoin.usd_market_cap,
                        price_change_percentage_24h: data.dogecoin.usd_24h_change,
                    },
                ]);
            } catch (err) {
                console.error("Eroare la fetch criptomonede:", err);
            }
        };


        loadNews();
        loadCoins();
        const interval = setInterval(loadCoins, 60000);
        return () => clearInterval(interval);
    }, []);

    if (!item) return <p className="text-gray-400">Nu există știri.</p>;

    // Folosim funcția getImageUrl pentru a găsi orice imagine disponibilă
    const getImageUrl = (item) => {
        return (
            item.enclosure?.link ||
            item.thumbnail ||
            item.image ||
            item["media:thumbnail"]?.url ||
            item["media:content"]?.url ||
            "/default-crypto.jpg" // fallback dacă nu are imagine
        );
    };

    const imageUrl = getImageUrl(item);

    return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-6">Crypto Highlight</h1>
            <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-700 group hover:border-yellow-400/50">

                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt={item.title}
                        className="w-full h-64 object-cover"
                    />
                )}

                <div className="p-6">
                    <h2 className="text-lg font-bold text-white mb-3 leading-tight group-hover:text-yellow-400 transition-colors">
                        {item.title}
                    </h2>
                    <p className="text-gray-300 mb-4">
                        {item.description.replace(/<[^>]+>/g, "").substring(0, 200)}...
                    </p>
                    <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-500 hover:text-gray-900 transition-all duration-200 group/btn border border-gray-600 hover:border-yellow-500"
                    >
                        Citește mai mult
                    </a>
                </div>
            </div>
            {/* Trending Coins */}
            <h2 className="text-3xl font-bold text-white mb-6">Top Crypto Coins</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
                {coins.map((coin) => (
                    <div
                        key={coin.id}
                        className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-4 flex flex-col items-center border border-gray-700 hover:border-yellow-400 transition-all duration-300"
                    >
                        <img src={coin.image} alt={coin.name} className="w-16 h-16 mb-2" />
                        <h3 className="text-white font-bold">{coin.symbol.toUpperCase()}</h3>
                        <p className="text-gray-300 text-sm mb-1">{coin.name}</p>
                        <p className="text-yellow-400 font-semibold">${coin.current_price.toLocaleString()}</p>
                        <p
                            className={`text-sm mt-1 ${
                                coin.price_change_percentage_24h >= 0
                                    ? "text-green-400"
                                    : "text-red-400"
                            }`}
                        >
                            {coin.price_change_percentage_24h.toFixed(2)}%
                        </p>
                    </div>
                ))}
            </div>

        </div>
        </div>
    );
}
