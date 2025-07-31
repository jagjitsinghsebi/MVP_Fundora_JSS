import React from 'react';
import { MessageCircle, Target, Bell, TrendingUp, Calendar } from 'lucide-react';

const benefits = [
  {
    icon: MessageCircle,
    title: 'Speak to Plan, not Tap to Scroll',
    description: 'Natural voice conversations make financial planning as easy as chatting with a friend.',
  },
  {
    icon: Target,
    title: 'Personalized Financial Guidance',
    description: 'AI-powered insights tailored to your income, expenses, and lifestyle goals.',
  },
  {
    icon: Bell,
    title: 'Smart Nudges (Not Lectures)',
    description: 'Gentle reminders and actionable tips delivered when you need them most.',
  },
  {
    icon: TrendingUp,
    title: 'Goal-Based Planning',
    description: 'From Goa trips to EMIs to dream vacations - plan for what matters to you.',
  },
  {
    icon: Calendar,
    title: 'Reminders, Trackers & Motivation',
    description: 'Stay on track with automated reminders and celebrate your financial wins.',
  },
];

const BenefitsGrid: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Gen Z Loves Fundora
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Finally, a financial assistant that gets your vibe
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-100 dark:group-hover:bg-orange-900/30 transition-colors">
                <benefit.icon className="w-8 h-8 text-purple-600 group-hover:text-orange-500 transition-colors" />
              </div>
              
              <div className="flex justify-center mb-4">
                <img 
                  src="/Fundora Owl.jpg" 
                  alt="Fundora Owl" 
                  className="w-12 h-12 rounded-full object-cover opacity-20 group-hover:opacity-40 transition-opacity"
                />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {benefit.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsGrid;