import { useEffect, useState } from "react";
import { getPuntos, getVentasPorZona } from "../api/puntos";
import Mapa from "../components/Mapa";
import TortaVentas from "../components/TortaVentas";

export default function Dashboard({ dark }) {
  const [puntos, setPuntos] = useState(null);
  const [torta, setTorta] = useState(null);

  useEffect(() => {
    getPuntos().then(setPuntos).catch(()=>setPuntos([]));
    getVentasPorZona().then(setTorta).catch(()=>setTorta([]));
    document.title = "Dashboard | UNIGIS";
  }, []);

  const loading = (
    <div className="card center" style={{height:120}}>
      <span className="muted">Cargando…</span>
    </div>
  );

  return (
    <div>
        <h1>Dashboard</h1>
        <div className="grid grid-2">
        {puntos ? <Mapa puntos={puntos} dark={dark} /> : loading}
        {torta ? <TortaVentas data={torta}/> : loading}
        </div>
    </div>
  );
}
