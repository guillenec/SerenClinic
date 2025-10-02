import { useParams } from "react-router";
import useAppStore from "../store/appStore";


export default function PatientDetail() {
    const { id } = useParams();
    const { patients, appointments } = useAppStore();
    const p = patients.find(x => x.id === id);
    const history = appointments.filter(a => a.patientId === id);


    if (!p) return <div className="card p-4">Paciente no encontrado.</div>;


    return (
        <div className="space-y-4">
            <section className="neumorphism-white p-4">
                <h2 className="text-xl font-semibold">{p.name}</h2>
                <p className="text-slate-600">Doc: {p.docId} · Tel: {p.phone || "—"}</p>
                {p.notes && <p className="mt-2 text-slate-600">Notas: {p.notes}</p>}
            </section>
            <section className="neumorphism-white p-4">
                <h3 className="font-semibold mb-2">Historial (mock)</h3>
                <ul className="space-y-2 text-sm">
                    {history.map(h => (
                        <li key={h.id} className="flex items-center justify-between">
                            <span>{new Date(h.startsAt).toLocaleString()} · {h.type}</span>
                            <span className="text-slate-500">{h.status}</span>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}