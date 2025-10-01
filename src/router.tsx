import { Navigate, Outlet, Route, Routes } from "react-router";
import useAppStore from "./store/appStore";
import Login from "./pages/Login";
import App from "./App";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import Patients from "./pages/Patients";
import PatientDetail from "./pages/PatientDetail";
import Televisit from "./pages/Televisit";


function RequireAuth() {
  const user = useAppStore((s) => s.currentUser);
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* públicas */}
      <Route path="/login" element={<Login />} />

      {/* protegidas */}
      <Route element={<RequireAuth />}>
        <Route element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="patients" element={<Patients />} />
          <Route path="patients/:id" element={<PatientDetail />} />
          <Route path="televisit/:appointmentId" element={<Televisit />} />
        </Route>
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}