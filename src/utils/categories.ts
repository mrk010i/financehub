export const STUDENT_EXPENSE_CATEGORIES = [
  'Food & Snacks',
  'Transportation', 
  'Education & Books',
  'Entertainment',
  'Housing & Rent',
  'Miscellaneous'
];

export const STUDENT_INCOME_CATEGORIES = [
  'Pocket Money',
  'Part-time Job',
  'Scholarship',
  'Freelancing',
  'Other Income'
];

export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'Food & Snacks': '#E74C3C',
    'Transportation': '#3498DB',
    'Education & Books': '#9B59B6',
    'Entertainment': '#F39C12',
    'Housing & Rent': '#34495E',
    'Miscellaneous': '#95A5A6',
    'Pocket Money': '#27AE60',
    'Part-time Job': '#3498DB',
    'Scholarship': '#8E44AD',
    'Freelancing': '#F39C12',
    'Other Income': '#16A085'
  };
  return colors[category] || '#95A5A6';
};

export const getCategoryIcon = (category: string): string => {
  const icons: Record<string, string> = {
    'Food & Snacks': '🍔',
    'Transportation': '🚌',
    'Education & Books': '📚',
    'Entertainment': '🎬',
    'Housing & Rent': '🏠',
    'Miscellaneous': '📦',
    'Pocket Money': '💰',
    'Part-time Job': '💼',
    'Scholarship': '🎓',
    'Freelancing': '💻',
    'Other Income': '💸'
  };
  return icons[category] || '💰';
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};