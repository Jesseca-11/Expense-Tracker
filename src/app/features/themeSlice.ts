import { createSlice } from "@reduxjs/toolkit";



 export type Themestate = {
    dark: boolean,
}

const saved = localStorage.getItem("darkMode") === "true";

const initialState: Themestate = {
    dark: saved,
}

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.dark = !state.dark;
            localStorage.setItem("darkMode", String(state.dark))
        }
    }
})


export const {toggleTheme} = themeSlice.actions;
export default themeSlice.reducer;