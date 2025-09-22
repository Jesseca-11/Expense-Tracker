import React from 'react'
import { selector } from '../app/hook';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ["#4f46e5", "#f87171", "#34d399", "#fbbf24", "#a78bfa", "#f472b6"];

const CategoryPieChart = () => {
    const {transactions} = selector((state) => state.transactions)

    const categories = transactions.reduce((acc: Record<string, number>, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
    }, {}) 

    const data = Object.entries(categories).map(([name, value]) => ({name, value}));
    
  return (
    <div className='bg-white shadow p-4 rounded'>
        <h2 className="text-lg font-bold mb-3">Spending by Category</h2>
        <ResponsiveContainer width="100%" height={250}>
            <PieChart>
                <Pie
                data={data}
                dataKey="value" 
                cx="50%"
                cy="50%"
                outerRadius={90}
                // fill='#8884d8'
                label
                >
                    {data.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    </div>
  )
}

export default CategoryPieChart
