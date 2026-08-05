import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import HealthAnalysis from "../pages/HealthAnalysis";
import Login from "../pages/Login";
import Register from "../pages/Register";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        <Route 
          path="/login" 
          element={<Login />} 
        />

        <Route 
          path="/register" 
          element={<Register />} 
        />

        <Route 
          path="/" 
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
        />

        <Route 
          path="/profile" 
          element={<ProtectedRoute><Profile /></ProtectedRoute>} 
        />

        <Route 
          path="/health-analysis" 
          element={<ProtectedRoute><HealthAnalysis /></ProtectedRoute>} 
        />

        <Route 
          path="*" 
          element={<Navigate to="/login" replace />} 
        />

      </Routes>

    </BrowserRouter>

  );
}


export default AppRoutes;