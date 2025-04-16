import { useState, useEffect } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Category {
  _id: string;
  name: string;
  color: string;
}

interface Transaction {
  _id: string;
  amount: number;
  date: string;
  description: string;
  category: string;
}

interface TransactionFABProps {
  categories: Category[];
  formData: {
    date: string;
    description: string;
    category: string;
    amount: string;
  };
  editingTransaction: Transaction | null;
  editingFormData: {
    date: string;
    description: string;
    category: string;
    amount: string;
  };
  error: string | null;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleUpdate: (e: React.FormEvent) => void;
  handleCancelEdit: () => void;
  handleEditInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function TransactionFAB({
  categories,
  formData,
  editingTransaction,
  editingFormData,
  error,
  isOpen,
  onOpen,
  onClose,
  handleInputChange,
  handleSubmit,
  handleUpdate,
  handleCancelEdit,
  handleEditInputChange,
}: TransactionFABProps) {
  return (
    <>
      {!isOpen && (
        <button
          onClick={onOpen}
          className="fixed bottom-8 right-8 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          aria-label="Add transaction"
        >
          <PlusIcon className="h-6 w-6" />
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
                aria-label="Close"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={editingTransaction ? handleUpdate : handleSubmit} className="space-y-4">
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
                  min="0"
                  step="0.01"
                />
              </div>

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {editingTransaction ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
} 