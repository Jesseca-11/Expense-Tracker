import React, { useState } from "react";
import { dispatch } from "../hook";
import { register } from "./authSlice";

const Register = () => {
  const appDispatch = dispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole]=useState<"admin" | "user">("user")

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    appDispatch(register({
        id: crypto.randomUUID(),
        name, 
        email, 
        password,
        role,
    }));

    setName('')
    setEmail("")
    setPassword("")
    setRole("user")
  };

  return (
    <div className="max-w-lg mx-auto">
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow "
      >
        {/* <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">Creat Account</h2> */}
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-3 rounded "
          required
        />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 rounded "
          required
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 rounded "
          required
        />
        <select value={role}
        onChange={e => setRole(e.target.value as "admin" | "user") }
         >
            <option value="user">User</option>
            <option value="admin">Admin</option>
         </select>

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 transition font-semibold  py-2 rounded-lg shadow text-white" >Register</button>
      </form>
    </div>
  );
};

export default Register;
