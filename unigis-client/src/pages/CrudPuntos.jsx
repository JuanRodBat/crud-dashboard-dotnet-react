import { useEffect, useState } from "react";
import { getPuntos, createPunto, updatePunto, deletePunto } from "../api/puntos";

const empty = { id:0, latitud:"", longitud:"", descripcion:"", venta:"", zona:"" };
const currency = v => new Intl.NumberFormat("es-MX",{style:"currency",currency:"MXN"}).format(v ?? 0);

export default function CrudPuntos(){
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);

  const load = () => getPuntos().then(setRows);
  useEffect(() => { load(); }, []);
  document.title = "CRUD Puntos | UNIGIS";

  const onChange = (k) => (e) => setForm(f => ({...f, [k]: e.target.value}));

  const submit = async (e) => {
    e.preventDefault();
    // validaciones simples
    if(!form.descripcion || !form.zona) return alert("Descripción y Zona son requeridos");
    const lat = Number(form.latitud), lng = Number(form.longitud), venta = Number(form.venta);
    if(Number.isNaN(lat) || Number.isNaN(lng)) return alert("Latitud/Longitud inválidas");
    if(venta < 0 || Number.isNaN(venta)) return alert("Venta inválida");
    setSaving(true);
    const payload = {...form, latitud:lat, longitud:lng, venta};
    try{
      if(form.id) await updatePunto(payload); else await createPunto(payload);
      setForm(empty); load();
    } finally { setSaving(false); }
  };

  const edit = (r) => setForm(r);
  const del  = async (id) => {
    if(!window.confirm("¿Eliminar el registro?")) return;
    await deletePunto(id); load();
  };

  return (
    <div>
        <h1>CRUD Puntos</h1>
        <div className="grid">
            <div className="card">
                <h3 style={{marginTop:0}}>{form.id ? "Editar punto" : "Nuevo punto"}</h3>
                <form onSubmit={submit} className="space-y" style={{maxWidth:560}}>
                <div>
                    <div className="label">Descripción</div>
                    <input className="input" value={form.descripcion} onChange={onChange("descripcion")} required />
                </div>
                <div>
                    <div className="label">Zona</div>
                    <input className="input" value={form.zona} onChange={onChange("zona")} required />
                </div>
                <div className="form-grid">
                    <div>
                    <div className="label">Latitud</div>
                    <input type="number" step="0.000001" className="input" value={form.latitud} onChange={onChange("latitud")} required />
                    </div>
                    <div>
                    <div className="label">Longitud</div>
                    <input type="number" step="0.000001" className="input" value={form.longitud} onChange={onChange("longitud")} required />
                    </div>
                </div>
                <div>
                    <div className="label">Venta (MXN)</div>
                    <input type="number" step="0.01" min="0" className="input" value={form.venta} onChange={onChange("venta")} required />
                </div>

                <div style={{display:"flex", gap:10}}>
                    <button className="btn primary" type="submit" disabled={saving}>
                    {form.id ? "Actualizar" : "Crear"}
                    </button>
                    {form.id ? (
                    <button type="button" className="btn" onClick={()=>setForm(empty)}>Cancelar</button>
                    ): null}
                </div>
                </form>
            </div>
            <div className="card">
                <h3 style={{marginTop:0}}>Registros</h3>
                <div className="table-wrap table-stack">
                <table>
                    <thead>
                    <tr>
                        <th>ID</th><th>Descripción</th><th>Zona</th><th>Lat</th><th>Lng</th><th>Venta</th><th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                        {rows.map(r=>(
                            <tr key={r.id}>
                            <td data-label="ID">{r.id}</td>
                            <td data-label="Descripción">{r.descripcion}</td>
                            <td data-label="Zona">{r.zona}</td>
                            <td data-label="Lat">{r.latitud}</td>
                            <td data-label="Lng">{r.longitud}</td>
                            <td data-label="Venta">{currency(r.venta)}</td>
                            <td data-label="Acciones">
                                <div style={{display:"flex", flexWrap:"wrap", gap:8}}>
                                <button className="btn" onClick={()=>edit(r)}>Editar</button>
                                <button className="btn danger" onClick={()=>del(r.id)}>Eliminar</button>
                                </div>
                            </td>
                            </tr>
                        ))}
                        {!rows.length && (
                            <tr><td data-label="Info" colSpan="7" className="muted">Sin registros</td></tr>
                        )}
                    </tbody>
                </table>
                </div>
            </div>
        </div>    
    </div>
  );
}
