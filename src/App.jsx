import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Clubs from './pages/Clubs'
import Contacts from './pages/Contacts'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

function App() {

  return (
    <>
      <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clubs" element={<Clubs/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/contacts" element={<Contacts/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
      <Footer/>
      </Router>
    </>
  )
}

export default App
