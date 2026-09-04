import { Navigate } from "react-router-dom";

export function isAuthenticated() {
  return Boolean(localStorage.getItem("adminToken"));
}

export function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export function PublicOnlyRoute({ children }) {
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
