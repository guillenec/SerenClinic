import { useForm } from "react-hook-form";
import Select from "react-select";
import useAppStore from "../store/appStore";
import { addMinutes } from "date-fns";
import { toast } from "sonner";

type ApptForm = {
    doctorId: string;
    patientId: string;
    date: string;                 // "YYYY-MM-DD"
    time: string;                 // "HH:mm"
    type: "presencial" | "virtual";
};

export default function AppointmentForm() {
    const { doctors, patients, addAppointment } = useAppStore();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<ApptForm>({
        defaultValues: { doctorId: "", patientId: "", date: "", time: "", type: "presencial" },
        mode: "onSubmit",
    });

    const onSubmit = (v: ApptForm) => {
        const starts = new Date(`${v.date}T${v.time}:00`);
        addAppointment({
            id: crypto.randomUUID(),
            doctorId: v.doctorId,
            patientId: v.patientId,
            startsAt: starts.toISOString(),
            endsAt: addMinutes(starts, 30).toISOString(),
            type: v.type,
            status: "pending",
        });
        // alert("Cita creada (mock)");
        toast.success('Cita creada 😘')
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="neumorphism-white p-4 space-y-3">
            <h3 className="font-semibold">Nueva cita</h3>

            <div>
                <label className="label">Profesional</label>
                <Select
                    options={doctors.map(d => ({ value: d.id, label: `${d.name} · ${d.specialty}` }))}
                    onChange={(opt) =>
                        setValue("doctorId", opt?.value ?? "", { shouldDirty: true, shouldValidate: true })
                    }
                />
                {errors.doctorId && <p className="text-sm text-red-600">Selecciona un profesional</p>}
            </div>

            <div>
                <label className="label">Paciente</label>
                <Select
                    options={patients.map(p => ({ value: p.id, label: `${p.name} (${p.docId})` }))}
                    onChange={(opt) =>
                        setValue("patientId", opt?.value ?? "", { shouldDirty: true, shouldValidate: true })
                    }
                />
                {errors.patientId && <p className="text-sm text-red-600">Selecciona un paciente</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="label">Fecha</label>
                    <input
                        type="date"
                        className="input"
                        {...register("date", { required: "La fecha es obligatoria" })}
                    />
                    {errors.date && <p className="text-sm text-red-600">{errors.date.message}</p>}
                </div>
                <div>
                    <label className="label">Hora</label>
                    <input
                        type="time"
                        className="input"
                        {...register("time", { required: "La hora es obligatoria" })}
                    />
                    {errors.time && <p className="text-sm text-red-600">{errors.time.message}</p>}
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
