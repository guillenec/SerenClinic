import { Link } from "react-router";
import useAppStore from "../store/appStore";


export default function Navbar() {
    const user = useAppStore((s) => s.currentUser);
    const logout = useAppStore((s) => s.logout);
    return (
        <header className="col-span-full bg-white/90 backdrop-blur sticky top-0 z-20 border-b border-slate-100">
            <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
                <Link to="/" className="text-lg font-semibold">
                    <span className="px-2 py-1 rounded-xl2 bg-pastel-sky/60">SerenClinic</span>
                </Link>
                <div className="flex items-center gap-3">
                    {user && <span className="text-sm text-slate-600">{user.name} · {user.role}</span>}
                    {user && (
                        <button onClick={logout} className="btn btn-ghost">Salir</button>
                    )}
                </div>
            </div>
        </header>
    );
}