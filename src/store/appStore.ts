import { create } from "zustand";
import { addMinutes } from "date-fns";
import { persist } from "zustand/middleware";


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

const useAppStore = create(persist<AppState>(
    (set, get) => ({
        currentUser: undefined,
        doctors: [
            { id: "d1", name: "Dra. Sofía Pérez", specialty: "Clínica", color: "#A7D8F0" },
            { id: "d2", name: "Dr. Martín Gómez", specialty: "Pediatría", color: "#BEE7C8" },
            { id: "d4", name: "Dr. Carlos Rodríguez", specialty: "Cardiología", color: "#F0D8A7" },
            { id: "d5", name: "Dra. Ana Díaz", specialty: "Dermatología", color: "#D8A7F0" }
        ],
        patients: [
            { id: "p1", name: "Juan Ramírez", docId: "34.567.890", phone: "+54 9 294 123", notes: "Alergia a penicilina" },
            { id: "p2", name: "Ana Díaz", docId: "29.111.222", phone: "+54 9 294 456", notes: "Hipertensión" },
            { id: "p3", name: "Carlos Rodríguez", docId: "XX.333.444", phone: "+54 9 294 789", notes: "Diabetes" },
            { id: "p4", name: "Laura Martínez", docId: "XX.555.666", phone: "+54 9 294 012", notes: "Hipertensión" },
            { id: "p5", name: "Sofía Pérez", docId: "XX.777.888", phone: "+54 9 294 345", notes: "Asma" }
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
            {
                id: "a2",
                doctorId: "d2",
                patientId: "p2",
                startsAt: addMinutes(new Date(), 60).toISOString(),
                endsAt: addMinutes(new Date(), 90).toISOString(),
                type: "presencial",
                status: "pending",
            },
            {
                id: "a3",
                doctorId: "d3",
                patientId: "p4",
                startsAt: addMinutes(new Date(), 120).toISOString(),
                endsAt: addMinutes(new Date(), 150).toISOString(),
                type: "virtual",
                status: "confirmed",
            },
            {
                id: "a4",
                doctorId: "d4",
                patientId: "p3",
                startsAt: addMinutes(new Date(), 180).toISOString(),
                endsAt: addMinutes(new Date(), 210).toISOString(),
                type: "presencial",
                status: "cancelled",
            },
            {
                id: "a5",
                doctorId: "d1",
                patientId: "p5",
                startsAt: addMinutes(new Date(), 240).toISOString(),
                endsAt: addMinutes(new Date(), 270).toISOString(),
                type: "virtual",
                status: "confirmed",
            }
        ],
        waitlist: [
            { id: "w1", patientId: "p2", reason: "Consulta prioritaria" },
            { id: "w2", patientId: "p3", reason: "Consulta de seguimiento" },
            { id: "w3", patientId: "p4", reason: "Consulta prioritaria" },
            { id: "w4", patientId: "p1", reason: "Consulta de seguimiento" },
            { id: "w5", patientId: "p5", reason: "Consulta de seguimiento" }
        ],
        login: (name, role) => set({ currentUser: { id: crypto.randomUUID(), name, role } }), // creamos id random
        logout: () => set({ currentUser: undefined }),
        addAppointment: (a) => set({ appointments: [...get().appointments, a] }),
        moveWaitlist: (from, to) => set((s) => {
            const items = [...s.waitlist];
            const [moved] = items.splice(from, 1);
            items.splice(to, 0, moved);
            return { waitlist: items };
        }),

    }),
    { name: "app-store" } // localStorage key
));


export default useAppStore