import { create } from "zustand";
import { persist } from "zustand/middleware";
import { addMinutes } from "date-fns";

export type Role = "patient" | "doctor" | "admin";

export interface User {
    id: string;
    name: string;
    role: Role;
    email?: string;
}

export interface Doctor { id: string; name: string; specialty: string; color?: string; }
export interface Patient { id: string; name: string; docId: string; phone?: string; notes?: string; }

export interface Appointment {
    id: string;
    doctorId: string;
    patientId: string;
    startsAt: string; // ISO
    endsAt: string;   // ISO
    type: "presencial" | "virtual";
    status: "pending" | "confirmed" | "cancelled";
}

export interface AuthUser {
    id: string;
    name: string;
    role: Role;
    email: string;
    password: string; // ⚠️ solo mock (plaintext)
    linkedPatientId?: string;
    linkedDoctorId?: string;
}

interface AppState {
    // sesión
    currentUser?: User;
    currentPatientId?: string;
    currentDoctorId?: string;

    // datos
    users: AuthUser[];
    doctors: Doctor[];
    patients: Patient[];
    appointments: Appointment[];
    waitlist: { id: string; patientId: string; reason?: string }[];

    // acciones
    register: (p: { name: string; email: string; password: string; role: Role }) => { ok: boolean; error?: string };
    loginWithPassword: (email: string, password: string) => { ok: boolean; error?: string };
    logout: () => void;

    addAppointment: (a: Appointment) => void;
    moveWaitlist: (from: number, to: number) => void;
}

const seedDoctors: Doctor[] = [
    { id: "d1", name: "Dra. Sofía Pérez", specialty: "Clínica", color: "#A7D8F0" },
    { id: "d2", name: "Dr. Martín Gómez", specialty: "Pediatría", color: "#BEE7C8" },
    { id: "d3", name: "Dra. Laura Martínez", specialty: "Ginecología", color: "#FAD2CF" },
    { id: "d4", name: "Dr. Carlos Rodríguez", specialty: "Cardiología", color: "#F0D8A7" },
    { id: "d5", name: "Dra. Ana Díaz", specialty: "Dermatología", color: "#D8A7F0" },
];

const seedPatients: Patient[] = [
    { id: "p1", name: "Juan Ramírez", docId: "34.567.890", phone: "+54 9 294 123", notes: "Alergia a penicilina" },
    { id: "p2", name: "Ana Díaz", docId: "29.111.222" },
    { id: "p3", name: "Carlos Rodríguez", docId: "XX.333.444" },
    { id: "p4", name: "Laura Martínez", docId: "XX.555.666" },
    { id: "p5", name: "Sofía Pérez", docId: "XX.777.888" },
];

const seedAppointments: Appointment[] = [
    {
        id: "a1",
        doctorId: "d1",
        patientId: "p1",
        startsAt: new Date().toISOString(),
        endsAt: addMinutes(new Date(), 30).toISOString(),
        type: "virtual",
        status: "confirmed",
    },
];

const seedUsers: AuthUser[] = [
    {
        id: "u1",
        name: "Dra. Sofía Pérez",
        role: "doctor",
        email: "sofia@demo.com",
        password: "123456",
        linkedDoctorId: "d1",
    },
    {
        id: "u2",
        name: "Juan Ramírez",
        role: "patient",
        email: "juan@demo.com",
        password: "123456",
        linkedPatientId: "p1",
    },
    {
        id: "u3",
        name: "Admin Demo",
        role: "admin",
        email: "admin@demo.com",
        password: "admin",
    },
];

const useAppStore = create(persist<AppState>(
    (set, get) => ({
        // sesión
        currentUser: undefined,
        currentPatientId: undefined,
        currentDoctorId: undefined,

        // datos
        users: seedUsers,
        doctors: seedDoctors,
        patients: seedPatients,
        appointments: seedAppointments,
        waitlist: [{ id: "w1", patientId: "p2", reason: "Consulta prioritaria" }],

        // acciones de auth (mock)
        register: ({ name, email, password, role }) => {
            const exists = get().users.some(u => u.email.toLowerCase() === email.toLowerCase());
            if (exists) return { ok: false, error: "El email ya está registrado" };

            const id = crypto.randomUUID();
            const entry: AuthUser = { id, name, email, password, role };

            // si es doctor/paciente, crear registro básico y vincular
            if (role === "doctor") {
                const did = "d" + id.slice(0, 6);
                set(s => ({ doctors: [...s.doctors, { id: did, name, specialty: "Clínica" }] }));
                entry.linkedDoctorId = did;
            }
            if (role === "patient") {
                const pid = "p" + id.slice(0, 6);
                set(s => ({ patients: [...s.patients, { id: pid, name, docId: "—" }] }));
                entry.linkedPatientId = pid;
            }

            set(s => ({ users: [...s.users, entry] }));

            // inicia sesión automáticamente
            set({
                currentUser: { id: entry.id, name: entry.name, role: entry.role, email: entry.email },
                currentPatientId: entry.linkedPatientId,
                currentDoctorId: entry.linkedDoctorId,
            });

            return { ok: true };
        },

        loginWithPassword: (email, password) => {
            const u = get().users.find(x => x.email.toLowerCase() === email.toLowerCase() && x.password === password);
            if (!u) return { ok: false, error: "Credenciales inválidas" };

            set({
                currentUser: { id: u.id, name: u.name, role: u.role, email: u.email },
                currentPatientId: u.linkedPatientId,
                currentDoctorId: u.linkedDoctorId,
            });
            return { ok: true };
        },

        logout: () => set({
            currentUser: undefined,
            currentPatientId: undefined,
            currentDoctorId: undefined,
        }),

        // citas
        addAppointment: (a) => set({ appointments: [...get().appointments, a] }),

        // waitlist
        moveWaitlist: (from, to) => set((s) => {
            const items = [...s.waitlist];
            const [moved] = items.splice(from, 1);
            items.splice(to, 0, moved);
            return { waitlist: items };
        }),
    }),
    { name: "app-store" } // localStorage
));

export default useAppStore;
export type { AppState };
