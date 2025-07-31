// ✅ Enhanced Voice Assistant with Conversation History and Better Recognition
class FundoraVoiceAssistant {
  constructor() {
    this.conversationHistory = JSON.parse(localStorage.getItem('fundoraConversations') || '[]');
    this.userProfile = JSON.parse(localStorage.getItem('fundoraProfile') || '{}');
    this.currentPersona = localStorage.getItem('fundoraPersona') || '';
    this.isListening = false;
    this.recognition = null;
    this.initializeVoiceSettings();
  }

  initializeVoiceSettings() {
    // Enhanced speech synthesis settings
    this.voiceSettings = {
      rate: 0.7, // Even slower for more natural speech
      pitch: 1.2, // Higher pitch for female voice
      volume: 0.9,
      lang: 'en-IN'
    };
  }

  // ✅ Improved Speech Recognition
  createRecognition() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      return null;
    }
    
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    
    // Enhanced recognition settings
    recognition.lang = 'en-IN';
    recognition.continuous = true; // Allow longer speech
    recognition.interimResults = true; // Show interim results
    recognition.maxAlternatives = 3; // Get multiple alternatives
    
    return recognition;
  }

  // ✅ Enhanced Text-to-Speech with Natural Voice
  speak(text, callback = null) {
    // Cancel any ongoing speech
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Apply enhanced voice settings
    utterance.rate = this.voiceSettings.rate;
    utterance.pitch = this.voiceSettings.pitch;
    utterance.volume = this.voiceSettings.volume;
    utterance.lang = this.voiceSettings.lang;
    
    // Try to use a female voice first, then natural voices
    const voices = speechSynthesis.getVoices();
    
    // Priority order: Female voices, then natural voices
    const femaleVoice = voices.find(voice => 
      voice.lang.includes('en') && voice.name.toLowerCase().includes('female')
    );
    
    const naturalVoice = voices.find(voice => 
      voice.lang.includes('en') && 
      (voice.name.includes('Samantha') || voice.name.includes('Karen') || 
       voice.name.includes('Susan') || voice.name.includes('Zira') ||
       voice.name.includes('Google') && voice.name.includes('Female'))
    );
    
    const fallbackVoice = voices.find(voice => 
      voice.lang.includes('en') && 
      (voice.name.includes('Google') || voice.name.includes('Microsoft'))
    );
    
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    } else if (naturalVoice) {
      utterance.voice = naturalVoice;
    } else if (fallbackVoice) {
      utterance.voice = fallbackVoice;
    }
    
    utterance.onend = () => {
      if (callback) callback();
    };
    
    speechSynthesis.speak(utterance);
  }

  // ✅ Save Conversation to History
  saveConversation(userInput, botResponse) {
    const conversation = {
      timestamp: new Date().toISOString(),
      userInput,
      botResponse,
      persona: this.currentPersona
    };
    
    this.conversationHistory.push(conversation);
    
    // Keep only last 50 conversations
    if (this.conversationHistory.length > 50) {
      this.conversationHistory = this.conversationHistory.slice(-50);
    }
    
    localStorage.setItem('fundoraConversations', JSON.stringify(this.conversationHistory));
  }

  // ✅ Update User Profile
  updateProfile(key, value) {
    this.userProfile[key] = value;
    localStorage.setItem('fundoraProfile', JSON.stringify(this.userProfile));
  }

  // ✅ Intelligent Response Generation (ChatGPT-like)
  generateIntelligentResponse(userInput) {
    const input = userInput.toLowerCase();
    
    // Check conversation history for context
    const recentConversations = this.conversationHistory.slice(-5);
    const hasContext = recentConversations.length > 0;
    
    // Persona-based response selection
    const personaResponses = this.getPersonaResponses();
    
    // Smart keyword matching with context
    let bestMatch = this.findBestMatch(input, personaResponses);
    
    // If no good match, provide contextual help
    if (!bestMatch) {
      bestMatch = this.generateContextualResponse(input, hasContext);
    }
    
    // Add personality based on persona
    return this.addPersonalityToResponse(bestMatch, this.currentPersona);
  }

  findBestMatch(input, responses) {
    let bestScore = 0;
    let bestResponse = null;
    
    for (const [key, data] of Object.entries(responses)) {
      const questionWords = data.q.toLowerCase().split(' ');
      const answerWords = data.a.toLowerCase().split(' ');
      
      let score = 0;
      
      // Check question similarity
      questionWords.forEach(word => {
        if (input.includes(word) && word.length > 3) {
          score += 2;
        }
      });
      
      // Check answer relevance
      answerWords.forEach(word => {
        if (input.includes(word) && word.length > 3) {
          score += 1;
        }
      });
      
      // Boost score for exact phrase matches
      if (input.includes(data.q.toLowerCase().substring(0, 15))) {
        score += 10;
      }
      
      if (score > bestScore) {
        bestScore = score;
        bestResponse = data.a;
      }
    }
    
    return bestScore > 3 ? bestResponse : null;
  }

  generateContextualResponse(input, hasContext) {
    // Financial keywords for better matching
    const financialKeywords = {
      'save': "Great question about saving! Based on your persona, I'd recommend starting with small, consistent amounts. What's your monthly income?",
      'invest': "Investment is key to building wealth! For your persona type, I suggest starting with low-risk options. How much can you invest monthly?",
      'budget': "Budgeting is essential! Let's create a simple plan. What are your main monthly expenses?",
      'emergency': "Emergency funds are crucial! Aim for 3-6 months of expenses. How much do you currently have saved?",
      'goal': "Setting financial goals is smart! What's your biggest financial dream right now?",
      'debt': "Let's tackle your debt strategically. What type of debt are you dealing with?",
      'income': "Understanding your income is the first step. Are you looking to increase it or manage it better?",
      'expense': "Tracking expenses helps a lot! What's your biggest spending category?",
      'plan': "Financial planning is wise! What timeline are you thinking about?",
      'help': "I'm here to help with all your money questions! What specific area would you like guidance on?"
    };
    
    for (const [keyword, response] of Object.entries(financialKeywords)) {
      if (input.includes(keyword)) {
        return response;
      }
    }
    
    // Default helpful response
    return hasContext 
      ? "I understand you're looking for more specific guidance. Could you tell me more about your financial situation or goals?"
      : "Hi! I'm here to help with your financial journey. You can ask me about saving, investing, budgeting, or any money-related questions. What would you like to know?";
  }

  addPersonalityToResponse(response, persona) {
    const personalityPrefixes = {
      'guardian': "For someone who values security like you, ",
      'planner': "Since you love planning ahead, ",
      'explorer': "Given your curiosity about new opportunities, ",
      'avoider': "I know finance can feel overwhelming, so let's keep it simple: ",
      'maverick': "For someone bold like you, ",
      'independent': "Since you prefer making your own decisions, "
    };
    
    const prefix = personalityPrefixes[persona] || "";
    return prefix + response;
  }

  getPersonaResponses() {
    // Enhanced Q&A database with better matching
    return {
      // General Financial Questions
      "budget_basics": { 
        q: "How do I create a budget?", 
        a: "Start with the 50-30-20 rule: 50% for needs, 30% for wants, 20% for savings. Track your expenses for a week first to understand your spending patterns." 
      },
      "emergency_fund": { 
        q: "What is an emergency fund?", 
        a: "An emergency fund is 3-6 months of expenses saved for unexpected situations like job loss or medical bills. Start with ₹1000 and build gradually." 
      },
      "investment_start": { 
        q: "How do I start investing?", 
        a: "Begin with SIPs in mutual funds - you can start with just ₹500 per month. Choose a balanced fund for beginners and increase gradually." 
      },
      "save_money": { 
        q: "How can I save more money?", 
        a: "Try the 24-hour rule before purchases, automate your savings, and track where your money goes. Small changes add up quickly!" 
      },
      "debt_management": { 
        q: "How do I manage debt?", 
        a: "List all debts, pay minimums on all, then focus extra money on the highest interest debt first. Consider debt consolidation if helpful." 
      },
      "financial_goals": { 
        q: "How do I set financial goals?", 
        a: "Make them SMART: Specific, Measurable, Achievable, Relevant, Time-bound. Start with one goal like 'Save ₹10,000 in 6 months'." 
      },
      "income_increase": { 
        q: "How can I increase my income?", 
        a: "Consider skill development, side hustles, freelancing, or asking for a raise. Invest in yourself through courses or certifications." 
      },
      "expense_tracking": { 
        q: "How do I track expenses?", 
        a: "Use apps like Walnut or Money Manager, or simply note expenses in your phone. Review weekly to identify patterns." 
      },
      "retirement_planning": { 
        q: "When should I start retirement planning?", 
        a: "Start now! Even ₹1000 monthly at 25 becomes ₹1.8 crores by 60 with 12% returns. Time is your biggest advantage." 
      },
      "tax_saving": { 
        q: "How can I save on taxes?", 
        a: "Use 80C investments like ELSS, PPF, or life insurance. Also consider 80D for health insurance premiums." 
      }
    };
  }

  // ✅ Enhanced Voice Recognition with Better Error Handling
  startListening() {
    if (this.isListening) return;
    
    this.recognition = this.createRecognition();
    if (!this.recognition) {
      this.showMessage('Speech recognition not supported. Please try Chrome or Edge browser.');
      return;
    }
    
    this.isListening = true;
    let finalTranscript = '';
    let interimTranscript = '';
    
    this.showMessage('🎙️ Listening... Speak clearly and take your time!');
    
    this.recognition.onresult = (event) => {
      finalTranscript = '';
      interimTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }
      
      // Show interim results
      if (interimTranscript) {
        this.showMessage(`🎙️ I'm hearing: "${interimTranscript}"`);
      }
    };
    
    this.recognition.onend = () => {
      this.isListening = false;
      
      if (finalTranscript.trim()) {
        this.processUserInput(finalTranscript.trim());
      } else {
        this.showMessage('I didn\'t catch that. Please try again!');
      }
    };
    
    this.recognition.onerror = (event) => {
      this.isListening = false;
      console.error('Speech recognition error:', event.error);
      
      const errorMessages = {
        'no-speech': 'I didn\'t hear anything. Please try again.',
        'audio-capture': 'Microphone not accessible. Please check permissions.',
        'not-allowed': 'Microphone permission denied. Please allow microphone access.',
        'network': 'Network error. Please check your connection.',
        'aborted': 'Speech recognition was stopped.'
      };
      
      const message = errorMessages[event.error] || 'Something went wrong. Please try again.';
      this.showMessage(message);
    };
    
    this.recognition.start();
  }

  processUserInput(userInput) {
    this.showMessage(`<strong>You said:</strong><br>"${userInput}"<br><br>🤔 Let me think...`);
    
    // Generate intelligent response
    const response = this.generateIntelligentResponse(userInput);
    
    // Save conversation
    this.saveConversation(userInput, response);
    
    // Show and speak response
    setTimeout(() => {
      this.showMessage(`<strong>You said:</strong><br>"${userInput}"<br><br><strong>Fundora says:</strong><br>${response}`);
      this.speak(response);
    }, 1000);
  }

  showMessage(message) {
    const voiceBox = document.getElementById("voiceBox");
    if (voiceBox) {
      voiceBox.innerHTML = message;
      voiceBox.style.display = "block";
      
      // Auto-hide after 10 seconds
      setTimeout(() => {
        if (voiceBox.style.display === "block") {
          voiceBox.style.display = "none";
        }
      }, 10000);
    }
  }

  // ✅ Persona Quiz with Better Recognition
  startPersonaQuiz() {
    this.currentQuestionIndex = 0;
    this.personaScores = {
      guardian: 0,
      planner: 0,
      explorer: 0,
      avoider: 0,
      maverick: 0,
      independent: 0
    };
    
    this.personaQuestions = [
      "When you get money, do you prefer planning what to do with it or just going with the flow?",
      "Do you track your monthly expenses or just check your balance now and then?",
      "Would you say you're someone who avoids thinking about finances until absolutely necessary?",
      "If you receive a sudden bonus, do you invest it, spend it, or let it sit in your account?",
      "Do you enjoy researching before buying or investing in something?",
      "How often do you compare yourself financially with friends or peers?",
      "Would you rather buy something on EMI or save up and buy later?",
      "Do you feel anxious when you check your bank account or confident?",
      "When traveling, do you plan every detail or go with the flow?",
      "Do you think of budgeting as empowering or restricting?"
    ];
    
    this.showMessage("🧠 Starting your Money Persona Quiz! I'll ask you 10 questions...");
    this.speak("Hi! I'm going to ask you some questions to understand your money personality. Just answer naturally - there are no right or wrong answers.", () => {
      setTimeout(() => this.askPersonaQuestion(), 2000);
    });
  }

  askPersonaQuestion() {
    if (this.currentQuestionIndex >= this.personaQuestions.length) {
      this.finishPersonaQuiz();
      return;
    }
    
    const question = this.personaQuestions[this.currentQuestionIndex];
    this.showMessage(`<strong>Question ${this.currentQuestionIndex + 1}/10:</strong><br><br>${question}<br><br><em>🎙️ Please speak your answer...</em>`);
    
    this.speak(question, () => {
      setTimeout(() => this.listenForPersonaAnswer(), 1000);
    });
  }

  listenForPersonaAnswer() {
    this.recognition = this.createRecognition();
    if (!this.recognition) return;
    
    this.showMessage(`<strong>Question ${this.currentQuestionIndex + 1}/10:</strong><br><br>${this.personaQuestions[this.currentQuestionIndex]}<br><br>🎙️ <em>Listening for your answer...</em>`);
    
    this.recognition.onresult = (event) => {
      const response = event.results[0][0].transcript.toLowerCase();
      this.evaluatePersonaResponse(response);
      this.currentQuestionIndex++;
      
      setTimeout(() => this.askPersonaQuestion(), 1500);
    };
    
    this.recognition.onerror = () => {
      // Skip question on error
      this.currentQuestionIndex++;
      setTimeout(() => this.askPersonaQuestion(), 1000);
    };
    
    this.recognition.start();
  }

  evaluatePersonaResponse(response) {
    const detectionPatterns = {
      guardian: ['safe', 'secure', 'careful', 'conservative', 'protect', 'anxious', 'worried'],
      planner: ['plan', 'organize', 'track', 'budget', 'save first', 'research', 'prepare'],
      explorer: ['explore', 'learn', 'try', 'curious', 'new', 'different', 'experiment'],
      avoider: ['avoid', 'ignore', 'overwhelming', 'boring', 'later', 'procrastinate'],
      maverick: ['risk', 'bold', 'quick', 'aggressive', 'high return', 'gamble'],
      independent: ['myself', 'own', 'research', 'decide', 'analyze', 'logic', 'data']
    };
    
    Object.entries(detectionPatterns).forEach(([persona, keywords]) => {
      keywords.forEach(keyword => {
        if (response.includes(keyword)) {
          this.personaScores[persona]++;
        }
      });
    });
  }

  finishPersonaQuiz() {
    const topPersona = Object.entries(this.personaScores)
      .sort(([,a], [,b]) => b - a)[0][0];
    
    const personaDescriptions = {
      guardian: "Guardian – Safety-First and Risk-Averse",
      planner: "Planner – Methodical and Forward-Thinking", 
      explorer: "Explorer – Curious and Open-Minded",
      avoider: "Avoider – Overwhelmed but Evolving",
      maverick: "Maverick – Bold and Risk-Ready",
      independent: "Independent – Analytical and Self-Driven"
    };
    
    this.currentPersona = topPersona;
    localStorage.setItem('fundoraPersona', topPersona);
    
    this.showMessage(`
      <div style="text-align: center; padding: 20px;">
        <h3 style="color: #9333ea; margin-bottom: 10px;">🎉 Quiz Complete!</h3>
        <p style="font-size: 18px; margin-bottom: 15px;">Your money persona is:</p>
        <h2 style="color: #f97316; margin-bottom: 20px;">${personaDescriptions[topPersona]}</h2>
        <p style="font-size: 14px; color: #666;">Now I can give you personalized financial advice!</p>
      </div>
    `);
    
    const message = `Congratulations! You are a ${topPersona}. This means I can now provide you with personalized financial guidance that matches your style perfectly.`;
    this.speak(message);
    
    // Notify React components
    window.dispatchEvent(new CustomEvent('personaDetected', { 
      detail: { persona: topPersona } 
    }));
  }

  // ✅ Get Conversation History
  getConversationHistory() {
    return this.conversationHistory;
  }

  // ✅ Clear History (for privacy)
  clearHistory() {
    this.conversationHistory = [];
    localStorage.removeItem('fundoraConversations');
    this.showMessage('Conversation history cleared!');
  }
}

// ✅ Initialize Enhanced Voice Assistant
const fundoraAssistant = new FundoraVoiceAssistant();

// ✅ Global Functions
window.startListening = () => fundoraAssistant.startListening();
window.startPersonaQuiz = () => fundoraAssistant.startPersonaQuiz();
window.speak = (text) => fundoraAssistant.speak(text);
window.getConversationHistory = () => fundoraAssistant.getConversationHistory();
window.clearConversationHistory = () => fundoraAssistant.clearHistory();

// ✅ Initialize when DOM loads
document.addEventListener('DOMContentLoaded', function() {
  console.log('Enhanced Fundora Voice Assistant loaded successfully!');
  
  // Load voices when available
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = () => {
      console.log('Voices loaded:', speechSynthesis.getVoices().length);
    };
  }
});