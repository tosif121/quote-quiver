import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  icon,
  isLoading = false,
}) => {
  // Base classes
  let baseClasses = "font-medium rounded-full transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  // Size classes
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-7 py-3 text-lg"
  };
  
  // Variant classes
  const variantClasses = {
    primary: "bg-purple-700 hover:bg-purple-800 text-white focus:ring-purple-500",
    secondary: "bg-teal-600 hover:bg-teal-700 text-white focus:ring-teal-400",
    outline: "bg-transparent border-2 border-purple-600 text-purple-600 hover:bg-purple-50 focus:ring-purple-500"
  };
  
  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  return (
    <button
      onClick={onClick}
      className={classes}
      disabled={isLoading}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : icon ? (
        <span>{icon}</span>
      ) : null}
      {children}
    </button>
  );
};

export default Button;