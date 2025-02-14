import React, { useState, useContext, useEffect } from "react";
import { Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import SarathiContext from "../context/SarathiContext";
import useAuth from "../context/Hook/useAuth";
import { getAllClubs } from "../utils/api";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminId, setAdminId] = useState(null);
  const context = useContext(SarathiContext);
  const { login } = context;
  const { loginUser, auth, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      if (response) {
        //("Login successful:", response);
        setAdminId(response.data.userId);
        loginUser(response.data.userId, response.data.token);
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email first.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5001/api/v1/clubs/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Password reset link sent to your email.");
      } else {
        alert(data.error || "Error sending reset link. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong. Try again later.");
    }
  };

  useEffect(() => {
    const fetchClubs = async () => {
      //("inside fetch Club " + adminId);
      if (!adminId) return;

      try {
        //("inside try");
        const clubsHaru = await getAllClubs();
        //(clubsHaru);

        const HasAccount = clubsHaru.data.data.clubs.find(
          (club) => String(club.admin) === String(adminId)
        );

        const hisClubId = String(HasAccount._id);
        //("its his club id" + hisClubId);
        //(`is he autheticated : ${isAuthenticated()}`);

        if (HasAccount && hisClubId) {
          //("yes he is good to go");
          if (isAuthenticated()) {
            //("navigating to his clubadmin / his club id");
            navigate(`/clubs/${hisClubId}`);
          }
        } else if (isAuthenticated() && adminId) {
          //("auth and admint id  too");
          navigate(`/${adminId}`);
        } else {
          console.error("No account found for this admin");
        }
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };

    fetchClubs();
  }, [adminId, isAuthenticated, navigate]);
  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 md:p-8">
        <div className="mb-6 md:mb-8 space-y-2 md:space-y-3">
          <h1 className="text-xl md:text-2xl font-semibold text-slate-900">
            Log in with your email
          </h1>
          <p className="text-slate-500">
            Use your work email to log in to your club workspace.
          </p>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 text-sm bg-white text-slate-400"></span>
          </div>
        </div>

        <form className="space-y-4 md:space-y-5" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="yourname@student.ku.edu.np"
              className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleForgotPassword();
                }}
                className="text-sm text-green-600 hover:text-green-500"
              >
                Forgot password?
              </a>

            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <Eye className="h-5 w-5" />
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-medium"
          >
            Log in
          </button>
        </form>

        <p className="mt-6 text-center text-slate-600 text-sm">
          Don't have your club account yet?
          <Link
            to="/register"
            className="text-green-600 hover:text-green-500 font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
