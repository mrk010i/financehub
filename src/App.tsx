import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import BudgetTools from './components/BudgetTools';
import SpendingInsights from './components/SpendingInsights';
import SmartAssistant from './components/SmartAssistant';
import FloatingChat from './components/FloatingChat';
import { NavigationTab } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage setActiveTab={setActiveTab} />;
      case 'budget-tools':
        return <BudgetTools />;
      case 'insights':
        return <SpendingInsights />;
      case 'assistant':
        return <SmartAssistant />;
      default:
        return <HomePage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      <main className="min-h-screen">
        {renderActiveComponent()}
      </main>

      {/* Floating Chat - Only show when not on assistant page */}
      {activeTab !== 'assistant' && (
        <FloatingChat onOpenFullChat={() => setActiveTab('assistant')} />
      )}
    </div>
  );
}

export default App;