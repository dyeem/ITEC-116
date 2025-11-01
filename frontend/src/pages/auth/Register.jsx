import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, UserPlus, Loader2 } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    document.title = "Register";
    if (localStorage.getItem("userToken")) navigate("/");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          password: formData.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed.");
      
      navigate("/auth/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <section className="min-h-screen flex bg-[radial-gradient(circle_at_top,_#0f172a,_#020617)] text-light overflow-hidden">
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal/30 via-transparent to-charcoal/40" />
        <div className="absolute w-[600px] h-[600px] bg-teal/10 rounded-full blur-3xl top-1/3 left-1/4 animate-pulse opacity-40" />
        <div className="relative text-center z-10 p-10">
          <h1 className="font-lemonmilk text-4xl font-bold text-white mb-4">Join Our Network</h1>
          <p className="text-light/70 max-w-md mx-auto leading-relaxed">
            Create your account to access a secure and efficient management
            platform for your agency’s operations, schedules, and team.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="relative w-full max-w-xl">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-10 relative z-10">
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-2xl bg-teal/20 border border-teal/40 shadow-lg shadow-teal/20">
                <UserPlus className="w-8 h-8 text-teal" />
              </div>
              <h1 className="font-lemonmilk text-xl font-bold text-white mt-4">Create Account</h1>
              <p className="text-sm text-light/60 mt-1">
                Fill in your details to get started.
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid sm:grid-cols-1 gap-4">
                <div className="relative">
                  <User className="absolute left-3 top-4 text-light/40 w-5 h-5" />
                  <input
                    type="Username"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-light placeholder-light/40 focus:ring-2 focus:ring-teal focus:border-transparent focus:bg-white/10 outline-none transition-all"
                  />
                </div>
                {/* <div className="relative">
                  <Mail className="absolute left-3 top-3 text-light/40 w-5 h-5" />
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-light placeholder-light/40 focus:ring-2 focus:ring-teal focus:border-transparent focus:bg-white/10 outline-none transition-all"
                  />
                </div> */}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="relative">
                  <Lock className="absolute left-3 top-4 text-light/40 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-lg text-light placeholder-light/40 focus:ring-2 focus:ring-teal focus:border-transparent focus:bg-white/10 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-4 text-light/40 hover:text-light/60 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-4 text-light/40 w-5 h-5" />
                  <input
                    type={showConfirm ? "text" : "password"}
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    required
                    className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-lg text-light placeholder-light/40 focus:ring-2 focus:ring-teal focus:border-transparent focus:bg-white/10 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-4 text-light/40 hover:text-light/60 transition-colors"
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 bg-teal/90 text-charcoal font-semibold rounded-lg hover:bg-teal transition-all shadow-lg shadow-teal/20 disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <UserPlus className="w-5 h-5" />
                )}
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <p className="text-center text-sm text-light/60 mt-8">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="text-teal hover:underline hover:text-teal/80"
              >
                Sign In
              </Link>
            </p>
          </div>

          <div className="absolute -inset-8 bg-teal/20 blur-3xl rounded-full opacity-20 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
