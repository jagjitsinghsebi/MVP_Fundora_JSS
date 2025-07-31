import React, { useState } from 'react';
import { Mic, Volume2, Play } from 'lucide-react';

const voiceCommands = [
  {
    category: 'Budget Creation',
    command: 'Create a monthly budget for ₹45,000 salary',
    response: 'Perfect! I\'ll help you allocate ₹45K wisely. Let\'s set aside ₹9K for savings first, then plan your expenses...'
  },
  {
    category: 'Financial Rules',
    command: 'Explain the 50-30-20 rule in simple terms',
    response: '50% for needs like rent and food, 30% for wants like movies and shopping, 20% for savings and investments!'
  },
  {
    category: 'Goal Setting',
    command: 'I want to save for a bike worth ₹80,000',
    response: 'Great choice! When do you want to buy it? I can create a savings plan that fits your timeline and budget.'
  },
  {
    category: 'Quick Calculations',
    command: 'How much will ₹2000 SIP grow in 5 years?',
    response: 'With 12% returns, your ₹2000 monthly SIP will grow to approximately ₹1.63 lakhs in 5 years!'
  },
  {
    category: 'Bill Reminders',
    command: 'Remind me to pay electricity bill on 5th',
    response: 'Done! I\'ll remind you about your electricity bill every 5th of the month. What\'s the typical amount?'
  },
];

const VoicePreview: React.FC = () => {
  const [activeCommand, setActiveCommand] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 3000);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-orange-50 dark:from-gray-800 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Try Voice Commands
          </h2>
          <div className="flex justify-center mb-4">
            <img 
              src="/Fundora Owl.jpg" 
              alt="Fundora Owl" 
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            See how easy it is to manage money with your voice
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            {voiceCommands.map((item, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  activeCommand === index
                    ? 'bg-white dark:bg-gray-800 shadow-lg border-l-4 border-purple-600'
                    : 'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800'
                }`}
                onClick={() => setActiveCommand(index)}
              >
                <div className="flex items-center space-x-3">
                  <Mic className={`w-5 h-5 ${
                    activeCommand === index ? 'text-purple-600' : 'text-gray-400'
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                      {item.category}
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      "{item.command}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Voice Interaction
                </h3>
                <button
                  onClick={handlePlay}
                  className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-colors"
                >
                  <Play className="w-4 h-4" />
                </button>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-xl mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Mic className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-600">You:</span>
                </div>
                <p className="text-gray-800 dark:text-gray-200">
                  {voiceCommands[activeCommand].command}
                </p>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <Volume2 className={`w-4 h-4 text-orange-500 ${isPlaying ? 'animate-pulse' : ''}`} />
                  <span className="text-sm font-medium text-orange-500">Fundora:</span>
                </div>
                <p className="text-gray-800 dark:text-gray-200">
                  {voiceCommands[activeCommand].response}
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => {
                if (window.startListening) {
                  window.startListening();
                } else {
                  alert('Voice assistant is loading... Please try again in a moment.');
                }
              }}
              className="w-full bg-gradient-to-r from-purple-600 to-orange-500 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-orange-600 transition-all duration-300"
            >
              Try This Command
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VoicePreview;