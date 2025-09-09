import Link from "next/link";

export default function Navbar() {
    return(
        <nav className="bg-blue-600 font-serif text-white p-4 flex justify-between items-center ">
            <h1 className="font-bold font-sans text-x1">CryptoNews</h1>
            <ul className="flex gap-4 ">
                <li>
                    <Link href="/Home">Home</Link>
                </li>
                <li>
                    <Link href="/News">News</Link>
                </li>
                <li>
                    <Link href="/Account" >Account</Link>
                </li>
            </ul>
        </nav>
    );
}