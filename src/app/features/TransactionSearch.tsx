import React, { useState } from 'react'
import { Transaction } from './transactionTypes'


type search = {
    transactions: Transaction[]
    onSearch: (results: Transaction[]) => void
}

const TransactionSearch = ({transactions, onSearch}: search) => {
    const [query, setQuery]= useState("");

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const topic = e.target.value.toLowerCase();
        setQuery(topic);

        const result = transactions.filter(t => t.title.toLowerCase().includes(topic) || 
        t.category.toLowerCase().includes(topic)
    )

    onSearch(result)

    }

  return (
    <div className='p-4 bg-white shadow rounded mb-4'>
        <input type="text"
        value={query}
        onChange={handleSearch}
        placeholder='🔍 Search Transactions....'
        className='w-full rounded-lg border p-2 '
         />
      
    </div>
  )
}

export default TransactionSearch
