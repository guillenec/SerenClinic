import { create } from "zustand";
import { addMinutes } from "date-fns";


export type Role = "patient" | "doctor" | "admin";
export interface User { id: string; name: string; role: Role; }
export interface Doctor { id: string; name: string; specialty: string; color?: string; }
export interface Patient { id: string; name: string; docId: string; phone?: string; notes?: string; }
export interface Appointment {
    id: string;
    doctorId: string;
    patientId: string;
    startsAt: string; // ISO
    endsAt: string; // ISO
    type: "presencial" | "virtual";
    status: "pending" | "confirmed" | "cancelled";
}


interface AppState {
    currentUser?: User;
    doctors: Doctor[];
    patients: Patient[];
    appointments: Appointment[];
    waitlist: { id: string; patientId: string; reason?: string }[];
    login: (name: string, role: Role) => void;
    logout: () => void;
    addAppointment: (a: Appointment) => void;
    moveWaitlist: (from: number, to: number) => void;
}


const useAppStore = create<AppState>((set, get) => ({
    currentUser: undefined,
    doctors: [
        { id: "d1", name: "Dra. Sofía Pérez", specialty: "Clínica", color: "#A7D8F0" },
        { id: "d2", name: "Dr. Martín Gómez", specialty: "Pediatría", color: "#BEE7C8" },
    ],
    patients: [
        { id: "p1", name: "Juan Ramírez", docId: "34.567.890", phone: "+54 9 294 123", notes: "Alergia a penicilina" },
        { id: "p2", name: "Ana Díaz", docId: "29.111.222" },
    ],
    appointments: [
        {
            id: "a1",
            doctorId: "d1",
            patientId: "p1",
            startsAt: new Date().toISOString(),
            endsAt: addMinutes(new Date(), 30).toISOString(),
            type: "virtual",
            status: "confirmed",
        },
    ],
    waitlist: [
        { id: "w1", patientId: "p2", reason: "Consulta prioritaria" },
    ],
    login: (name, role) => set({ currentUser: { id: crypto.randomUUID(), name, role } }),
    logout: () => set({ currentUser: undefined }),
    addAppointment: (a) => set({ appointments: [...get().appointments, a] }),
    moveWaitlist: (from, to) => set((s) => {
        const items = [...s.waitlist];
        const [moved] = items.splice(from, 1);
        items.splice(to, 0, moved);
        return { waitlist: items };
    }),
}));

export default useAppStore