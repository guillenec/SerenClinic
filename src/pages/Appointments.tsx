import CalendarGrid from "../components/CalendarGrid";
import AppointmentForm from "../components/AppointmentForm";
import WaitlistBoard from "../components/WaitlistBoard";


export default function Appointments() {
    return (
        <div className="grid lg:grid-cols-[1fr_360px] gap-4">
            <div className="space-y-4">
                <div className="card p-4"><CalendarGrid /></div>
                <div className="card p-4"><WaitlistBoard /></div>
            </div>
            <AppointmentForm />
        </div>
    );
}