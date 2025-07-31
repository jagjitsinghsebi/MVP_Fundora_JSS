import React, { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import Header from './Header';

interface EmailCaptureProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  onEmailSubmit: (email: string) => void;
  onBack: () => void;
}

const EmailCapture: React.FC<EmailCaptureProps> = ({ darkMode, toggleDarkMode, onEmailSubmit, onBack }) => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsValid(value.includes('@') && value.includes('.'));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onEmailSubmit(email);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50 dark:from-gray-900 dark:to-purple-900/20">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} onLogout={onBack} />
      
      <div className="pt-20 flex items-center justify-center min-h-screen px-4">
        <div className="max-w-md w-full">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
            <button
              onClick={onBack}
              className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ← Back
            </button>
            
            {/* Owl Mascot */}
            <div className="mb-6">
              <img 
                src="/Fundora Owl.jpg" 
                alt="Fundora Owl" 
                className="w-24 h-24 mx-auto rounded-full shadow-lg border-4 border-purple-100 dark:border-purple-800 object-cover"
              />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome to Fundora! 🎉
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Let's start your financial journey. We'll keep your email safe and send you personalized insights.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={!isValid}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isValid
                    ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-white hover:from-purple-700 hover:to-orange-600 transform hover:scale-105 shadow-lg'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                <span>Continue to Persona Detection</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
            
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-6">
              We respect your privacy. Your email will only be used for personalized financial guidance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailCapture;