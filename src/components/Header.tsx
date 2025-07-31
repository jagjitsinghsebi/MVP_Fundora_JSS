import React from 'react';
import { Moon, Sun, Mic } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  showVoiceButton?: boolean;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode, showVoiceButton = false, onLogout }) => {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <img 
              src="/Fundora Owl.jpg" 
              alt="Fundora Owl" 
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">Fundora</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              How It Works
            </a>
            <a href="#testimonials" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Reviews
            </a>
            <a href="#faq" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              FAQ
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            {onLogout && (
              <button 
                onClick={onLogout}
                className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Logout
              </button>
            )}
            
            {showVoiceButton && <button 
              onClick={() => {
                if (window.startListening) {
                  window.startListening();
                } else {
                  alert('Voice assistant is loading... Please try again in a moment.');
                }
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Launch Fundora
            </button>}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;