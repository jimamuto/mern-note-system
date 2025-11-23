import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import CreateNotePage from './pages/CreateNotePage.jsx'
import EditNotePage from './pages/EditNotePage.jsx'
import ViewNotePage from './pages/ViewNotePage.jsx'

const App = () => {
  return (
    <Router>
      <div data-theme="aqua" className="min-h-screen bg-base-200 flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreateNotePage />} />
            <Route path="/note/:id" element={<ViewNotePage />} />
            <Route path="/edit/:id" element={<EditNotePage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </Router>
  )
}

export default App