/**
 * Sistema de Navegação
 */

class Navigation {
    constructor() {
        // Elementos de navegação
        this.navToggle = document.querySelector('.nav-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('.section');
        this.planets = document.querySelectorAll('.planet');
        this.backButtons = document.querySelectorAll('.back-to-universe');
        this.exploreButton = document.querySelector('.explore-btn');
        
        // Estado atual
        this.currentSection = 'universe';
        this.isNavigating = false;
        this.isMenuOpen = false;
        
        // Inicialização
        this.init();
    }
    
    init() {
        // Evento de toggle do menu mobile
        if (this.navToggle) {
            this.navToggle.addEventListener('click', this.toggleMenu.bind(this));
        }
        
        // Eventos de links de navegação
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('data-section');
                this.navigateTo(target);
            });
        });
        
        // Eventos de planetas
        this.planets.forEach(planet => {
            planet.addEventListener('click', () => {
                const target = planet.getAttribute('data-planet');
                this.navigateTo(target);
            });
        });
        
        // Eventos de botões de voltar
        this.backButtons.forEach(button => {
            button.addEventListener('click', () => {
                const target = button.getAttribute('data-target');
                this.navigateTo(target);
            });
        });
        
        // Evento de botão explorar
        if (this.exploreButton) {
            this.exploreButton.addEventListener('click', this.startExploration.bind(this));
        }
        
        // Navegação por teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.navigateTo('universe');
            }
        });
        
        // Navegação por hash na URL
        window.addEventListener('hashchange', this.handleHashChange.bind(this));
        this.handleHashChange();
    }
    
    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        this.navMenu.classList.toggle('active', this.isMenuOpen);
        this.navToggle.classList.toggle('active', this.isMenuOpen);
        
        // Animar barras do toggle
        const bars = this.navToggle.querySelectorAll('.nav-toggle-bar');
        if (this.isMenuOpen) {
            bars[0].style.transform = 'translateY(9px) rotate(45deg)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'translateY(-9px) rotate(-45deg)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    }
    
    navigateTo(sectionId) {
        if (this.isNavigating || this.currentSection === sectionId) return;
        this.isNavigating = true;
        
        // Atualizar URL
        window.location.hash = sectionId;
        
        // Atualizar links ativos
        this.navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('data-section') === sectionId);
        });
        
        // Fechar menu mobile se estiver aberto
        if (this.isMenuOpen) {
            this.toggleMenu();
        }
        
        // Animação de transição
        this.animateTransition(this.currentSection, sectionId);
        
        // Atualizar seção atual
        this.currentSection = sectionId;
    }
    
    animateTransition(fromSection, toSection) {
        const fromEl = document.getElementById(fromSection);
        const toEl = document.getElementById(toSection);
        
        if (!fromEl || !toEl) {
            this.isNavigating = false;
            return;
        }
        
        // Criar elemento de transição
        const transition = document.createElement('div');
        transition.className = 'page-transition';
        document.body.appendChild(transition);
        
        // Animar saída
        setTimeout(() => {
            transition.classList.add('active');
            
            setTimeout(() => {
                // Esconder seção atual
                fromEl.classList.remove('active');
                
                // Mostrar nova seção
                toEl.classList.add('active');
                
                // Animar entrada
                transition.classList.add('exit');
                
                // Inicializar elementos na nova seção
                this.initSectionElements(toSection);
                
                setTimeout(() => {
                    // Remover transição
                    document.body.removeChild(transition);
                    this.isNavigating = false;
                }, 1000);
            }, 500);
        }, 50);
    }
    
    initSectionElements(sectionId) {
        // Inicializar elementos específicos de cada seção
        switch (sectionId) {
            case 'about':
                this.initAboutSection();
                break;
            case 'projects':
                this.initProjectsSection();
                break;
            case 'lab':
                this.initLabSection();
                break;
            case 'contact':
                this.initContactSection();
                break;
        }
    }
    
    initAboutSection() {
        // Animar barras de habilidades
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            const level = item.getAttribute('data-level');
            const levelBar = item.querySelector('.skill-level');
            
            setTimeout(() => {
                levelBar.style.width = `${level}%`;
            }, 300);
        });
        
        // Animar itens da timeline
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('fade-in');
            }, 300 + (index * 200));
        });
    }
    
    initProjectsSection() {
        // Animar cards de projetos
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-in');
            }, 300 + (index * 100));
        });
    }
    
    initLabSection() {
        // Reiniciar experimentos
        if (window.experimentParticles) {
            window.experimentParticles.updateOptions({
                particleCount: 200
            });
        }
    }
    
    initContactSection() {
        // Animar mapa social
        const socialStars = document.querySelectorAll('.social-star');
        socialStars.forEach((star, index) => {
            setTimeout(() => {
                star.classList.add('fade-in');
            }, 300 + (index * 150));
        });
    }
    
    startExploration() {
        // Animação inicial de exploração
        const universeTitle = document.querySelector('.universe-title');
        const universeSubtitle = document.querySelector('.universe-subtitle');
        const universeInstruction = document.querySelector('.universe-instruction');
        
        // Animar saída dos textos
        universeTitle.style.transform = 'translateY(-50px)';
        universeTitle.style.opacity = '0';
        
        universeSubtitle.style.transform = 'translateY(-30px)';
        universeSubtitle.style.opacity = '0';
        
        universeInstruction.style.opacity = '0';
        
        // Animar planetas
        this.planets.forEach(planet => {
            planet.style.transform = 'scale(1.2)';
            
            setTimeout(() => {
                planet.style.transform = 'scale(1)';
            }, 500);
        });
        
        // Restaurar textos após animação
        setTimeout(() => {
            universeTitle.style.transform = 'translateY(0)';
            universeTitle.style.opacity = '1';
            
            universeSubtitle.style.transform = 'translateY(0)';
            universeSubtitle.style.opacity = '1';
            
            universeInstruction.style.opacity = '1';
        }, 2000);
    }
    
    handleHashChange() {
        // Verificar hash na URL
        const hash = window.location.hash.substring(1);
        
        if (hash && document.getElementById(hash)) {
            this.navigateTo(hash);
        } else if (this.currentSection !== 'universe') {
            this.navigateTo('universe');
        }
    }
}

// Inicializar navegação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.navigation = new Navigation();
});
