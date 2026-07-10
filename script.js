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
});
