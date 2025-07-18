import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { BACKEND_URL } from '../utils/config';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/upload/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        login(data.token); // Use context login
        alert("Logged in successfully!");
        navigate('/');
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Login error");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-10 flex items-center justify-center">
      <div className="bg-white/90 rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fade-in-up">
        <h1 className="text-3xl font-extrabold text-center text-purple-700 mb-8 drop-shadow-lg animate-fade-in-up">Login</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`peer w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-transparent ${formData.email ? 'has-value' : ''}`}
              placeholder=" "
              required
              disabled={loading}
            />
            <label className="floating-label">Email</label>
          </div>
          <div className="relative">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`peer w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-transparent ${formData.password ? 'has-value' : ''}`}
              placeholder=" "
              required
              disabled={loading}
            />
            <label className="floating-label">Password</label>
          </div>
          {error && <div className="text-red-500 text-center">{error}</div>}
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold rounded-lg shadow-md transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Logging in..." : (
              <>
                <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
                Login
              </>
            )}
          </button>
        </form>
      </div>
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.7s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .floating-label {
          position: absolute;
          left: 1rem;
          top: 0.5rem;
          font-size: 1rem;
          font-weight: 600;
          color: #4b5563;
          background: white;
          padding: 0 0.25rem;
          border-radius: 0.25rem;
          pointer-events: none;
          transition: all 0.2s;
        }
        input:focus + .floating-label,
        input.has-value + .floating-label {
          top: -1.25rem;
          font-size: 0.75rem;
          color: #7c3aed;
        }
      `}</style>
    </div>
  )
}

