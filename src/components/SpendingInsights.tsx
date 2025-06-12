import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { TrendingUp, TrendingDown, DollarSign, Calendar, Target, AlertCircle } from 'lucide-react';
import { Expense } from '../types';
import { loadExpenses } from '../utils/storage';
import { formatCurrency, getCategoryColor, getCategoryIcon } from '../utils/categories';
import { initializeSampleData } from '../utils/sampleData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const SpendingInsights: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');
  const [insights, setInsights] = useState({
    totalSpent: 0,
    averageDaily: 0,
    topCategory: '',
    trend: 'neutral' as 'up' | 'down' | 'neutral',
    savingsRate: 0
  });

  useEffect(() => {
    // Initialize sample data if no data exists
    initializeSampleData();
    setExpenses(loadExpenses());
  }, []);

  useEffect(() => {
    calculateInsights();
  }, [expenses, selectedPeriod]);

  const calculateInsights = () => {
    const filteredExpenses = getFilteredExpenses();
    const filteredIncome = expenses.filter(e => e.type === 'income' && isInPeriod(e.date));
    
    const totalSpent = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const totalIncome = filteredIncome.reduce((sum, income) => sum + income.amount, 0);
    const daysInPeriod = getDaysInPeriod();
    const averageDaily = daysInPeriod > 0 ? totalSpent / daysInPeriod : 0;
    
    // Find top spending category
    const categoryTotals = filteredExpenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);
    
    const topCategory = Object.entries(categoryTotals).reduce((a, b) => 
      categoryTotals[a[0]] > categoryTotals[b[0]] ? a : b, ['', 0]
    )[0];

    // Calculate trend (comparing with previous period)
    const previousPeriodExpenses = getPreviousPeriodExpenses();
    const previousTotal = previousPeriodExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    let trend: 'up' | 'down' | 'neutral' = 'neutral';
    
    if (totalSpent > previousTotal * 1.1) trend = 'up';
    else if (totalSpent < previousTotal * 0.9) trend = 'down';

    const savingsRate = totalIncome > 0 ? ((totalIncome - totalSpent) / totalIncome) * 100 : 0;

    setInsights({
      totalSpent,
      averageDaily,
      topCategory,
      trend,
      savingsRate
    });
  };

  const getFilteredExpenses = (): Expense[] => {
    return expenses.filter(expense => 
      expense.type === 'expense' && isInPeriod(expense.date)
    );
  };

  const isInPeriod = (dateStr: string): boolean => {
    const date = new Date(dateStr);
    const now = new Date();
    
    switch (selectedPeriod) {
      case 'current-month':
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      case 'last-3-months':
        const threeMonthsAgo = new Date(now);
        threeMonthsAgo.setMonth(now.getMonth() - 3);
        return date >= threeMonthsAgo && date <= now;
      case 'last-6-months':
        const sixMonthsAgo = new Date(now);
        sixMonthsAgo.setMonth(now.getMonth() - 6);
        return date >= sixMonthsAgo && date <= now;
      case 'current-year':
        return date.getFullYear() === now.getFullYear();
      default:
        return true;
    }
  };

  const getDaysInPeriod = (): number => {
    const now = new Date();
    
    switch (selectedPeriod) {
      case 'current-month':
        return now.getDate();
      case 'last-3-months':
        return 90;
      case 'last-6-months':
        return 180;
      case 'current-year':
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        return Math.ceil((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
      default:
        return 30;
    }
  };

  const getPreviousPeriodExpenses = (): Expense[] => {
    const now = new Date();
    
    return expenses.filter(expense => {
      const date = new Date(expense.date);
      
      switch (selectedPeriod) {
        case 'current-month':
          const lastMonth = new Date(now);
          lastMonth.setMonth(now.getMonth() - 1);
          return date.getMonth() === lastMonth.getMonth() && 
                 date.getFullYear() === lastMonth.getFullYear() &&
                 expense.type === 'expense';
        default:
          return false;
      }
    });
  };

  // Chart data preparation
  const getCategoryChartData = () => {
    const filteredExpenses = getFilteredExpenses();
    const categoryTotals = filteredExpenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    const categories = Object.keys(categoryTotals);
    const amounts = Object.values(categoryTotals);
    const colors = categories.map(category => getCategoryColor(category));

    return {
      labels: categories,
      datasets: [{
        data: amounts,
        backgroundColor: colors,
        borderColor: colors.map(color => color + '80'),
        borderWidth: 2,
      }]
    };
  };

  const getMonthlyTrendData = () => {
    const monthlyData: Record<string, number> = {};
    
    expenses.filter(expense => expense.type === 'expense').forEach(expense => {
      const date = new Date(expense.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      monthlyData[monthKey] = (monthlyData[monthKey] || 0) + expense.amount;
    });

    const sortedMonths = Object.keys(monthlyData).sort().slice(-6);
    const amounts = sortedMonths.map(month => monthlyData[month] || 0);
    const labels = sortedMonths.map(month => {
      const [year, monthNum] = month.split('-');
      return new Date(parseInt(year), parseInt(monthNum) - 1).toLocaleDateString('en-IN', { 
        month: 'short', 
        year: '2-digit' 
      });
    });

    return {
      labels,
      datasets: [{
        label: 'Monthly Spending',
        data: amounts,
        borderColor: '#27AE60',
        backgroundColor: '#27AE60',
        tension: 0.4,
        fill: false,
      }]
    };
  };

  const getBudgetComparisonData = () => {
    const filteredExpenses = getFilteredExpenses();
    const categoryTotals = filteredExpenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    // Default budget limits for students
    const budgetLimits = {
      'Food & Snacks': 3000,
      'Transportation': 1500,
      'Education & Books': 2000,
      'Entertainment': 1000,
      'Housing & Rent': 5000,
      'Miscellaneous': 1000
    };

    const categories = Object.keys(budgetLimits);
    const spent = categories.map(category => categoryTotals[category] || 0);
    const budgets = categories.map(category => budgetLimits[category as keyof typeof budgetLimits]);

    return {
      labels: categories,
      datasets: [
        {
          label: 'Spent',
          data: spent,
          backgroundColor: '#E74C3C',
          borderColor: '#C0392B',
          borderWidth: 1,
        },
        {
          label: 'Budget',
          data: budgets,
          backgroundColor: '#27AE60',
          borderColor: '#219A52',
          borderWidth: 1,
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = formatCurrency(context.raw);
            return `${context.label}: ${value}`;
          }
        }
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2 font-roboto">Spending Insights</h1>
            <p className="text-gray-600 font-open-sans">Analyze your spending patterns and financial trends</p>
          </div>
          
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent font-open-sans"
          >
            <option value="current-month">Current Month</option>
            <option value="last-3-months">Last 3 Months</option>
            <option value="last-6-months">Last 6 Months</option>
            <option value="current-year">Current Year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium font-open-sans">Total Spent</p>
              <p className="text-2xl font-bold text-primary font-roboto">{formatCurrency(insights.totalSpent)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium font-open-sans">Daily Average</p>
              <p className="text-2xl font-bold text-primary font-roboto">{formatCurrency(insights.averageDaily)}</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium font-open-sans">Top Category</p>
              <p className="text-lg font-bold text-primary font-roboto">
                {getCategoryIcon(insights.topCategory)} {insights.topCategory || 'N/A'}
              </p>
            </div>
            <Target className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium font-open-sans">Savings Rate</p>
              <p className={`text-2xl font-bold font-roboto ${insights.savingsRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {insights.savingsRate.toFixed(1)}%
              </p>
            </div>
            {insights.trend === 'up' ? (
              <TrendingUp className="h-8 w-8 text-red-500" />
            ) : insights.trend === 'down' ? (
              <TrendingDown className="h-8 w-8 text-green-500" />
            ) : (
              <AlertCircle className="h-8 w-8 text-gray-500" />
            )}
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Category Breakdown */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold text-primary mb-6 font-roboto">Spending by Category</h2>
          <div className="h-80">
            <Pie data={getCategoryChartData()} options={chartOptions} />
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold text-primary mb-6 font-roboto">6-Month Spending Trend</h2>
          <div className="h-80">
            <Line data={getMonthlyTrendData()} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Budget vs Actual */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8">
        <h2 className="text-xl font-semibold text-primary mb-6 font-roboto">Budget vs Actual Spending</h2>
        <div className="h-80">
          <Bar data={getBudgetComparisonData()} options={chartOptions} />
        </div>
      </div>

      {/* Insights and Recommendations */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
          <h2 className="text-xl font-semibold text-primary mb-4 font-roboto">💡 Smart Insights</h2>
          <div className="space-y-3">
            {insights.savingsRate < 10 && (
              <p className="text-orange-700 font-open-sans">
                <strong>💰 Savings Alert:</strong> Your savings rate is {insights.savingsRate.toFixed(1)}%. 
                Try to save at least 20% of your income for a healthier financial future.
              </p>
            )}
            
            {insights.topCategory && (
              <p className="text-blue-700 font-open-sans">
                <strong>📊 Top Spending:</strong> You spend the most on {insights.topCategory}. 
                Consider setting a specific budget for this category.
              </p>
            )}
            
            {insights.trend === 'up' && (
              <p className="text-red-700 font-open-sans">
                <strong>📈 Trend Alert:</strong> Your spending has increased compared to last period. 
                Review your recent expenses to identify areas for reduction.
              </p>
            )}
            
            {insights.trend === 'down' && (
              <p className="text-green-700 font-open-sans">
                <strong>📉 Great Progress:</strong> Your spending has decreased compared to last period. 
                Keep up the good work!
              </p>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
          <h2 className="text-xl font-semibold text-primary mb-4 font-roboto">🎯 Recommendations</h2>
          <div className="space-y-3">
            <p className="text-purple-700 font-open-sans">
              <strong>🍳 Food Savings:</strong> Cook more meals at home to save ₹2000-3000 monthly. 
              Meal prep on weekends for busy weekdays.
            </p>
            
            <p className="text-purple-700 font-open-sans">
              <strong>🚌 Transport:</strong> Use student bus passes or shared transportation 
              to reduce commuting costs by 40-60%.
            </p>
            
            <p className="text-purple-700 font-open-sans">
              <strong>📚 Education:</strong> Buy used textbooks, join study groups to share resources, 
              and take advantage of free online courses.
            </p>
            
            <p className="text-purple-700 font-open-sans">
              <strong>💡 Emergency Fund:</strong> Aim to save ₹500-1000 monthly for unexpected expenses. 
              Start small and increase gradually.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpendingInsights;