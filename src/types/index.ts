export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: 'expense' | 'income';
}

export interface Budget {
  category: string;
  limit: number;
  spent: number;
  percentage: number;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface StudentTip {
  id: string;
  title: string;
  description: string;
  category: 'saving' | 'earning' | 'budgeting' | 'investing';
  icon: string;
}

export type NavigationTab = 'home' | 'budget-tools' | 'insights' | 'assistant';