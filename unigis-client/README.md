# Unigis Client (React)

Aplicación web en **React** para visualizar y administrar puntos de venta sobre un **mapa Leaflet** y un **gráfico de torta** por zona.
Consume la API REST de **ASP.NET Core** mediante **Axios**.

## Tecnologías

* React 19, react-router-dom 6
* Axios
* Leaflet + react-leaflet 5
* Recharts (gráfico de torta)
* CRA (react-scripts 5)

## Requisitos

* Node.js 18+ (recomendado 18 o 20)
* API .NET corriendo y accesible (ver variable `REACT_APP_API_BASE`)

## Variables de entorno

Crea un archivo **`.env`** en la raíz del proyecto:

```env
REACT_APP_API_BASE=https://localhost:PORT/api
```

> Reemplaza `PORT` por el puerto real de tu API (el mismo que ves en Swagger).
> Tras modificar `.env`, reinicia `npm start`.

## Instalación y ejecución

```bash
# 1) Instalar dependencias
npm install

# 2) Ejecutar en desarrollo
npm start

# 3) Compilar para producción
npm run build
```

La app se servirá en `http://localhost:3000` por defecto.

## Estructura del proyecto

```
src/
  api/
    http.js          # instancia de Axios (usa REACT_APP_API_BASE)
    puntos.js        # servicios REST para puntos de venta
  components/
    Mapa.jsx         # mapa Leaflet + marcadores
    TortaVentas.jsx  # gráfico de torta (Recharts)
  pages/
    Dashboard.jsx    # mapa + gráfico (lectura)
    CrudPuntos.jsx   # CRUD de puntos de venta
  App.jsx            # rutas y layout básico
  index.js           # bootstrap React (importa leaflet.css)
  index.css          # estilos globales
```

## Endpoints consumidos

Estos endpoints deben existir en el backend:

* `GET    /api/puntos?zona=&q=` — listar (con filtros opcionales)
* `GET    /api/puntos/{id}`
* `POST   /api/puntos`
* `PUT    /api/puntos/{id}`
* `DELETE /api/puntos/{id}`
* `GET    /api/puntos/ventas-por-zona` — datos agregados para el gráfico

## Funcionalidades

* **Dashboard**: muestra marcadores en el mapa con popup (descripción, zona, venta) y **gráfico de torta** con ventas por zona.
* **CRUD Puntos**: alta, edición y eliminación de puntos de venta.
* Ruteo con **react-router-dom** (`/` y `/crud`).

## Notas importantes

### CORS

En el backend define el origen permitido:

```json
"AllowedOrigin": "http://localhost:3000"
```

y habilita `app.UseCors()` (ya configurado en el proyecto API).

### CSS de Leaflet

No importes el CSS desde `index.css`. En **`src/index.js`**:

```js
import 'leaflet/dist/leaflet.css';
```

## Scripts disponibles

```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}
```