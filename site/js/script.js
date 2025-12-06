document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return; // nada a fazer se não houver carrossel

  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(carousel.querySelectorAll('.slide'));
  const leftArrow = carousel.querySelector('.arrow.left');
  const rightArrow = carousel.querySelector('.arrow.right');
  let indicatorsContainer = carousel.querySelector('.carousel-indicators');
  let indicators = indicatorsContainer ? Array.from(indicatorsContainer.querySelectorAll('.indicator')) : [];
  
  console.log('Setas encontradas? Esquerda:', !!leftArrow, 'Direita:', !!rightArrow);
  // Segurança: se não houver slides, aborta
  if (!track || slides.length === 0) return;

  // Cria indicadores se não existirem
  if (!indicatorsContainer) {
    indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'carousel-indicators';
    carousel.appendChild(indicatorsContainer);
  }
  if (indicators.length === 0) {
    indicatorsContainer.innerHTML = ''; // limpa se existir algo estranho
    slides.forEach((s, i) => {
      const span = document.createElement('span');
      span.className = 'indicator';
      span.dataset.slide = i;
      indicatorsContainer.appendChild(span);
    });
    indicators = Array.from(indicatorsContainer.querySelectorAll('.indicator'));
  }

  // Estado
  let current = 0;
  let autoplayInterval = null;
  const AUTOPLAY_DELAY = 5000;
  let restartAutoplayTimeout = null;
  const RESTART_AFTER_INTERACTION = 5000; // tempo até reiniciar autoplay após clique

  // Garante que apenas um slide esteja visível (usa classe 'active')
  function update() {
    slides.forEach((s, i) => {
      if (i === current) {
        s.classList.add('active');
        s.style.zIndex = 2;
      } else {
        s.classList.remove('active');
        s.style.zIndex = 1;
      }
    });

    indicators.forEach((ind, i) => {
      if (i === current) ind.classList.add('active');
      else ind.classList.remove('active');
    });
  }

  // Navegação
  function goTo(index) {
    current = ((index % slides.length) + slides.length) % slides.length;
    update();
  }

  function next() {
    goTo(current + 1);
  }

  function prev() {
    goTo(current - 1);
  }

  // Autoplay
  function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(next, AUTOPLAY_DELAY);
  }

  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }

  function scheduleRestartAutoplay() {
    if (restartAutoplayTimeout) clearTimeout(restartAutoplayTimeout);
    restartAutoplayTimeout = setTimeout(() => {
      startAutoplay();
    }, RESTART_AFTER_INTERACTION);
  }

  // Eventos das setas
  if (leftArrow) {
    leftArrow.addEventListener('click', () => {
      prev();
      stopAutoplay();
      scheduleRestartAutoplay();
    });
  }

  if (rightArrow) {
    rightArrow.addEventListener('click', () => {
      next();
      stopAutoplay();
      scheduleRestartAutoplay();
    });
  }

  // Eventos dos indicadores
  indicators.forEach(ind => {
    ind.addEventListener('click', (e) => {
      const i = Number(ind.dataset.slide);
      if (!Number.isFinite(i)) return;
      goTo(i);
      stopAutoplay();
      scheduleRestartAutoplay();
    });
  });

  // Pausa ao passar o mouse (UX)
  carousel.addEventListener('mouseenter', () => stopAutoplay());
  carousel.addEventListener('mouseleave', () => scheduleRestartAutoplay());

  // Inicialização: garante que CSS esteja pronto para transição
  // Força estado inicial
  goTo(current);
  // Inicia autoplay
  startAutoplay();

  // Debug: se algo não estiver aparecendo, descomente as linhas abaixo e veja o console
  // console.log('Carousel inicializado', { slides: slides.length, indicators: indicators.length, hasLeft: !!leftArrow, hasRight: !!rightArrow });
});
