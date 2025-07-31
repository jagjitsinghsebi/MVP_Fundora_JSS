import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import BenefitsGrid from './components/BenefitsGrid';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import VoicePreview from './components/VoicePreview';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import PersonaDetection from './components/PersonaDetection';
import EmailCapture from './components/EmailCapture';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentStep, setCurrentStep] = useState('landing'); // 'landing', 'email', 'persona', 'app'
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || "");
  const [userPersona, setUserPersona] = useState(localStorage.getItem("fundoraPersona") || "");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Don't auto-navigate - let user choose their path
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleGetStarted = () => {
    setCurrentStep('email');
  };

  const handleEmailSubmit = (email: string) => {
    localStorage.setItem("userEmail", email);
    setUserEmail(email);
    setCurrentStep('persona');
  };

  const handlePersonaComplete = (persona: string) => {
    localStorage.setItem("fundoraPersona", persona);
    setUserPersona(persona);
    setCurrentStep('app');
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("fundoraPersona");
    localStorage.removeItem("fundoraConversations");
    localStorage.removeItem("fundoraProfile");
    setUserEmail("");
    setUserPersona("");
    setCurrentStep('landing');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      {currentStep === 'landing' && (
        <>
          <Header 
            darkMode={darkMode} 
            toggleDarkMode={toggleDarkMode} 
            showVoiceButton={userEmail && userPersona ? true : false}
            onLogout={userEmail ? handleLogout : undefined}
          />
          <HeroSection onGetStarted={handleGetStarted} />
          <BenefitsGrid />
          <HowItWorks />
          <Testimonials />
          <VoicePreview />
          <FAQ />
          <Footer />
        </>
      )}

      {currentStep === 'email' && (
        <EmailCapture 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode}
          onEmailSubmit={handleEmailSubmit}
          onBack={() => setCurrentStep('landing')}
        />
      )}

      {currentStep === 'persona' && (
        <PersonaDetection 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode}
          userEmail={userEmail}
          onPersonaComplete={handlePersonaComplete}
          onBack={() => setCurrentStep('email')}
        />
      )}

      {currentStep === 'app' && (
        <>
          <Header 
            darkMode={darkMode} 
            toggleDarkMode={toggleDarkMode} 
            showVoiceButton={true}
            onLogout={handleLogout}
          />
          <div className="pt-20 min-h-screen bg-gradient-to-br from-purple-50 to-orange-50 dark:from-gray-900 dark:to-purple-900/20">
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
              <div className="mb-8">
                <img 
                  src="/Fundora Owl.jpg" 
                  alt="Fundora Owl" 
                  className="w-32 h-32 mx-auto rounded-full mb-6 shadow-lg object-cover"
                />
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Welcome back, {userEmail.split('@')[0]}! 🎉
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
                  Your Money Persona: <span className="text-purple-600 font-semibold">{userPersona}</span>
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Ready to continue your financial journey?
                </p>
              </div>
              
              <button 
                onClick={() => {
                  if (window.startListening) {
                    window.startListening();
                  } else {
                    alert('Voice assistant is loading... Please try again in a moment.');
                  }
                }}
                className="bg-gradient-to-r from-purple-600 to-orange-500 text-white px-12 py-4 rounded-xl font-semibold text-xl hover:from-purple-700 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🎙️ Launch Fundora
              </button>
            </div>
          </div>
          
          {/* Voice Assistant Floating Button */}
          <button
            onClick={() => window.startListening()}
            className="fixed bottom-8 right-8 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-50"
          >
            🎙️
          </button>
        </>
      )}

      {/* 📦 Voice Response Box */}
      <div
        id="voiceBox"
        className="fixed bottom-24 right-8 bg-gray-800 text-white p-4 rounded-xl max-w-sm font-sans hidden z-50 shadow-xl"
      ></div>
    </div>
  );
}

export default App;