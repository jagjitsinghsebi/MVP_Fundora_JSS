import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'Is Fundora free to use?',
    answer: 'Fundora offers a free basic plan with essential features. Our premium plan at ₹199/month unlocks advanced AI insights, unlimited goal tracking, and priority voice responses.'
  },
  {
    question: 'How easy is it to use? I\'m not tech-savvy.',
    answer: 'Super easy! Just talk to Fundora like you\'re chatting with a friend. No complex menus or forms - everything happens through natural voice conversations.'
  },
  {
    question: 'Can it really help me set and achieve financial goals?',
    answer: 'Absolutely! Whether it\'s saving for a trip, building an emergency fund, or planning investments, Fundora creates personalized action plans and keeps you motivated with regular check-ins.'
  },
  {
    question: 'How is this different from chatbots or other financial apps?',
    answer: 'Unlike text-based chatbots, Fundora understands your tone, emotions, and speaking patterns. It\'s designed specifically for voice interaction, making financial planning feel natural and personal.'
  },
  {
    question: 'Is my financial data secure with voice commands?',
    answer: 'Yes! All voice data is encrypted and processed securely. We never store your actual financial account details - only the insights and plans you create with us.'
  },
  {
    question: 'Can I use it in Hindi or other Indian languages?',
    answer: 'Currently, Fundora works best in English with some Hindi phrases. We\'re actively working on full Hindi and regional language support!'
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Got Questions? We've Got Answers
          </h2>
          <div className="flex justify-center mb-4">
            <img 
              src="/Fundora Owl.jpg" 
              alt="Fundora Owl" 
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Everything you need to know about Fundora
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800/50 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-purple-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;