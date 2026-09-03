import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/dashboard/Dashboard";
import Emails from "./pages/email/Emails";
import EmailDetails from "./pages/email/EmailDetails";
import Reviews from "./pages/review/Reviews";
import ReviewDetails from "./pages/review/ReviewDetails";
import AuditTrails from "./pages/audit/auditTrails";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <Header />

          <main className="flex-1 p-8">
            <Routes>
              {/* Dashboard */}
              <Route
                path="/"
                element={<Navigate to="/dashboard" replace />}
              />

              <Route
                path="/dashboard"
                element={<Dashboard />}
              />

              {/* Emails */}
              <Route
                path="/emails"
                element={<Emails />}
              />

              <Route
                path="/emails/:id"
                element={<EmailDetails />}
              />

              {/* Reviews */}
              <Route
                path="/reviews"
                element={<Reviews />}
              />

              <Route
                path="/reviews/:id"
                element={<ReviewDetails />}
              />

              {/* Audit Trails */}
              <Route
                path="/audit-trails"
                element={<AuditTrails />}
              />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

