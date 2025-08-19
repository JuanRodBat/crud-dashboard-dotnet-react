import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import CrudPuntos from "./pages/CrudPuntos";

export default function App({ theme, setTheme }){
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <BrowserRouter>
      <header className="nav">
        <div className="nav-inner container">
          <div className="brand">
            <a href="https://www.unigis.com/">UNIGIS</a>
          </div>
          <nav className="nav-buttons">
            <NavLink to="/" end className={({isActive})=> isActive ? "active" : undefined}>Dashboard</NavLink>
            <NavLink to="/crud" className={({isActive})=> isActive ? "active" : undefined}>CRUD</NavLink>
          </nav>

          {/* Toggle */}
          <button
            className="btn"
            style={{marginLeft:"auto", fontWeight:600}}
            onClick={()=>setDark(d=>!d)}
            aria-label={dark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
            title={dark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
          >
            {dark ? "☀️ Claro" : "🌙 Oscuro"}
          </button>
        </div>
      </header>

      <main className="container" style={{paddingTop:24}}>
        <Routes>
            <Route path="/" element={<Dashboard dark={dark} />} />
            <Route path="/crud" element={<CrudPuntos />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
