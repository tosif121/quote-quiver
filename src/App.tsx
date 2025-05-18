import { useEffect } from 'react';
import QuoteContainer from './components/QuoteContainer';
import ParticleBackground from './components/ParticleBackground';
import { Quote } from 'lucide-react';

function App() {
  // Update page title
  useEffect(() => {
    document.title = ' Quote Quiver - Cultivate Your Thoughts';
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-200">
      <ParticleBackground />

      <div className="relative z-10 w-full py-12 px-4 flex flex-col min-h-screen">
        <header className="mb-8 sm:mb-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Quote size={28} className="text-purple-200" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Quote Quiver</h1>
          </div>
          <p className="text-purple-200 text-lg sm:text-xl max-w-md mx-auto">
            Cultivate thoughts that shine,Sprout wisdom with every word.
          </p>
        </header>

        <main className="flex-grow flex items-center justify-center px-4 py-8">
          <QuoteContainer />
        </main>

        <footer className="mt-auto text-center text-white/50 text-sm py-4">
          <p> &copy; {currentYear} Quote Quiver. Designed with ♥ for Quotes.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
