import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import useAppStore, { type Role } from "../store/appStore";

type RegisterForm = { name: string; email: string; password: string; role: Role };

export default function Register() {
    const navigate = useNavigate();
    const registerUser = useAppStore(s => s.register);
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
        defaultValues: { name: "", email: "", password: "", role: "patient" }
    });

    const onSubmit = (v: RegisterForm) => {
        const res = registerUser(v);
        if (!res.ok) {
            alert(res.error);
            return;
        }
        navigate("/", { replace: true });
    };

    return (
        <div className="min-h-dvh grid place-items-center bg-gradient-to-br from-pastel-sky/50 via-pastel-lilac/40 to-pastel-mint/50">
            <form onSubmit={handleSubmit(onSubmit)} className="card w-full max-w-md p-6 space-y-4">
                <h1 className="text-2xl font-semibold">Crear cuenta</h1>

                <div>
                    <label className="label">Nombre</label>
                    <input className="input" {...register("name", { required: "Nombre requerido" })} />
                    {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="label">Email</label>
                    <input className="input" type="email" {...register("email", { required: "Email requerido" })} />
                    {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
                </div>

                <div>
                    <label className="label">Contraseña</label>
                    <input className="input" type="password" {...register("password", { required: "Contraseña requerida", minLength: { value: 6, message: "Mínimo 6 caracteres" } })} />
                    {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
                </div>

                <div>
                    <label className="label">Rol</label>
                    <select className="input" {...register("role")}>
                        <option value="patient">Paciente</option>
                        <option value="doctor">Doctor/a</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <button className="btn btn-primary w-full" type="submit">Registrarme</button>
                <p className="text-sm text-slate-600">
                    ¿Ya tenés cuenta? <Link to="/login" className="underline">Iniciar sesión</Link>
                </p>
            </form>
        </div>
    );
}
