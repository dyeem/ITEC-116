import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Menu,
  X,
  Home,
  Info,
  Briefcase,
  Mail,
  CircleUser,
  LogOut,
  LogIn,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth.js";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    navigate("/auth/Login");
  };

  const navItems = [
    { path: "/", label: "Home", icon: <Home size={16} /> },
    { path: "/about", label: "About", icon: <Info size={16} /> },
    { path: "/services", label: "Services", icon: <Briefcase size={16} /> },
    { path: "/contact", label: "Contact", icon: <Mail size={16} /> },
  ];

  return (
    <header className="font-lemonmilk bg-charcoal text-light sticky top-0 z-50 shadow-lg border-b border-light/10">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <NavLink
          to="/"
          className="font-lemonmilk text-2xl  tracking-wide text-teal hover:text-light transition-colors"
        >
          Hindi ko<span className="text-light"> Alam</span>
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map(({ path, label, icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `font-lemonmilk flex items-center gap-1 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "text-teal border-b-2 border-teal pb-[2px]"
                    : "text-light/80 hover:text-teal"
                }`
              }
            >
              {icon}
              {label}
            </NavLink>
          ))}

          {/* Auth Section */}
          {user && token ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-graphite/70 px-3 py-2 rounded-full border border-light/10 hover:border-teal/40 transition-all"
              >
                <CircleUser size={20} className="text-teal" />
                <span className="text-sm font-medium">{user.name}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-charcoal border border-light/10 rounded-lg shadow-lg w-40 py-2 z-50">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-400 hover:bg-graphite/70 hover:text-red-300 transition-all"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink
              to="/auth/login"
              className="flex items-center gap-2 px-5 py-2 bg-teal text-charcoal font-semibold rounded-full shadow-md hover:bg-teal/90 hover:shadow-teal/20 transition-all"
            >
              <LogIn size={16} />
              Login
            </NavLink>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-light hover:text-teal transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden bg-graphite text-light border-t border-light/10 overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-6 py-4 space-y-4">
          {navItems.map(({ path, label, icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 text-base font-medium ${
                  isActive ? "text-teal" : "hover:text-teal"
                }`
              }
            >
              {icon}
              {label}
            </NavLink>
          ))}

          <div className="border-t border-light/10 my-3" />

          {user && token ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 text-red-400 hover:text-red-500 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          ) : (
            <NavLink
              to="/auth/login"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-5 py-2 bg-teal text-charcoal rounded-full font-semibold hover:bg-teal/90 transition"
            >
              <LogIn size={18} />
              Login
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}
