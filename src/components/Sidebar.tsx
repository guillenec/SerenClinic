import { NavLink } from "react-router";
import useAppStore from "../store/appStore";
import type { Role } from "../store/appStore";

type Item = { to: string; label: string };

const MENU: Record<Role, Item[]> = {
    admin: [
        { to: "/admin", label: "Panel" },
        { to: "/patients", label: "Pacientes" },        // puedes moverlo a /admin/patients si luego creas esa vista
        { to: "/appointments", label: "Citas (global)" } // reutiliza la vista general
    ],
    doctor: [
        { to: "/doctor", label: "Panel" },
        { to: "/doctor/appointments", label: "Citas" },  // usa tu Appointments actual
        { to: "/patients", label: "Pacientes" },
        { to: "/televisit/a1", label: "Teleconsulta" }
    ],
    patient: [
        { to: "/patient", label: "Panel" },
        { to: "/patient/appointments", label: "Mis citas" },
        { to: "/televisit/a1", label: "Teleconsulta" }
    ],
};

export default function Sidebar() {
    const role = useAppStore((s) => s.currentUser?.role) || "patient";
    const item = (to: string, label: string) => (
        <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
                `block rounded-xl2 px-3 py-2 ${isActive ? "bg-pastel-mint/60" : "hover:bg-pastel-cloud"}`
            }
        >
            {label}
        </NavLink>
    );

    return (
        <aside className="hidden lg:block bg-white border-r border-slate-100 p-4">
            <nav className="space-y-2">
                {MENU[role].map(m => item(m.to, m.label))}
            </nav>
        </aside>
    );
}
