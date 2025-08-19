import { http } from "./http";
export const getPuntos = (params) => http.get("/puntos", { params }).then(r => r.data);
export const getVentasPorZona = () => http.get("/puntos/ventas-por-zona").then(r => r.data);
export const createPunto = (p) => http.post("/puntos", p).then(r => r.data);
export const updatePunto = (p) => http.put(`/puntos/${p.id}`, p);
export const deletePunto = (id) => http.delete(`/puntos/${id}`);
