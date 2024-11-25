import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Dashboard } from "@/layouts"; // Adjust the import
import { SignIn } from "./pages/auth"; // Adjust the import

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" replace />;
  }
  return children;
}

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Routes>
      <Route
        path="/auth/sign-in"
        element={
          isAuthenticated ? <Navigate to="/dashboard/home" replace /> : <SignIn />
        }
      />
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

export default App;
