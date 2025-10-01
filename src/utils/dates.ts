import { format } from "date-fns";
export const fmt = (d: string | Date, f = "dd/MM/yyyy HH:mm") => format(new Date(d), f);