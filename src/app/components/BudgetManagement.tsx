import { FormEvent, ChangeEvent } from 'react';

interface Category {
  _id: string;
  name: string;
  color?: string;
}

interface BudgetManagementProps {
  currentMonth: string;
  setCurrentMonth: (month: string) => void;
  budgetFormData: {
    category: string;
    amount: string;
  };
  categories: Category[];
  error: string;
  categorySpending: Array<{
    category: string;
    spent: number;
    budget: number;
    remaining: number;
    statusColor: string;
  }>;
  handleBudgetSubmit: (e: FormEvent) => void;
  handleBudgetInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function BudgetManagement({
  currentMonth,
  setCurrentMonth,
  budgetFormData,
  categories,
  error,
  categorySpending,
  handleBudgetSubmit,
  handleBudgetInputChange,
}: BudgetManagementProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Set Monthly Budgets</h2>
        <div>
          <label htmlFor="month-selector" className="block text-sm font-medium text-gray-700">Select Month</label>
          <input
            type="month"
            id="month-selector"
            value={currentMonth}
            onChange={(e) => setCurrentMonth(e.target.value)}
            className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <form onSubmit={handleBudgetSubmit} className="space-y-4">
        <div>
          <label htmlFor="budget-category" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            id="budget-category"
            name="category"
            value={budgetFormData.category}
            onChange={handleBudgetInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budget-amount" className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            id="budget-amount"
            name="amount"
            value={budgetFormData.amount}
            onChange={handleBudgetInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
            min="0"
            step="0.01"
            placeholder="Enter budget amount"
          />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Set Budget
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Budgets for {new Date(currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 font-medium text-gray-500 text-sm">
            <div>Category</div>
            <div className="text-right">Budget</div>
            <div className="text-right">Remaining</div>
          </div>
          {categorySpending.map((category) => {
            const categoryInfo = categories.find(c => c.name === category.category);
            return (
              <div key={category.category} className="grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: categoryInfo?.color || '#888888' }}
                  />
                  <span>{category.category}</span>
                </div>
                <div className="text-right">${category.budget.toFixed(2)}</div>
                <div className={`text-right ${category.statusColor}`}>
                  ${category.remaining.toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 