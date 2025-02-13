import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Question = () => {
  const location = useLocation();
  const data = location.state;

  const [formData, setFormData] = useState({
    FirstAnswer: "",
    SecondAnswer: "",
    ThirdAnswer: "",
    FourthAnswer: "",
    FifthQuestion: "",
    agreement: false,
  });

  const [questions, setQuestions] = useState({
    FirstQuestion: "What type of club is this?",
    SecondQuestion:
      "Briefly describe your club, its activities, and why it exists.",
    ThirdQuestion: "Does your club have a faculty advisor or mentor?",
    FourthQuestion: "Membership criteria and fees",
    FifthQuestion: "Recruitment and promotion plans",
  });
  const finalData = { ...data, ...formData, ...questions };

  useEffect(() => {
    console.log(finalData);
  }, [finalData]);

  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate all required fields
    if (!formData.FirstAnswer.trim()) {
      newErrors.clubType = "Club type is required";
    }
    if (!formData.SecondAnswer.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.ThirdAnswer.trim()) {
      newErrors.advisor = "Advisor information is required";
    }
    if (!formData.FourthAnswer.trim()) {
      newErrors.membership = "Membership information is required";
    }
    if (!formData.FifthAnswer.trim()) {
      newErrors.recruitment = "Recruitment plan is required";
    }
    if (!formData.agreement) {
      newErrors.agreement = "You must agree to the terms";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }

    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error for the field being changed
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center py-6 px-4">
      <div className="bg-white rounded-lg shadow-sm w-full max-w-md p-5">
        {showAlert && Object.keys(errors).length > 0 && (
          <div className="mb-4 p-2 rounded text-sm bg-red-50 border border-red-200 text-red-800">
            Please fill in all required fields marked with *
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="clubType"
              className="block text-sm font-medium text-gray-700"
            >
              Q.1 What type of club is this?{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="FirstAnswer"
              id="clubType"
              placeholder="e.g., academic, sports, departmental, cultural etc."
              className={`mt-1 block w-full px-3 py-1.5 text-sm border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 ${
                errors.clubType ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.clubType}
              onChange={handleChange}
            />
            {errors.clubType && (
              <p className="mt-0.5 text-xs text-red-500">{errors.clubType}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Q.2 Briefly describe your club, its activities, and why it exists.{" "}
              <span className="text-red-500">*</span>
            </label>
            <textarea
              name="SecondAnswer"
              id="description"
              rows={2}
              className={`mt-1 block w-full px-3 py-1.5 text-sm border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <p className="mt-0.5 text-xs text-red-500">
                {errors.description}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="advisor"
              className="block text-sm font-medium text-gray-700"
            >
              Q.3 Does your club have a faculty advisor or mentor?{" "}
              <span className="text-red-500">*</span>
            </label>
            <textarea
              name="ThirdAnswer"
              id="advisor"
              rows={2}
              className={`mt-1 block w-full px-3 py-1.5 text-sm border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 ${
                errors.advisor ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.advisor}
              onChange={handleChange}
            />
            {errors.advisor && (
              <p className="mt-0.5 text-xs text-red-500">{errors.advisor}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="membership"
              className="block text-sm font-medium text-gray-700"
            >
              Q.4 Membership criteria and fees{" "}
              <span className="text-red-500">*</span>
            </label>
            <textarea
              name="FourthAnswer"
              id="membership"
              rows={2}
              className={`mt-1 block w-full px-3 py-1.5 text-sm border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 ${
                errors.membership ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.membership}
              onChange={handleChange}
            />
            {errors.membership && (
              <p className="mt-0.5 text-xs text-red-500">{errors.membership}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="recruitment"
              className="block text-sm font-medium text-gray-700"
            >
              Q.5 Recruitment and promotion plans{" "}
              <span className="text-red-500">*</span>
            </label>
            <textarea
              name="FifthAnswer"
              id="recruitment"
              rows={2}
              className={`mt-1 block w-full px-3 py-1.5 text-sm border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 ${
                errors.recruitment ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.recruitment}
              onChange={handleChange}
            />
            {errors.recruitment && (
              <p className="mt-0.5 text-xs text-red-500">
                {errors.recruitment}
              </p>
            )}
          </div>

          <div className="flex items-start pt-2">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                name="agreement"
                id="agreement"
                className={`h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 ${
                  errors.agreement ? "border-red-500" : ""
                }`}
                checked={formData.agreement}
                onChange={handleChange}
              />
            </div>
            <label htmlFor="agreement" className="ml-2 text-xs text-gray-700">
              I agree to comply with all platform usage policies, the
              university's guidelines regarding online conduct and verify all
              provided details are correct.
            </label>
          </div>
          {errors.agreement && (
            <p className="mt-0.5 text-xs text-red-500">{errors.agreement}</p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="flex-1 py-1.5 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!formData.agreement}
              className={`flex-1 py-1.5 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                !formData.agreement ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Question;
