import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/dashboard/Dashboard";
import Emails from "./pages/email/Emails";
import EmailDetails from "./pages/email/EmailDetails";
import Reviews from "./pages/review/Reviews";
import ReviewDetails from "./pages/review/ReviewDetails";
import AuditTrails from "./pages/audit/auditTrails";
import Login from "./pages/auth/Login";
import {
  ProtectedRoute,
  PublicOnlyRoute,
  isAuthenticated,
} from "./routes/auth";

function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <main className="flex-1 p-8">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/emails" element={<Emails />} />
            <Route path="/emails/:id" element={<EmailDetails />} />

            <Route path="/reviews" element={<Reviews />} />
            <Route path="/reviews/:id" element={<ReviewDetails />} />

            <Route path="/audit-trails" element={<AuditTrails />} />

            <Route
              path="/"
              element={<Navigate to="/dashboard" replace />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          }
        />

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={
            <Navigate
              to={isAuthenticated() ? "/dashboard" : "/login"}
              replace
            />
          }
        />
      </Routes>

      {/* Toast notifications */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </BrowserRouter>
  );
}

export default App;