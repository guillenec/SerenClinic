import { type PropsWithChildren } from 'react';
import { Routes, Route, Navigate } from "react-router";
import App from "./App";
import Login from "./pages/Login";
import Patients from "./pages/Patients";
import PatientDetail from "./pages/PatientDetail";
import Televisit from "./pages/Televisit";
import Appointments from "./pages/Appointments"; // vista general (la usan admin/doctor)

import AdminDashboard from "./pages/admin/AdminDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import PatientDashboard from "./pages/patient/PatientDashboard";
import MyAppointments from "./pages/patient/MyAppointments";

import { RequireRole, RoleHome } from "./components/RoleGate";
import useAppStore from "./store/appStore";

function RequireAuth({ children }: PropsWithChildren) {
  const user = useAppStore((s) => s.currentUser);
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* pública */}
      <Route path="/login" element={<Login />} />

      {/* protegidas */}
      <Route element={<RequireAuth><App /></RequireAuth>}>
        {/* home dinámica por rol */}
        <Route path="/" element={<RoleHome />} />

        {/* Admin */}
        <Route element={<RequireRole role="admin" />}>
          <Route path="admin" element={<AdminDashboard />} />
          {/* ejemplos adicionales: <Route path="admin/users" element={<AdminUsers />} /> */}
        </Route>

        {/* Doctor */}
        <Route element={<RequireRole role="doctor" />}>
          <Route path="doctor" element={<DoctorDashboard />} />
          <Route path="doctor/appointments" element={<Appointments />} />
        </Route>

        {/* Paciente */}
        <Route element={<RequireRole role="patient" />}>
          <Route path="patient" element={<PatientDashboard />} />
          <Route path="patient/appointments" element={<MyAppointments />} />
        </Route>

        {/* vistas compartidas */}
        <Route path="patients" element={<Patients />} />
        <Route path="patients/:id" element={<PatientDetail />} />
        <Route path="televisit/:appointmentId" element={<Televisit />} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
