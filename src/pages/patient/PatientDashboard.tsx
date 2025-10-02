import { Link } from "react-router";
import useAppStore from "../../store/appStore";

export default function PatientDashboard() {
    const { currentUser } = useAppStore();
    return (
        <div className="space-y-4">
            <section className="card p-5">
                <h2 className="text-xl font-semibold">Hola {currentUser?.name || "Paciente"} 👋</h2>
                <p className="text-slate-600">Bienvenido/a a tu panel de paciente.</p>
            </section>

            <section className="card p-5">
                <h3 className="font-semibold mb-2">Accesos rápidos</h3>
                <div className="flex gap-2">
                    <Link to="/patient/appointments" className="btn btn-primary">Mis citas</Link>
                    <Link to="/televisit/a1" className="btn btn-ghost">Teleconsulta (demo)</Link>
                </div>
            </section>
        </div>
    );
}
