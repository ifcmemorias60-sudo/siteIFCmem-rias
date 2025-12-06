document.addEventListener('DOMContentLoaded', () => {
    const carouselPessoas = document.querySelector('.carrossel-pessoas');
    if (!carouselPessoas) return;

    // Seleção de elementos
    const slides = Array.from(carouselPessoas.querySelectorAll('.slide-pessoa'));
    const leftArrow = carouselPessoas.querySelector('.arrow-pessoa.left-pessoa');
    const rightArrow = carouselPessoas.querySelector('.arrow-pessoa.right-pessoa');
    
    if (slides.length === 0) return;

    let current = 0; // Índice do slide ativo

    // Função de Atualização
    function updatePessoas() {
        slides.forEach((s, i) => {
            // Usa a classe 'active-pessoa'
            s.classList.toggle('active-pessoa', i === current);
            s.style.zIndex = i === current ? 2 : 1; 
        });
    }

    // Navegação
    function goToPessoas(index) {
        // Lógica para loop (circular)
        current = ((index % slides.length) + slides.length) % slides.length;
        updatePessoas();
    }

    function nextPessoas() {
        goToPessoas(current + 1);
    }

    function prevPessoas() {
        goToPessoas(current - 1);
    }

    // Eventos de Clique nas Setas
    if (leftArrow) {
        leftArrow.addEventListener('click', prevPessoas);
    }

    if (rightArrow) {
        rightArrow.addEventListener('click', nextPessoas);
    }

    // Inicialização
    goToPessoas(current); 
});