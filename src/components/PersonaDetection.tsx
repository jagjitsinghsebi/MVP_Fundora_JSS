import React, { useState, useEffect } from 'react';
import { Brain, ArrowRight, CheckCircle } from 'lucide-react';
import Header from './Header';

interface PersonaDetectionProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  userEmail: string;
  onPersonaComplete: (persona: string) => void;
  onBack: () => void;
}

const PersonaDetection: React.FC<PersonaDetectionProps> = ({ 
  darkMode, 
  toggleDarkMode, 
  userEmail, 
  onPersonaComplete,
  onBack
}) => {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [detectedPersona, setDetectedPersona] = useState('');

  useEffect(() => {
    // Listen for persona quiz completion
    const handlePersonaDetected = (event: CustomEvent) => {
      setDetectedPersona(event.detail.persona);
      setIsQuizComplete(true);
    };

    window.addEventListener('personaDetected', handlePersonaDetected as EventListener);
    
    return () => {
      window.removeEventListener('personaDetected', handlePersonaDetected as EventListener);
    };
  }, []);

  const startPersonaQuiz = () => {
    setIsQuizStarted(true);
    if (window.startPersonaQuiz) {
      window.startPersonaQuiz();
    } else {
      alert('Voice assistant is loading... Please try again in a moment.');
    }
  };

  const handleContinue = () => {
    onPersonaComplete(detectedPersona);
  };

  const personaDescriptions = {
    guardian: "Safety-First and Risk-Averse - You prefer secure, low-risk financial options",
    planner: "Methodical and Forward-Thinking - You love organizing and planning your finances",
    explorer: "Curious and Open-Minded - You enjoy learning about new investment opportunities",
    avoider: "Overwhelmed but Evolving - You're working on building better financial habits",
    maverick: "Bold and Risk-Ready - You're comfortable with high-risk, high-reward investments",
    independent: "Analytical and Self-Driven - You prefer researching and making your own decisions"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50 dark:from-gray-900 dark:to-purple-900/20">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} onLogout={onBack} />
      
      <div className="pt-20 flex items-center justify-center min-h-screen px-4">
        <div className="max-w-2xl w-full">
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

            {!isQuizStarted && !isQuizComplete && (
              <>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Let's Discover Your Money Persona! 🧠
                </h2>
                
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Hi {userEmail.split('@')[0]}! I'll ask you a few questions to understand your financial personality. 
                  This helps me give you personalized advice that actually works for you.
                </p>
                
                <div className="bg-purple-50 dark:bg-purple-900/30 p-6 rounded-xl mb-8">
                  <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">
                    What to expect:
                  </h3>
                  <ul className="text-left text-purple-700 dark:text-purple-300 space-y-2">
                    <li>• 10-15 quick questions about your money habits</li>
                    <li>• Voice-based interaction (just speak naturally!)</li>
                    <li>• Takes about 3-5 minutes</li>
                    <li>• Personalized financial guidance based on your type</li>
                  </ul>
                </div>
                
                <button
                  onClick={startPersonaQuiz}
                  className="bg-gradient-to-r from-purple-600 to-orange-500 text-white px-12 py-4 rounded-xl font-semibold text-xl hover:from-purple-700 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-3 mx-auto"
                >
                  <Brain className="w-6 h-6" />
                  <span>🧠 Detect My Persona</span>
                </button>
              </>
            )}

            {isQuizStarted && !isQuizComplete && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Persona Detection in Progress...
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Please follow the voice prompts and answer naturally. I'm listening! 🎙️
                </p>
                <div className="animate-pulse">
                  <div className="w-16 h-16 bg-purple-200 dark:bg-purple-700 rounded-full mx-auto"></div>
                </div>
              </div>
            )}

            {isQuizComplete && (
              <div className="space-y-6">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Persona Detected! 🎉
                </h2>
                
                <div className="bg-gradient-to-r from-purple-100 to-orange-100 dark:from-purple-900/30 dark:to-orange-900/30 p-6 rounded-xl">
                  <h3 className="text-2xl font-bold text-purple-800 dark:text-purple-200 mb-2">
                    You are: {detectedPersona.charAt(0).toUpperCase() + detectedPersona.slice(1)}
                  </h3>
                  <p className="text-purple-700 dark:text-purple-300">
                    {personaDescriptions[detectedPersona as keyof typeof personaDescriptions]}
                  </p>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300">
                  Perfect! Now I can provide you with personalized financial advice that matches your style.
                </p>
                
                <button
                  onClick={handleContinue}
                  className="bg-gradient-to-r from-purple-600 to-orange-500 text-white px-12 py-4 rounded-xl font-semibold text-xl hover:from-purple-700 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-3 mx-auto"
                >
                  <span>Launch Fundora</span>
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Voice Response Box */}
      <div
        id="voiceBox"
        className="fixed bottom-8 right-8 bg-gray-800 text-white p-4 rounded-xl max-w-sm font-sans hidden z-50 shadow-xl"
      ></div>
    </div>
  );
};

export default PersonaDetection;