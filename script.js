// Toggle de tema (claro/oscuro). Arranca respetando la preferencia del sistema.
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  const label = document.getElementById('themeLabel');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let isDark = systemDark;

  function applyTheme() {
    if (isDark) {
      root.setAttribute('data-theme', 'dark');
      icon.textContent = '☀';
      label.textContent = 'Light';
    } else {
      root.setAttribute('data-theme', 'light');
      icon.textContent = '☾';
      label.textContent = 'Dark';
    }
  }
  applyTheme();
  btn.addEventListener('click', () => { isDark = !isDark; applyTheme(); });

  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
