import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Clubs from "./pages/Clubs";
import Contacts from "./pages/Contacts";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Question from "./pages/Question";
import ClubAdmin from "./pages/ClubAdmin";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import ClubPage from "./pages/ClubPage";
import Admin from "./pages/Admin";
import About from "./pages/About";
import { Toaster } from "sonner";
import ResetPassword from "./pages/ResetPassword";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import AdminPrivateRoute from "./components/AdminPrivateRoute";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/question" element={<Question />} />
            <Route path="/clubadmin" element={<PrivateRoute />}>
              <Route path="" element={<ClubAdmin />} />
            </Route>
            <Route path="/" element={<AdminPrivateRoute />}>
              <Route path="/admin" element={<Admin />} />
            </Route>
            <Route path="/about" element={<About />} />
            <Route path="/clubs/club-page" element={<ClubPage />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Routes>
          <Footer />
          <Toaster position="top-right" autoClose={3000} richColors />
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
