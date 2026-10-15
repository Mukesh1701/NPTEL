import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import WeekPracticePage from './pages/WeekPracticePage';
import MockExamPage from './pages/MockExamPage';

function NotFound() {
  return (
    <div className="min-h-screen pt-24 flex items-center justify-center px-4">
      <div className="bw-card p-10 text-center max-w-md w-full border border-neutral-800 bg-neutral-950">
        <div className="text-5xl font-black text-white mb-2">404</div>
        <h2 className="text-xl font-bold text-white mb-2">Page Not Found</h2>
        <p className="text-neutral-400 text-sm mb-6">The page you requested does not exist.</p>
        <Link to="/" className="btn-primary py-2.5 px-6 text-sm">
          ← Return to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/week/:weekNum" element={<WeekPracticePage />} />
        <Route path="/mock-exam" element={<MockExamPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* Vercel Web Analytics tracking component */}
      <Analytics />
    </BrowserRouter>
  );
}
