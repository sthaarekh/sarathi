import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const ResetPassword = () => {
  const { token } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const host = "http://localhost:5001";
      console.log("Sending request to:", `${host}/api/v1/clubs/reset-password/${token}`);
      console.log("New Password:", newPassword);
      const loadingToastId = toast.loading("Reseting the password...");

      const response = await fetch(`${host}/api/v1/clubs/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword :newPassword }),
      });
      const data = await response.json();
      toast.dismiss(loadingToastId);
  
      if (response.ok) {
        toast.success("Password reset successful!");
        navigate("/login");
      } else {
        toast.error("Error reseting password.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-4">Reset Password</h2>
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-3 py-2 border rounded-lg"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-10 -translate-y-1/2 text-slate-400 hover:text-slate-600">
            {showPassword ? (
              <EyeOffIcon className="h-4 w-4 text-gray-400" />
            ) : (
              <EyeIcon className="h-4 w-4 text-gray-400" />
            )}
            </button>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="w-full px-3 py-2 border rounded-lg"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-10 -translate-y-1/2 text-slate-400 hover:text-slate-600">
            {showConfirmPassword ? (
              <EyeOffIcon className="h-4 w-4 text-gray-400" />
            ) : (
              <EyeIcon className="h-4 w-4 text-gray-400" />
            )}
            </button>
          </div>
          <button type="submit" 
          onClick={handleResetPassword}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
