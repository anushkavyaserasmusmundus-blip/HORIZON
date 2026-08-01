import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import HealthAnalysis from "../pages/HealthAnalysis";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/skills" element={<Navigate to="/profile#skill-matrix" replace />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/health-analysis" element={<HealthAnalysis />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;