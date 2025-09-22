import React, { useState } from "react";
import { dispatch } from "../hook";
import { register } from "./authSlice";
import { Eye, EyeOff, Lock, Mail, Shield, User } from "lucide-react";

const Register = () => {
  const appDispatch = dispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"admin" | "user">("user");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    appDispatch(
      register({
        id: crypto.randomUUID(),
        name,
        email,
        password,
        role,
      })
    );

    setName("");
    setEmail("");
    setPassword("");
    setRole("user");
  };

  return (
    <div className="max-w-lg mx-auto">
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow "
      >
        <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-3 rounded pl-10 pr-10 w-full "
          required
        />
        </div>

         <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 rounded pl-10 pr-10 w-full "
          required
        />
        </div>
        <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full  pl-10 pr-10 border p-3 rounded "
            required
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <div className="relative">
          <Shield
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as "admin" | "user")}
            className="w-full pl-10 pr-4 py-3 outline-none border rounded-lg bg-white dark:bg-gray-700 dark:text-whit"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition font-semibold  py-2 rounded-lg shadow text-white"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
