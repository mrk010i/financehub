import { useState, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import BudgetTools from './components/BudgetTools';
import SpendingInsights from './components/SpendingInsights';
import SmartAssistant from './components/SmartAssistant';
import FloatingChat from './components/FloatingChat';
import { NavigationTab } from './types';
import { auth, signInWithGoogle, logout } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'home': return <HomePage setActiveTab={setActiveTab} />;
      case 'budget-tools': return <BudgetTools />;
      case 'spending-insights': return <SpendingInsights />;
      case 'smart-assistant': return <SmartAssistant />;
      default: return <HomePage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* LOGIN HEADER */}
      <div className="bg-white shadow-sm p-4 flex justify-between items-center z-20 relative">
        <h1 className="text-xl font-bold text-blue-600">FinanceHub</h1>
        <div>
          {user ? (
            <div className="flex items-center gap-3">
              {user.photoURL && <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full" />}
              <span className="font-medium text-gray-700 hidden sm:block">{user.displayName}</span>
              <button onClick={logout} className="text-sm text-red-500 font-semibold">Logout</button>
            </div>
          ) : (
            <button onClick={signInWithGoogle} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
              Sign in with Google
            </button>
          )}
        </div>
      </div>

      <Header activeTab={activeTab} setActiveTab={setActiveTab} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      <main className="flex-grow container mx-auto px-4 py-8">{renderActiveComponent()}</main>
      <FloatingChat />
    </div>
  );
}

export default App;