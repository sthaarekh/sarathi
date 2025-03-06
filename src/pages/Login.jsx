import React, { useState, useEffect } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import useAuth from "../context/Hook/useAuth";
import { getAllClubs, login } from "../utils/api";

export const Login = () => {
  const [searchParams] = useSearchParams();
  const toastType = searchParams.get("toast");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminId, setAdminId] = useState(null);
  const { loginUser, auth, setAuth, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [appear, setAppear] = useState(false);

  // Animation effect on component mount
  useEffect(() => {
    setAppear(true);
  }, []);

  useEffect(() => {
    const toastType = searchParams.get("toast");

    if (toastType) {
      // Use a flag in sessionStorage to track if this toast has been shown
      const toastKey = `toast_shown_${toastType}`;
      if (!sessionStorage.getItem(toastKey)) {
        setTimeout(() => {
          switch (toastType) {
            case "success":
              toast.success("Email verified successfully!");
              break;
            case "expired":
              toast.error(
                "Verification link has expired. Please request a new one."
              );
              break;
            case "error":
              toast.error("Email verification failed. Try again.");
              break;
          }
          // Mark this toast as shown
          sessionStorage.setItem(toastKey, "true");

          // Remove toast parameter from URL
          const newUrl = window.location.pathname;
          window.history.replaceState({}, "", newUrl);
        }, 100);
      }
    }
  }, [searchParams]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await login(email, password);
      console.log("the respose is ", response);
      if (response) {
        setAdminId(response.data.userId);
        loginUser(response.data.userId, response.data.token);
        // setAuth(response.data.userId, response.data.token);
        // console.log(isAuthenticated(), auth);
        toast.success("Login Successful");
      }
    } catch (error) {
      toast.error("Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    console.log("Auth state changed:", auth);
  }, [auth]);

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email first.");
      return;
    }

    // Start loading toast
    const loadingToastId = toast.loading("Sending reset link...");

    try {
      const response = await fetch(
        "http://localhost:5001/api/v1/clubs/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();

      // Dismiss the loading toast
      toast.dismiss(loadingToastId);

      if (response.ok) {
        toast.success("Password reset link sent to your email.");
      } else {
        toast.error(
          data.error || "Error sending reset link. Please try again."
        );
      }
    } catch (error) {
      // Dismiss the loading toast
      toast.dismiss(loadingToastId);
      toast.error("Something went wrong. Try again later.");
    }
  };

  useEffect(() => {
    const fetchClubs = async () => {
      //("inside
      //("inside fetchclub");
      if (!adminId) return;

      try {
        if (adminId === "admin") {
          navigate("/admin");
          return;
        }
        //("inside try");
        //(adminId);
        //("inside try");

        const clubsHaru = await getAllClubs();
        //(clubsHaru);
        //("the clubs are ", clubsHaru);
        const HasAccount = clubsHaru.data.data.clubs.find(
          (club) => String(club.admin) === String(adminId)
        );
        console.log(HasAccount);
        //("Ye has account and is", HasAccount);

        const hisClubId = String(HasAccount._id);
        //("its his club id" + hisClubId);
        //(`is he autheticated : ${isAuthenticated()}`);
        //(`the club id is: ${hisClubId}`);
        //(isAuthenticated());

        if (HasAccount && hisClubId) {
          console.log("yes he is good to go");
          if (isAuthenticated()) {
            console.log("Going");
            //("go to admin page");
            //("navigating to his clubadmin / his club id");
            navigate(`/clubadmin`);
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
      <div 
        className={`w-full max-w-md bg-white rounded-xl shadow-lg p-6 md:p-8 transform transition-all duration-500 ease-in-out ${
          appear ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="mb-6 md:mb-8 space-y-2 md:space-y-3">
          <h1 className="text-xl md:text-2xl font-semibold text-slate-900 transition-all duration-300 ease-in-out">
            Log in with your email
          </h1>
          <p className="text-slate-500 transition-all duration-300 ease-in-out delay-100">
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
          <div className="transition-all duration-300 ease-in-out delay-150">
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
              className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ease-in-out"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="transition-all duration-300 ease-in-out delay-200">
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
                className="text-sm text-green-600 hover:text-green-500 transition-colors duration-300 ease-in-out"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent pr-10 transition-all duration-300 ease-in-out"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-300 ease-in-out"
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4 text-gray-400" />
                ) : (
                  <EyeIcon className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 ease-in-out delay-250 transform hover:scale-[1.02] ${
              isLoading ? "opacity-75 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="mt-6 text-center text-slate-600 text-sm transition-all duration-300 ease-in-out delay-300">
          Don't have your club account yet?{" "}
          <Link
            to="/register"
            className="text-green-600 hover:text-green-500 font-medium transition-colors duration-300 ease-in-out"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;