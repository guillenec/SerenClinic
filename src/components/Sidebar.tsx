import { NavLink } from "react-router";


export default function Sidebar() {
    const item = (to: string, label: string) => (
        <NavLink
            to={to}
            className={({ isActive }) => `block rounded-xl2 px-3 py-2 ${isActive ? "bg-pastel-mint/60" : "hover:bg-pastel-cloud"}`}
        >
            {label}
        </NavLink>
    );


    return (
        <aside className="hidden lg:block bg-white border-r border-slate-100 p-4">
            <nav className="space-y-2">
                {item("/", "Panel")}
                {item("/appointments", "Citas")}
                {item("/patients", "Pacientes")}
                {item("/televisit/a1", "Teleconsulta (demo)")}
            </nav>
        </aside>
    );
}