import React from 'react';
// 移除 react-router-dom，改用锚点链接实现单页滚动

import Home from './pages/Home';
import Game from './pages/Game';
import Leaderboard from './pages/Leaderboard';

const App = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white min-h-screen">
      {/* Enhanced Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-gray-900/80 border-b border-gray-700/50">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a 
            href="#home" 
            className="text-2xl font-bold text-gradient-primary hover:scale-105 transition-transform duration-200"
          >
            ⚡ KarmaCoin
          </a>
          <div className="flex space-x-1">
            {[
              { href: '#home', label: '🏠 Home' },
              { href: '#game', label: '🎮 Game' },
              { href: '#leaderboard', label: '🏆 Leaderboard' }
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-full hover:bg-yellow-400/10 hover:text-yellow-400 transition-all duration-200 text-sm font-medium border border-transparent hover:border-yellow-400/30"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* Content Area */}
      <main className="pt-20">
        <div id="home">
          <Home />
        </div>
        <div id="game">
          <Game />
        </div>
        <div id="leaderboard">
          <Leaderboard />
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-secondary border-t border-gray-700/50 p-6">
        <div className="container mx-auto text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} KarmaCoin - Cyber Buddhism Enlightenment 🧘‍♂️
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Built with ❤️ and blockchain wisdom
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App; 