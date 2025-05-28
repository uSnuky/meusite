/**
 * Cursor Personalizado
 */

class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.custom-cursor');
        this.cursorTrail = document.querySelector('.custom-cursor-trail');
        this.links = document.querySelectorAll('a, button, .project-card, .planet, .social-star, input, textarea, select, .gallery-thumb');
        
        this.cursorX = 0;
        this.cursorY = 0;
        this.trailX = 0;
        this.trailY = 0;
        
        this.isVisible = false;
        this.isDevice = utils.device.isMobile() || utils.device.isTablet();
        
        if (!this.isDevice) {
            this.init();
        } else {
            this.hideCursor();
        }
    }
    
    init() {
        // Esconder cursor padrão
        document.body.style.cursor = 'none';
        
        // Mostrar cursor personalizado
        this.cursor.style.opacity = 1;
        this.cursorTrail.style.opacity = 0.5;
        this.isVisible = true;
        
        // Adicionar eventos
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        document.addEventListener('mouseenter', this.onMouseEnter.bind(this));
        document.addEventListener('mouseleave', this.onMouseLeave.bind(this));
        
        // Adicionar eventos para links e botões
        this.links.forEach(link => {
            link.addEventListener('mouseenter', this.onLinkHover.bind(this));
            link.addEventListener('mouseleave', this.onLinkLeave.bind(this));
        });
        
        // Iniciar animação
        this.render();
    }
    
    onMouseMove(e) {
        this.cursorX = e.clientX;
        this.cursorY = e.clientY;
        
        // Criar partículas no rastro do cursor
        if (Math.random() > 0.9 && window.backgroundParticles) {
            this.createCursorParticle();
        }
    }
    
    onMouseEnter() {
        this.cursor.style.opacity = 1;
        this.cursorTrail.style.opacity = 0.5;
    }
    
    onMouseLeave() {
        this.cursor.style.opacity = 0;
        this.cursorTrail.style.opacity = 0;
    }
    
    onLinkHover() {
        this.cursor.classList.add('hover');
        this.cursorTrail.classList.add('hover');
        
        this.cursor.style.width = '40px';
        this.cursor.style.height = '40px';
        this.cursor.style.backgroundColor = 'rgba(5, 216, 232, 0.2)';
    }
    
    onLinkLeave() {
        this.cursor.classList.remove('hover');
        this.cursorTrail.classList.remove('hover');
        
        this.cursor.style.width = '20px';
        this.cursor.style.height = '20px';
        this.cursor.style.backgroundColor = 'rgba(5, 216, 232, 0.5)';
    }
    
    createCursorParticle() {
        // Adicionar partícula no sistema de partículas de fundo
        if (window.backgroundParticles && window.backgroundParticles.particles) {
            window.backgroundParticles.particles.push({
                x: this.cursorX,
                y: this.cursorY,
                size: utils.math.random(1, 3),
                color: 'rgba(5, 216, 232, 0.8)',
                speedX: utils.math.random(-1, 1),
                speedY: utils.math.random(-1, 1),
                opacity: 1
            });
        }
    }
    
    render() {
        // Suavizar movimento do cursor
        this.trailX = utils.math.lerp(this.trailX, this.cursorX, 0.1);
        this.trailY = utils.math.lerp(this.trailY, this.cursorY, 0.1);
        
        // Atualizar posição do cursor
        this.cursor.style.transform = `translate(${this.cursorX}px, ${this.cursorY}px)`;
        this.cursorTrail.style.transform = `translate(${this.trailX}px, ${this.trailY}px)`;
        
        // Continuar animação
        requestAnimationFrame(this.render.bind(this));
    }
    
    hideCursor() {
        this.cursor.style.display = 'none';
        this.cursorTrail.style.display = 'none';
    }
    
    showCursor() {
        if (!this.isDevice) {
            this.cursor.style.display = 'block';
            this.cursorTrail.style.display = 'block';
            this.isVisible = true;
        }
    }
    
    updateLinks() {
        this.links = document.querySelectorAll('a, button, .project-card, .planet, .social-star, input, textarea, select, .gallery-thumb');
        
        this.links.forEach(link => {
            link.addEventListener('mouseenter', this.onLinkHover.bind(this));
            link.addEventListener('mouseleave', this.onLinkLeave.bind(this));
        });
    }
}

// Inicializar cursor personalizado quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.customCursor = new CustomCursor();
});
