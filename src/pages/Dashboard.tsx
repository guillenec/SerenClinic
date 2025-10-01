import { format } from "date-fns";
import useAppStore from "../store/appStore";


export default function Dashboard() {
    const { currentUser, appointments, patients } = useAppStore();
    const next = appointments[0];
    const patient = patients.find(p => p.id === next?.patientId);

    console.log("paciente ", patient)

    return (
        <div className="space-y-6">
            <section className="card p-5">
                <h2 className="text-xl font-semibold">Hola {currentUser?.name} 👋</h2>
                <p className="text-slate-600">Bienvenido/a al panel de <b>SerenClinic</b>.</p>
            </section>


            <section className="grid md:grid-cols-2 gap-4">
                <div className="card p-5">
                    <h3 className="font-semibold mb-2">Próxima cita</h3>
                    {next ? (
                        <div>
                            <p className="text-slate-700">{patient?.name} · {next.type}</p>
                            <p className="text-slate-500">{format(new Date(next.startsAt), "dd/MM HH:mm")}–{format(new Date(next.endsAt), "HH:mm")}</p>
                        </div>
                    ) : <p>No hay citas.</p>}
                </div>
                <div className="card p-5">
                    <h3 className="font-semibold mb-2">Atajos</h3>
                    <ul className="list-disc pl-5 text-slate-600 space-y-1">
                        <li>Crear cita rápida</li>
                        <li>Abrir teleconsulta demo</li>
                        <li>Ver lista de espera</li>
                    </ul>
                </div>
            </section>
        </div>
    );
}