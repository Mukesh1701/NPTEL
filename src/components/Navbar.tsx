import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { COURSE_CONFIG } from '../data/questionBank';

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/true-false', label: 'True / False' },
    { to: '/multiple-choice', label: 'Multi-Select' },
    { to: '/mock-exam', label: 'Mock Exam' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-black text-sm tracking-wider">
              N
            </div>
            <div>
              <div className="font-semibold text-white text-sm sm:text-base leading-tight tracking-tight">
                NPTEL Practice Hub
              </div>
              <div className="text-xs text-neutral-400 font-normal">
                {COURSE_CONFIG.name}
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((l) => {
              const isActive = location.pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-white text-black font-semibold'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            id="nav-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-md text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-neutral-950 border-b border-neutral-800 px-4 pt-2 pb-4 space-y-1 animate-fade-in">
          {navLinks.map((l) => {
            const isActive = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-white text-black font-semibold'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
