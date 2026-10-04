# Guía: de VS Code a producción (GitHub + Vercel)

Idea central: **`main` = producción**. Nunca se edita `main` directo. Cada cambio vive en una **rama**, se prueba en un **link de preview de Vercel** y recién después se une a `main`.

```
tu compu ──push──▶ GitHub (rama) ──▶ Vercel genera link de PREVIEW
                      │
                      └─ Pull Request → "Merge" ──▶ main ──▶ Vercel publica en PRODUCCIÓN
```

No necesitás un ambiente de test aparte: el preview de cada rama **es** tu test.

---

## Parte 0 — Una sola vez

### 0.1 Abrir el proyecto en VS Code
VS Code → *File → Open Folder…* → elegí `miliclaude`.
Instalá la extensión **Live Server** (opcional, para ver la web mientras editás). Importante: abrí siempre la carpeta `miliclaude`, no una carpeta superior.

### 0.2 Decirle a git quién sos
En la terminal de VS Code (*Terminal → New Terminal*):

```bash
git config --global user.name "Milagros Juarez"
git config --global user.email "milagroseloisajuarez@gmail.com"
```

### 0.3 El repositorio ya existe
Es `https://github.com/milagrosjuarez/mili.ar`. Ramas:
- `v0` → la web anterior, congelada solo para documentar (no se toca más).
- `v1` → esta versión (Home, Portfolio en construcción, Contacto).
- `main` → hoy sigue siendo la v0 y es lo que Vercel publica en producción.

Cuando la V1 esté lista para salir, se hace un Pull Request `v1` → `main` (ver Parte 1, paso 6).

### 0.4 Subir la V1 por primera vez
La primera vez GitHub pide iniciar sesión. Abrí la terminal de VS Code (*Terminal → New Terminal*) y corré:

```bash
git push -u origin v0 v1
```
Si te pide usuario y contraseña: GitHub ya no acepta la contraseña de la cuenta, hace falta un **token**. Lo más fácil es instalar **GitHub Desktop** o la extensión **GitHub Pull Requests** de VS Code, iniciar sesión una vez con el navegador, y repetir el comando.

### 0.5 Vercel
Vercel → tu proyecto → *Settings → Git*: dejá **Production Branch = `main`**. Cada rama que subas (por ejemplo `v1`) genera su propio link de preview, sin tocar la web publicada.

---

## Parte 1 — Cada vez que quieras cambiar algo

### 1. Traé lo último y creá una rama
```bash
git switch main
git pull
git switch -c cambio/titulo-del-hero
```
Nombrá la rama según lo que hacés (`cambio/…`, `fix/…`, `nuevo/…`).

### 2. Editá y mirá el resultado
Editá los archivos en VS Code. Para ver la web local necesitás un servidor (los módulos JS no andan abriendo el HTML con doble clic):
- Con **Live Server**: clic derecho en `index.html` → *Open with Live Server*; o
- Con la terminal: `python3 -m http.server 5500` y abrí http://localhost:5500

### 3. Guardá los cambios (commit)
En VS Code: ícono de **Source Control** (la barra izquierda, el tercero) → escribí un mensaje → ✔ **Commit**. O por terminal:
```bash
git add .
git commit -m "Cambio el título del hero"
```
Mensaje corto y claro: qué cambiaste.

### 4. Subí la rama
```bash
git push -u origin cambio/titulo-del-hero
```
(Desde la segunda vez en la misma rama alcanza con `git push`.)

### 5. Probá en el preview
Vercel arma un deploy automático de esa rama. Lo ves en GitHub (en el Pull Request) o en el dashboard de Vercel → *Deployments*. **Abrí ese link y probalo en celular y desktop.**

### 6. Pull Request → producción
1. GitHub te muestra un botón **Compare & pull request** → crealo.
2. Revisá que los cambios sean los que querés.
3. **Merge pull request**. Vercel publica `main` en producción en ~1 minuto.
4. Volvé a tu compu:
```bash
git switch main
git pull
```

---

## Si algo sale mal
| Situación | Qué hacer |
|---|---|
| Rompí algo en producción | En Vercel → *Deployments* → el deploy anterior → **Promote to Production** (vuelve atrás en segundos). Después arreglás con calma en una rama. |
| Quiero descartar cambios sin commitear | En Source Control, clic derecho en el archivo → *Discard Changes*. |
| No sé en qué rama estoy | `git branch` (la que tiene `*`). |
| `git push` dice "rejected" | Corré `git pull` y volvé a intentar. |

## Reglas de oro
- Nunca trabajes directo en `main`.
- Un cambio = una rama = un Pull Request.
- Antes de hacer merge, abrí el link de preview.
- No subas fotos con datos de ubicación: las fotos del celular traen el GPS dentro (EXIF). Pedime que las limpie o exportalas desde Figma.
