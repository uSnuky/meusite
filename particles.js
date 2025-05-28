/**
 * Sistema de Partículas
 */

class ParticleSystem {
    constructor(canvasId, options = {}) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        
        // Configurações padrão
        this.options = {
            particleCount: options.particleCount || 200,
            particleSize: options.particleSize || { min: 1, max: 3 },
            particleSpeed: options.particleSpeed || { min: 0.1, max: 0.5 },
            particleColor: options.particleColor || ['rgba(5, 216, 232, 0.8)', 'rgba(74, 26, 140, 0.8)', 'rgba(255, 42, 109, 0.8)'],
            lineColor: options.lineColor || 'rgba(5, 216, 232, 0.2)',
            lineDistance: options.lineDistance || 150,
            interactive: options.interactive !== undefined ? options.interactive : true,
            backgroundGradient: options.backgroundGradient || false
        };
        
        // Propriedades do sistema
        this.particles = [];
        this.mousePosition = { x: null, y: null };
        this.animationFrame = null;
        
        // Inicialização
        this.init();
    }
    
    init() {
        // Configurar canvas para tela cheia
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Criar partículas
        this.createParticles();
        
        // Configurar interatividade
        if (this.options.interactive) {
            this.canvas.addEventListener('mousemove', (e) => {
                this.mousePosition.x = e.clientX;
                this.mousePosition.y = e.clientY;
            });
            
            this.canvas.addEventListener('mouseleave', () => {
                this.mousePosition.x = null;
                this.mousePosition.y = null;
            });
            
            // Suporte para toque
            this.canvas.addEventListener('touchmove', (e) => {
                e.preventDefault();
                this.mousePosition.x = e.touches[0].clientX;
                this.mousePosition.y = e.touches[0].clientY;
            });
            
            this.canvas.addEventListener('touchend', () => {
                this.mousePosition.x = null;
                this.mousePosition.y = null;
            });
        }
        
        // Iniciar animação
        this.animate();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Recriar partículas ao redimensionar
        if (this.particles.length > 0) {
            this.particles = [];
            this.createParticles();
        }
    }
    
    createParticles() {
        for (let i = 0; i < this.options.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: utils.math.random(this.options.particleSize.min, this.options.particleSize.max),
                color: this.options.particleColor[Math.floor(Math.random() * this.options.particleColor.length)],
                speedX: utils.math.random(-this.options.particleSpeed.max, this.options.particleSpeed.max),
                speedY: utils.math.random(-this.options.particleSpeed.max, this.options.particleSpeed.max),
                opacity: Math.random()
            });
        }
    }
    
    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Desenhar gradiente de fundo se habilitado
        if (this.options.backgroundGradient) {
            const gradient = this.ctx.createRadialGradient(
                this.canvas.width / 2, 
                this.canvas.height / 2, 
                0, 
                this.canvas.width / 2, 
                this.canvas.height / 2, 
                this.canvas.width / 2
            );
            gradient.addColorStop(0, '#1A1A5E');
            gradient.addColorStop(0.7, '#0B0B3B');
            gradient.addColorStop(1, '#000000');
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
        
        // Desenhar cada partícula
        this.particles.forEach((particle, index) => {
            // Atualizar posição
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Verificar limites
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.speedX = -particle.speedX;
            }
            
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.speedY = -particle.speedY;
            }
            
            // Efeito de pulsação
            particle.opacity = Math.sin(Date.now() * 0.001 + index) * 0.3 + 0.7;
            
            // Interatividade com mouse
            if (this.options.interactive && this.mousePosition.x !== null) {
                const dx = this.mousePosition.x - particle.x;
                const dy = this.mousePosition.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const angle = Math.atan2(dy, dx);
                    const force = (100 - distance) / 100;
                    
                    particle.x -= Math.cos(angle) * force;
                    particle.y -= Math.sin(angle) * force;
                }
            }
            
            // Desenhar conexões entre partículas
            for (let j = index + 1; j < this.particles.length; j++) {
                const particle2 = this.particles[j];
                const dx = particle.x - particle2.x;
                const dy = particle.y - particle2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.options.lineDistance) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = this.options.lineColor;
                    this.ctx.globalAlpha = 1 - (distance / this.options.lineDistance);
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(particle2.x, particle2.y);
                    this.ctx.stroke();
                    this.ctx.globalAlpha = 1;
                }
            }
            
            // Desenhar partícula
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fill();
            this.ctx.globalAlpha = 1;
        });
    }
    
    animate() {
        this.drawParticles();
        this.animationFrame = requestAnimationFrame(() => this.animate());
    }
    
    // Métodos públicos
    updateOptions(newOptions) {
        this.options = { ...this.options, ...newOptions };
        this.particles = [];
        this.createParticles();
    }
    
    pause() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
    }
    
    resume() {
        if (!this.animationFrame) {
            this.animate();
        }
    }
    
    destroy() {
        this.pause();
        this.canvas.removeEventListener('mousemove');
        this.canvas.removeEventListener('mouseleave');
        this.canvas.removeEventListener('touchmove');
        this.canvas.removeEventListener('touchend');
        window.removeEventListener('resize');
    }
}

// Inicializar sistema de partículas quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // Sistema de partículas de fundo
    window.backgroundParticles = new ParticleSystem('particles-canvas', {
        particleCount: utils.device.isMobile() ? 100 : 200,
        particleSize: { min: 1, max: 3 },
        particleSpeed: { min: 0.05, max: 0.2 },
        lineDistance: utils.device.isMobile() ? 100 : 150,
        backgroundGradient: false
    });
    
    // Sistema de partículas para o experimento
    if (document.getElementById('particles-experiment-canvas')) {
        window.experimentParticles = new ParticleSystem('particles-experiment-canvas', {
            particleCount: 200,
            particleSize: { min: 2, max: 5 },
            particleSpeed: { min: 0.1, max: 0.5 },
            particleColor: ['rgba(5, 216, 232, 0.8)', 'rgba(74, 26, 140, 0.8)', 'rgba(255, 42, 109, 0.8)'],
            lineDistance: 150,
            backgroundGradient: true
        });
    }
});
