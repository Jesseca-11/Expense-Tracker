import React from 'react'
import { selector } from '../app/hook'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const IncomeExpenseChart = () => {
    const {transactions} = selector((state) => state.transactions);

    const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)

    const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0) 

    const data = [
        {name: "income", value: income},
        {name: "expense", value: expense}
    ]

  return (
    <div className='bg-white shadow p-4 rounded'>
        <h2 className="text-lg font-bold mb-4">Income vs Expense</h2>
        <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
                <XAxis dataKey={"name"} />
                <YAxis />
                <Tooltip />
                <Bar dataKey= "value" fill='#4f46e5' radius={[6, 6, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
      
    </div>
  )
}

export default IncomeExpenseChart
