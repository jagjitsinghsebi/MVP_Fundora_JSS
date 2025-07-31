import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    age: 24,
    location: 'Delhi',
    text: 'Finally planned my Europe trip without stressing about money! Fundora helped me save ₹80K in 8 months just by talking to it like a friend.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    name: 'Arjun Patel',
    age: 27,
    location: 'Mumbai',
    text: 'Used to forget my SIP dates every month. Now Fundora reminds me with voice messages and I never miss an investment. Game changer!',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    name: 'Sneha Reddy',
    age: 22,
    location: 'Bangalore',
    text: 'Budgeting was boring until Fundora. Now I just talk about my expenses and it creates a budget that actually works with my lifestyle.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    name: 'Rohit Kumar',
    age: 29,
    location: 'Pune',
    text: 'Built my first ₹1 lakh emergency fund thanks to Fundora\'s daily motivation. It celebrates small wins which keeps me going!',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Real Talk from Real Users
          </h2>
          <div className="flex justify-center mb-4">
            <img 
              src="/Fundora Owl.jpg" 
              alt="Fundora Owl" 
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            See how Fundora is changing financial lives across India
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-orange-500 fill-current" />
                ))}
              </div>
              
              <Quote className="w-8 h-8 text-purple-300 mb-4" />
              
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center space-x-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.age} • {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;