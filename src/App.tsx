import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CitizenDashboard from './pages/CitizenDashboard';
import AdminPage from './pages/AdminPage';
import ComplaintPage from './pages/Complaint';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/citizen" element={<CitizenDashboard />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/complaint" element={<ComplaintPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
