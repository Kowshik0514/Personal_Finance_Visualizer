import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface Category {
  _id: string;
  name: string;
  color: string;
}

interface MonthlyExpensesChartProps {
  monthlyData: Array<{
    monthYear: string;
    total: number;
    [key: string]: any;
  }>;
  categories: Category[];
}

export default function MonthlyExpensesChart({ monthlyData, categories }: MonthlyExpensesChartProps) {
  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={monthlyData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="monthYear" 
              interval={0}
            />
            <YAxis />
            <Tooltip 
              formatter={(value: number, name: string) => [`$${value.toFixed(2)}`, name]}
              labelFormatter={(label) => label}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const total = payload.reduce((sum, item) => sum + (item.value as number), 0);
                  return (
                    <div className="bg-white p-4 border border-gray-200 rounded shadow">
                      <p className="font-semibold">{label}</p>
                      {payload.map((entry, index) => (
                        <p key={`item-${index}`} style={{ color: entry.color }}>
                          {entry.name}: ${(entry.value as number).toFixed(2)}
                        </p>
                      ))}
                      <p className="font-semibold mt-2">Total: ${total.toFixed(2)}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            {categories.map((category) => (
              <Bar
                key={category._id}
                dataKey={category.name}
                stackId="a"
                fill={category.color}
                name={category.name}
              />
            ))}
            <Bar
              dataKey="Uncategorized"
              stackId="a"
              fill="#8884d8"
              name="Uncategorized"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 