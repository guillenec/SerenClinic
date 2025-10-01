
import PatientCard from "../components/PatientCard";
import useAppStore from "../store/appStore";


export default function Patients() {
    const { patients } = useAppStore();
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {patients.map(p => <PatientCard key={p.id} id={p.id} />)}
        </div>
    );
}