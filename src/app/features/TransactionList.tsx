import React, { useState } from 'react'
import { dispatch, selector } from '../hook'
import { deleteTransaction } from './transactionSlice'
import { Transaction } from './transactionTypes'
import TransactionForm from './TransactionForm'



type Props = {
    filtered? : Transaction[]
}

const TransactionList = ({filtered}:Props) => {
    const {transactions} = selector((state) => state.transactions )
    const addDispatch = dispatch()
    const [edited, setEdited] = useState<Transaction | null>(null)
    const list = filtered || transactions


  return (
    <div className='p-2 md:p-4 bg-white dark:bg-gray-800 rounded shadow mt-4'>
        <h2 className='text-xl font-bold mb-4'>📋 Transactions</h2>
        {edited && (
            <div className="mb-4">
                <TransactionForm editedTransaction ={edited} onClose = {() => setEdited(null)} />
            </div>
        )}

        {list.length === 0 ? (
            <p className="text-grey-500 dark:text-gray-400"> No transactions yet.</p>
        ) : (
            <table className='w-full text-sm md:text-lg text-center border-collapse ps-4'>
                <thead className=' '>
                    <tr className="border-b dark:border-gray-700 ">
                        <th className="py-2">Description</th>
                        <th className="py-2">Amount</th>
                        <th className="py-2">Type</th>
                        <th className="py-2">Category</th>
                        <th className="py-2">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((tx) => (
                        <tr key={tx.id} className="border-b last:border-none dark:border-gray-700">
                            <td className="py-2">{tx.title}</td>
                            <td className={`py-2 font-semibold ${tx.type === "income" ? "text-green-500" : "text-red-500"}`}>{tx.amount}</td>
                            <td className="py-2 capitalize">{tx.type}</td>
                            <td className="py-2">{tx.category}</td>
                            <td className="py-2 text-sm text-gray-500">{new Date(tx.date).toLocaleDateString()}</td>
                            <td className="py-2">
                                <button onClick={() => setEdited(tx)} className="text-green-500 hover:text-green-700">edit</button>
                            </td>
                            <td className="py-2">
                                <button onClick={() => addDispatch(deleteTransaction(tx.id))} className='text-red-500 hover:text-red-700 text-xl'>x</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
    
        )}
        { edited  && (
                <div className="mt-4">
                <h3 className='font-bold mb-2'> Edit Transaction</h3>
                <TransactionForm editedTransaction={edited} onClose={() => setEdited(null)} />
                </div>
            )}
    </div>
  )
}

export default TransactionList
