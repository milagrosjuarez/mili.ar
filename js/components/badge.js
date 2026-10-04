// Credencial colgante: péndulo con física simple.
// - Entra balanceándose y se va frenando sola.
// - Se puede agarrar y soltar (mouse o dedo): sigue moviéndose con la velocidad que le diste.
// - Pasar el mouse por encima la mece suavemente, la inclina en 3D y mueve el brillo.
// Con prefers-reduced-motion queda quieta (sin física ni inclinación).

const STIFFNESS = 14; // más alto = péndulo más rápido
const DAMPING = 1.3; // más alto = se frena antes
const MAX_ANGLE = 0.62; // rad (~35°)
const START_ANGLE = -0.16; // rad, ángulo con el que entra
const TILT_MAX = 9; // grados de inclinación 3D

export function initBadge() {
  const badge = document.querySelector("[data-badge]");
  if (!badge) return;

  const pivot = badge.querySelector(".badge__pivot");
  const card = badge.querySelector(".badge__card");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let angle = START_ANGLE;
  let velocity = 0;
  let dragging = false;
  let grabOffset = 0;
  let lastT = 0;
  let raf = 0;

  const render = () => {
    badge.style.transform = `rotate(${angle}rad)`;
  };

  const clamp = (v, max) => Math.max(-max, Math.min(max, v));

  const step = (t) => {
    const dt = Math.min((t - lastT) / 1000, 1 / 30);
    lastT = t;

    if (!dragging) {
      // péndulo amortiguado: aceleración = -k·sen(θ) − c·ω
      velocity += (-STIFFNESS * Math.sin(angle) - DAMPING * velocity) * dt;
      angle += velocity * dt;
    }
    render();

    if (dragging || Math.abs(angle) > 0.0005 || Math.abs(velocity) > 0.0005) {
      raf = requestAnimationFrame(step);
    } else {
      angle = 0;
      velocity = 0;
      render();
      raf = 0;
    }
  };

  const wake = () => {
    if (raf) return;
    lastT = performance.now();
    raf = requestAnimationFrame(step);
  };

  // Ángulo que forma el puntero respecto del punto de colgado (positivo = giro horario, como CSS)
  const pointerAngle = (e) => {
    const p = pivot.getBoundingClientRect();
    return -Math.atan2(e.clientX - p.left, e.clientY - p.top);
  };

  badge.addEventListener("pointerdown", (e) => {
    dragging = true;
    grabOffset = angle - pointerAngle(e);
    velocity = 0;
    badge.classList.add("is-dragging");
    badge.setPointerCapture(e.pointerId);
    wake();
  });

  badge.addEventListener("pointermove", (e) => {
    if (dragging) {
      const next = clamp(pointerAngle(e) + grabOffset, MAX_ANGLE);
      const now = performance.now();
      const dt = Math.max((now - (badge._lastMove || now)) / 1000, 0.008);
      // velocidad suavizada para que al soltar conserve el impulso
      velocity = velocity * 0.6 + ((next - angle) / dt) * 0.4;
      angle = next;
      badge._lastMove = now;
      return;
    }

    if (e.pointerType !== "mouse") return;

    // mece la credencial según hacia dónde pasás el mouse
    velocity = clamp(velocity - e.movementX * 0.004, 3);
    wake();

    // inclinación 3D + brillo
    const r = card.getBoundingClientRect();
    const nx = clamp(((e.clientX - r.left) / r.width) * 2 - 1, 1);
    const ny = clamp(((e.clientY - r.top) / r.height) * 2 - 1, 1);
    card.classList.add("is-tilting");
    card.style.setProperty("--rx", `${nx * TILT_MAX}deg`);
    card.style.setProperty("--ry", `${-ny * TILT_MAX}deg`);
    card.style.setProperty("--mx", `${(nx + 1) * 50}%`);
    card.style.setProperty("--my", `${(ny + 1) * 50}%`);
  });

  const release = () => {
    if (!dragging) return;
    dragging = false;
    badge._lastMove = 0;
    badge.classList.remove("is-dragging");
    velocity = clamp(velocity, 6);
    wake();
  };
  badge.addEventListener("pointerup", release);
  badge.addEventListener("pointercancel", release);

  badge.addEventListener("pointerleave", () => {
    card.classList.remove("is-tilting");
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  });

  render();
  wake();
}
