import { Navigate, Outlet } from "react-router";
import useAppStore from "../store/appStore";
import type { Role } from "../store/appStore";

export function RequireRole({ role }: { role: Role | Role[] }) {
    const user = useAppStore((s) => s.currentUser);
    const roles = Array.isArray(role) ? role : [role];
    if (!user) return <Navigate to="/login" replace />;
    if (!roles.includes(user.role)) return <Navigate to="/" replace />;
    return <Outlet />;
}

/** Enruta la home "/" a la raíz de cada rol */
export function RoleHome() {
    const user = useAppStore((s) => s.currentUser);
    if (!user) return <Navigate to="/login" replace />;
    switch (user.role) {
        case "admin": return <Navigate to="/admin" replace />;
        case "doctor": return <Navigate to="/doctor" replace />;
        case "patient": return <Navigate to="/patient" replace />;
        default: return <Navigate to="/login" replace />;
    }
}
