import React from 'react'
import { selector } from '../hook'
import { Transaction } from './transactionTypes'


const ExportCSV = () => {
    const transactions = selector((state) => state.transactions.transactions)

    const handleExport = () => {
        if(!transactions.length){
            alert("No transaction to export");
            return;
        }

        const headers = ["id", "title", "amount", "type", "category", "date"];
        const csvRows: string[] = [];

        csvRows.push(headers.join(","))

        transactions.forEach((tx: Transaction) => {
            const values = headers.map(head => `"${(tx as any)[head]}"`)
            csvRows.push(values.join(","))
        })

        const csvContent = csvRows.join("\n")
            
            const blob = new Blob ([csvContent], {type: "text/csv"});
            const url = window.URL.createObjectURL(blob);

            const link  = document.createElement("a");
            link.href = url
            link.download = "transactions.csv"
            link.click();
            window.URL.revokeObjectURL(url)
        }
    
  return (
    <div className='p-4 rounded '>
      <button 
      onClick={handleExport}
      className='px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600'
      >
        ⬇️ Export as CSV
      </button>
      
    </div>
  );
};

export default ExportCSV
