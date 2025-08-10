import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import Header from './Header';
import { authHelpers } from '../lib/supabase';

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
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
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
    if (isEmailValid && isPasswordValid && !isLoading) {
      handleAuth();
    }
  };

  const handleAuth = async () => {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      if (isLogin) {
        // Sign in existing user
        const { data, error } = await authHelpers.signIn(email, password);
        
        if (error) {
          setErrorMessage(error.message);
        } else if (data.user) {
          setSuccessMessage('Login successful!');
          // Store user email and proceed
          onEmailSubmit(email);
        }
      } else {
        // Sign up new user
        const { data, error } = await authHelpers.signUp(email, password);
        
        if (error) {
          setErrorMessage(error.message);
        } else if (data.user) {
          setSuccessMessage('Account created successfully! Please check your email for verification.');
          // Store user email and proceed
          onEmailSubmit(email);
        }
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred. Please try again.');
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
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
                {isLogin ? 'Login' : 'Sign Up'}
              </h1>
              
              <p className="text-gray-600 dark:text-gray-300">
                {isLogin 
                  ? 'Welcome back to Fundora! Please sign in to continue your financial journey.'
                  : 'Join Fundora today! Create your account to start your financial journey.'
                }
              </p>
            </div>
            
            {/* Error/Success Messages */}
            {errorMessage && (
              <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl">
                <p className="text-red-600 dark:text-red-400 text-sm">{errorMessage}</p>
              </div>
            )}
            
            {successMessage && (
              <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl">
                <p className="text-green-600 dark:text-green-400 text-sm">{successMessage}</p>
              </div>
            )}
            
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
                  disabled={!isFormValid || isLoading}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                    isFormValid && !isLoading
                      ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-white hover:from-purple-700 hover:to-orange-600 transform hover:scale-105 shadow-lg'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>{isLogin ? 'Signing In...' : 'Creating Account...'}</span>
                    </>
                  ) : (
                    <>
                      <span>{isLogin ? 'Login' : 'Sign Up'}</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Sign Up Section */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                </p>
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-purple-600 dark:text-purple-400 font-semibold hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                >
                  {isLogin ? 'Sign Up' : 'Login'}
                </button>
              </div>
            </div>

            {/* Continue to Persona Detection */}
            {isFormValid && !isLoading && (
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  Or skip login for now
                </p>
                {isFormValid && (
                  <button
                    onClick={handleContinueToPersona}
                    className="px-6 py-2 rounded-lg font-medium transition-all bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    Continue to Persona Detection
                  </button>
                )}
              </div>
            )}

            {/* Back to Home */}
            <div className="mt-4 text-center">
              <button
                onClick={onBack}
                className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
              >
                ← Go Back to Home
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailCapture;
