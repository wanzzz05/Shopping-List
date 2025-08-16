import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import Home from "./components/home.jsx";
import Signin from "./components/signIn";
import Signup from "./components/signUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
        />
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  )
}

export default App;

export function ProtectedRoute({children}) {
  const token = localStorage.getItem("token");

  if(!token) {
    return <Navigate to = "/" replace />;
  }

  return children;
}