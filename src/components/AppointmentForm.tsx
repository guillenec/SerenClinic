import { useForm } from "react-hook-form";
import Select from "react-select";
import useAppStore from "../store/appStore";


export default function AppointmentForm() {
    const { doctors, patients, addAppointment } = useAppStore();
    const { register, handleSubmit, setValue, watch } = useForm({
        defaultValues: { doctorId: "", patientId: "", date: "", time: "", type: "presencial" },
    });


    return (
        <form
            onSubmit={handleSubmit((v) => {
                const starts = new Date(`${v.date}T${v.time}:00`);
                addAppointment({
                    id: crypto.randomUUID(),
                    doctorId: v.doctorId,
                    patientId: v.patientId,
                    startsAt: starts.toISOString(),
                    endsAt: new Date(starts.getTime() + 30 * 60000).toISOString(),
                    type: v.type as any,
                    status: "pending",
                });
                alert("Cita creada (mock)");
            })}
            className="card p-4 space-y-3"
        >
            <h3 className="font-semibold">Nueva cita</h3>


            <div>
                <label className="label">Profesional</label>
                <Select
                    options={doctors.map(d => ({ value: d.id, label: `${d.name} · ${d.specialty}` }))}
                    onChange={(opt) => setValue("doctorId", opt?.value || "")}
                />
            </div>


            <div>
                <label className="label">Paciente</label>
                <Select
                    options={patients.map(p => ({ value: p.id, label: `${p.name} (${p.docId})` }))}
                    onChange={(opt) => setValue("patientId", opt?.value || "")}
                />
            </div>


            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="label">Fecha</label>
                    <input type="date" className="input" {...register("date", { required: true })} />
                </div>
                <div>
                    <label className="label">Hora</label>
                    <input type="time" className="input" {...register("time", { required: true })} />
                </div>
            </div>


            <div>
                <label className="label">Tipo</label>
                <select className="input" {...register("type")}>
                    <option value="presencial">Presencial</option>
                    <option value="virtual">Virtual</option>
                </select>
            </div>


            <button className="btn btn-primary" type="submit">Crear</button>
        </form>
    );
}