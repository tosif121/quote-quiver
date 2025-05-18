import React, { useState } from 'react';
import { Quote } from '../types/quote';
import { Copy, Share2 } from 'lucide-react';

interface QuoteProps {
  quote: Quote;
  className?: string;
}

const QuoteDisplay: React.FC<QuoteProps> = ({ quote, className = '' }) => {
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };
  
  const shareQuote = async () => {
    const shareData = {
      title: 'Inspiring Quote',
      text: `"${quote.text}" - ${quote.author}`,
      url: window.location.href,
    };
    
    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing: ', err);
      }
    } else {
      // Fallback for browsers that don't support sharing
      copyToClipboard();
    }
  };

  return (
    <div className={`relative p-8 sm:p-10 rounded-2xl bg-white/10 backdrop-blur-lg text-white shadow-xl border border-white/20 w-full max-w-2xl mx-auto ${className}`}>
      <div className="absolute -top-5 -left-5 text-8xl text-purple-400 opacity-50 font-serif">"</div>
      
      <div className="relative">
        <blockquote className="mb-5 font-serif text-xl sm:text-2xl leading-relaxed italic">
          {quote.text}
        </blockquote>
        
        <footer className="text-right">
          <cite className="text-lg sm:text-xl not-italic text-purple-200">— {quote.author}</cite>
        </footer>
      </div>
      
      <div className="absolute bottom-0.4 right-4 flex space-x-3">
        <button 
          onClick={copyToClipboard} 
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
          aria-label="Copy quote"
          title={copySuccess ? "Copied!" : "Copy quote"}
        >
          <Copy size={18} className="text-white/80" />
          {copySuccess && (
            <span className="absolute -top-8 right-0 text-xs bg-black/80 text-white px-2 py-1 rounded">
              Copied!
            </span>
          )}
        </button>
        
        <button 
          onClick={shareQuote} 
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
          aria-label="Share quote"
          title="Share quote"
        >
          <Share2 size={18} className="text-white/80" />
        </button>
      </div>
    </div>
  );
};

export default QuoteDisplay;