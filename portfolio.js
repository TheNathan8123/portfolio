// ========================================
// EASTER EGG - FOTO DO SOBRE MIM
// ========================================
const easterEggTrigger = document.getElementById('easter-egg-trigger');
const easterEggIcons = document.querySelectorAll('.easter-egg-icon');
let easterEggActive = false;

if (easterEggTrigger) {
  easterEggTrigger.addEventListener('click', () => {
    if (!easterEggActive) {
      // Ativa os ícones
      easterEggIcons.forEach((icon, index) => {
        setTimeout(() => {
          icon.classList.add('active');
        }, index * 100); // Aparecem em sequência
      });
      easterEggActive = true;

      // Remove após 5 segundos
      setTimeout(() => {
        easterEggIcons.forEach(icon => {
          icon.classList.remove('active');
        });
        easterEggActive = false;
      }, 5000);
    }
  });
}

// ========================================
// VARIÁVEIS GLOBAIS
// ========================================
const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const scrollTopBtn = document.getElementById('scroll-top');
const navLinks = document.querySelectorAll('.nav-link');
const modal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const modalClose = document.getElementById('modal-close');

// ========================================
// THEME TOGGLE (Alternar Tema Claro/Escuro)
// ========================================
// Verifica se há tema salvo no localStorage
const currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
  const theme = document.documentElement.getAttribute('data-theme');
  const newTheme = theme === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// ========================================
// MENU MOBILE
// ========================================
menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  const icon = menuToggle.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
});

// Fecha o menu ao clicar em um link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  });
});

// ========================================
// NAVEGAÇÃO SUAVE (Smooth Scroll) - MELHORADO
// ========================================
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    // Remove active de todos os links
    navLinks.forEach(l => l.classList.remove('active'));
    // Adiciona active no link clicado
    link.classList.add('active');

    // Scroll suave para a seção
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80; // 80px do header

      // Animação suave customizada
      const startPosition = window.pageYOffset;
      const distance = offsetTop - startPosition;
      const duration = 1000; // 1 segundo
      let start = null;

      function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      }

      // Função de easing para scroll suave
      function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
      }

      requestAnimationFrame(animation);
    }
  });
});

// ========================================
// SCROLL TO TOP BUTTON - MELHORADO
// ========================================
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add('active');
  } else {
    scrollTopBtn.classList.remove('active');
  }

  // Atualiza link ativo baseado na posição do scroll
  updateActiveLink();
});

scrollTopBtn.addEventListener('click', () => {
  // Scroll suave para o topo
  const duration = 800;
  const startPosition = window.pageYOffset;
  const distance = -startPosition;
  let start = null;

  function animation(currentTime) {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
});

// ========================================
// ATUALIZAR LINK ATIVO NO SCROLL
// ========================================
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.pageYOffset + 150;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// ========================================
// ANIMAÇÃO DE ENTRADA DOS ELEMENTOS
// ========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observa todos os cards e elementos
const animatedElements = document.querySelectorAll('.project-card, .skill-card, .education-card, .stat-card');
animatedElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ========================================
// FILTRO DE PROJETOS
// ========================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active de todos os botões
    filterBtns.forEach(b => b.classList.remove('active'));
    // Adiciona active no botão clicado
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');

      if (filter === 'all' || category === filter) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  });
});

// ========================================
// MODAL DE IMAGEM (Zoom)
// ========================================
const zoomImages = document.querySelectorAll('.zoom-img');

zoomImages.forEach(img => {
  img.addEventListener('click', (e) => {
    // Previne abrir modal se for clicado no overlay
    if (!e.target.closest('.project-overlay')) {
      modal.classList.add('active');
      modalImage.src = img.src;
      body.style.overflow = 'hidden';
    }
  });
});

// Fecha modal ao clicar no X ou fora da imagem
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Fecha modal com tecla ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});

function closeModal() {
  modal.classList.remove('active');
  modalImage.src = '';
  body.style.overflow = 'auto';
}

