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
import Admin from './pages/Admin'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Notices from './pages/Notices'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <>
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
        <Route path="/admin" element={<Admin/>} />
        <Route path="/clubadmin" element={<ClubAdmin/>} />
      </Routes>
      <Footer/>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  )
}

export default App
