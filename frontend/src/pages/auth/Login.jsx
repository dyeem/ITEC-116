import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, LogIn, Loader2, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    remember: false,
  });

  useEffect(() => {
    document.title = "Login";
    if (localStorage.getItem("userToken")) navigate("/");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Invalid credentials");

      localStorage.setItem("userToken", data.token);
      localStorage.setItem("userData", JSON.stringify(data.user));
      navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <section className="min-h-screen flex bg-[radial-gradient(circle_at_top,_#0f172a,_#020617)] text-light overflow-hidden">
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal/30 via-transparent to-charcoal/40" />
        <div className="absolute w-[600px] h-[600px] bg-teal/10 rounded-full blur-3xl top-1/3 left-1/4 animate-pulse opacity-40" />
        <div className="relative text-center z-10 p-10">
          <h1 className="font-lemonmilk text-4xl font-bold text-white mb-4">Welcome Back</h1>
          <p className="text-light/70 max-w-md mx-auto leading-relaxed">
            Continue managing your security operations, team schedules, and reports — all in one secure platform.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="relative w-full max-w-xl">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-10 relative z-10">
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-2xl bg-teal/20 border border-teal/40 shadow-lg shadow-teal/20">
                <LogIn className="w-8 h-8 text-teal" />
              </div>
              <h1 className="font-lemonmilk text-xl font-bold text-white mt-4">Sign in you Account</h1>
              <p className="text-sm text-light/60 mt-1">
                Enter your credentials to access your account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm mb-2 text-light/80">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-4 text-light/40 w-5 h-5" />
                  <input
                    type="Username"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-light placeholder-light/40 focus:ring-2 focus:ring-teal focus:border-transparent focus:bg-white/10 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2 text-light/80">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-4 text-light/40 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg text-light placeholder-light/40 focus:ring-2 focus:ring-teal focus:border-transparent focus:bg-white/10 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-4 text-light/40 hover:text-light/60 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-light/70">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                    className="accent-teal h-4 w-4 rounded"
                  />
                  <span>Remember me</span>
                </label>
                <a href="#" className="text-teal hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 bg-teal/90 text-charcoal font-semibold rounded-lg hover:bg-teal transition-all shadow-lg shadow-teal/20 disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <LogIn className="w-5 h-5" />
                )}
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p className="text-center text-sm text-light/60 mt-8">
              Don’t have an account?{" "}
              <a
                href="/auth/register"
                className="text-teal hover:underline hover:text-teal/80"
              >
                Register
              </a>
            </p>
          </div>

          <div className="absolute -inset-8 bg-teal/20 blur-3xl rounded-full opacity-20 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
