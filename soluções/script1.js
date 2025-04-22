document.addEventListener("DOMContentLoaded", function () {
  const sliderContainer = document.querySelector(".cards-container");
  const slider = document.querySelector(".cards-slider");
  const cards = [
    {
      icon: "bi-laptop",
      title: "Desenvolvimento e Integração",
      text: "Ao longo de mais de 20 anos de parceria Genesys desenvolvemos um extenso know how da plataforma em como extrair, adequar, desenvolver e integrar aplicações e fontes externas a solução para potencializar resultados de CX no uso da plataforma",
    },
    {
      icon: "bi-clipboard2-pulse",
      title: "Implantação",
      text: "Realizamos projetos de acordo com a necessidade do cliente, respeitando diretrizes agile, co-creation e design driven para soluções dinâmicas, personalizadas e aderentes as necessidades e contextos de negócio.",
    },
    {
      icon: "bi-tools",
      title: "Operação",
      text: "Possuímos em nosso portfolio diversos serviços focados em operações de diferentes origens. Como por exemplo operação de contact center, operação de tecnologia, operação de reporting e operação de sustentação (suporte técnico).",
    },
  ];

  // Duplica os cards para criar efeito infinito
  const duplicatedCards = [...cards, ...cards, ...cards];

  // Cria os elementos dos cards
  duplicatedCards.forEach((card, index) => {
    const cardElement = document.createElement("div");
    cardElement.className = "card";
    cardElement.innerHTML = `
            <i class="bi ${card.icon}"></i>
            <h2>${card.title}</h2>
            <p>${card.text}</p>
        `;
    slider.appendChild(cardElement);
  });

  const cardElements = document.querySelectorAll(".card");
  const cardCount = cards.length;
  const cardWidth = 330; // Largura do card + margem
  let currentIndex = cardCount; // Começa no primeiro conjunto de cards duplicados
  let autoSlideInterval;
  let isAnimating = false;

  // Posiciona o slider no meio (onde estão os cards originais)
  slider.style.transform = `translateX(-${cardCount * cardWidth}px)`;

  // Função para mover o slider
  function moveToSlide(index, instant = false) {
    if (isAnimating) return;

    isAnimating = true;
    currentIndex = index;

    if (instant) {
      slider.style.transition = "none";
    } else {
      slider.style.transition = "transform 0.5s ease-in-out";
    }

    slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    // Quando a animação terminar
    setTimeout(() => {
      isAnimating = false;

      // Se chegou ao final, volta para o meio sem animação
      if (currentIndex >= cardCount * 2) {
        currentIndex = cardCount;
        moveToSlide(currentIndex, true);
      }
      // Se voltou ao início, vai para o meio sem animação
      else if (currentIndex <= 0) {
        currentIndex = cardCount;
        moveToSlide(currentIndex, true);
      }
    }, 500);
  }

  // Próximo slide
  function nextSlide() {
    moveToSlide(currentIndex + 1);
  }

  // Slide anterior
  function prevSlide() {
    moveToSlide(currentIndex - 1);
  }

  // Iniciar slideshow automático
  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 3000);
  }

  // Parar slideshow automático
  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // Event listeners
  document.querySelector(".next-btn").addEventListener("click", function () {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
  });

  document.querySelector(".prev-btn").addEventListener("click", function () {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
  });

  // Pausa quando o mouse está sobre o slider
  sliderContainer.addEventListener("mouseenter", stopAutoSlide);

  // Retoma quando o mouse sai do slider
  sliderContainer.addEventListener("mouseleave", startAutoSlide);

  // Inicia o slideshow
  startAutoSlide();

  // Redimensionamento da janela
  window.addEventListener("resize", function () {
    moveToSlide(currentIndex, true);
  });
});
