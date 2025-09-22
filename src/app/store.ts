import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./features/transactionSlice"
import { themeSlice } from "./features/themeSlice";
import { authSlice } from "./features/authSlice";


export const store = configureStore({
    reducer: {
        transactions: transactionReducer ,
        theme: themeSlice.reducer,
        auth: authSlice.reducer, 
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch