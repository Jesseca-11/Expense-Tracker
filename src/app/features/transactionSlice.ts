import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "./transactionTypes";


type TransactionState = {
    transactions: Transaction[];
}

const saved = localStorage.getItem("transactions")
const initialState: TransactionState = {
    transactions: saved ? JSON.parse(saved) : []
}

const transactionSlice = createSlice({
    name: "transactions",
    initialState,
    reducers:{
        addTransaction: (state, action:PayloadAction<Transaction>) => {
            state.transactions.push(action.payload)
            localStorage.setItem("transactions", JSON.stringify(state.transactions))
        },
        deleteTransaction: (state, action: PayloadAction<string> ) => {
            state.transactions = state.transactions.filter(
                (t) => t.id !== action.payload
            );
            localStorage.setItem("transactions", JSON.stringify(state.transactions))
        },
        editTransaction: (state, action: PayloadAction<Transaction>) => {
            const index = state.transactions.findIndex(t => t.id === action.payload.id);
            if(index !== -1){
                state.transactions[index] = action.payload
                localStorage.setItem("transactions", JSON.stringify(state.transactions))
            }
        }
    },
})

export default transactionSlice.reducer;
export const {addTransaction, deleteTransaction, editTransaction } = transactionSlice.actions;