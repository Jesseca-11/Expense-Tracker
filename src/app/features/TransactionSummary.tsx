import React from 'react'
import { selector } from '../hook'

const TransactionSummary = () => {
    const {transactions} = selector(state => state.transactions)

    const income = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)

    const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

    const balance = income - expense

  return (
    <div className='flex md:flex-col-3 gap-4  '>
      <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg text-center">
        <h3 className="text-lg font-bold text-green-700 dark:text-green-300">Income</h3>
        <p className="text-2xl font-semibold">${income}</p>
      </div>
      <div className="p-4 bg-red-100 dark:bg-red-900 rounded-lg text-center">
        <h3 className="text-lg font-bold text-red-700 dark:text-red-300">Expense</h3>
        <p className="text-2xl font-semibold">${expense}</p>
      </div>
      <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded text-center">
        <h3 className="text-lg font-bold text-blue-600 dark:text-blue-300">Balance</h3>
        <p className="text-2xl font-semibold">${balance}</p>
      </div>
    </div>
  )
}

export default TransactionSummary
