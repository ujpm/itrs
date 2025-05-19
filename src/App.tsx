import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import CitizenDashboard from './pages/CitizenDashboard';
import AdminPage from './pages/AdminPage';
import ComplaintPage from './pages/Complaint';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Footer from './components/Footer';

function App() {
  const location = useLocation();
  const hideFooterRoutes = ['/', '/login', '/signup'];
  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/citizen" element={<CitizenDashboard />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/complaint" element={<ComplaintPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      {shouldShowFooter && <Footer />}
    </>
  );
}

// Wrap App with Router
export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}


