import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfile } from "./features/auth/authSlice";
import Login from "./Pages/auth/Login";
import Signup from "./Pages/auth/Signup";
import Dashboard from "./Pages/dashboard/Dashboard";

import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {

  const dispatch = useDispatch();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if(token){
      dispatch(getProfile());
    }

  }, [dispatch]);

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