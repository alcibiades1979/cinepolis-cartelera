# Cinepolis Cartelera Scraper

Este microservicio te permite consultar la cartelera actual de Cinépolis Argentina de manera programática.

## Cómo usar

1. Subí este proyecto a un repositorio de GitHub.
2. Deployealo en [https://render.com](https://render.com) como Web Service:
   - Build Command: `npm install`
   - Start Command: `npm start`
3. El servicio se expone en: `https://<tu-app>.onrender.com/cartelera`

## Endpoint

### `GET /cartelera`

Devuelve un JSON con:
- Fecha
- Lista de películas
  - Título
  - Formatos (3D, 4D, Español, Subtitulada, etc.)
  - Complejos (cines donde se proyecta)
  - Horarios

## Ejemplo de respuesta

```json
{
  "fecha": "15/06/2025",
  "cartelera": [
    {
      "titulo": "Cómo entrenar a tu dragón",
      "formatos": ["3D", "Español"],
      "complejos": ["Cinépolis Avellaneda", "Cinépolis Recoleta"],
      "funciones": ["13:00", "15:00", "18:00", "21:00"]
    }
  ]
}
```
