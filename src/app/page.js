
import Header from "./components/Header";
import Footer from "./components/Footer";
export default function Home() {

  return (
      <div>
          <Header />
          <main className="p-4">
              <h1>Prima parte</h1>
              <p className="text-lg mt-4">
                  Cel mai bun site pentru a fi la curent cu ultimele știri și informații din lumea Binance și a criptomonedelor!
              </p>
          </main>
          <Footer />
      </div>
  );
}
