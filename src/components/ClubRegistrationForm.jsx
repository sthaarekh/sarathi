import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

export const ClubRegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [firstPassword, setFirstPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('false');
  console.log(firstPassword)
  console.log(secondPassword)


  const validateForm = (e) => {
    e.preventDefault();
    const newErrors = {};

    const clubName = e.target.clubName.value;
    const department = e.target.department.value;
    const email = e.target.email.value;

    if (!clubName.trim()) {
      newErrors.clubName = "Club Name is required";
    }
    if (!department.trim()) {
      newErrors.department = "Department is required";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!firstPassword.trim()) {
      newErrors.password = "Password is required";
    }
    if (!secondPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required"
    }
    if (firstPassword !== secondPassword) {
      newErrors.bothSame = "Password mismatch"
    }
    console.log(firstPassword == secondPassword)
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }

    console.log("Form submitted successfully");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-3">
      <div className="bg-white rounded-lg shadow-sm w-full max-w-sm p-6">
        {showAlert && Object.keys(errors).length > 0 && (
          <div className="mb-3 p-2 rounded text-sm bg-red-50 border border-red-200 text-red-800">
            Please fill in all required fields marked with *
          </div>
        )}

        <form onSubmit={validateForm} className="space-y-4">
          <div>
            <label htmlFor="clubName" className="block text-gray-900 text-sm font-medium mb-1">
              Club Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="clubName"
              placeholder="e.g 'Kathmandu University Computer Club'"
              className={`w-full px-2 py-1.5 text-sm border rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.clubName ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {errors.clubName && (
              <p className="mt-0.5 text-xs text-red-500">{errors.clubName}</p>
            )}
          </div>

          <div>
            <label htmlFor="department" className="block text-gray-900 text-sm font-medium mb-1">
              Department <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="department"
              placeholder="e.g 'Department of Computer Science'"
              className={`w-full px-2 py-1.5 text-sm border rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.department ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {errors.department && (
              <p className="mt-0.5 text-xs text-red-500">{errors.department}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-900 text-sm font-medium mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="clubname@gmail.com"
              className={`w-full px-2 py-1.5 text-sm border rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {errors.email && (
              <p className="mt-0.5 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-900 text-sm font-medium mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                onChange={(e) => { setFirstPassword(e.target.value) }}
                placeholder="Choose a strong password"
                className={`w-full px-2 py-1.5 text-sm border rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent pr-8 ${errors.password ? 'border-red-500' : 'border-gray-300'
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
            <label htmlFor="confirmPassword" className="block text-gray-900 text-sm font-medium mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                onChange={(e) => { setSecondPassword(e.target.value) }}
                placeholder="Confirm your password"
                className={`w-full px-2 py-1.5 text-sm border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent pr-8 ${errors.bothSame? `border-red-500`:`border-gray-300`} `}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-2 flex items-center"
              >
                {showConfirmPassword ? (
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

          <div>
            <label htmlFor="contact" className="block text-gray-900 text-sm font-medium mb-1">
              Contact No.
            </label>
            <input
              type="tel"
              id="contact"
              placeholder="+977 98XXXXXXXX"
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-1.5 px-4 rounded text-sm hover:bg-green-600 transition-colors duration-200 mt-4"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-gray-600">
          Already have a club account?{' '}
          <a href="/login" className="text-green-600 hover:text-green-700 font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ClubRegistrationForm;
