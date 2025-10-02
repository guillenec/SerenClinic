import { format } from "date-fns";
import useAppStore from "../../store/appStore";

export default function DoctorDashboard() {
    const { currentUser, appointments, patients, doctors } = useAppStore();
    // Demo: toma la primera cita como "próxima"
    const next = appointments[0];
    const pat = patients.find(p => p.id === next?.patientId);
    const doc = doctors.find(d => d.id === next?.doctorId);

    return (
        <div className="space-y-4">
            <section className="card p-5">
                <h2 className="text-xl font-semibold">Hola {currentUser?.name} 👋</h2>
                <p className="text-slate-600">Este es tu panel de profesional.</p>
            </section>

            <section className="card p-5">
                <h3 className="font-semibold mb-2">Próxima cita</h3>
                {next ? (
                    <div className="space-y-1">
                        <div className="text-slate-700">{pat?.name} · {next.type}</div>
                        <div className="text-slate-600">
                            {format(new Date(next.startsAt), "dd/MM HH:mm")}–{format(new Date(next.endsAt), "HH:mm")}
                        </div>
                        <div className="text-slate-500">Profesional: {doc?.name}</div>
                    </div>
                ) : <p>No hay citas programadas.</p>}
            </section>
        </div>
    );
}
