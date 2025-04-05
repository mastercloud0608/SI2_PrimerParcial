import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/auth/Login';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<h1>Bienvenido al Dashboard</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
