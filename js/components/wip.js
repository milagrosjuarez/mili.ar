// Los wireframes de "work in progress" arrancan a armarse recién cuando entran en pantalla,
// así en el celular (una card por vez) se ve la construcción desde el principio.
export function initWip() {
  const cards = document.querySelectorAll(".wip-card");
  if (!cards.length) return;

  if (!("IntersectionObserver" in window)) {
    cards.forEach((card) => card.classList.add("is-running"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-running");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.35 }
  );

  cards.forEach((card) => observer.observe(card));
}
