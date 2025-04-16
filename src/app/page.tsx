'use client';

import { useState, useEffect, useRef } from 'react';
import SummaryCards from './components/SummaryCards';
import TransactionForm from './components/TransactionForm';
import CategoryPieChart from './components/CategoryPieChart';
import BudgetManagement from './components/BudgetManagement';
import BudgetVsActualChart from './components/BudgetVsActualChart';
import RecentTransactions from './components/RecentTransactions';
import MonthlyExpensesChart from './components/MonthlyExpensesChart';
import TransactionFAB from './components/TransactionFAB';

interface Transaction {
  _id: string;
  amount: number;
  date: string;
  description: string;
  category: string;
}

interface Category {
  _id: string;
  name: string;
  color: string;
}

interface Budget {
  _id: string;
  category: {
    _id: string;
    name: string;
    color: string;
  };
  amount: number;
  month: string;
}

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().slice(0, 7));
  const [isTransactionFABOpen, setIsTransactionFABOpen] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
  });
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [editingFormData, setEditingFormData] = useState({
    amount: '',
    description: '',
    date: '',
    category: '',
  });
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [budgetFormData, setBudgetFormData] = useState({
    category: '',
    amount: '',
  });

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
    fetchBudgets();
  }, [currentMonth]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/transactions');
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      setError('Failed to fetch transactions');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      setError('Failed to fetch categories');
    }
  };

  const fetchBudgets = async () => {
    try {
      const response = await fetch(`/api/budgets?month=${currentMonth}`);
      const data = await response.json();
      setBudgets(data);
    } catch (error) {
      console.error('Failed to fetch budgets:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create transaction');
      }

      setFormData({
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        category: '',
      });
      await fetchTransactions();
      setIsTransactionFABOpen(false);
    } catch (error) {
      setError('Failed to create transaction');
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete transaction');
      await fetchTransactions();
    } catch (error) {
      console.error('Error deleting transaction:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleAddTransaction = async (transaction: Omit<Transaction, '_id'>) => {
    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
      });
      if (!response.ok) throw new Error('Failed to add transaction');
      await fetchTransactions();
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const handleInlineEdit = (transaction: Transaction) => {
    try {
      fetch(`/api/transactions/${transaction._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
      }).then(() => {
        fetchTransactions();
      });
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTransaction) return;

    const updatedTransaction = {
      ...editingTransaction,
      amount: parseFloat(editingFormData.amount),
      description: editingFormData.description,
      date: editingFormData.date,
      category: editingFormData.category,
    };

    try {
      fetch(`/api/transactions/${editingTransaction._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTransaction),
      }).then(() => {
        fetchTransactions();
        setEditingTransaction(null);
        setEditingFormData({
          amount: '',
          description: '',
          date: '',
          category: '',
        });
      });
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditingFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTransaction) return;

    try {
      const response = await fetch(`/api/transactions/${editingTransaction._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...editingTransaction,
          amount: parseFloat(editingFormData.amount),
          description: editingFormData.description,
          date: editingFormData.date,
          category: editingFormData.category,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update transaction');
      }

      await fetchTransactions();
      setEditingTransaction(null);
      setEditingFormData({
        amount: '',
        description: '',
        date: '',
        category: '',
      });
      setIsTransactionFABOpen(false);
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingTransaction(null);
  };

  const handleMonthChange = (month: string) => {
    setCurrentMonth(month);
  };

  const handleBudgetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (!budgetFormData.category || !budgetFormData.amount) {
        setError('Please select a category and enter an amount');
        return;
      }

      const response = await fetch('/api/budgets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: budgetFormData.category,
          amount: parseFloat(budgetFormData.amount),
          month: currentMonth,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to set budget');
      }

      setBudgetFormData({
        category: '',
        amount: '',
      });
      await fetchBudgets();
    } catch (error) {
      console.error('Budget error:', error);
      setError(error instanceof Error ? error.message : 'Failed to set budget');
    }
  };

  const handleBudgetInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBudgetFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const monthlyData = transactions.reduce((acc: any[], transaction) => {
    const date = new Date(transaction.date);
    const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' });
    const category = categories.find(c => c._id === transaction.category);
    const categoryName = category?.name || 'Uncategorized';
    const categoryColor = category?.color || '#8884d8';

    let monthData = acc.find(item => item.monthYear === monthYear);
    if (!monthData) {
      monthData = { monthYear, total: 0 };
      acc.push(monthData);
    }

    if (!monthData[categoryName]) {
      monthData[categoryName] = 0;
    }
    monthData[categoryName] += transaction.amount;
    monthData[`${categoryName}Color`] = categoryColor;
    monthData.total += transaction.amount;

    return acc;
  }, []).sort((a, b) => {
    const dateA = new Date(a.monthYear);
    const dateB = new Date(b.monthYear);
    return dateA.getTime() - dateB.getTime();
  });

  const pieData = transactions.reduce((acc: any[], transaction) => {
    const category = categories.find(c => c._id === transaction.category);
    const existingCategory = acc.find(item => item.name === (category?.name || 'Uncategorized'));
    if (existingCategory) {
      existingCategory.value += transaction.amount;
    } else {
      acc.push({
        name: category?.name || 'Uncategorized',
        value: transaction.amount,
      });
    }
    return acc;
  }, []);

  const totalExpenses = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const categorySpending = categories.map(category => {
    const budget = budgets.find(b => b.category._id === category._id);
    const spent = transactions
      .filter(t => t.category === category._id)
      .reduce((sum, t) => sum + t.amount, 0);
    const remaining = (budget?.amount || 0) - spent;
    const statusColor = remaining < 0 ? 'text-red-600' : 'text-green-600';
    return {
      category: category.name,
      spent,
      budget: budget?.amount || 0,
      remaining,
      color: category.color,
      statusColor
    };
  });

  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Expense Tracker Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Dashboard and Expenses */}
        <div className="lg:col-span-2 space-y-8">
          <SummaryCards 
            totalExpenses={totalExpenses}
            transactionCount={transactions.length}
            categoryCount={categories.length}
          />

          <CategoryPieChart
            pieData={pieData}
            categories={categories}
          />

          <BudgetVsActualChart
            categorySpending={categorySpending}
            currentMonth={currentMonth}
            onMonthChange={handleMonthChange}
          />
        </div>

        {/* Right Column - Budget Management */}
        <div className="lg:col-span-1">
          <BudgetManagement
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
            budgetFormData={budgetFormData}
            categories={categories}
            error={error}
            categorySpending={categorySpending}
            handleBudgetSubmit={handleBudgetSubmit}
            handleBudgetInputChange={handleBudgetInputChange}
          />
        </div>
      </div>

      {/* Monthly Expenses Chart - Full Width */}
      <div className="mt-8 -mx-4">
        <MonthlyExpensesChart
          monthlyData={monthlyData}
          categories={categories}
        />
      </div>

      <RecentTransactions
        recentTransactions={transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())}
        categories={categories}
        deletingId={deletingId}
        handleEdit={handleInlineEdit}
        handleDelete={handleDelete}
      />

      <TransactionFAB
        categories={categories}
        formData={formData}
        editingTransaction={editingTransaction}
        editingFormData={editingFormData}
        error={error}
        isOpen={isTransactionFABOpen}
        onOpen={() => setIsTransactionFABOpen(true)}
        onClose={() => {
          setIsTransactionFABOpen(false);
          if (editingTransaction) {
            handleCancelEdit();
          }
        }}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        handleUpdate={handleUpdate}
        handleCancelEdit={handleCancelEdit}
        handleEditInputChange={handleEditInputChange}
      />
    </main>
  );
}
