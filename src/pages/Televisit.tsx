import TelevisitPanel from "../components/TelevisitPanel";


function Televisit() {
    return (
        <div className="space-y-4">
            <section className="card p-4">
                <h2 className="text-xl font-semibold">Teleconsulta</h2>
                <p className="text-slate-600">Esta vista integra el componente de video y chat seguro próximamente.</p>
            </section>
            <div className="card p-4">
                <TelevisitPanel />
            </div>
        </div>
    );
}

export default Televisit