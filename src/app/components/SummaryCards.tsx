interface SummaryCardsProps {
  totalExpenses: number;
  transactionCount: number;
  categoryCount: number;
}

export default function SummaryCards({ totalExpenses, transactionCount, categoryCount }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-600">Total Expenses</h3>
        <p className="text-2xl font-bold">${totalExpenses.toFixed(2)}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-600">Transactions</h3>
        <p className="text-2xl font-bold">{transactionCount}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-600">Categories</h3>
        <p className="text-2xl font-bold">{categoryCount}</p>
      </div>
    </div>
  );
} 