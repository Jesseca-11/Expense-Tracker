import React, { useState } from 'react'
import { dispatch } from '../hook'
import { login } from './authSlice'
import { Eye, EyeOff, Lock, User } from 'lucide-react'

const Login = () => {
    const appDispatch = dispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try{
            appDispatch(login({email, password}))
        } catch (err) {
            alert("Invalid credentials")
        }
    }

  return (
    <div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3 max-w-sm mx-auto'>
        <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input type="email"
        placeholder='email'
        value={email}
        onChange={e => setEmail(e.target.value)}
        className='border p-3 rounded pl-10 pr-10 w-full'
        required
         />
         </div>

         <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
         <input type={showPassword ? "text" : "password"}
         placeholder='password'
         value={password}
         onChange={e => setPassword(e.target.value)}
         className='w-full pl-10  px-4 py-2 pr-10 border rounded dark:bg-gray-700 dark:text-white'
         required
          />
          <button type='button' onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 hover:text-gray-700 ">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
          </div>
          <button type='submit' className="bg-blue-500 text-white px-4 py-2 rounded ">Login</button>
      </form>
    </div>
  )
}

export default Login
