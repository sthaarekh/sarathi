import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Clubs from './pages/Clubs'
import Contacts from './pages/Contacts'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Question from './pages/Question'
import ClubAdmin from './pages/ClubAdmin'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Notices from './pages/Notices'
import SarathiState from './context/SarathiState'
import ClubPage from './pages/ClubPage'
import Admin from './pages/Admin'
import { Toaster, toast } from 'sonner';

function App() {

  return (
    <>
    <SarathiState>
      <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clubs" element={<Clubs/>} />
        <Route path="/contacts" element={<Contacts/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/question" element={<Question/>} />
        <Route path="/notices" element={<Notices/>} />
        <Route path="/clubadmin" element={<ClubAdmin/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/clubs/:id" element={<ClubPage/>} />
      </Routes>
      <Footer/>
      <Toaster position="top-right" autoClose={3000} richColors />
      </Router>
    </SarathiState>
    </>
  )
}

export default App
