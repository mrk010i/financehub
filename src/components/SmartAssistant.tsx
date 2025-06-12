import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle, Bot, User, Lightbulb, HelpCircle } from 'lucide-react';
import { ChatMessage } from '../types';
import { formatCurrency } from '../utils/categories';

const SmartAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    "How can I save money as a student?",
    "What's a good budget for a college student?",
    "How to manage education loans?",
    "Best part-time jobs for students?",
    "How to start investing with little money?",
    "Student credit card benefits in India"
  ];

  const financialTips = [
    {
      question: "save money",
      answer: "Here are proven ways to save money as a student in India:\n\n💰 **Food & Dining**\n• Cook meals at home - saves ₹2000-3000/month\n• Use mess/hostel facilities instead of ordering out\n• Buy groceries in bulk with friends\n\n🚌 **Transportation**\n• Use student bus passes (50-70% discount)\n• Share auto/cab rides with classmates\n• Walk or cycle for nearby destinations\n\n📱 **Smart Shopping**\n• Use student discounts (Amazon Prime, Spotify, etc.)\n• Buy used textbooks and sell them later\n• Use apps like Paytm, PhonePe for cashback offers\n\n🎯 **Target**: Save at least 20% of your pocket money!"
    },
    {
      question: "budget",
      answer: "Here's a practical budget breakdown for Indian college students:\n\n📊 **Monthly Budget Guide (₹10,000 pocket money)**\n\n🏠 **Needs (50% - ₹5,000)**\n• Food & Meals: ₹2,500\n• Transportation: ₹1,000\n• Education/Books: ₹1,000\n• Phone/Internet: ₹500\n\n🎬 **Wants (30% - ₹3,000)**\n• Entertainment: ₹1,500\n• Shopping: ₹1,000\n• Outings with friends: ₹500\n\n💰 **Savings (20% - ₹2,000)**\n• Emergency fund: ₹1,000\n• Future goals: ₹1,000\n\n💡 Adjust percentages based on your income!"
    },
    {
      question: "education loan",
      answer: "Smart strategies for managing education loans:\n\n📋 **Before Taking a Loan**\n• Compare interest rates from different banks\n• Check for student loan subsidies\n• Consider government schemes like Vidya Lakshmi\n\n💳 **During Studies**\n• Most loans have moratorium period (no EMI during studies)\n• Interest usually accrues - pay if possible\n• Maintain good academic performance for benefits\n\n💰 **Repayment Tips**\n• Start with part-time work in final year\n• Look for loan repayment assistance from employers\n• Consider prepayment to reduce total interest\n\n🎯 Popular banks: SBI, HDFC, ICICI offer competitive rates!"
    },
    {
      question: "part-time job",
      answer: "Best part-time opportunities for Indian students:\n\n💻 **Online/Remote Work**\n• Content Writing: ₹200-500 per article\n• Tutoring: ₹300-800 per hour\n• Data Entry: ₹150-300 per hour\n• Social Media Management: ₹5,000-15,000/month\n\n🏪 **Local Opportunities**\n• Event Management: ₹500-1,500 per event\n• Food delivery (weekends): ₹300-600 per day\n• Retail jobs: ₹8,000-12,000/month\n\n🎓 **Campus Jobs**\n• Teaching Assistant: ₹5,000-10,000/month\n• Library Assistant: ₹4,000-8,000/month\n• Research Assistant: ₹8,000-15,000/month\n\n⚖️ Balance work with studies - max 15-20 hours/week!"
    },
    {
      question: "investing",
      answer: "Smart investing guide for students with limited money:\n\n🚀 **Start Small, Start Now**\n• Begin with ₹500-1,000 per month\n• Time is your biggest advantage as a student!\n\n💰 **Best Options for Students**\n• **SIP in Mutual Funds**: ₹500/month minimum\n• **PPF**: ₹500-1,50,000 yearly (15-year lock-in)\n• **ELSS**: Tax benefits + growth potential\n• **Index Funds**: Low cost, diversified\n\n📱 **Easy Platforms**\n• Groww, Zerodha Coin, Paytm Money\n• Zero commission, easy KYC process\n\n⚠️ **Important**\n• Build emergency fund first (₹10,000-20,000)\n• Never invest borrowed money\n• Learn basics before investing\n\n🎯 Even ₹1,000/month can become ₹15+ lakhs in 10 years!"
    },
    {
      question: "credit card",
      answer: "Student credit cards in India - Benefits & Tips:\n\n💳 **Popular Student Cards**\n• SBI Student Plus Card\n• HDFC ForexPlus Card\n• ICICI Student Travel Card\n• Axis Bank Insta Easy Credit Card\n\n✅ **Benefits**\n• Build credit history early\n• Online payment security\n• Cashback on purchases (1-5%)\n• Travel insurance (some cards)\n• Lower income requirements\n\n⚠️ **Smart Usage Rules**\n• Pay full amount before due date\n• Keep utilization below 30%\n• Don't withdraw cash (high charges)\n• Set spending alerts\n\n📋 **Requirements**\n• Age: 18+ years\n• Student ID proof\n• Parent as guarantor (often required)\n• Minimal income proof\n\n🎯 Use responsibly to build good credit score!"
    }
  ];

  useEffect(() => {
    // Initial welcome message
    const welcomeMessage: ChatMessage = {
      id: crypto.randomUUID(),
      content: "Hello! 👋 I'm your Smart Finance Assistant, specially designed for Indian college students. I can help you with budgeting, saving money, managing loans, and making smart financial decisions. What would you like to know about managing your money as a student?",
      sender: 'ai',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Find matching tip
    const matchingTip = financialTips.find(tip => 
      message.includes(tip.question) || 
      tip.question.split(' ').some(word => message.includes(word))
    );
    
    if (matchingTip) {
      return matchingTip.answer;
    }

    // General responses based on keywords
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! 😊 I'm here to help you with your finances as a student. You can ask me about budgeting, saving money, managing expenses, or any financial planning questions. What's on your mind?";
    }
    
    if (message.includes('thank')) {
      return "You're welcome! 😊 I'm always here to help you make smart financial decisions. Feel free to ask more questions anytime!";
    }

    if (message.includes('scholarship')) {
      return "Great question about scholarships! 🎓\n\n**Popular Scholarship Portals:**\n• National Scholarship Portal (NSP)\n• Buddy4Study\n• Scholarships.gov.in\n• University-specific scholarships\n\n**Tips to Win:**\n• Apply early and to multiple scholarships\n• Maintain good academic performance\n• Write compelling essays\n• Get strong recommendation letters\n• Meet all eligibility criteria\n\nScholarships can significantly reduce your education costs!";
    }

    if (message.includes('internship') || message.includes('intern')) {
      return "Internships are excellent for students! 💼\n\n**Benefits:**\n• Gain practical experience\n• Earn ₹5,000-25,000/month\n• Build network and skills\n• Improve resume\n\n**Where to Find:**\n• Internshala\n• LinkedIn\n• Angel.co\n• Company websites\n• Campus placement cell\n\n**Types:**\n• Paid internships (preferred)\n• Unpaid but valuable experience\n• Remote internships\n• Summer internships\n\nStart applying 2-3 months before you want to begin!";
    }

    if (message.includes('tax')) {
      return "Tax basics for students in India! 📊\n\n**When to Pay Tax:**\n• If annual income > ₹2.5 lakhs\n• Includes internship, part-time job income\n\n**Tax-Saving Options:**\n• Section 80C: PPF, ELSS, life insurance\n• Section 80E: Education loan interest\n• Section 80D: Medical insurance\n\n**For Students:**\n• Most students don't need to pay tax\n• Keep income receipts for records\n• Parents can claim your education expenses\n\n**ITR Filing:**\n• Mandatory if income > ₹2.5 lakhs\n• Use ITR-1 form (for salary income)\n• File online on income tax portal";
    }

    if (message.includes('mobile') || message.includes('phone')) {
      return "Smart mobile expense management! 📱\n\n**Save on Mobile Bills:**\n• Choose student plans (Jio, Airtel, Vi offer student discounts)\n• Use WiFi whenever possible\n• Avoid premium SMS/call services\n• Share family plans if possible\n\n**Budget Allocation:**\n• Keep mobile expenses under ₹300-500/month\n• Consider prepaid over postpaid for better control\n\n**Money-Making Apps:**\n• Google Pay, Paytm for cashback\n• Survey apps for small earnings\n• Avoid get-rich-quick app scams\n\nYour phone should help save money, not drain it!";
    }

    // Default response with suggestions
    return "I'd love to help you with that! 🤔 While I may not have specific information about your question right now, I can assist with:\n\n• 💰 Money-saving tips for students\n• 📊 Budget planning and management\n• 🎓 Education loan guidance\n• 💼 Part-time job suggestions\n• 💳 Student credit cards\n• 📈 Basic investing for beginners\n• 🏦 Banking tips for students\n\nTry asking about any of these topics, or use one of the quick questions below!";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: crypto.randomUUID(),
        content: generateAIResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-screen flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary mb-2 font-roboto flex items-center">
          <Bot className="h-8 w-8 mr-3 text-secondary" />
          Smart Finance Assistant
        </h1>
        <p className="text-gray-600 font-open-sans">Get personalized financial advice for Indian college students</p>
      </div>

      {/* Quick Questions */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-primary mb-3 font-roboto flex items-center">
          <HelpCircle className="h-5 w-5 mr-2" />
          Quick Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuickQuestion(question)}
              className="text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors font-open-sans text-sm"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.sender === 'user' ? 'bg-blue-500' : 'bg-green-500'
              }`}>
                {message.sender === 'user' ? (
                  <User className="h-5 w-5 text-white" />
                ) : (
                  <Bot className="h-5 w-5 text-white" />
                )}
              </div>
              
              <div className={`flex-1 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block max-w-xs md:max-w-md lg:max-w-lg p-4 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <div className="whitespace-pre-line font-open-sans text-sm md:text-base">
                    {message.content}
                  </div>
                </div>
                <div className={`text-xs text-gray-500 mt-1 ${
                  message.sender === 'user' ? 'text-right' : 'text-left'
                }`}>
                  {message.timestamp.toLocaleTimeString('en-IN', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="bg-gray-100 p-4 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about student finances..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent font-open-sans"
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex items-center justify-center mt-3 text-xs text-gray-500 font-open-sans">
            <Lightbulb className="h-4 w-4 mr-1" />
            AI responses are for educational purposes. Consult financial advisors for personalized advice.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartAssistant;