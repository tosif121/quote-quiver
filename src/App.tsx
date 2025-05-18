import { useEffect, useState } from 'react';
import QuoteContainer from './components/QuoteContainer';
import ParticleBackground from './components/ParticleBackground';
import { Quote } from 'lucide-react';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('quoteQuiverTheme');
    if (savedTheme) return savedTheme as 'light' | 'dark';

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [isLoading, setIsLoading] = useState(true);

  // Update page title and apply theme
  useEffect(() => {
    document.title = 'Quote Quiver - Cultivate Your Thoughts';

    // Apply theme to document
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('quoteQuiverTheme', theme);

    // Simulate app loading for smooth intro animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const currentYear = new Date().getFullYear();

  // Determine gradient based on theme
  const bgGradient =
    theme === 'dark'
      ? 'bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900'
      : 'bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-200';

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-700 ${bgGradient}`}>
      <ParticleBackground theme={theme} />

      <div
        className={`relative z-10 w-full py-12 px-4 flex flex-col min-h-screen transition-opacity duration-700 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <header className="mb-8 sm:mb-12 text-center relative">
          <div className="absolute right-4 top-0">
            <ThemeToggle currentTheme={theme} onToggle={toggleTheme} />
          </div>

          <div className="flex items-center justify-center gap-2 mb-2">
            <Quote size={28} className="text-purple-200 animate-pulse" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Quote Quiver</h1>
          </div>
          <p className="text-purple-200 text-lg sm:text-xl max-w-md mx-auto">
            Cultivate thoughts that shine, sprout wisdom with every word.
          </p>
        </header>

        <main className="flex-grow flex items-center justify-center px-4 py-8 transition-transform duration-500 ease-out transform-gpu">
          <QuoteContainer />
        </main>

        <footer className="mt-auto text-center text-white/50 text-sm py-6">
          <p>
            &copy; {currentYear} Quote Quiver. Crafted with <span className="text-pink-500">♥</span> for wisdom seekers.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
