
import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  currentTheme: 'light' | 'dark';
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ currentTheme, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 transform hover:scale-105 group"
      aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
    >
      {currentTheme === 'light' ? (
        <Moon size={20} className="text-purple-200 group-hover:text-white transition-colors" />
      ) : (
        <Sun size={20} className="text-yellow-300 group-hover:text-yellow-200 transition-colors" />
      )}
    </button>
  );
};

export default ThemeToggle;