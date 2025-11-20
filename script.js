const btnCurriculo = document.getElementById("btn-curriculo");
const submitButton = document.querySelector('.submit-button');

const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');

const menuIcon = document.getElementById("menu-icon");
const nav = document.querySelector("header nav");

menuIcon.addEventListener("click", () => {
  nav.classList.toggle("open");
});

let currentSlide = 0;

function updateCarousel() {
  const slideWidth = slides[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

nextButton.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  updateCarousel();
});

prevButton.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateCarousel();
});

window.addEventListener('resize', updateCarousel);

// Ativar o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Animação texto principal
const text = new SplitType(".presentation-container h1", { types: "words, chars" });
gsap.from(text.chars, {
  y: "100%",
  opacity: 0,
  duration: 1,
  stagger: { each: 0.05, overlap: 0.5 },
  delay: 0.3,
})

// Animação do texto da seção "Sobre"
gsap.from(".signature-text", {
  scrollTrigger: {
    trigger: "#sobre",
    start: "top 30%", // inicia quando 80% da seção entra na tela
    toggleActions: "play none none none", // anima só uma vez
  },
  x: -100,          // vem da esquerda
  opacity: 0,       // começa invisível
  duration: 8.2,    // tempo da animação
  ease: "power3.out"
});

// Animação da imagem do programador
gsap.from(".programer-img", {
  scrollTrigger: {
    trigger: "#sobre",
    start: "top 30%",
    toggleActions: "play none none none",
  },
  x: 100,           // vem da direita
  opacity: 0,
  duration: 5.2,
  delay: 0.3,       // pequeno atraso para entrar depois do texto
  ease: "power3.out"
});

gsap.from(".signature-title h1, .signature-title h5", {
  scrollTrigger: {
    trigger: "#sobre",
    start: "top 15%",
  },
  y: 40,
  opacity: 0,
  duration: 9.8,
  stagger: 0.2,
  ease: "power2.out"
});

gsap.to(".form-img", {
  boxShadow: "0 0 20px #c8b050",
  repeat: -1,
  yoyo: true,
  duration: 1.2,
  ease: "sine.inOut"
});


btnCurriculo.addEventListener("click", function () {
  window.open("./assets/Lucas-Alexandre-Silva (1).pdf", "_blank");
  const link = document.createElement("a");
  link.href = "./assets/Lucas-Alexandre-Silva (1).pdf"; // caminho do seu PDF
  link.download = "Lucas-Alexandre-Silva (1).pdf"; // nome do arquivo ao baixar
  link.click(); // simula o clique para baixar
});


submitButton.addEventListener('click', () => {
  // Pega os valores digitados pelo usuário
  const name = document.getElementById('user-name-input').value.trim();
  const email = document.getElementById('user-email-input').value.trim();
  const phone = document.querySelector('input[name="user-phone"]').value.trim();
  const message = document.getElementById('user-message').value.trim();

  // Validação simples
  if (!name || !email || !phone || !message) {
    alert('Por favor, preencha todos os campos antes de enviar.');
    return;
  }

  // 🔹 Seu número do WhatsApp (formato internacional)
  const phoneNumber = '5532998806583'; // exemplo: 55 + DDD + número

  // 🔹 Monta a mensagem
  const text = `Olá, meu nome é ${name}!
  E-mail: ${email}
  Telefone: ${phone}

  Mensagem: ${message}`;

  // 🔹 Codifica e cria o link do WhatsApp
  const encodedText = encodeURIComponent(text);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

  // 🔹 Abre o WhatsApp (web ou app)
  window.open(whatsappUrl, '_blank');
});


