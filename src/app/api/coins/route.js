export async function GET() {;
    try {
        const ids = "bitcoin,ethereum,solana,binancecoin,dogecoin";
        const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin,dogecoin&vs_currencies=usd&include_market_cap=true&include_24hr_change=true';
        const res = await fetch(url);
        const data = await res.json();

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {"Content-Type": "aplication/json"},
        });
    } catch (err) {
        return new Response(JSON.stringify({error: err.message}), {
            status: 500,
        });
    }
}