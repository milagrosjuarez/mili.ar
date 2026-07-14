// mili.ar — Home V2
// Espacio reservado para futuras interacciones (scroll suave, menú mobile, etc.)

document.addEventListener('DOMContentLoaded', () => {
  // Scroll suave para los links del nav
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Lanyard interactivo del hero (drag + spring back)
  const wrap = document.getElementById('heroLanyard');
  const pivot = document.getElementById('heroLanyardPivot');

  if (wrap && pivot) {
    let dragging = false;
    let currentAngle = 0;
    let velocity = 0;
    let raf = null;
    const MAX_ANGLE = 45;

    const setAngle = (deg) => {
      pivot.style.transform = `translateX(-50%) rotate(${deg}deg)`;
    };

    const startDrag = () => {
      dragging = true;
      pivot.style.animation = 'none';
      cancelAnimationFrame(raf);
    };

    const moveDrag = (clientX) => {
      if (!dragging) return;
      const rect = wrap.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const dx = clientX - centerX;
      let angle = (dx / rect.width) * 90;
      angle = Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, angle));
      velocity = angle - currentAngle;
      currentAngle = angle;
      setAngle(currentAngle);
    };

    const endDrag = () => {
      if (!dragging) return;
      dragging = false;
      springBack();
    };

    function springBack() {
      const stiffness = 0.06;
      const damping = 0.90;
      function step() {
        const force = -currentAngle * stiffness;
        velocity += force;
        velocity *= damping;
        currentAngle += velocity;
        setAngle(currentAngle);
        if (Math.abs(currentAngle) > 0.3 || Math.abs(velocity) > 0.3) {
          raf = requestAnimationFrame(step);
        } else {
          currentAngle = 0;
          velocity = 0;
          setAngle(0);
          pivot.style.animation = '';
        }
      }
      raf = requestAnimationFrame(step);
    }

    wrap.addEventListener('mousedown', (e) => startDrag(e.clientX));
    window.addEventListener('mousemove', (e) => moveDrag(e.clientX));
    window.addEventListener('mouseup', endDrag);

    wrap.addEventListener('touchstart', (e) => startDrag(e.touches[0].clientX), { passive: true });
    window.addEventListener('touchmove', (e) => moveDrag(e.touches[0].clientX), { passive: true });
    window.addEventListener('touchend', endDrag);
  }
});
