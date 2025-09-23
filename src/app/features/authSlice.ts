import { createSlice, PayloadAction } from "@reduxjs/toolkit";




type User = {
    id: string 
    email: string;
    password: string;
    name?: string;
    role: "admin" | "user";
}
export  type AuthState = {
    user: User | null;
 }

 const initialUser = JSON.parse(localStorage.getItem("user") || "null")
 const initialState: AuthState = {user: initialUser}

 export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        register: (state, action: PayloadAction<User>) => {
            const users:User[] = JSON.parse(localStorage.getItem("users") || "[]");
            // const role: "admin" | "user" = action.payload.email.includes("admin") ? "admin" : "user";
            const newUser: User = {...action.payload, role: action.payload.role || "user",}
            users.push(newUser)
            localStorage.setItem("users", JSON.stringify(users));

            state.user = newUser;
            localStorage.setItem("user", JSON.stringify(newUser));
        },
        login: (state, action: PayloadAction<{ email: string; password: string}>) => {
            const users: User[] = JSON.parse(localStorage.getItem("users") || "[]")
            const existingUser = users.find(
                (u: User) => u.email === action.payload.email && u.password === action.payload.password
            );
            
            if(existingUser){
                if(!existingUser.role)existingUser.role = "user";
                state.user = existingUser;
                localStorage.setItem("user", JSON.stringify(existingUser))
            }else {
                throw new Error("Invalid credentials")
            }
        },
        logout: (state) => {
            state.user = null
            localStorage.removeItem("user")
        },
    },
 });

 export const {register, login, logout} = authSlice.actions;
 export default authSlice.reducer;