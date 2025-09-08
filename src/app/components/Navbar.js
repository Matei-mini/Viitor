export default function Navbar() {
    return(
        <nav className="bg-blue-600 font-serif text-white p-4 flex justify-between items-center ">
            <h1 className="font-bold font-sans text-x1">CryptoNews</h1>
            <ul className="flex gap-4 ">
                <li>Home</li>
                <li>News</li>
                <li>Bitcoin</li>
                <li>Solana</li>
                <li>Portofolio</li>
                <li>Account</li>
            </ul>
        </nav>
    );
}