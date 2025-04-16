import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

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

interface RecentTransactionsProps {
  recentTransactions: Transaction[];
  categories: Category[];
  deletingId: string | null;
  handleEdit: (transaction: Transaction) => void;
  handleDelete: (id: string) => void;
}

export default function RecentTransactions({
  recentTransactions,
  categories,
  deletingId,
  handleEdit,
  handleDelete,
}: RecentTransactionsProps) {
  const [showAll, setShowAll] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [transactionToDelete, setTransactionToDelete] = useState<Transaction | null>(null);
  const [editFormData, setEditFormData] = useState({
    amount: '',
    description: '',
    date: '',
    category: '',
  });
  const transactionsPerPage = 5;

  const allTransactions = recentTransactions;
  const totalPages = Math.ceil(allTransactions.length / transactionsPerPage);
  const startIndex = (currentPage - 1) * transactionsPerPage;
  const endIndex = startIndex + transactionsPerPage;
  const displayedTransactions = showAll 
    ? allTransactions.slice(startIndex, endIndex)
    : allTransactions.slice(0, transactionsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const startEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setEditFormData({
      amount: transaction.amount.toString(),
      description: transaction.description,
      date: new Date(transaction.date).toISOString().split('T')[0],
      category: transaction.category,
    });
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveEdit = () => {
    if (editingTransaction) {
      handleEdit({
        ...editingTransaction,
        amount: parseFloat(editFormData.amount),
        description: editFormData.description,
        date: editFormData.date,
        category: editFormData.category,
      });
      setEditingTransaction(null);
    }
  };

  const cancelEdit = () => {
    setEditingTransaction(null);
  };

  const confirmDelete = () => {
    if (transactionToDelete) {
      handleDelete(transactionToDelete._id);
      setTransactionToDelete(null);
    }
  };

  const cancelDelete = () => {
    setTransactionToDelete(null);
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Transactions</h2>
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            onClick={() => setShowAll(false)}
            className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
              !showAll 
                ? 'bg-indigo-600 text-white border-indigo-600' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
            aria-current={!showAll ? 'page' : undefined}
          >
            Recent
          </button>
          <button
            onClick={() => setShowAll(true)}
            className={`px-4 py-2 text-sm font-medium rounded-r-lg border-t border-r border-b ${
              showAll 
                ? 'bg-indigo-600 text-white border-indigo-600' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
            aria-current={showAll ? 'page' : undefined}
          >
            All
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayedTransactions.map((transaction) => (
              <tr key={transaction._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editingTransaction?._id === transaction._id ? (
                    <input
                      type="date"
                      name="date"
                      value={editFormData.date}
                      onChange={handleEditInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      title="Transaction date"
                      aria-label="Transaction date"
                    />
                  ) : (
                    new Date(transaction.date).toLocaleDateString()
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editingTransaction?._id === transaction._id ? (
                    <input
                      type="text"
                      name="description"
                      value={editFormData.description}
                      onChange={handleEditInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      title="Transaction description"
                      aria-label="Transaction description"
                      placeholder="Enter description"
                    />
                  ) : (
                    transaction.description
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editingTransaction?._id === transaction._id ? (
                    <select
                      name="category"
                      value={editFormData.category}
                      onChange={handleEditInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      title="Transaction category"
                      aria-label="Transaction category"
                    >
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    categories.find(c => c._id === transaction.category)?.name || 'Uncategorized'
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editingTransaction?._id === transaction._id ? (
                    <input
                      type="number"
                      name="amount"
                      value={editFormData.amount}
                      onChange={handleEditInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      title="Transaction amount"
                      aria-label="Transaction amount"
                      placeholder="Enter amount"
                    />
                  ) : (
                    `$${transaction.amount.toFixed(2)}`
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {editingTransaction?._id === transaction._id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={saveEdit}
                        className="text-green-600 hover:text-green-900"
                        title="Save"
                      >
                        <CheckIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="text-red-600 hover:text-red-900"
                        title="Cancel"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>
                  ) : transactionToDelete?._id === transaction._id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={confirmDelete}
                        className="text-green-600 hover:text-green-900"
                        title="Confirm Delete"
                      >
                        <CheckIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={cancelDelete}
                        className="text-red-600 hover:text-red-900"
                        title="Cancel Delete"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEdit(transaction)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setTransactionToDelete(transaction)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAll && (
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`p-2 rounded-md ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
              title="Previous page"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-md ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
              title="Next page"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
          <span className="text-sm text-gray-500">
            Showing {startIndex + 1}-{Math.min(endIndex, allTransactions.length)} of {allTransactions.length} transactions
          </span>
        </div>
      )}
    </div>
  );
} 