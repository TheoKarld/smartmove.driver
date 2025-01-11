import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import React Icons
import { clg, Js } from "@/js/basic";
import Loader from "@/components/Loader";

export default function Login(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { appLink } = props;

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

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var form = validateForm();
    if (form) {
      setIsLoading(true);
      try {
        // Simulate API call
        //await new Promise((resolve) => setTimeout(resolve, 3000));
        fetch(`${appLink}/driverAuth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: Js(formData),
        })
          .then(async (resp) => {
            var data = await resp.json();
            if (data.error) {
              setErrors({
                submit: data.error,
              });
              setIsLoading(false);
              return;
            }
            if (document.getElementById("remember").checked) {
              window.localStorage.setItem("smartAccess", data.route);
            }
            router.push({
              pathname: "/dashboard",
              query: { auth: data.route },
            });
          })
          .catch((err) => {
            clg(err);
            setErrors({
              submit: "Failed to reach server. Please try again.",
            });
            setIsLoading(false);
          });
        //
      } catch (error) {
        clg(error);
        setErrors({
          submit: "Failed to login. Please try again.",
        });
        setIsLoading(false);
      } finally {
        //setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    var a = window.localStorage.getItem("smartAccess");
    if (a)
      router.push({
        pathname: "/dashboard",
        query: { auth: a },
      });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <div className="space-y-1 text-center">
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <p className="text-gray-500">Enter your credentials to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
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
                {showPassword ? <FiEye /> : <FiEyeOff />}{" "}
                {/* Use React Icons */}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div>
              <label className="flex items-center space-x-2 text-sm">
                <input
                  id="remember"
                  type="checkbox"
                  className="rounded border-gray-300"
                />
                <span>Remember me</span>
              </label>
            </div>
            <a
              href="/forgot-password"
              className="text-sm text-[#3D593E] hover:text-[#253625]"
            >
              Forgot password?
            </a>
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
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600">
            Don have an account?{" "}
            <Link
              href="/signup"
              className="text-[#3D593E] hover:text-[#489749] font-medium"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
