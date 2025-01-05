import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 md:p-8">
        <div className="mb-8">
          <button 
            onClick={handleBackClick}
            className="text-slate-400 hover:text-slate-600 rounded-full p-1"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        <div className="mb-6 md:mb-8 space-y-2 md:space-y-3">
          <h1 className="text-xl md:text-2xl font-semibold text-slate-900">Log in with your email</h1>
          <p className="text-slate-500">Use your student email to log in to your club workspace.</p>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 text-sm bg-white text-slate-400"></span>
          </div>
        </div>

        <form className="space-y-4 md:space-y-5">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              id="email"
              placeholder="yourname@student.ku.edu.np"
              className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="text-sm font-medium text-slate-700">Password</label>
              <a href="#" className="text-sm text-green-600 hover:text-green-500">Forgot password?</a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent pr-10"
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
          Don't have your club account yet?{' '}
          <Link to="/register" className="text-green-600 hover:text-green-500 font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};
