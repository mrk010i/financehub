import React from 'react';
import { TrendingUp, Menu, X } from 'lucide-react';
import { NavigationTab } from '../types';

interface HeaderProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  activeTab, 
  setActiveTab, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}) => {
  const navItems = [
    { id: 'home' as NavigationTab, label: 'Home' },
    { id: 'budget-tools' as NavigationTab, label: 'Budget Tools' },
    { id: 'insights' as NavigationTab, label: 'Spending Insights' },
    { id: 'assistant' as NavigationTab, label: 'Smart Assistant' },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b-2 border-mint-green/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-8 w-8 text-secondary" />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-primary font-roboto">FinanceHub</span>
              <span className="text-xs text-gray-500 font-open-sans">For Students</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 font-open-sans ${
                  activeTab === item.id
                    ? 'text-white bg-secondary shadow-md'
                    : 'text-gray-700 hover:text-secondary hover:bg-green-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-secondary p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-slide-up">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 font-open-sans ${
                  activeTab === item.id
                    ? 'text-white bg-secondary'
                    : 'text-gray-700 hover:text-secondary hover:bg-green-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;