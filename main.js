/**
 * Script Principal
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar componentes principais
    initializeComponents();
    
    // Configurar eventos globais
    setupGlobalEvents();
    
    // Verificar se todos os recursos foram carregados
    window.addEventListener('load', () => {
        console.log('Todos os recursos carregados');
    });
});

// Inicializar componentes principais
function initializeComponents() {
    // Verificar se os componentes já foram inicializados
    if (window.componentsInitialized) return;
    
    // Atualizar links para cursor personalizado
    if (window.customCursor) {
        window.customCursor.updateLinks();
    }
    
    // Inicializar barras de habilidades
    initSkillBars();
    
    // Marcar como inicializado
    window.componentsInitialized = true;
}

// Configurar eventos globais
function setupGlobalEvents() {
    // Evento de redimensionamento da janela
    window.addEventListener('resize', debounce(() => {
        console.log('Janela redimensionada');
        
        // Atualizar componentes responsivos
        if (window.backgroundParticles) {
            window.backgroundParticles.resizeCanvas();
        }
    }, 250));
    
    // Evento de mudança de orientação
    window.addEventListener('orientationchange', () => {
        console.log('Orientação alterada');
        
        // Atualizar componentes responsivos após mudança de orientação
        setTimeout(() => {
            if (window.backgroundParticles) {
                window.backgroundParticles.resizeCanvas();
            }
        }, 300);
    });
    
    // Evento de visibilidade da página
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Pausar animações quando a página não está visível
            if (window.backgroundParticles) {
                window.backgroundParticles.pause();
            }
        } else {
            // Retomar animações quando a página está visível
            if (window.backgroundParticles) {
                window.backgroundParticles.resume();
            }
        }
    });
}

// Inicializar barras de habilidades
function initSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const level = item.getAttribute('data-level');
        const levelBar = item.querySelector('.skill-level');
        
        if (levelBar) {
            // Definir largura inicial como 0
            levelBar.style.width = '0';
            
            // Usar Intersection Observer para animar quando visível
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Animar para o valor correto
                        setTimeout(() => {
                            levelBar.style.width = `${level}%`;
                        }, 300);
                        
                        // Parar de observar após animar
                        observer.unobserve(item);
                    }
                });
            }, { threshold: 0.2 });
            
            observer.observe(item);
        }
    });
}

// Função utilitária para debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
