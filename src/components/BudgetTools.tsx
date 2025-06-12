import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Download, Upload, Calendar, Calculator, TrendingUp, AlertTriangle } from 'lucide-react';
import { Expense, Budget } from '../types';
import { STUDENT_EXPENSE_CATEGORIES, STUDENT_INCOME_CATEGORIES, formatCurrency, getCategoryIcon } from '../utils/categories';
import { saveExpenses, loadExpenses, saveBudgets, loadBudgets, exportToCSV, exportToPDF } from '../utils/storage';
import { initializeSampleData } from '../utils/sampleData';

const BudgetTools: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [newExpense, setNewExpense] = useState({
    amount: '',
    category: STUDENT_EXPENSE_CATEGORIES[0],
    description: '',
    date: new Date().toISOString().split('T')[0],
    type: 'expense' as 'expense' | 'income'
  });
  const [filter, setFilter] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    category: 'all'
  });

  useEffect(() => {
    // Initialize sample data if no data exists
    initializeSampleData();
    setExpenses(loadExpenses());
    setBudgets(loadBudgets());
  }, []);

  useEffect(() => {
    updateBudgetTracking();
  }, [expenses]);

  const handleAddExpense = () => {
    if (!newExpense.amount || !newExpense.description) return;

    const expense: Expense = {
      id: crypto.randomUUID(),
      amount: parseFloat(newExpense.amount),
      category: newExpense.category,
      description: newExpense.description,
      date: newExpense.date,
      type: newExpense.type
    };

    const updatedExpenses = [expense, ...expenses];
    setExpenses(updatedExpenses);
    saveExpenses(updatedExpenses);

    setNewExpense({
      amount: '',
      category: newExpense.type === 'expense' ? STUDENT_EXPENSE_CATEGORIES[0] : STUDENT_INCOME_CATEGORIES[0],
      description: '',
      date: new Date().toISOString().split('T')[0],
      type: newExpense.type
    });
  };

  const handleDeleteExpense = (id: string) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
    saveExpenses(updatedExpenses);
  };

  const updateBudgetTracking = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthlyExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && 
             expenseDate.getFullYear() === currentYear &&
             expense.type === 'expense';
    });

    const categoryTotals = STUDENT_EXPENSE_CATEGORIES.reduce((acc, category) => {
      acc[category] = monthlyExpenses
        .filter(expense => expense.category === category)
        .reduce((sum, expense) => sum + expense.amount, 0);
      return acc;
    }, {} as Record<string, number>);

    const updatedBudgets = STUDENT_EXPENSE_CATEGORIES.map(category => {
      const existingBudget = budgets.find(b => b.category === category);
      const spent = categoryTotals[category] || 0;
      const limit = existingBudget?.limit || getDefaultBudgetLimit(category);
      
      return {
        category,
        limit,
        spent,
        percentage: limit > 0 ? (spent / limit) * 100 : 0
      };
    });

    setBudgets(updatedBudgets);
    saveBudgets(updatedBudgets);
  };

  const getDefaultBudgetLimit = (category: string): number => {
    const defaults: Record<string, number> = {
      'Food & Snacks': 3000,
      'Transportation': 1500,
      'Education & Books': 2000,
      'Entertainment': 1000,
      'Housing & Rent': 5000,
      'Miscellaneous': 1000
    };
    return defaults[category] || 1000;
  };

  const updateBudgetLimit = (category: string, limit: number) => {
    const updatedBudgets = budgets.map(budget =>
      budget.category === category ? { ...budget, limit } : budget
    );
    setBudgets(updatedBudgets);
    saveBudgets(updatedBudgets);
  };

  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const matchesMonth = expenseDate.getMonth() === filter.month;
    const matchesYear = expenseDate.getFullYear() === filter.year;
    const matchesCategory = filter.category === 'all' || expense.category === filter.category;
    
    return matchesMonth && matchesYear && matchesCategory;
  });

  const totalIncome = filteredExpenses
    .filter(expense => expense.type === 'income')
    .reduce((sum, expense) => sum + expense.amount, 0);

  const totalExpenses = filteredExpenses
    .filter(expense => expense.type === 'expense')
    .reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2 font-roboto">Budget Tools</h1>
        <p className="text-gray-600 font-open-sans">Manage your income, expenses, and budgets effectively</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-50 p-6 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium font-open-sans">Monthly Income</p>
              <p className="text-2xl font-bold text-green-700 font-roboto">{formatCurrency(totalIncome)}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-red-50 p-6 rounded-xl border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 text-sm font-medium font-open-sans">Monthly Expenses</p>
              <p className="text-2xl font-bold text-red-700 font-roboto">{formatCurrency(totalExpenses)}</p>
            </div>
            <Calculator className="h-8 w-8 text-red-600" />
          </div>
        </div>
        
        <div className={`p-6 rounded-xl border ${totalIncome - totalExpenses >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-orange-50 border-orange-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium font-open-sans ${totalIncome - totalExpenses >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                Balance
              </p>
              <p className={`text-2xl font-bold font-roboto ${totalIncome - totalExpenses >= 0 ? 'text-blue-700' : 'text-orange-700'}`}>
                {formatCurrency(totalIncome - totalExpenses)}
              </p>
            </div>
            {totalIncome - totalExpenses >= 0 ? 
              <TrendingUp className="h-8 w-8 text-blue-600" /> :
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            }
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Add Expense Form */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold text-primary mb-6 font-roboto">Add Transaction</h2>
          
          <div className="space-y-4">
            <div className="flex gap-2">
              <button
                onClick={() => setNewExpense({ ...newExpense, type: 'expense', category: STUDENT_EXPENSE_CATEGORIES[0] })}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors font-open-sans ${
                  newExpense.type === 'expense' 
                    ? 'bg-red-100 text-red-700 border border-red-200' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Expense
              </button>
              <button
                onClick={() => setNewExpense({ ...newExpense, type: 'income', category: STUDENT_INCOME_CATEGORIES[0] })}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors font-open-sans ${
                  newExpense.type === 'income' 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Income
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-open-sans">Amount (₹)</label>
              <input
                type="number"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent font-open-sans"
                placeholder="Enter amount"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-open-sans">Category</label>
              <select
                value={newExpense.category}
                onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent font-open-sans"
              >
                {(newExpense.type === 'expense' ? STUDENT_EXPENSE_CATEGORIES : STUDENT_INCOME_CATEGORIES).map(category => (
                  <option key={category} value={category}>
                    {getCategoryIcon(category)} {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-open-sans">Description</label>
              <input
                type="text"
                value={newExpense.description}
                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent font-open-sans"
                placeholder="What was this for?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-open-sans">Date</label>
              <input
                type="date"
                value={newExpense.date}
                onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent font-open-sans"
              />
            </div>

            <button
              onClick={handleAddExpense}
              className="w-full bg-secondary text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center font-open-sans"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add {newExpense.type === 'expense' ? 'Expense' : 'Income'}
            </button>
          </div>
        </div>

        {/* Budget Limits */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold text-primary mb-6 font-roboto">Budget Limits</h2>
          
          <div className="space-y-4">
            {budgets.map(budget => (
              <div key={budget.category} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-800 font-open-sans">
                    {getCategoryIcon(budget.category)} {budget.category}
                  </span>
                  <span className={`text-sm font-medium ${budget.percentage > 100 ? 'text-red-600' : budget.percentage > 80 ? 'text-orange-600' : 'text-green-600'} font-open-sans`}>
                    {budget.percentage.toFixed(0)}%
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={budget.limit}
                    onChange={(e) => updateBudgetLimit(budget.category, parseFloat(e.target.value) || 0)}
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-secondary focus:border-transparent font-open-sans"
                    placeholder="Budget limit"
                  />
                  <span className="text-sm text-gray-600 font-open-sans">
                    Spent: {formatCurrency(budget.spent)}
                  </span>
                </div>
                
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      budget.percentage > 100 ? 'bg-red-500' : 
                      budget.percentage > 80 ? 'bg-orange-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(budget.percentage, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters and Export */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-xl font-semibold text-primary font-roboto">Transaction History</h2>
          
          <div className="flex flex-wrap gap-3">
            <select
              value={filter.month}
              onChange={(e) => setFilter({ ...filter, month: parseInt(e.target.value) })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent font-open-sans"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {new Date(0, i).toLocaleString('en-IN', { month: 'long' })}
                </option>
              ))}
            </select>
            
            <select
              value={filter.year}
              onChange={(e) => setFilter({ ...filter, year: parseInt(e.target.value) })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent font-open-sans"
            >
              {Array.from({ length: 5 }, (_, i) => (
                <option key={i} value={new Date().getFullYear() - i}>
                  {new Date().getFullYear() - i}
                </option>
              ))}
            </select>
            
            <button
              onClick={() => exportToCSV(filteredExpenses)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center font-open-sans"
            >
              <Download className="h-4 w-4 mr-2" />
              CSV
            </button>
            
            <button
              onClick={() => exportToPDF(filteredExpenses)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center font-open-sans"
            >
              <Download className="h-4 w-4 mr-2" />
              PDF
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700 font-open-sans">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 font-open-sans">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 font-open-sans">Description</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700 font-open-sans">Amount</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700 font-open-sans">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500 font-open-sans">
                    No transactions found for the selected period
                  </td>
                </tr>
              ) : (
                filteredExpenses.map(expense => (
                  <tr key={expense.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-open-sans">
                      {new Date(expense.date).toLocaleDateString('en-IN')}
                    </td>
                    <td className="py-3 px-4 font-open-sans">
                      <span className="inline-flex items-center">
                        {getCategoryIcon(expense.category)} 
                        <span className="ml-2">{expense.category}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 font-open-sans">{expense.description}</td>
                    <td className={`py-3 px-4 text-right font-semibold font-roboto ${
                      expense.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {expense.type === 'income' ? '+' : '-'}{formatCurrency(expense.amount)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleDeleteExpense(expense.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BudgetTools;