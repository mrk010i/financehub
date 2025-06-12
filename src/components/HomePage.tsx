import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  PieChart, 
  MessageCircle, 
  Calculator, 
  Shield, 
  Zap,
  BookOpen,
  Coffee,
  Bus,
  GraduationCap,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { NavigationTab } from '../types';
import { STUDENT_FINANCIAL_TIPS, getRandomTip } from '../utils/studentTips';
import { formatCurrency } from '../utils/categories';
import { initializeSampleData } from '../utils/sampleData';

interface HomePageProps {
  setActiveTab: (tab: NavigationTab) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setActiveTab }) => {
  const [currentTip, setCurrentTip] = useState(getRandomTip());
  const [stats, setStats] = useState({
    avgMonthlyExpense: 8500,
    studentsUsing: 2847,
    moneySaved: 125000
  });

  useEffect(() => {
    // Initialize sample data when homepage loads
    initializeSampleData();
    
    const interval = setInterval(() => {
      setCurrentTip(getRandomTip());
    }, 10000); // Change tip every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Calculator,
      title: 'Budget Tools',
      description: 'Smart budgeting tools designed for student life with Indian expense categories.',
      action: () => setActiveTab('budget-tools'),
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: PieChart,
      title: 'Spending Insights',
      description: 'Visual analytics to understand your spending patterns and identify savings opportunities.',
      action: () => setActiveTab('insights'),
      color: 'from-green-500 to-green-600'
    },
    {
      icon: MessageCircle,
      title: 'Smart Assistant',
      description: 'AI-powered financial advisor with answers to student-specific money questions.',
      action: () => setActiveTab('assistant'),
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const benefits = [
    {
      icon: GraduationCap,
      title: 'Student-Focused',
      description: 'Built specifically for Indian college students with relevant categories and tips.'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your financial data stays on your device. No cloud storage, complete privacy.'
    },
    {
      icon: Zap,
      title: 'Instant Insights',
      description: 'Real-time analysis of your spending with actionable recommendations.'
    }
  ];

  const commonExpenses = [
    { icon: Coffee, category: 'Food & Snacks', amount: 150, description: 'Daily canteen/cafe' },
    { icon: Bus, category: 'Transportation', amount: 80, description: 'Bus/metro daily' },
    { icon: BookOpen, category: 'Education', amount: 500, description: 'Books/stationery' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
              <GraduationCap className="h-4 w-4 mr-2" />
              Made for Indian College Students
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 animate-fade-in font-roboto">
              Master Your Money,
              <span className="text-secondary block mt-2">Shape Your Future</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in font-open-sans">
              Take control of your finances as a student. Track expenses, create budgets, and get smart 
              financial advice tailored for Indian college life. Start your journey to financial independence today.
            </p>
            
            <div className="flex flex-col xs:flex-row gap-4 justify-center animate-slide-up mb-12">
              <button
                onClick={() => setActiveTab('budget-tools')}
                className="bg-secondary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl font-open-sans flex items-center justify-center"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button
                onClick={() => setActiveTab('insights')}
                className="bg-white text-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-primary font-open-sans"
              >
                Track Expenses
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-secondary font-roboto">{formatCurrency(stats.avgMonthlyExpense)}</div>
                <div className="text-gray-600 font-open-sans">Avg Monthly Savings</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-secondary font-roboto">{stats.studentsUsing.toLocaleString()}</div>
                <div className="text-gray-600 font-open-sans">Students Using</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-secondary font-roboto">{formatCurrency(stats.moneySaved)}</div>
                <div className="text-gray-600 font-open-sans">Total Money Saved</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 opacity-10 hidden lg:block">
          <Calculator className="h-24 w-24 text-secondary animate-bounce-subtle" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-10 hidden lg:block">
          <PieChart className="h-32 w-32 text-primary animate-bounce-subtle" style={{ animationDelay: '1s' }} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4 font-roboto">
              Everything You Need for Smart Money Management
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto font-open-sans">
              Comprehensive financial tools designed specifically for Indian college students.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-300 cursor-pointer border border-gray-100 hover:border-green-200"
                onClick={feature.action}
              >
                <div className={`h-14 w-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3 font-roboto">{feature.title}</h3>
                <p className="text-gray-600 mb-4 font-open-sans">{feature.description}</p>
                <div className="text-secondary font-medium hover:text-green-600 transition-colors flex items-center font-open-sans">
                  Explore Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Expenses Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4 font-roboto">
              Track Your Daily Student Expenses
            </h2>
            <p className="text-gray-600 text-lg font-open-sans">
              Common expenses every Indian college student should track
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {commonExpenses.map((expense, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <expense.icon className="h-6 w-6 text-secondary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-primary font-roboto">{expense.category}</h3>
                    <p className="text-gray-600 text-sm font-open-sans">{expense.description}</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-secondary font-roboto">
                  {formatCurrency(expense.amount)}
                  <span className="text-sm text-gray-500 font-normal">/day</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setActiveTab('budget-tools')}
              className="bg-secondary text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors shadow-lg font-open-sans"
            >
              Start Tracking Your Expenses
            </button>
          </div>
        </div>
      </section>

      {/* Student Tip Section */}
      <section className="py-16 bg-gradient-to-r from-green-500 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <Lightbulb className="h-12 w-12 mx-auto mb-4 animate-pulse-slow" />
            <h2 className="text-2xl font-bold mb-2 font-roboto">💡 Student Money Tip</h2>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
            <h3 className="text-xl font-semibold mb-4 font-roboto">{currentTip.title}</h3>
            <p className="text-lg opacity-90 font-open-sans">{currentTip.description}</p>
            <div className="mt-6">
              <span className="inline-flex items-center bg-white/20 px-4 py-2 rounded-full text-sm font-medium font-open-sans">
                {currentTip.icon} {currentTip.category.charAt(0).toUpperCase() + currentTip.category.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4 font-roboto">
              Why Choose FinanceHub?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6">
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3 font-roboto">{benefit.title}</h3>
                <p className="text-gray-600 font-open-sans">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 font-roboto">Ready to Take Control of Your Finances?</h2>
          <p className="text-xl mb-8 opacity-90 font-open-sans">
            Join thousands of Indian students who are building better financial habits.
          </p>
          <button
            onClick={() => setActiveTab('budget-tools')}
            className="bg-secondary text-white px-12 py-4 rounded-xl font-semibold text-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-200 shadow-lg font-open-sans"
          >
            Start Your Financial Journey
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;