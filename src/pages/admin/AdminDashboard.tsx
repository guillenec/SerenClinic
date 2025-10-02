import useAppStore from "../../store/appStore";

export default function AdminDashboard() {
    const { doctors, patients, appointments } = useAppStore();
    return (
        <div className="space-y-4">
            <section className="card p-5">
                <h2 className="text-xl font-semibold">Panel de Administración</h2>
                <p className="text-slate-600">Gestión general del sistema (demo).</p>
            </section>

            <section className="grid sm:grid-cols-3 gap-4">
                <div className="card p-4">
                    <div className="text-3xl font-bold">{doctors.length}</div>
                    <div className="text-slate-600">Profesionales</div>
                </div>
                <div className="card p-4">
                    <div className="text-3xl font-bold">{patients.length}</div>
                    <div className="text-slate-600">Pacientes</div>
                </div>
                <div className="card p-4">
                    <div className="text-3xl font-bold">{appointments.length}</div>
                    <div className="text-slate-600">Citas (totales)</div>
                </div>
            </section>

            <section className="card p-5">
                <h3 className="font-semibold mb-2"> Accesos rapidos</h3>
                <ul className="list-disc pl-5 text-slate-600 space-y-1">
                    <li>Ver pacientes</li>
                    <li>Revisar agenda global</li>
                    <li>Configurar permisos (futuro)</li>
                </ul>
            </section>
        </div>
    );
}
