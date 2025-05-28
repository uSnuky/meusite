/**
 * Gerenciamento de Contato
 */

class ContactManager {
    constructor() {
        // Elementos DOM
        this.contactForm = document.getElementById('contact-form');
        this.formSuccess = document.querySelector('.form-success');
        this.successClose = document.querySelector('.success-close');
        this.formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
        this.socialStars = document.querySelectorAll('.social-star');
        
        // Inicialização
        this.init();
    }
    
    init() {
        // Inicializar formulário
        this.initForm();
        
        // Inicializar animações de estrelas sociais
        this.initSocialStars();
        
        // Inicializar eventos de formulário
        this.initFormEvents();
    }
    
    initForm() {
        if (!this.contactForm) return;
        
        // Adicionar evento de envio do formulário
        this.contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });
        
        // Adicionar evento ao botão de fechar mensagem de sucesso
        if (this.successClose) {
            this.successClose.addEventListener('click', () => {
                this.hideSuccessMessage();
            });
        }
    }
    
    initSocialStars() {
        // Adicionar animação às estrelas sociais
        this.socialStars.forEach((star, index) => {
            // Posicionar estrelas em órbita
            const angle = (index / this.socialStars.length) * Math.PI * 2;
            const radius = 80;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            star.style.transform = `translate(${x}px, ${y}px)`;
            
            // Adicionar animação de pulsação
            star.style.animation = `pulse 3s infinite ${index * 0.5}s`;
            
            // Adicionar evento de hover
            star.addEventListener('mouseenter', () => {
                const starIcon = star.querySelector('.star-icon');
                const starName = star.querySelector('.star-name');
                
                if (starIcon) starIcon.style.boxShadow = '0 0 20px rgba(5, 216, 232, 0.8)';
                if (starName) starName.style.opacity = '1';
            });
            
            star.addEventListener('mouseleave', () => {
                const starIcon = star.querySelector('.star-icon');
                const starName = star.querySelector('.star-name');
                
                if (starIcon) starIcon.style.boxShadow = 'none';
                if (starName) starName.style.opacity = '0';
            });
        });
    }
    
    initFormEvents() {
        // Adicionar eventos aos campos do formulário
        this.formInputs.forEach(input => {
            // Evento de foco
            input.addEventListener('focus', () => {
                const formGroup = input.parentElement;
                const label = formGroup.querySelector('label');
                const border = formGroup.querySelector('.form-border');
                
                if (label) label.style.top = '5px';
                if (label) label.style.fontSize = '0.7rem';
                if (label) label.style.color = 'var(--color-accent-blue)';
                if (border) border.style.width = '100%';
            });
            
            // Evento de perda de foco
            input.addEventListener('blur', () => {
                const formGroup = input.parentElement;
                const label = formGroup.querySelector('label');
                const border = formGroup.querySelector('.form-border');
                
                if (input.value === '') {
                    if (label) label.style.top = '10px';
                    if (label) label.style.fontSize = 'var(--size-small)';
                    if (label) label.style.color = 'var(--color-text)';
                }
                
                if (border) border.style.width = '0';
            });
            
            // Evento de digitação
            input.addEventListener('input', () => {
                this.validateInput(input);
            });
        });
    }
    
    validateInput(input) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        
        // Remover mensagem de erro existente
        if (errorMessage) {
            formGroup.removeChild(errorMessage);
        }
        
        // Validar campo
        let isValid = true;
        let message = '';
        
        if (input.value.trim() === '') {
            isValid = false;
            message = 'Este campo é obrigatório';
        } else if (input.type === 'email' && !utils.validate.email(input.value)) {
            isValid = false;
            message = 'Email inválido';
        }
        
        // Mostrar mensagem de erro se necessário
        if (!isValid) {
            const error = document.createElement('div');
            error.className = 'error-message';
            error.textContent = message;
            error.style.color = 'var(--color-accent-pink)';
            error.style.fontSize = '0.8rem';
            error.style.marginTop = '5px';
            
            formGroup.appendChild(error);
        }
        
        return isValid;
    }
    
    validateForm() {
        let isValid = true;
        
        // Validar todos os campos
        this.formInputs.forEach(input => {
            if (!this.validateInput(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    handleFormSubmit() {
        // Validar formulário
        if (!this.validateForm()) return;
        
        // Simular envio (em um projeto real, aqui seria feita a requisição ao servidor)
        const submitButton = this.contactForm.querySelector('.form-submit-btn');
        if (submitButton) {
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
        }
        
        // Simular tempo de processamento
        setTimeout(() => {
            // Mostrar mensagem de sucesso
            this.showSuccessMessage();
            
            // Resetar formulário
            this.contactForm.reset();
            
            // Restaurar botão
            if (submitButton) {
                submitButton.textContent = 'Enviar Mensagem';
                submitButton.disabled = false;
            }
            
            // Criar efeito de partículas
            if (window.animations) {
                const x = window.innerWidth / 2;
                const y = window.innerHeight / 2;
                window.animations.createParticleExplosion(x, y, 30, ['#39FF14', '#05D8E8', '#4A1A8C']);
            }
        }, 2000);
    }
    
    showSuccessMessage() {
        if (!this.formSuccess) return;
        
        this.formSuccess.classList.add('active');
    }
    
    hideSuccessMessage() {
        if (!this.formSuccess) return;
        
        this.formSuccess.classList.remove('active');
    }
}

// Inicializar gerenciador de contato quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.contactManager = new ContactManager();
});
