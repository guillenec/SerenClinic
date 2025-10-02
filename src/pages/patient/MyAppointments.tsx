import useAppStore from "../../store/appStore";

export default function MyAppointments() {
    const { currentUser, appointments, patients, doctors } = useAppStore();

    // 🔎 Mock: intenta vincular por nombre (si el usuario "paciente" coincide con un paciente)
    const me = patients.find(p => p.name === currentUser?.name);
    const mine = me ? appointments.filter(a => a.patientId === me.id) : appointments; // fallback: muestra todas

    return (
        <div className="space-y-4">
            <section className="card p-4">
                <h2 className="text-xl font-semibold">Mis citas</h2>
                {!me && (
                    <p className="text-slate-600 mt-1">
                        (Demo) Tu usuario no está vinculado a un paciente de la base mock. Mostrando todas.
                    </p>
                )}
            </section>
            <section className="card p-4">
                <ul className="space-y-2 text-sm">
                    {mine.map(a => {
                        const doc = doctors.find(d => d.id === a.doctorId);
                        return (
                            <li key={a.id} className="flex items-center justify-between">
                                <span>{new Date(a.startsAt).toLocaleString()} · {a.type}</span>
                                <span className="text-slate-600">{doc?.name} · {a.status}</span>
                            </li>
                        );
                    })}
                </ul>
            </section>
        </div>
    );
}
