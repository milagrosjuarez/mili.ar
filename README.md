# mili.ar

Sitio personal y portfolio de Milagros. HTML, CSS y JavaScript sin dependencias ni build.

## Estructura

```
index.html · portfolio.html · contacto.html
css/
  tokens.css          colores, tipografías, espacios (variables del Figma)
  base.css            reset y estilos globales
  main.css            punto de entrada (importa todo)
  components/         nav, footer, button, pill, badge, animations
  pages/              estilos propios de cada página
js/
  main.js             punto de entrada
  components/         un archivo por comportamiento (reveal, badge…)
assets/img · assets/icons
```

## Cómo escalar

- **Nueva página:** copiar una `.html` existente, sumar su `css/pages/x.css` en `main.css` y el link en el nav.
- **Nuevo componente:** un archivo en `css/components/` (y en `js/components/` si tiene comportamiento).
- **Cambios de diseño globales:** se hacen en `css/tokens.css`.
- **Animaciones:** viven en `css/components/animations.css` y respetan `prefers-reduced-motion`.

## Correrlo local

```bash
python3 -m http.server 5500
```
Abrir http://localhost:5500 (los módulos JS no funcionan con `file://`).

Deploy y flujo de trabajo: ver [GUIA-GITHUB.md](GUIA-GITHUB.md).
