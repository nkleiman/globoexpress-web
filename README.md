# Globo Express — sitio web

Sitio estático (HTML, CSS y JS, sin build) de [Globo Express](https://www.globoexpress.com.uy/).

| Archivo | Qué es |
|---|---|
| `index.html` | Home para empresas: soportes publicitarios, trabajos, contacto |
| `regalos.html` | Packs de regalos a domicilio con precios y links de Mercado Pago |
| `Envios a domicilio.html` | Redirección desde la URL del sitio anterior |
| `css/styles.css` | Estilos (colores del logo en `:root`) |
| `js/main.js` | Menú, links de WhatsApp, formulario, galería y filtros |
| `img/` | Fotos optimizadas en WebP |

## Ver en local

```sh
python -m http.server 8765
```

y abrir http://127.0.0.1:8765

## Cambios comunes

- **Número de WhatsApp:** `WHATSAPP` al principio de `js/main.js`.
- **Precios o packs:** cada pack es un `<article class="card pack">` en `regalos.html`.
- **Productos:** cada producto es un `<article class="card">` en `index.html`.

## Deploy

Cada merge (o push) a `main` publica el sitio automáticamente en GitHub Pages
mediante `.github/workflows/deploy.yml`. Antes de publicar verifica que no falte
ninguna imagen referenciada.
