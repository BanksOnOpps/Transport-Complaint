import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Feedback from "./pages/Feedback";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import Faq from "./pages/Faq";

import ProtectedRoute from "./ui/ProtectedRoute";
import Report from "./pages/Report";
import AdminDashboard from "./pages/AdminDashboard";
import AdminSettings from "./pages/AdminSettings";
import Complaints from "./pages/Complaints";
import AdminFaq from "./pages/AdminFaq";
import AdminLogin from "./pages/AdminLogin";
import { AuthProvider } from "./features/authentication/AuthContext";
import AppToaster from "./ui/AppToaster";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <GlobalStyles />
      <AuthProvider>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <Routes>
            {/* Admin Route */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute expectedRole="admin">
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="account" element={<Account />} />
              <Route path="complaints" element={<Complaints />} />
              <Route path="feedback" element={<Feedback />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="faq" element={<AdminFaq />} />
            </Route>
            {/* Student Route */}
            <Route
              element={
                <ProtectedRoute expectedRole="student">
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="account" element={<Account />} />
              <Route path="report" element={<Report />} />
              <Route path="feedback" element={<Feedback />} />
              <Route path="settings" element={<Settings />} />
              <Route path="faq" element={<Faq />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="admin/login" element={<AdminLogin />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <AppToaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
