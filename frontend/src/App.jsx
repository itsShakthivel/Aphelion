import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/auth/Login";
import Signup from "./Pages/auth/Signup";
import Dashboard from "./Pages/dashboard/Dashboard";

import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  return (
    
      <Routes>

        <Route
          path="/"
          element={<Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route 
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
  );
}

export default App;