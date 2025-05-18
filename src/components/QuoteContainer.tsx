import React, { useState, useEffect } from 'react';
import { Quote as QuoteType, QuoteCategory } from '../types/quote';
import { QuoteService } from '../services/QuoteService';
import Quote from './Quote';
import Button from './Button';
import CategoryFilter from './CategoryFilter';
import { RefreshCw } from 'lucide-react';

const QuoteContainer: React.FC = () => {
  const [quote, setQuote] = useState<QuoteType | null>(null);
  const [fadeIn, setFadeIn] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<QuoteCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<QuoteCategory>('all');

  useEffect(() => {
    // Load categories
    const availableCategories = QuoteService.getCategories();
    setCategories(availableCategories);
    
    // Load initial quote
    getNewQuote();
  }, []);

  const getNewQuote = () => {
    setIsLoading(true);
    setFadeIn(false);
    
    // Simulate network delay for a smoother experience
    setTimeout(() => {
      const newQuote = QuoteService.getRandomQuote(selectedCategory);
      setQuote(newQuote);
      setFadeIn(true);
      setIsLoading(false);
    }, 300);
  };

  const handleCategoryChange = (category: QuoteCategory) => {
    setSelectedCategory(category);
    // Get a new quote from the selected category
    setFadeIn(false);
    setTimeout(() => {
      const newQuote = QuoteService.getRandomQuote(category);
      setQuote(newQuote);
      setFadeIn(true);
    }, 300);
  };

  return (
    <div className="flex flex-col items-center">
      <CategoryFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategoryChange}
      />
      
      <div 
        className={`transform transition-all duration-500 ease-in-out ${
          fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {quote && <Quote quote={quote} />}
      </div>

      <div className="mt-8">
        <Button 
          onClick={getNewQuote}
          variant="primary"
          size="lg"
          isLoading={isLoading}
          icon={<RefreshCw size={20} />}
          className="shadow-lg hover:shadow-xl"
        >
          New Quote
        </Button>
      </div>
    </div>
  );
};

export default QuoteContainer;