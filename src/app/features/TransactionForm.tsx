import React, { useEffect, useState } from 'react'
import { dispatch } from '../hook'
import { Transaction } from './transactionTypes';
import { addTransaction, editTransaction } from './transactionSlice';


type props = {
    editedTransaction?: Transaction | null;
    onClose? : () => void; 
}

const TransactionForm = ({editedTransaction, onClose}: props) => {
    const appDispatch = dispatch();
    const [title, setTitle] = useState("");
    const [amount,  setAmount] = useState<number>(0);
    const [type, setType] = useState<"income" | "expense">("income")
    const [category, setCategory] = useState("General")


       useEffect(() => {
        if (editedTransaction){
            setTitle(editedTransaction.title)
            setAmount(editedTransaction.amount)
            setType(editedTransaction.type)
            setCategory(editedTransaction.category)
        }
       }, [editedTransaction]) 


    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        if(!title || !amount || !category)return;

        const newTransaction: Transaction = {
            id: editedTransaction ? editedTransaction.id : String(Date.now()),
            title,
            amount: Number(amount),
            type,
            category,
            date: editedTransaction ? editedTransaction.date : new Date().toISOString(),
        };

        if(editedTransaction){
            appDispatch(editTransaction(newTransaction))
            onClose?.();
        }else{
            appDispatch(addTransaction(newTransaction));
        }

        setTitle("");
        setCategory("General");
        setAmount(0);
        setType("income")
    }
    

    return (
        <div className='p-6 bg-white dark:text-gray-800 rounded-lg shadow'>
        <h3 className='text-lg font-bold mb-4'>
            {editedTransaction ? "Edit Transaction" : "Add Transaction"}
        </h3>
      <form onSubmit={handleSubmit} className=' space-y-4' >
        <input type="text"
        placeholder='title'
        value={title}
        onChange={e => setTitle(e.target.value) }
        className='w-full p-2 border rounded-lg '
        required
         />
         <input type="number"
         placeholder='amount'
         value={amount}
         onChange={e => setAmount(Number(e.target.value))}
        className='w-full p-2 border rounded-lg '
        required
          />
          <select value={type}
          onChange={e => setType(e.target.value as "income" | "expense")}
          className='w-full p-2 border rounded-lg '
           >
            <option value="income">income</option>
            <option value="expense">expense</option>
          </select>
          <input type="text" 
          placeholder='category'
          value={category}
          onChange={e => setCategory(e.target.value)}
          className='w-full p-2 border rounded-lg '
          />
          <button type='submit' className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600'>
            {editedTransaction ? "update" : "Add"}
          </button>

        {editedTransaction && (
            <button className="ml-2 text-grat-600 underline"
            onClick={onClose}
            type='button'
            >
                Cancel
            </button>
        )}

      </form>
    </div>
  )
}

export default TransactionForm
