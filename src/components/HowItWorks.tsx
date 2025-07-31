import React, { useState } from 'react';
import { Mic, Target, Brain, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: Mic,
    title: 'Say Hello',
    description: 'Voice-based Money Persona quiz',
    detail: 'Tell us about your spending style, goals, and financial habits through natural conversation.',
  },
  {
    icon: Target,
    title: 'Tell Your Goals',
    description: 'Voice commands like "Save for Goa" or "Build ₹50K emergency fund"',
    detail: 'Simply speak your financial dreams and we\'ll create a personalized roadmap.',
  },
  {
    icon: Brain,
    title: 'Get Smart Nudges',
    description: 'Personalized voice prompts and plans',
    detail: 'Receive intelligent suggestions and reminders that fit your lifestyle and spending patterns.',
  },
  {
    icon: TrendingUp,
    title: 'Act + Track',
    description: 'Automated reminders and progress monitoring',
    detail: 'Stay motivated with progress updates and celebrate your financial milestones.',
  },
];

const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-purple-50 to-orange-50 dark:from-gray-800 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How Fundora Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Four simple steps to financial freedom
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                  activeStep === index
                    ? 'bg-white dark:bg-gray-800 shadow-lg scale-105'
                    : 'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800'
                }`}
                onClick={() => setActiveStep(index)}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    activeStep === index ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}>
                    <step.icon className={`w-6 h-6 ${
                      activeStep === index ? 'text-white' : 'text-gray-600 dark:text-gray-300'
                    }`} />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <img 
                  src="/Fundora Owl.jpg" 
                  alt="Fundora Owl" 
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/30 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                {React.createElement(steps[activeStep].icon, {
                  className: "w-10 h-10 text-purple-600"
                })}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {steps[activeStep].title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {steps[activeStep].detail}
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
              <div className="flex items-center space-x-2 mb-2">
                <Mic className="w-4 h-4 text-orange-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Try saying:</span>
              </div>
              <p className="text-purple-600 dark:text-purple-400 font-medium">
                {activeStep === 0 && "I'm a college student who loves to travel but struggle with budgeting"}
                {activeStep === 1 && "Help me save ₹30,000 for my Goa trip in 6 months"}
                {activeStep === 2 && "Remind me about my SIP investment every month"}
                {activeStep === 3 && "How am I doing with my emergency fund goal?"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;