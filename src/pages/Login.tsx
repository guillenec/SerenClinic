import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import useAppStore from "../store/appStore";

type LoginForm = { email: string; password: string };

export default function Login() {
    const navigate = useNavigate();
    const loginWithPassword = useAppStore(s => s.loginWithPassword);
    const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginForm>({
        defaultValues: { email: "", password: "" }
    });

    const onSubmit = (v: LoginForm) => {
        const res = loginWithPassword(v.email, v.password);
        if (!res.ok) {
            setError("email", { type: "manual", message: res.error });
            setError("password", { type: "manual", message: res.error });
            return;
        }
        navigate("/", { replace: true });
    };

    return (
        <div className="min-h-dvh grid place-items-center bg-gradient-to-br from-pastel-sky/50 via-pastel-lilac/40 to-pastel-mint/50">
            <form onSubmit={handleSubmit(onSubmit)} className="card w-full max-w-md p-6 space-y-4">
                <h1 className="text-2xl font-semibold">Ingresar</h1>

                <div>
                    <label className="label">Email</label>
                    <input className="input" type="email" {...register("email", { required: "Email requerido" })} />
                    {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
                </div>

                <div>
                    <label className="label">Contraseña</label>
                    <input className="input" type="password" {...register("password", { required: "Contraseña requerida" })} />
                    {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
                </div>

                <button className="btn btn-primary w-full" type="submit">Entrar</button>

                <p className="text-sm text-slate-600">
                    ¿No tenés cuenta? <Link to="/register" className="underline">Crear una cuenta</Link>
                </p>
            </form>
        </div>
    );
}
