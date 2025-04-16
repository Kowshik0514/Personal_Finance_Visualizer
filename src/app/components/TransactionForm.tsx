import { FormEvent, ChangeEvent } from 'react';

interface Category {
  _id: string;
  name: string;
}

interface TransactionFormProps {
  formData: {
    amount: string;
    description: string;
    date: string;
    category: string;
  };
  editingTransaction: any;
  editingFormData: {
    amount: string;
    description: string;
    date: string;
    category: string;
  };
  categories: Category[];
  error: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: FormEvent) => void;
  handleUpdate: (e: FormEvent) => void;
  handleCancelEdit: () => void;
  handleEditInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function TransactionForm({
  formData,
  editingTransaction,
  editingFormData,
  categories,
  error,
  handleInputChange,
  handleSubmit,
  handleUpdate,
  handleCancelEdit,
  handleEditInputChange,
}: TransactionFormProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
      </h2>
      <form onSubmit={editingTransaction ? handleUpdate : handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={editingTransaction ? editingFormData.amount : formData.amount}
            onChange={editingTransaction ? handleEditInputChange : handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={editingTransaction ? editingFormData.description : formData.description}
            onChange={editingTransaction ? handleEditInputChange : handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={editingTransaction ? editingFormData.date : formData.date}
            onChange={editingTransaction ? handleEditInputChange : handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            id="category"
            name="category"
            value={editingTransaction ? editingFormData.category : formData.category}
            onChange={editingTransaction ? handleEditInputChange : handleInputChange}
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
        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {editingTransaction ? 'Update Transaction' : 'Add Transaction'}
          </button>
          {editingTransaction && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="flex-1 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
} 