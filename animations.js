/**
 * Animações e Efeitos Visuais
 */

class Animations {
    constructor() {
        // Elementos do preloader
        this.preloader = document.querySelector('.preloader');
        this.preloaderProgressBar = document.querySelector('.preloader-progress-bar');
        
        // Estado
        this.isLoaded = false;
        
        // Inicialização
        this.init();
    }
    
    init() {
        // Iniciar preloader
        this.startPreloader();
        
        // Observar elementos para animação ao scroll
        this.setupScrollAnimations();
        
        // Configurar efeitos de parallax
        this.setupParallaxEffects();
        
        // Configurar animações de hover
        this.setupHoverAnimations();
    }
    
    startPreloader() {
        // Simular carregamento
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                // Finalizar preloader após 100%
                setTimeout(() => {
                    this.finishPreloader();
                }, 500);
            }
            
            // Atualizar barra de progresso
            if (this.preloaderProgressBar) {
                this.preloaderProgressBar.style.width = `${progress}%`;
            }
        }, 200);
    }
    
    finishPreloader() {
        if (this.preloader) {
            this.preloader.classList.add('hidden');
            
            setTimeout(() => {
                this.preloader.style.display = 'none';
                this.isLoaded = true;
                
                // Iniciar animações da página inicial
                this.startInitialAnimations();
            }, 500);
        }
    }
    
    startInitialAnimations() {
        // Animar elementos da página inicial
        const universeTitle = document.querySelector('.universe-title');
        const universeSubtitle = document.querySelector('.universe-subtitle');
        const universeInstruction = document.querySelector('.universe-instruction');
        const planets = document.querySelectorAll('.planet');
        const exploreBtn = document.querySelector('.explore-btn');
        
        // Garantir que as animações sejam aplicadas
        if (universeTitle) universeTitle.style.opacity = '1';
        if (universeSubtitle) universeSubtitle.style.opacity = '1';
        if (universeInstruction) universeInstruction.style.opacity = '1';
        
        // Animar planetas com delay
        planets.forEach((planet, index) => {
            setTimeout(() => {
                planet.style.opacity = '1';
            }, 800 + (index * 200));
        });
        
        // Animar botão explorar
        if (exploreBtn) {
            setTimeout(() => {
                exploreBtn.style.opacity = '1';
            }, 1600);
        }
    }
    
    setupScrollAnimations() {
        // Criar observador de interseção
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        // Observar elementos com classe .animate-on-scroll
        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            observer.observe(element);
        });
        
        // Observar elementos específicos
        const elementsToAnimate = [
            '.about-profile',
            '.timeline-item',
            '.skill-item',
            '.project-card',
            '.experiment-container',
            '.contact-form-container',
            '.contact-info-items',
            '.social-map'
        ];
        
        elementsToAnimate.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                observer.observe(element);
            });
        });
    }
    
    setupParallaxEffects() {
        // Elementos com efeito parallax
        const parallaxElements = document.querySelectorAll('.parallax');
        
        // Adicionar evento de movimento do mouse
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            parallaxElements.forEach(element => {
                const depth = element.getAttribute('data-depth') || 0.1;
                const moveX = (x - 0.5) * depth * 100;
                const moveY = (y - 0.5) * depth * 100;
                
                element.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
        
        // Adicionar efeito parallax aos planetas
        const planets = document.querySelectorAll('.planet');
        planets.forEach(planet => {
            planet.classList.add('parallax');
            planet.setAttribute('data-depth', Math.random() * 0.2 + 0.05);
        });
    }
    
    setupHoverAnimations() {
        // Adicionar efeitos de hover a elementos interativos
        
        // Cards de projeto
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
        
        // Botões
        document.querySelectorAll('.explore-btn, .section-nav-btn, .form-submit-btn').forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-3px)';
                button.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
                button.style.boxShadow = 'none';
            });
        });
        
        // Planetas
        document.querySelectorAll('.planet').forEach(planet => {
            planet.addEventListener('mouseenter', () => {
                const label = planet.querySelector('.planet-label');
                if (label) label.style.opacity = '1';
                
                const body = planet.querySelector('.planet-body');
                if (body) body.style.boxShadow = '0 0 30px rgba(5, 216, 232, 0.5)';
            });
            
            planet.addEventListener('mouseleave', () => {
                const label = planet.querySelector('.planet-label');
                if (label) label.style.opacity = '0';
                
                const body = planet.querySelector('.planet-body');
                if (body) body.style.boxShadow = '0 0 20px rgba(5, 216, 232, 0.3)';
            });
        });
    }
    
    // Métodos para animações específicas
    animateElement(element, animationClass, delay = 0) {
        if (!element) return;
        
        setTimeout(() => {
            element.classList.add(animationClass);
        }, delay);
    }
    
    createParticleExplosion(x, y, count = 20, colors = ['#05D8E8', '#4A1A8C', '#FF2A6D']) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Posição inicial
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            
            // Tamanho aleatório
            const size = utils.math.random(3, 8);
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Cor aleatória
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Direção aleatória
            const angle = Math.random() * Math.PI * 2;
            const distance = utils.math.random(50, 150);
            const duration = utils.math.random(500, 1500);
            
            // Animação
            particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
            particle.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;
            
            // Adicionar ao DOM
            document.body.appendChild(particle);
            
            // Remover após animação
            setTimeout(() => {
                document.body.removeChild(particle);
            }, duration);
        }
    }
}

// Inicializar animações quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.animations = new Animations();
});
