import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Home = lazy(() => import("../pages/Home"));
const Profile = lazy(() => import("../pages/Profile"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Skills = lazy(() => import("../pages/Skills"));

function PageLoading() {
  return <div role="status" className="flex min-h-[60vh] items-center justify-center text-sm font-medium text-[#9E5B4D]">Loading Horizon...</div>;
}

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {

  return (

    <BrowserRouter>

      <Suspense fallback={<PageLoading />}>
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
          element={<ProtectedRoute><Navigate to="/home" replace /></ProtectedRoute>} 
        />

        <Route 
          path="/dashboard" 
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
        />

        <Route 
          path="/home" 
          element={<ProtectedRoute><Home /></ProtectedRoute>} 
        />

        <Route 
          path="/profile" 
          element={<ProtectedRoute><Profile /></ProtectedRoute>} 
        />

        <Route
          path="/skills"
          element={<ProtectedRoute><Skills /></ProtectedRoute>}
        />

        <Route 
          path="*" 
          element={<Navigate to="/login" replace />} 
        />

        </Routes>
      </Suspense>

    </BrowserRouter>

  );
}


export default AppRoutes;