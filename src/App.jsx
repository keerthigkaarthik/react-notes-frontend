import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import AllNotes from './pages/AllNotes'
import NewNote from './pages/NewNote'
import SingleNotePage from './pages/SingleNotePage'
import {
  BrowserRouter as Router, Routes, Route
} from "react-router-dom"

function App() {
  const [darkMode, setDarkMode] = useState(true) // Initialize with dark mode on

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <Router>
      <div className={`container ${darkMode ? 'dark' : ''}`}>
        <div className='app'>
          <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <Routes>
            <Route path="/" element={<AllNotes />} />
            <Route path="/notes/:id" element={<SingleNotePage />} />
            <Route path="/newnote" element={<NewNote />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App