import React from 'react'
import { dispatch, selector } from '../hook'
import { toggleTheme } from './themeSlice'

const ToggleTheme = () => {
    const addDispatch = dispatch()
    const dark = selector((state) => state.theme.dark)
  return (
    <div>
      <button
      onClick={() => addDispatch(toggleTheme() )}
      className='flex items-center gap-2 rounded-lg px-4 py-4  shadow-sm transition bg-white hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:bg-gray-700 '
      >
        {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </div>
  )
}

export default ToggleTheme
