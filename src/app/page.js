import {Navbar} from "./components/Navbar.js";
import Footer from "./components/Footer";
export default function Home() {

  return (
      <div className="flex flex-col min-h-screen">
          <main className="flex-grow p-4">
              <h1 className ="mainTitle">Prima parte</h1>
              <p className="paragraph1">
                  Cel mai bun site pentru a fi la curent cu ultimele știri și informații din lumea Binance și a criptomonedelor!
              </p>
          </main>
          <Footer />
      </div>
  );
}
