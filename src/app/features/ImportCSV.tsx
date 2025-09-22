import React, { ChangeEvent } from 'react'
import { dispatch } from '../hook'
import { Transaction } from './transactionTypes'
import { addTransaction } from './transactionSlice'


const ImportCSV = () => {
    const appDispatch = dispatch()

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file)return;

        const reader = new FileReader();

        reader.onload = (event) => {
            const text = event.target?.result as string;

            const rows = text.split("\n").map(row => row.trim()).filter(Boolean)
            const headers = rows[0].split(",").map(head => head.trim());

            const dataRows = rows.slice(1)

            dataRows.forEach((row) => {
                const values = row.split(",").map((v) => v.replace(/"/g, "").trim())

                const tx: Transaction = {
                    id: values[headers.indexOf("id")] || String(Date.now()),
                    title: values[headers.indexOf("title")],
                    amount: Number(values[headers.indexOf("amount")]),
                    type: values[headers.indexOf("type")] as "income" | "expense",
                    category: values[headers.indexOf("category")],
                    date: values[headers.indexOf("date")] || new Date().toISOString(),
                };
                 appDispatch(addTransaction(tx));
            })
            alert("Transaction  imported successfully 🚀")
        }
        reader.readAsText(file)


    }
  return (
    <div className='p-4 rounded mt-1'>
      {/* <label className="block mb-4 font-bold">Import Transaction (CSV)</label> */}
      <input type="file"
      accept='.csv' 
      onChange={handleFileUpload}
      className='w-[80%] border rounded p-2 '
       />
    </div>
  )
}

export default ImportCSV
