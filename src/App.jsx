import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import TeamPage from './pages/TeamPage'
import TeamMemberPage from './pages/TeamMemberPage'
import PartnersPage from './pages/PartnersPage'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/team/:slug" element={<TeamMemberPage />} />
        <Route path="/partners" element={<PartnersPage />} />
      </Routes>
    </>
  )
}

export default App
