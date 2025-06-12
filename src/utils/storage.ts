import { Expense, Budget } from '../types';

const EXPENSES_KEY = 'student_finance_expenses';
const BUDGETS_KEY = 'student_finance_budgets';
const BACKUP_KEY = 'student_finance_backup';

export const saveExpenses = (expenses: Expense[]): void => {
  localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
  // Auto-backup
  localStorage.setItem(BACKUP_KEY, JSON.stringify({
    expenses,
    timestamp: new Date().toISOString()
  }));
};

export const loadExpenses = (): Expense[] => {
  const stored = localStorage.getItem(EXPENSES_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveBudgets = (budgets: Budget[]): void => {
  localStorage.setItem(BUDGETS_KEY, JSON.stringify(budgets));
};

export const loadBudgets = (): Budget[] => {
  const stored = localStorage.getItem(BUDGETS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const exportToCSV = (expenses: Expense[]): void => {
  const headers = ['Date', 'Category', 'Description', 'Amount (₹)', 'Type'];
  const csvContent = [
    headers.join(','),
    ...expenses.map(expense => [
      expense.date,
      expense.category,
      `"${expense.description}"`,
      expense.amount.toString(),
      expense.type
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `student_expenses_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  window.URL.revokeObjectURL(url);
};

export const exportToPDF = (expenses: Expense[]): void => {
  // Simple HTML to PDF approach
  const htmlContent = `
    <html>
      <head>
        <title>Student Expense Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          h1 { color: #2C3E50; }
        </style>
      </head>
      <body>
        <h1>Student Expense Report</h1>
        <p>Generated on: ${new Date().toLocaleDateString('en-IN')}</p>
        <table>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount (₹)</th>
            <th>Type</th>
          </tr>
          ${expenses.map(expense => `
            <tr>
              <td>${new Date(expense.date).toLocaleDateString('en-IN')}</td>
              <td>${expense.category}</td>
              <td>${expense.description}</td>
              <td>₹${expense.amount}</td>
              <td>${expense.type}</td>
            </tr>
          `).join('')}
        </table>
      </body>
    </html>
  `;
  
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.print();
  }
};