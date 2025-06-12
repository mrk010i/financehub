import { Expense, Budget } from '../types';

export const SAMPLE_EXPENSES: Expense[] = [
  // Current month expenses
  {
    id: '1',
    amount: 250,
    category: 'Food & Snacks',
    description: 'College canteen lunch',
    date: new Date(2025, 0, 15).toISOString().split('T')[0],
    type: 'expense'
  },
  {
    id: '2',
    amount: 80,
    category: 'Transportation',
    description: 'Bus fare to college',
    date: new Date(2025, 0, 15).toISOString().split('T')[0],
    type: 'expense'
  },
  {
    id: '3',
    amount: 1200,
    category: 'Education & Books',
    description: 'Engineering textbook',
    date: new Date(2025, 0, 14).toISOString().split('T')[0],
    type: 'expense'
  },
  {
    id: '4',
    amount: 300,
    category: 'Entertainment',
    description: 'Movie with friends',
    date: new Date(2025, 0, 13).toISOString().split('T')[0],
    type: 'expense'
  },
  {
    id: '5',
    amount: 150,
    category: 'Food & Snacks',
    description: 'Chai and samosa',
    date: new Date(2025, 0, 13).toISOString().split('T')[0],
    type: 'expense'
  },
  {
    id: '6',
    amount: 500,
    category: 'Miscellaneous',
    description: 'Mobile recharge',
    date: new Date(2025, 0, 12).toISOString().split('T')[0],
    type: 'expense'
  },
  {
    id: '7',
    amount: 200,
    category: 'Food & Snacks',
    description: 'Dinner at hostel mess',
    date: new Date(2025, 0, 12).toISOString().split('T')[0],
    type: 'expense'
  },
  {
    id: '8',
    amount: 120,
    category: 'Transportation',
    description: 'Auto rickshaw',
    date: new Date(2025, 0, 11).toISOString().split('T')[0],
    type: 'expense'
  },
  {
    id: '9',
    amount: 800,
    category: 'Education & Books',
    description: 'Lab equipment',
    date: new Date(2025, 0, 10).toISOString().split('T')[0],
    type: 'expense'
  },
  {
    id: '10',
    amount: 350,
    category: 'Entertainment',
    description: 'Gaming cafe with friends',
    date: new Date(2025, 0, 9).toISOString().split('T')[0],
    type: 'expense'
  },
  {
    id: '11',
    amount: 180,
    category: 'Food & Snacks',
    description: 'Street food',
    date: new Date(2025, 0, 8).toISOString().split('T')[0],
    type: 'expense'
  },
  {
    id: '12',
    amount: 2500,
    category: 'Housing & Rent',
    description: 'Hostel mess fees',
    date: new Date(2025, 0, 5).toISOString().split('T')[0],
    type: 'expense'
  },
  {
    id: '13',
    amount: 400,
    category: 'Miscellaneous',
    description: 'Stationery supplies',
    date: new Date(2025, 0, 4).toISOString().split('T')[0],
    type: 'expense'
  },
  {
    id: '14',
    amount: 250,
    category: 'Transportation',
    description: 'Weekly bus pass',
    date: new Date(2025, 0, 3).toISOString().split('T')[0],
    type: 'expense'
  },
  {
    id: '15',
    amount: 600,
    category: 'Entertainment',
    description: 'Concert tickets',
    date: new Date(2025, 0, 2).toISOString().split('T')[0],
    type: 'expense'
  },

  // Income entries
  {
    id: '16',
    amount: 8000,
    category: 'Pocket Money',
    description: 'Monthly allowance from parents',
    date: new Date(2025, 0, 1).toISOString().split('T')[0],
    type: 'income'
  },
  {
    id: '17',
    amount: 3000,
    category: 'Part-time Job',
    description: 'Tutoring younger students',
    date: new Date(2025, 0, 7).toISOString().split('T')[0],
    type: 'income'
  },
  {
    id: '18',
    amount: 1500,
    category: 'Freelancing',
    description: 'Content writing project',
    date: new Date(2025, 0, 10).toISOString().split('T')[0],
    type: 'income'
  },

  // Previous month data for trends
  {
    id: '19',
    amount: 2800,
    category: 'Food & Snacks',
    description: 'Monthly food expenses',
    date: new Date(2024, 11, 25).toISOString().split('T')[0],
    type: 'expense'
  },
  {
    id: '20',
    amount: 1200,
    category: 'Transportation',
    description: 'December transport',
    date: new Date(2024, 11, 20).toISOString().split('T')[0],
    type: 'expense'
  },
  {
    id: '21',
    amount: 1800,
    category: 'Education & Books',
    description: 'Semester books',
    date: new Date(2024, 11, 15).toISOString().split('T')[0],
    type: 'expense'
  },
  {
    id: '22',
    amount: 900,
    category: 'Entertainment',
    description: 'December entertainment',
    date: new Date(2024, 11, 10).toISOString().split('T')[0],
    type: 'expense'
  },
  {
    id: '23',
    amount: 2500,
    category: 'Housing & Rent',
    description: 'December hostel fees',
    date: new Date(2024, 11, 5).toISOString().split('T')[0],
    type: 'expense'
  },
  {
    id: '24',
    amount: 800,
    category: 'Miscellaneous',
    description: 'December miscellaneous',
    date: new Date(2024, 11, 1).toISOString().split('T')[0],
    type: 'expense'
  },

  // November data
  {
    id: '25',
    amount: 2600,
    category: 'Food & Snacks',
    description: 'November food expenses',
    date: new Date(2024, 10, 25).toISOString().split('T')[0],
    type: 'expense'
  },
  {
    id: '26',
    amount: 1100,
    category: 'Transportation',
    description: 'November transport',
    date: new Date(2024, 10, 20).toISOString().split('T')[0],
    type: 'expense'
  },
  {
    id: '27',
    amount: 2200,
    category: 'Education & Books',
    description: 'Mid-sem preparation books',
    date: new Date(2024, 10, 15).toISOString().split('T')[0],
    type: 'expense'
  },
  {
    id: '28',
    amount: 1200,
    category: 'Entertainment',
    description: 'Diwali celebrations',
    date: new Date(2024, 10, 10).toISOString().split('T')[0],
    type: 'expense'
  },

  // October data
  {
    id: '29',
    amount: 2400,
    category: 'Food & Snacks',
    description: 'October food expenses',
    date: new Date(2024, 9, 25).toISOString().split('T')[0],
    type: 'expense'
  },
  {
    id: '30',
    amount: 1000,
    category: 'Transportation',
    description: 'October transport',
    date: new Date(2024, 9, 20).toISOString().split('T')[0],
    type: 'expense'
  },

  // September data
  {
    id: '31',
    amount: 2700,
    category: 'Food & Snacks',
    description: 'September food expenses',
    date: new Date(2024, 8, 25).toISOString().split('T')[0],
    type: 'expense'
  },
  {
    id: '32',
    amount: 1300,
    category: 'Transportation',
    description: 'September transport',
    date: new Date(2024, 8, 20).toISOString().split('T')[0],
    type: 'expense'
  },

  // August data
  {
    id: '33',
    amount: 2900,
    category: 'Food & Snacks',
    description: 'August food expenses',
    date: new Date(2024, 7, 25).toISOString().split('T')[0],
    type: 'expense'
  },
  {
    id: '34',
    amount: 1400,
    category: 'Transportation',
    description: 'August transport',
    date: new Date(2024, 7, 20).toISOString().split('T')[0],
    type: 'expense'
  }
];

export const SAMPLE_BUDGETS: Budget[] = [
  {
    category: 'Food & Snacks',
    limit: 3000,
    spent: 2530,
    percentage: 84.3
  },
  {
    category: 'Transportation',
    limit: 1500,
    spent: 950,
    percentage: 63.3
  },
  {
    category: 'Education & Books',
    limit: 2000,
    spent: 2000,
    percentage: 100
  },
  {
    category: 'Entertainment',
    limit: 1000,
    spent: 1250,
    percentage: 125
  },
  {
    category: 'Housing & Rent',
    limit: 5000,
    spent: 2500,
    percentage: 50
  },
  {
    category: 'Miscellaneous',
    limit: 1000,
    spent: 900,
    percentage: 90
  }
];

export const initializeSampleData = (): void => {
  // Only add sample data if no data exists
  const existingExpenses = localStorage.getItem('student_finance_expenses');
  const existingBudgets = localStorage.getItem('student_finance_budgets');
  
  if (!existingExpenses) {
    localStorage.setItem('student_finance_expenses', JSON.stringify(SAMPLE_EXPENSES));
  }
  
  if (!existingBudgets) {
    localStorage.setItem('student_finance_budgets', JSON.stringify(SAMPLE_BUDGETS));
  }
};