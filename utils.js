/**
 * Utilitários e Funções Auxiliares
 */

// Seleção de elementos DOM
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Funções de animação
const animate = {
    // Adiciona classe com delay
    addClassWithDelay: (element, className, delay) => {
        setTimeout(() => {
            element.classList.add(className);
        }, delay);
    },
    
    // Remove classe com delay
    removeClassWithDelay: (element, className, delay) => {
        setTimeout(() => {
            element.classList.remove(className);
        }, delay);
    },
    
    // Cria efeito de digitação
    typeWriter: (element, text, speed = 50) => {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    },
    
    // Cria efeito de contagem
    countUp: (element, target, duration = 2000, startValue = 0) => {
        let startTime = null;
        const startCount = startValue;
        
        function updateCount(timestamp) {
            if (!startTime) startTime = timestamp;
            
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const currentCount = Math.floor(progress * (target - startCount) + startCount);
            
            element.textContent = currentCount;
            
            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                element.textContent = target;
            }
        }
        
        requestAnimationFrame(updateCount);
    },
    
    // Cria efeito de parallax
    parallax: (element, speed = 0.1) => {
        window.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.clientX) * speed;
            const y = (window.innerHeight / 2 - e.clientY) * speed;
            
            element.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    }
};

// Funções de manipulação de DOM
const dom = {
    // Cria elemento com atributos e conteúdo
    createElement: (tag, attributes = {}, content = '') => {
        const element = document.createElement(tag);
        
        for (const key in attributes) {
            element.setAttribute(key, attributes[key]);
        }
        
        if (content) {
            element.innerHTML = content;
        }
        
        return element;
    },
    
    // Adiciona evento com remoção automática
    addEventOnce: (element, eventType, callback) => {
        const handler = (...args) => {
            callback(...args);
            element.removeEventListener(eventType, handler);
        };
        
        element.addEventListener(eventType, handler);
    },
    
    // Observa elemento entrando na viewport
    observeIntersection: (element, callback, options = {}) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    callback(entry.target);
                }
            });
        }, options);
        
        observer.observe(element);
        
        return observer;
    }
};

// Funções matemáticas
const math = {
    // Retorna número aleatório entre min e max
    random: (min, max) => Math.random() * (max - min) + min,
    
    // Retorna número aleatório inteiro entre min e max
    randomInt: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
    
    // Mapeia valor de um intervalo para outro
    map: (value, inMin, inMax, outMin, outMax) => {
        return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    },
    
    // Limita valor entre min e max
    clamp: (value, min, max) => Math.min(Math.max(value, min), max),
    
    // Calcula distância entre dois pontos
    distance: (x1, y1, x2, y2) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)),
    
    // Interpola linearmente entre dois valores
    lerp: (start, end, amount) => start * (1 - amount) + end * amount
};

// Funções de manipulação de cores
const color = {
    // Converte RGB para Hex
    rgbToHex: (r, g, b) => {
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    },
    
    // Converte Hex para RGB
    hexToRgb: (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    },
    
    // Gera cor aleatória
    randomColor: () => {
        return `rgb(${math.randomInt(0, 255)}, ${math.randomInt(0, 255)}, ${math.randomInt(0, 255)})`;
    },
    
    // Gera cor aleatória em formato hexadecimal
    randomHex: () => {
        return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    }
};

// Funções de validação
const validate = {
    // Valida email
    email: (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },
    
    // Valida URL
    url: (url) => {
        const re = /^(http|https):\/\/[^ "]+$/;
        return re.test(url);
    },
    
    // Valida se string está vazia
    isEmpty: (str) => {
        return (!str || str.trim().length === 0);
    }
};

// Funções de armazenamento
const storage = {
    // Salva no localStorage
    save: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    
    // Recupera do localStorage
    get: (key) => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    },
    
    // Remove do localStorage
    remove: (key) => {
        localStorage.removeItem(key);
    },
    
    // Limpa todo o localStorage
    clear: () => {
        localStorage.clear();
    }
};

// Funções de detecção de dispositivo
const device = {
    // Verifica se é dispositivo móvel
    isMobile: () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    
    // Verifica se é tablet
    isTablet: () => {
        return /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(navigator.userAgent);
    },
    
    // Verifica se é desktop
    isDesktop: () => {
        return !device.isMobile() && !device.isTablet();
    },
    
    // Verifica se suporta toque
    supportsTouch: () => {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
};

// Exporta utilitários
window.utils = {
    $,
    $$,
    animate,
    dom,
    math,
    color,
    validate,
    storage,
    device
};
