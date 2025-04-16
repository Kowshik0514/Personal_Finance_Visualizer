import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface Category {
  _id: string;
  name: string;
  color: string;
}

interface CategoryPieChartProps {
  pieData: Array<{
    name: string;
    value: number;
  }>;
  categories: Category[];
}

export default function CategoryPieChart({ pieData, categories }: CategoryPieChartProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Expenses by Category</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={categories.find(c => c.name === entry.name)?.color || '#8884d8'} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 