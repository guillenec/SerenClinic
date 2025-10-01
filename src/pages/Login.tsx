import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useAppStore, { type Role } from "../store/appStore";


function Login() {
    const { register, handleSubmit } = useForm<{ name: string; role: Role }>();
    const login = useAppStore((s) => s.login);
    const navigate = useNavigate();


    return (
        <div className="min-h-dvh grid place-items-center bg-gradient-to-br from-pastel-sky/50 via-pastel-lilac/40 to-pastel-mint/50">
            <form
                onSubmit={handleSubmit(({ name, role }) => {
                    login(name, role);
                    navigate("/");
                })}
                className="card_neumorfism  w-full max-w-md p-6 space-y-4"
            >
                <h1 className="text-2xl font-semibold">Ingresar</h1>
                <label className="label">Nombre</label>
                <input className="input" {...register("name", { required: true })} placeholder="Ej: Dra. Pérez" />
                <label className="label">Rol</label>
                <select className="input" {...register("role", { required: true })}>
                    <option value="patient">Paciente</option>
                    <option value="doctor">Doctor/a</option>
                    <option value="admin">Admin</option>
                </select>
                <button className="btn btn-primary w-full" type="submit">Entrar</button>
            </form>
        </div>
    );
}

export default Login