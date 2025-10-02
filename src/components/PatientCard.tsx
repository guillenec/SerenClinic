import { Link } from "react-router";
import useAppStore from "../store/appStore";


export default function PatientCard({ id }: { id: string }) {
    const p = useAppStore(s => s.patients.find(x => x.id === id));
    if (!p) return null;
    return (
        <Link to={`/patients/${p.id}`} className="neumorphism-white p-4 block hover:shadow-md transition">
            <div className="font-semibold">{p.name}</div>
            <div className="text-sm text-slate-600">{p.docId} · {p.phone || "sin teléfono"}</div>
            {p.notes && <p className="text-sm text-slate-500 mt-1">Notas: {p.notes}</p>}
        </Link>
    );
}