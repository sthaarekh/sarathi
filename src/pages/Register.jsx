import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
  const [data, setData] = useState({
    password: "",
    passwordConfirm: "",
    username: "",
    department: "",
    email: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showpasswordConfirm, setShowpasswordConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    console.log(data);
  };

  const validateForm = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!data.username.trim()) {
      newErrors.username = "Club Name is required";
    }
    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!data.password.trim()) {
      newErrors.password = "Password is required";
    }
    if (!data.passwordConfirm.trim()) {
      newErrors.passwordConfirm = "Confirm password is required";
    }
    if (data.password !== data.passwordConfirm) {
      newErrors.bothSame = "Password mismatch";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }
    // If validation passes, navigate to the Question component
    navigate("/question", { state: data });
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center p-3">
      <div className="bg-white rounded-lg shadow-sm w-full max-w-sm p-6">
        {showAlert && Object.keys(errors).length > 0 && (
          <div className="mb-3 p-2 rounded text-sm bg-red-50 border border-red-200 text-red-800">
            Please fill in all required fields marked with *
          </div>
        )}

        <form onSubmit={validateForm} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-gray-900 text-sm font-medium mb-1"
            >
              Club Name <span className="text-red-500">*</span>
            </label>
            <input
              name="username"
              type="text"
              id="username"
              placeholder="e.g 'Kathmandu University Computer Club'"
              className={`w-full px-2 py-1.5 text-sm border rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
              onChange={handleChange}
            />
            {errors.username && (
              <p className="mt-0.5 text-xs text-red-500">{errors.username}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="department"
              className="block text-gray-900 text-sm font-medium mb-1"
            >
              Department
            </label>
            <input
              type="text"
              name="department"
              id="department"
              placeholder="e.g 'Department of Computer Science'"
              className={`w-full px-2 py-1.5 text-sm border rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.department ? "border-red-500" : "border-gray-300"
              }`}
              onChange={handleChange}
            />
            {errors.department && (
              <p className="mt-0.5 text-xs text-red-500">{errors.department}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-gray-900 text-sm font-medium mb-1"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="clubname@gmail.com"
              className={`w-full px-2 py-1.5 text-sm border rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="mt-0.5 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-900 text-sm font-medium mb-1"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                onChange={handleChange}
                placeholder="Choose a strong password"
                className={`w-full px-2 py-1.5 text-sm border rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent pr-8 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-2 flex items-center"
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4 text-gray-400" />
                ) : (
                  <EyeIcon className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-0.5 text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="passwordConfirm"
              className="block text-gray-900 text-sm font-medium mb-1"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showpasswordConfirm ? "text" : "password"}
                id="passwordConfirm"
                name="passwordConfirm"
                onChange={handleChange}
                placeholder="Confirm your password"
                className={`w-full px-2 py-1.5 text-sm border rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent pr-8 ${
                  errors.bothSame ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowpasswordConfirm(!showpasswordConfirm)}
                className="absolute inset-y-0 right-0 pr-2 flex items-center"
              >
                {showpasswordConfirm ? (
                  <EyeOffIcon className="h-4 w-4 text-gray-400" />
                ) : (
                  <EyeIcon className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
            {errors.bothSame && (
              <p className="mt-0.5 text-xs text-red-500">{errors.bothSame}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-1.5 px-4 rounded text-sm hover:bg-green-600 transition-colors duration-200 mt-4"
          >
            Proceed to QNA
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-gray-600">
          Already have a club account?{" "}
          <Link
            to="/login"
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
