# Project: Quote Quiver

A simple yet elegant web application that displays random inspirational quotes with a smooth fade-in animation. Built with React, TypeScript, Vite, and styled with Tailwind CSS.

## Features

- ✨ Displays random inspirational quotes with author attribution
- 🔄 One-click generation of new quotes
- 🌟 Smooth fade-in animation for new quotes
- 🏷️ Category filtering for finding quotes by topic
- 🎭 Interactive particle background for visual appeal
- 📱 Fully responsive design for all devices
- 🔒 Type-safe code with TypeScript
- 🎨 Clean, minimal UI with Tailwind CSS styling

## Tech Stack

- **React**: Frontend library for building the user interface
- **TypeScript**: Adds static typing to JavaScript for better developer experience
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for styling

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm (v7 or higher) or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/quote-quiver.git
cd quote-quiver
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Build for Production

To build the application for production, run:
```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
quote-quiver/
├── node_modules/      # Dependencies
├── src/
│   ├── components/    # React components
│   │   ├── Button.tsx              # Reusable button component
│   │   ├── CategoryFilter.tsx      # Quote category filtering component
│   │   ├── ParticleBackground.tsx  # Animated background component
│   │   ├── Quote.tsx               # Individual quote display component
│   │   └── QuoteContainer.tsx      # Container for quotes display
│   ├── data/
│   │   └── quotes.ts  # Quote data with categories
│   ├── services/
│   │   └── QuoteService.ts  # Service for quote operations
│   ├── types/
│   │   └── quote.ts   # TypeScript interfaces and types
│   ├── App.tsx        # Main App component
│   ├── index.css      # Global styles
│   └── main.tsx       # Entry point
├── .gitignore         # Git ignore file
├── eslint.config.js   # ESLint configuration
├── index.html         # HTML template
├── package-lock.json  # Package lock file
├── package.json       # Project dependencies and scripts
├── postcss.config.js  # PostCSS configuration
├── README.md          # Project documentation
├── tailwind.config.js # Tailwind CSS configuration
├── tsconfig.app.json  # TypeScript configuration
├── tsconfig.json      # Main TypeScript configuration
├── tsconfig.node.json # Node TypeScript configuration
└── vite.config.ts     # Vite configuration
```

## Components

The project includes the following key components:

- **Button**: Reusable button component with customizable styling
- **CategoryFilter**: Component for filtering quotes by category
- **ParticleBackground**: Animated background with floating particles
- **Quote**: Component for displaying a single quote with author
- **QuoteContainer**: Main container that handles quote selection and display

## 🚀 Deployment
The project is deployed using the **Vercel Platform**, providing seamless deployment and excellent performance.