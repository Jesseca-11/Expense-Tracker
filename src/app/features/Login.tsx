import React, { useState } from 'react'
import { dispatch } from '../hook'
import { login } from './authSlice'

const Login = () => {
    const appDispatch = dispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

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
        <input type="email"
        placeholder='email'
        value={email}
        onChange={e => setEmail(e.target.value)}
        className='border p-3 rounded'
        required
         />
         <input type="password"
         placeholder='password'
         value={password}
         onChange={e => setPassword(e.target.value)}
         className='border p-3 rounded'
         required
          />
          <button type='submit' className="bg-blue-500 text-white px-4 py-2 rounded ">Login</button>
      </form>
    </div>
  )
}

export default Login
