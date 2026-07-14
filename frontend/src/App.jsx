import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfile } from "./features/auth/authSlice";
import Login from "./Pages/auth/Login";
import Signup from "./Pages/auth/Signup";
import Dashboard from "./Pages/dashboard/Dashboard";
import Transactions from "./Pages/Transactions/Transactions";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Categories from "./Pages/Categories/Categories";
import Investments from "./Pages/investments/Investments";
import Insurance from "./Pages/Insurance/Insurance";
import Loans from "./Pages/Loans/Loans";
import Goals from "./Pages/goals/Goals";

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

          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <Transactions />
              </ProtectedRoute>
            }
          />

          <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <Categories />
              </ProtectedRoute>
            }
          />

          <Route
            path="/investments"
            element={
              <ProtectedRoute>
                <Investments />
              </ProtectedRoute>
            }
          />

          <Route
            path="/insurance"
            element={
              <ProtectedRoute>
                <Insurance />
              </ProtectedRoute>
            }
          />

          <Route
            path="/loans"
            element={
              <ProtectedRoute>
                <Loans />
              </ProtectedRoute>
            }
          />

          <Route
            path="/goals"
            element={
              <ProtectedRoute>
                <Goals />
              </ProtectedRoute>
            }
          />    

      </Routes>
  );
}

export default App;