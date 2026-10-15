import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import WeekPracticePage from './pages/WeekPracticePage';
import MockExamPage from './pages/MockExamPage';

function NotFound() {
  return (
    <div className="min-h-screen pt-24 flex items-center justify-center px-4">
      <div className="glass rounded-3xl p-10 text-center max-w-md">
        <div className="text-5xl mb-4">404</div>
        <h2 className="font-display font-bold text-xl text-white mb-2">Page Not Found</h2>
        <a href="/" className="text-brand-400 hover:text-brand-300 text-sm mt-4 inline-block">← Back to Dashboard</a>
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
    </BrowserRouter>
  );
}
