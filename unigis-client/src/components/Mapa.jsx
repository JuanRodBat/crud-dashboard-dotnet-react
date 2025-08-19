import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import marker2x from "leaflet/dist/images/marker-icon-2x.png";
import marker from "leaflet/dist/images/marker-icon.png";
import shadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ iconRetinaUrl: marker2x, iconUrl: marker, shadowUrl: shadow });

function FitBounds({ puntos }){
  const map = useMap();
  useEffect(() => {
    if (!puntos?.length) return;
    const bounds = L.latLngBounds(puntos.map(p => [Number(p.latitud), Number(p.longitud)]));
    map.fitBounds(bounds, { padding:[30,30] });
  }, [puntos, map]);
  return null;
}

export default function Mapa({ puntos=[], dark=false }){
  const center = [19.4326, -99.1332];

  const TILE = dark
    ? {
        url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }
    : {
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      };

  return (
    <div className="card">
      <h3 style={{marginTop:0}}>Mapa de Puntos</h3>
      {!puntos.length ? (
        <div className="center" style={{height:300}}><span className="muted">No hay puntos para mostrar</span></div>
      ) : (
        <MapContainer center={center} zoom={12} style={{ height: 420, width: "100%", borderRadius: 12 }}>
          <TileLayer url={TILE.url} attribution={TILE.attribution} />
          <FitBounds puntos={puntos}/>
          {puntos.map(p => (
            <Marker key={p.id} position={[Number(p.latitud), Number(p.longitud)]}>
              <Popup>
                <b>{p.descripcion}</b><br/>
                Zona: {p.zona}<br/>
                Venta: {new Intl.NumberFormat("es-MX",{style:"currency",currency:"MXN"}).format(p.venta)}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
}
