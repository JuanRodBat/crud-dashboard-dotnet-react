import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from "recharts";

const PALETTE = [
  "var(--pie-1)","var(--pie-2)","var(--pie-3)",
  "var(--pie-4)","var(--pie-5)","var(--pie-6)"
];

const currency = v => new Intl.NumberFormat("es-MX",{style:"currency",currency:"MXN"}).format(v);

export default function TortaVentas({ data=[] }){
  return (
    <div className="card">
      <h3 style={{marginTop:0}}>Ventas por Zona</h3>
      {!data.length ? (
        <div className="center" style={{height:260}}><span className="muted">Sin datos</span></div>
      ) : (
        <div style={{ height: 320 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={data} dataKey="totalVenta" nameKey="zona"
                   label={({name, percent}) => `${name} ${(percent*100).toFixed(0)}%`}>
                {data.map((_, i) => (
                  <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v)=>currency(v)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
