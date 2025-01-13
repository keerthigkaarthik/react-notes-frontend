import React from 'react'
import { Moon, Sun } from 'lucide-react'

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <div className="app-header">
      <div>Django + React Notes App</div>
      <button 
        onClick={toggleDarkMode}
        className="dark-mode-toggle"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </div>
  )
}

export default Header