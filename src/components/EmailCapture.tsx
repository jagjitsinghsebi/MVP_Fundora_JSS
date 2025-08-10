import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import Header from './Header';

interface EmailCaptureProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  onEmailSubmit: (email: string) => void;
  onBack: () => void;
}

const EmailCapture: React.FC<EmailCaptureProps> = ({ darkMode, toggleDarkMode, onEmailSubmit, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailValid(value.includes('@') && value.includes('.'));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setIsPasswordValid(value.length >= 6);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEmailValid && isPasswordValid) {
      // For now, just proceed with email (you can add actual authentication later)
      onEmailSubmit(email);
    }
  };

  const handleContinueToPersona = () => {
    if (email) {
      onEmailSubmit(email);
    }
  };

  const isFormValid = isEmailValid && isPasswordValid;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50 dark:from-gray-900 dark:to-purple-900/20">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} onLogout={onBack} />
      
      <div className="pt-20 flex items-center justify-center min-h-screen px-4">
        <div className="max-w-md w-full">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <button
              onClick={onBack}
              className="mb-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              ← Back
            </button>
            
            {/* Owl Mascot */}
            <div className="text-center mb-8">
              <img 
                src="/Fundora Owl.jpg" 
                alt="Fundora Owl" 
                className="w-24 h-24 mx-auto rounded-full shadow-lg border-4 border-purple-100 dark:border-purple-800 object-cover mb-6"
              />
              
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Login
              </h1>
              
              <p className="text-gray-600 dark:text-gray-300">
                Welcome to Fundora! Please sign in to continue your financial journey.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-lg"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-lg"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              {/* Login Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                    isFormValid
                      ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-white hover:from-purple-700 hover:to-orange-600 transform hover:scale-105 shadow-lg'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <span>Login</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* Sign Up Section */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Don't have an account?
                </p>
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-purple-600 dark:text-purple-400 font-semibold hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            </div>

            {/* Continue to Persona Detection */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  Or skip login for now
          {/* Continue to Persona Detection - Only show after form is completed */}
          {isFormValid && (
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  Or continue without creating account
                </p>
                <button
                  onClick={handleContinueToPersona}
                  className="px-6 py-2 rounded-lg font-medium transition-all bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Continue to Persona Detection
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailCapture;