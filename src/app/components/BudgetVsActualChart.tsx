import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useState } from 'react';

interface BudgetVsActualChartProps {
  categorySpending: Array<{
    category: string;
    spent: number;
    budget: number;
  }>;
  currentMonth: string;
  onMonthChange: (month: string) => void;
}

export default function BudgetVsActualChart({ categorySpending, currentMonth, onMonthChange }: BudgetVsActualChartProps) {
  const [selectedYear, setSelectedYear] = useState(new Date(currentMonth).getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date(currentMonth).getMonth());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i);

  const handleMonthChange = (monthIndex: number) => {
    setSelectedMonth(monthIndex);
    const newDate = new Date(selectedYear, monthIndex);
    onMonthChange(newDate.toISOString().slice(0, 7));
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    const newDate = new Date(year, selectedMonth);
    onMonthChange(newDate.toISOString().slice(0, 7));
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Budget vs Actual</h2>
        <div className="flex gap-2">
          <select
            value={selectedYear}
            onChange={(e) => handleYearChange(Number(e.target.value))}
            className="px-3 py-1 border rounded-md text-sm"
            title="Select Year"
            aria-label="Select Year"
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <select
            value={selectedMonth}
            onChange={(e) => handleMonthChange(Number(e.target.value))}
            className="px-3 py-1 border rounded-md text-sm"
            title="Select Month"
            aria-label="Select Month"
          >
            {months.map((month, index) => (
              <option key={month} value={index}>{month}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={categorySpending}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="category" 
              angle={-45} 
              textAnchor="end"
              height={100}
              interval={0}
            />
            <YAxis />
            <Tooltip 
              formatter={(value: number, name: string) => [
                `$${value.toFixed(2)}`, 
                name === 'Budget' ? 'Budget' : 'Expense'
              ]}
              labelFormatter={(label) => label}
            />
            <Legend />
            <Bar 
              dataKey="budget" 
              fill="#8884d8" 
              name="Budget" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="spent" 
              fill="#82ca9d" 
              name="Actual" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}