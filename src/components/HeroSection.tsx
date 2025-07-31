import React, { useState, useEffect } from 'react';
import { Play, Star, Mic } from 'lucide-react';

const SoundWave: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  return (
    <div className="flex items-center justify-center space-x-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`bg-orange-500 rounded-full transition-all duration-300 ${
            isActive ? 'animate-pulse' : ''
          }`}
          style={{
            width: '4px',
            height: isActive ? `${Math.random() * 40 + 20}px` : '20px',
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
};

const VVAFace: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 2000);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-80 h-80 mx-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full opacity-20 animate-pulse" />
      <div className="absolute inset-4 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center">
        <div className={`w-32 h-32 bg-white rounded-full flex items-center justify-center transition-transform duration-500 ${isAnimating ? 'scale-110' : 'scale-100'}`}>
          <Mic className="w-16 h-16 text-purple-600" />
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <SoundWave isActive={isAnimating} />
      </div>
    </div>
  );
};

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-purple-50 to-orange-50 dark:from-gray-900 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            {/* Owl Mascot */}
            <div className="flex justify-center lg:justify-start mb-6">
              <img 
                src="/Fundora Owl.jpg" 
                alt="Fundora Owl" 
                className="w-20 h-20 rounded-full shadow-lg border-4 border-white dark:border-gray-700 object-cover"
              />
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Talk Money,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-orange-500">
                Your Way.
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Meet Fundora — India's first voice-based AI assistant that helps you save, invest, and live better.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button 
                onClick={onGetStarted}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>Let's Get Financially Wise</span>
              </button>
              
              <button className="border-2 border-purple-600 text-purple-600 dark:text-purple-400 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-purple-600 hover:text-white transition-all duration-300">
                Watch Demo
              </button>
            </div>
            
            <div className="flex items-center justify-center lg:justify-start space-x-2 text-orange-500">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-gray-600 dark:text-gray-300 ml-2">
                Loved by 25,000+ young Indians
              </span>
            </div>
          </div>
          
          <div className="flex justify-center">
            <VVAFace />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;