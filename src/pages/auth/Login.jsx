import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Loader2,
} from "lucide-react";

import { toast } from "react-toastify";

import { adminLogin } from "../../endpoints/auth";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both your email and password.");
      return;
    }

    setLoading(true);

    try {
      const data = await adminLogin({
        email,
        password,
      });

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("admin", JSON.stringify(data.admin));

      toast.success("Login successful!");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.message || "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#14181F] flex-col items-center justify-center p-8 xl:p-12 text-white">
        <div className="w-full max-w-[420px] text-center">
          <div className="flex items-center justify-center gap-2.5 mb-12">
            <ShieldCheck className="h-6 w-6 text-[#B8863B]" />

            <span className="text-xl font-semibold tracking-wide">
              SYLPRIN
            </span>
          </div>

          <div className="text-xs text-[#B8863B] tracking-widest mb-4 font-medium">
            AI EMAIL AGENT · ADMIN PORTAL
          </div>

          <div className="text-2xl xl:text-[30px] font-semibold leading-tight mb-4">
            Your inbox, intelligently managed.
          </div>

          <div className="text-sm text-[#9AA4B1] leading-relaxed">
            Monitor incoming emails, review AI decisions, and track automated
            responses from one secure workspace.
          </div>

          <div className="flex items-center justify-center gap-2 text-[11.5px] text-[#6B7684] mt-12">
            <ShieldCheck className="h-3.5 w-3.5" />

            <span>
              Access is restricted to authorized Sylprin staff.
            </span>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 bg-[#F7F8FA] flex items-center justify-center p-6 sm:p-8 md:p-10 min-h-screen lg:min-h-0">
        <div className="w-full max-w-[400px] mx-auto">
          {/* Mobile branding */}
          <div className="lg:hidden mb-8 text-center">
            <div className="flex items-center justify-center gap-2.5 mb-4">
              <ShieldCheck className="h-6 w-6 text-[#B8863B]" />

              <span className="text-xl font-semibold text-[#14181F]">
                SYLPRIN
              </span>
            </div>

            <div className="text-xs text-[#B8863B] tracking-widest mb-2 font-medium">
              AI EMAIL AGENT · ADMIN PORTAL
            </div>

            <h1 className="text-2xl font-semibold text-[#1A1E24]">
              Your inbox, intelligently managed.
            </h1>
          </div>

          <div className="text-2xl font-semibold text-[#1A1E24] mb-1.5">
            Sign in
          </div>

          <div className="text-sm text-[#5C6B7A] mb-6 sm:mb-8">
            Enter your administrator credentials to continue.
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-xs text-[#5C6B7A] font-medium"
              >
                Email address
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9AA4B1]" />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@sylprin.com"
                  className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 pl-10 text-sm outline-none transition focus:border-[#1F3A5F] focus:ring-2 focus:ring-[#1F3A5F]/10"
                  disabled={loading}
                  autoFocus
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-xs text-[#5C6B7A] font-medium"
              >
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9AA4B1]" />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 pl-10 pr-10 text-sm outline-none transition focus:border-[#1F3A5F] focus:ring-2 focus:ring-[#1F3A5F]/10"
                  disabled={loading}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9AA4B1] hover:text-[#6B7684] transition-colors"
                  disabled={loading}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 rounded-md bg-[#1F3A5F] hover:bg-[#1F3A5F]/90 disabled:opacity-70 text-white text-sm font-medium flex items-center justify-center transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </button>

            <div className="text-center text-[10.5px] text-[#C7CDD6] pt-4 font-medium">
              Admin access only · Not for customer use
            </div>
          </form>

          {/* Mobile security message */}
          <div className="lg:hidden mt-6 pt-4 border-t border-[#E4E7EB] text-center">
            <div className="flex items-center justify-center gap-2 text-[11.5px] text-[#6B7684]">
              <ShieldCheck className="h-3.5 w-3.5" />

              <span>
                Access is restricted to authorized Sylprin staff.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}