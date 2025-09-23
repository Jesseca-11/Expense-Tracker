import React, { useState } from 'react'
import { Transaction } from './transactionTypes'
import { selector } from '../hook'

type filters = {
    onFilter: (filtered: Transaction[]) => void;
}

const TransactionFilter = ({onFilter}: filters) => {
    const {transactions} = selector((state) => state.transactions)
    const [type, setType] = useState<"all" | "income" | "expense">("all")
    const [categorys, setCategorys] = useState("all")

    const categories = Array.from(new Set(transactions.map((t) => t.category)) )

    const handleFilter = () => {
        let filtering = [...transactions];
        if(type !== "all") filtering = filtering.filter(t => t.type === type)
        if(categorys !== "all")
          filtering = filtering.filter(t => t.category === categorys)
         onFilter(filtering)
        
    }
  return (
    <div className='w-full p-4 bg-white dark:text-gray-800 runded-lg shadow-sm mb-4 flex gap-3'>
      <select value={type} 
      onChange={(e) => setType(e.target.value as "all" | "income" | "expense") }
      className='p-2 border rounded-lg text-sm '
      >
        <option value="all">All</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select value={categorys}
      onChange={e => setCategorys(e.target.value)}
      className='p-2 border rounded-lg '
      >
        <option value="all">All Categories</option>
        {categories.map(cat => (
            <option value={cat} key={cat}>{cat}</option>
        ))}
      </select>
      <button className="bg-blue-400 hover:bg-blue-600 text-white rounded-lg px-4 py-2 shadow" onClick={handleFilter}>Apply</button>
    </div>
  )
}

export default TransactionFilter