// ========================================
// ANIMAÇÃO DAS BARRAS DE PROGRESSO
// ========================================
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progress = entry.target.getAttribute('data-progress');
      entry.target.style.width = progress + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
  bar.style.width = '0%';
  bar.style.transition = 'width 1.5s ease';
  skillObserver.observe(bar);
});

// ========================================
// FORMULÁRIO DE CONTATO
// ========================================
emailjs.init('qVvdXUfkinGCKAV5Q');

const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

  emailjs.sendForm('service_9yyqazh', 'template_j0wse1g', contactForm)
    .then(() => {
      btn.innerHTML = '<i class="fas fa-check"></i> Mensagem enviada!';
      contactForm.reset();
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensagem';
      }, 3000);
    })
    .catch(() => {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensagem';
      alert('Erro ao enviar. Tenta novamente.');
    });
});

// ========================================
// EFEITO PARALLAX NO HERO
// ========================================
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroImage = document.querySelector('.hero-image img');

  if (heroImage && scrolled < window.innerHeight) {
    heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

// ========================================
// ANIMAÇÃO INICIAL DA PÁGINA
// ========================================
window.addEventListener('load', () => {
  const heroElements = document.querySelectorAll('.hero-text, .hero-image');
  heroElements.forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, index * 200);
  });
});

// ========================================
// PREVENIR CLIQUE NOS LINKS DO OVERLAY
// ========================================
document.querySelectorAll('.zoom-trigger').forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    const img = e.target.closest('.project-card').querySelector('.project-image img');
    if (img) {
      modal.classList.add('active');
      modalImage.src = img.src;
      body.style.overflow = 'hidden';
    }
  });
});

// ========================================
// CONSOLE LOG CRIATIVO (Easter Egg)
// ========================================
console.log('%c🚀 Olá, Curioso(a)!', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cEste portfólio foi desenvolvido com ❤️ por Gabriel Medina', 'color: #764ba2; font-size: 14px;');
console.log('%cSe você está vendo isso, provavelmente gosta de tecnologia tanto quanto eu! 😄', 'color: #667eea; font-size: 12px;');
console.log('%cQue tal entrarmos em contato? protagonistacurriculo@gmail.com', 'color: #764ba2; font-size: 12px;');

// ========================================
// PERFORMANCE: Lazy Loading para Imagens
// ========================================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imageObserver.unobserve(img);
      }
    });
  });

  // Observa imagens com data-src (para implementação futura)
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ========================================
// COMENTÁRIO FINAL - De Protagonista In The Last (KKKKKKKKKKKK)
// ========================================
/*
   PARABÉNS! Você chegou ao fim do código!
  
   COMO ADICIONAR NOVOS CONTEÚDOS:
  
  1. NOVOS PROJETOS:
     - Vá até a seção "PROJETOS" no HTML
     - Copie um bloco <div class="project-card">...</div>
     - Altere: imagem, título, descrição, tags e links
     - Defina data-category: "design", "video" ou "web"
  
  2. NOVAS SKILLS:
     - Vá até a seção "COMPETÊNCIAS/SKILLS"
     - Copie um bloco <div class="skill-card">...</div>
     - Altere: ícone/imagem, nome, nível
     - Ajuste data-progress na barra (0-100)
  
  3. NOVA CATEGORIA DE SKILLS:
     - Copie todo o bloco <div class="skill-category">...</div>
     - Altere o título (h3)
     - Adicione seus skill-cards dentro
  
  4. MUDAR CORES:
     - Edite as variáveis CSS no :root (linha ~40)
     - Cores principais: --accent-primary e --accent-secondary
  
  5. ADICIONAR ANIMAÇÕES:
     - Use as classes: .animate-in, .zoom-img
     - Ou crie suas próprias animações em @keyframes
  
   DICAS:
  - Mantenha as classes CSS para responsividade
  - Teste em diferentes dispositivos
  - Otimize imagens antes de adicionar
  - Comente seu código para facilitar manutenção
  
   BORA CRIAR COISAS INCRÍVEIS!

  A minha vontade de viver fará a seguir
*/
