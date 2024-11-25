import './App.css'
import Navbar from './components/Navbar'
import Contacts from './pages/Contacts'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <>
      <Navbar/>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/contacts" element={<Contacts/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
