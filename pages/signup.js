import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import React Icons
import { clg, Js } from "@/js/basic";

export default function Signup(props) {
  const { appLink } = props;
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    licenseNumber: "", // Added license number field
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number (10 digits)";
    }

    if (!formData.licenseNumber.trim()) {
      newErrors.licenseNumber = "License number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var form = { ...formData };
    form.account = "driver";
    if (validateForm()) {
      setIsLoading(true);
      try {
        // Simulate API call
        fetch(`${appLink}/driverAuth/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: Js(form),
        })
          .then(async (resp) => {
            var data = await resp.json();
            clg(data);
            if (data.err) {
              setErrors(data.err);
              setIsLoading(false);
              return;
            }
            alert(
              `${form.username} Your Account was created successfully. You can Login right away....`
            );
            router.push("/");
          })
          .catch((err) => {});
        //
      } catch (error) {
        setErrors({
          submit: "Failed to sign up. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <div className="space-y-1 text-center">
          <h2 className="text-2xl font-bold">Create an Account</h2>
          <p className="text-gray-500">Enter your details to sign up</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          {/* Username Field */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="username"
            >
              Username
            </label>
            <input
              required
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg transition-colors
                ${
                  errors.username
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              `}
              placeholder="Enter your Username"
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              required
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg transition-colors
                ${errors.email ? "border-red-500 bg-red-50" : "border-gray-300"}
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              `}
              placeholder="your.email@example.com"
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              required
              type="text"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg transition-colors
                ${errors.phone ? "border-red-500 bg-red-50" : "border-gray-300"}
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              `}
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                required
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg transition-colors
                  ${
                    errors.password
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                `}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEye /> : <FiEyeOff />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* License Number Field */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="licenseNumber"
            >
              License Number
            </label>
            <input
              required
              type="text"
              id="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg transition-colors
                ${
                  errors.licenseNumber
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              `}
              placeholder="Enter your license number"
            />
            {errors.licenseNumber && (
              <p className="text-sm text-red-500">{errors.licenseNumber}</p>
            )}
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <p className="text-sm text-red-500 text-center">{errors.submit}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-[#557C56] to-[#3D593E] text-white py-3 rounded-lg
              hover:bg-[#489749] transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center space-x-2
            `}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
                <span>Signing up...</span>
              </>
            ) : (
              <span>Sign Up</span>
            )}
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/"
              className="text-[#3D593E] hover:text-[#489749] font-medium"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
