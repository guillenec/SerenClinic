import { eachHourOfInterval, format, addHours, startOfDay } from "date-fns";
import { es } from "date-fns/locale";
import useAppStore from "../store/appStore";



export default function CalendarGrid() {
    const { appointments, doctors, patients } = useAppStore();
    // const start = startOfWeek(new Date(), { weekStartsOn: 1 });
    const start = startOfDay(new Date());
    const START_HOUR = 8;
    const TOTAL_HOURS = 11

    const intervalStart = addHours(start, START_HOUR);
    const intercalEnd = addHours(intervalStart, TOTAL_HOURS)

    const hours = eachHourOfInterval({
        start: intervalStart,
        end: intercalEnd
    }); // 8 horas demo

    const daysInView = [0, 1, 2, 3, 4]

    return (
        <div className="overflow-x-auto">
            <table className="min-w-[700px] w-full text-sm">
                <thead>
                    <tr>
                        <th className="text-left p-2">Hora</th>
                        {daysInView.map(d => (
                            <th key={d} className="p-2 text-left">{format(addHours(start, d * 24), "EEE dd", { locale: es })}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {hours.map((h, i) => (
                        <tr key={i} className="border-t">
                            <td className="p-2 whitespace-nowrap">{format(h, "HH:mm")}</td>
                            {daysInView.map(d => {
                                const day = addHours(h, d * 24);
                                const appt = appointments.find(a => format(new Date(a.startsAt), "yyyy-MM-dd-HH") === format(day, "yyyy-MM-dd-HH"));
                                if (!appt) return <td key={d} className="p-2"></td>;
                                const doc = doctors.find(x => x.id === appt.doctorId);
                                const pat = patients.find(x => x.id === appt.patientId);
                                return (
                                    <td key={d} className="p-2">
                                        <div className="rounded-xl2 px-3 py-2" style={{ background: doc?.color + "99" }}>
                                            <div className="font-medium">{pat?.name}</div>
                                            <div className="text-slate-600">{doc?.name} · {appt.type}</div>
                                        </div>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}