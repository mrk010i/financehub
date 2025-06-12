import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { ChatMessage } from '../types';

interface FloatingChatProps {
  onOpenFullChat: () => void;
}

const FloatingChat: React.FC<FloatingChatProps> = ({ onOpenFullChat }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  const quickResponses = [
    "How to save money as a student?",
    "Best budget apps for students?",
    "Student loan tips",
    "Part-time job ideas"
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: crypto.randomUUID(),
        content: getQuickResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getQuickResponse = (message: string): string => {
    const msg = message.toLowerCase();
    
    if (msg.includes('save') || msg.includes('money')) {
      return "Great question! Here are 3 quick money-saving tips for students:\n\n1. Cook at home - saves ₹2000+/month\n2. Use student discounts everywhere\n3. Share textbooks with friends\n\nFor detailed advice, click 'Open Full Chat' below!";
    }
    
    if (msg.includes('budget') || msg.includes('app')) {
      return "For budgeting, I recommend the 50-30-20 rule:\n• 50% needs\n• 30% wants  \n• 20% savings\n\nThis chat has limited features. Click 'Open Full Chat' for comprehensive budgeting help!";
    }
    
    return "Thanks for your question! For detailed financial guidance and personalized advice, please use the full Smart Assistant. Click 'Open Full Chat' below!";
  };

  const handleQuickResponse = (response: string) => {
    setInputMessage(response);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-secondary hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-pulse-slow"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
        
        {/* Tooltip */}
        <div className="absolute bottom-16 right-0 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
          Ask financial questions!
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 h-96 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col">
      {/* Header */}
      <div className="bg-secondary text-white p-4 rounded-t-xl flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot className="h-5 w-5" />
          <span className="font-semibold font-roboto">Quick Finance Help</span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:text-gray-200 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 space-y-3">
            <Bot className="h-8 w-8 mx-auto text-secondary" />
            <p className="text-sm font-open-sans">Hi! I'm your finance assistant. Ask me anything about student finances!</p>
            
            {/* Quick Response Buttons */}
            <div className="space-y-2">
              {quickResponses.map((response, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickResponse(response)}
                  className="block w-full text-left p-2 bg-green-50 hover:bg-green-100 rounded text-xs text-green-700 transition-colors font-open-sans"
                >
                  {response}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg text-sm font-open-sans ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="whitespace-pre-line">{message.content}</div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-3">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about finances..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-secondary focus:border-transparent font-open-sans"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="bg-secondary text-white px-3 py-2 rounded hover:bg-green-600 transition-colors disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        
        <button
          onClick={onOpenFullChat}
          className="w-full mt-2 text-xs text-secondary hover:text-green-600 transition-colors font-medium font-open-sans"
        >
          Open Full Chat for Detailed Help →
        </button>
      </div>
    </div>
  );
};

export default FloatingChat;