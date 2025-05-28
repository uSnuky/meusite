/**
 * Experimentos Interativos
 */

class ExperimentsManager {
    constructor() {
        // Elementos DOM
        this.labTabs = document.querySelectorAll('.lab-tab');
        this.labExperiments = document.querySelectorAll('.lab-experiment');
        
        // Experimentos específicos
        this.particlesExperiment = document.getElementById('particles-exp');
        this.canvasExperiment = document.getElementById('canvas-exp');
        this.audioExperiment = document.getElementById('audio-exp');
        this.physicsExperiment = document.getElementById('physics-exp');
        
        // Estado atual
        this.currentExperiment = 'particles';
        this.experimentInstances = {};
        
        // Inicialização
        this.init();
    }
    
    init() {
        // Inicializar tabs
        this.initTabs();
        
        // Inicializar experimentos
        this.initParticlesExperiment();
        this.initCanvasExperiment();
        this.initAudioExperiment();
        this.initPhysicsExperiment();
    }
    
    initTabs() {
        // Adicionar eventos aos tabs
        this.labTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remover classe ativa de todos os tabs
                this.labTabs.forEach(t => t.classList.remove('active'));
                
                // Adicionar classe ativa ao tab clicado
                tab.classList.add('active');
                
                // Mostrar experimento correspondente
                const experimentId = tab.getAttribute('data-tab');
                this.showExperiment(experimentId);
            });
        });
    }
    
    showExperiment(experimentId) {
        // Esconder todos os experimentos
        this.labExperiments.forEach(exp => {
            exp.classList.remove('active');
        });
        
        // Mostrar experimento selecionado
        const experiment = document.getElementById(`${experimentId}-exp`);
        if (experiment) {
            experiment.classList.add('active');
            this.currentExperiment = experimentId;
            
            // Iniciar experimento se necessário
            this.startExperiment(experimentId);
        }
    }
    
    startExperiment(experimentId) {
        // Iniciar experimento específico
        switch (experimentId) {
            case 'particles':
                if (window.experimentParticles) {
                    window.experimentParticles.resume();
                }
                break;
            case 'canvas':
                if (!this.experimentInstances.canvas) {
                    this.experimentInstances.canvas = new CanvasExperiment();
                }
                break;
            case 'audio':
                if (!this.experimentInstances.audio) {
                    this.experimentInstances.audio = new AudioExperiment();
                }
                break;
            case 'physics':
                if (!this.experimentInstances.physics) {
                    this.experimentInstances.physics = new PhysicsExperiment();
                }
                break;
        }
    }
    
    // Experimento de Partículas
    initParticlesExperiment() {
        if (!this.particlesExperiment) return;
        
        // Controles do experimento
        const particlesCount = document.getElementById('particles-count');
        const particlesSpeed = document.getElementById('particles-speed');
        const particlesSize = document.getElementById('particles-size');
        const colorOptions = document.querySelectorAll('.color-option');
        
        // Adicionar eventos aos controles
        if (particlesCount) {
            particlesCount.addEventListener('input', () => {
                if (window.experimentParticles) {
                    window.experimentParticles.updateOptions({
                        particleCount: parseInt(particlesCount.value)
                    });
                }
            });
        }
        
        if (particlesSpeed) {
            particlesSpeed.addEventListener('input', () => {
                if (window.experimentParticles) {
                    const speed = parseFloat(particlesSpeed.value) / 10;
                    window.experimentParticles.updateOptions({
                        particleSpeed: { min: speed / 2, max: speed }
                    });
                }
            });
        }
        
        if (particlesSize) {
            particlesSize.addEventListener('input', () => {
                if (window.experimentParticles) {
                    const size = parseFloat(particlesSize.value);
                    window.experimentParticles.updateOptions({
                        particleSize: { min: size / 2, max: size }
                    });
                }
            });
        }
        
        if (colorOptions.length > 0) {
            colorOptions.forEach(option => {
                option.addEventListener('click', () => {
                    // Remover classe ativa de todas as opções
                    colorOptions.forEach(opt => opt.classList.remove('active'));
                    
                    // Adicionar classe ativa à opção clicada
                    option.classList.add('active');
                    
                    // Atualizar cores das partículas
                    const color = option.getAttribute('data-color');
                    let particleColors = [];
                    
                    switch (color) {
                        case 'blue':
                            particleColors = ['rgba(5, 216, 232, 0.8)', 'rgba(74, 26, 140, 0.8)', 'rgba(5, 216, 232, 0.5)'];
                            break;
                        case 'purple':
                            particleColors = ['rgba(74, 26, 140, 0.8)', 'rgba(113, 26, 195, 0.8)', 'rgba(74, 26, 140, 0.5)'];
                            break;
                        case 'pink':
                            particleColors = ['rgba(255, 42, 109, 0.8)', 'rgba(255, 0, 128, 0.8)', 'rgba(255, 42, 109, 0.5)'];
                            break;
                        case 'green':
                            particleColors = ['rgba(57, 255, 20, 0.8)', 'rgba(0, 200, 83, 0.8)', 'rgba(57, 255, 20, 0.5)'];
                            break;
                    }
                    
                    if (window.experimentParticles) {
                        window.experimentParticles.updateOptions({
                            particleColor: particleColors
                        });
                    }
                });
            });
        }
    }
    
    // Experimento de Canvas
    initCanvasExperiment() {
        if (!this.canvasExperiment) return;
        
        // Classe para o experimento de Canvas
        class CanvasExperiment {
            constructor() {
                this.canvas = document.getElementById('canvas-experiment-canvas');
                this.ctx = this.canvas.getContext('2d');
                this.isDrawing = false;
                this.lastX = 0;
                this.lastY = 0;
                
                // Configurações
                this.tool = 'brush';
                this.brushSize = 10;
                this.brushColor = '#05D8E8';
                
                // Elementos de controle
                this.toolOptions = document.querySelectorAll('.tool-option');
                this.brushSizeInput = document.getElementById('brush-size');
                this.brushColorInput = document.getElementById('brush-color');
                this.clearButton = document.querySelector('.clear-canvas');
                
                // Inicialização
                this.init();
            }
            
            init() {
                // Configurar canvas
                this.resizeCanvas();
                window.addEventListener('resize', () => this.resizeCanvas());
                
                // Adicionar eventos de desenho
                this.canvas.addEventListener('mousedown', this.startDrawing.bind(this));
                this.canvas.addEventListener('mousemove', this.draw.bind(this));
                this.canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
                this.canvas.addEventListener('mouseout', this.stopDrawing.bind(this));
                
                // Suporte para toque
                this.canvas.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    const touch = e.touches[0];
                    const mouseEvent = new MouseEvent('mousedown', {
                        clientX: touch.clientX,
                        clientY: touch.clientY
                    });
                    this.canvas.dispatchEvent(mouseEvent);
                });
                
                this.canvas.addEventListener('touchmove', (e) => {
                    e.preventDefault();
                    const touch = e.touches[0];
                    const mouseEvent = new MouseEvent('mousemove', {
                        clientX: touch.clientX,
                        clientY: touch.clientY
                    });
                    this.canvas.dispatchEvent(mouseEvent);
                });
                
                this.canvas.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    const mouseEvent = new MouseEvent('mouseup');
                    this.canvas.dispatchEvent(mouseEvent);
                });
                
                // Adicionar eventos aos controles
                this.toolOptions.forEach(option => {
                    option.addEventListener('click', () => {
                        this.toolOptions.forEach(opt => opt.classList.remove('active'));
                        option.classList.add('active');
                        this.tool = option.getAttribute('data-tool');
                    });
                });
                
                if (this.brushSizeInput) {
                    this.brushSizeInput.addEventListener('input', () => {
                        this.brushSize = parseInt(this.brushSizeInput.value);
                    });
                }
                
                if (this.brushColorInput) {
                    this.brushColorInput.addEventListener('input', () => {
                        this.brushColor = this.brushColorInput.value;
                    });
                }
                
                if (this.clearButton) {
                    this.clearButton.addEventListener('click', () => {
                        this.clearCanvas();
                    });
                }
            }
            
            resizeCanvas() {
                const container = this.canvas.parentElement;
                this.canvas.width = container.clientWidth;
                this.canvas.height = container.clientHeight;
            }
            
            startDrawing(e) {
                this.isDrawing = true;
                
                const rect = this.canvas.getBoundingClientRect();
                this.lastX = e.clientX - rect.left;
                this.lastY = e.clientY - rect.top;
                
                // Para formas como círculo e retângulo, salvar posição inicial
                if (this.tool === 'circle' || this.tool === 'rectangle') {
                    this.startX = this.lastX;
                    this.startY = this.lastY;
                }
            }
            
            draw(e) {
                if (!this.isDrawing) return;
                
                const rect = this.canvas.getBoundingClientRect();
                const currentX = e.clientX - rect.left;
                const currentY = e.clientY - rect.top;
                
                this.ctx.lineJoin = 'round';
                this.ctx.lineCap = 'round';
                this.ctx.strokeStyle = this.brushColor;
                this.ctx.fillStyle = this.brushColor;
                
                switch (this.tool) {
                    case 'brush':
                        this.ctx.lineWidth = this.brushSize;
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.lastX, this.lastY);
                        this.ctx.lineTo(currentX, currentY);
                        this.ctx.stroke();
                        this.lastX = currentX;
                        this.lastY = currentY;
                        break;
                        
                    case 'line':
                        // Desenhar linha temporária
                        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                        this.ctx.lineWidth = this.brushSize;
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.startX, this.startY);
                        this.ctx.lineTo(currentX, currentY);
                        this.ctx.stroke();
                        break;
                        
                    case 'circle':
                        // Desenhar círculo temporário
                        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                        this.ctx.lineWidth = this.brushSize;
                        this.ctx.beginPath();
                        const radius = Math.sqrt(Math.pow(currentX - this.startX, 2) + Math.pow(currentY - this.startY, 2));
                        this.ctx.arc(this.startX, this.startY, radius, 0, Math.PI * 2);
                        this.ctx.stroke();
                        break;
                        
                    case 'rectangle':
                        // Desenhar retângulo temporário
                        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                        this.ctx.lineWidth = this.brushSize;
                        this.ctx.beginPath();
                        this.ctx.rect(
                            this.startX,
                            this.startY,
                            currentX - this.startX,
                            currentY - this.startY
                        );
                        this.ctx.stroke();
                        break;
                }
            }
            
            stopDrawing() {
                this.isDrawing = false;
            }
            
            clearCanvas() {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            }
        }
        
        // Criar instância do experimento
        this.experimentInstances.canvas = new CanvasExperiment();
    }
    
    // Experimento de Web Audio
    initAudioExperiment() {
        if (!this.audioExperiment) return;
        
        // Classe para o experimento de Audio
        class AudioExperiment {
            constructor() {
                // Verificar suporte a Web Audio API
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                this.isPlaying = false;
                this.activeNotes = {};
                
                // Elementos DOM
                this.visualizerCanvas = document.getElementById('audio-visualizer-canvas');
                this.visualizerCtx = this.visualizerCanvas.getContext('2d');
                this.pianoKeys = document.querySelectorAll('.piano-key');
                
                // Controles
                this.waveTypeSelect = document.getElementById('wave-type');
                this.attackTimeInput = document.getElementById('attack-time');
                this.releaseTimeInput = document.getElementById('release-time');
                this.reverbLevelInput = document.getElementById('reverb-level');
                
                // Configurações
                this.waveType = 'sine';
                this.attackTime = 0.1;
                this.releaseTime = 0.5;
                this.reverbLevel = 0.3;
                
                // Mapeamento de teclas do teclado para notas
                this.keyMap = {
                    'a': 'C4',
                    'w': 'C#4',
                    's': 'D4',
                    'e': 'D#4',
                    'd': 'E4',
                    'f': 'F4',
                    't': 'F#4',
                    'g': 'G4',
                    'y': 'G#4',
                    'h': 'A4',
                    'u': 'A#4',
                    'j': 'B4'
                };
                
                // Frequências das notas
                this.noteFrequencies = {
                    'C4': 261.63,
                    'C#4': 277.18,
                    'D4': 293.66,
                    'D#4': 311.13,
                    'E4': 329.63,
                    'F4': 349.23,
                    'F#4': 369.99,
                    'G4': 392.00,
                    'G#4': 415.30,
                    'A4': 440.00,
                    'A#4': 466.16,
                    'B4': 493.88
                };
                
                // Inicialização
                this.init();
            }
            
            init() {
                // Configurar canvas do visualizador
                this.resizeVisualizer();
                window.addEventListener('resize', () => this.resizeVisualizer());
                
                // Iniciar animação do visualizador
                this.drawVisualizer();
                
                // Adicionar eventos às teclas do piano
                this.pianoKeys.forEach(key => {
                    key.addEventListener('mousedown', () => {
                        const note = key.getAttribute('data-note');
                        this.playNote(note);
                        key.classList.add('active');
                    });
                    
                    key.addEventListener('mouseup', () => {
                        const note = key.getAttribute('data-note');
                        this.stopNote(note);
                        key.classList.remove('active');
                    });
                    
                    key.addEventListener('mouseleave', () => {
                        const note = key.getAttribute('data-note');
                        this.stopNote(note);
                        key.classList.remove('active');
                    });
                    
                    // Suporte para toque
                    key.addEventListener('touchstart', (e) => {
                        e.preventDefault();
                        const note = key.getAttribute('data-note');
                        this.playNote(note);
                        key.classList.add('active');
                    });
                    
                    key.addEventListener('touchend', () => {
                        const note = key.getAttribute('data-note');
                        this.stopNote(note);
                        key.classList.remove('active');
                    });
                });
                
                // Adicionar eventos de teclado
                document.addEventListener('keydown', (e) => {
                    if (e.repeat) return;
                    
                    const key = e.key.toLowerCase();
                    if (this.keyMap[key]) {
                        const note = this.keyMap[key];
                        this.playNote(note);
                        
                        // Destacar tecla visual
                        const pianoKey = document.querySelector(`.piano-key[data-note="${note}"]`);
                        if (pianoKey) pianoKey.classList.add('active');
                    }
                });
                
                document.addEventListener('keyup', (e) => {
                    const key = e.key.toLowerCase();
                    if (this.keyMap[key]) {
                        const note = this.keyMap[key];
                        this.stopNote(note);
                        
                        // Remover destaque da tecla
                        const pianoKey = document.querySelector(`.piano-key[data-note="${note}"]`);
                        if (pianoKey) pianoKey.classList.remove('active');
                    }
                });
                
                // Adicionar eventos aos controles
                if (this.waveTypeSelect) {
                    this.waveTypeSelect.addEventListener('change', () => {
                        this.waveType = this.waveTypeSelect.value;
                    });
                }
                
                if (this.attackTimeInput) {
                    this.attackTimeInput.addEventListener('input', () => {
                        this.attackTime = parseFloat(this.attackTimeInput.value);
                    });
                }
                
                if (this.releaseTimeInput) {
                    this.releaseTimeInput.addEventListener('input', () => {
                        this.releaseTime = parseFloat(this.releaseTimeInput.value);
                    });
                }
                
                if (this.reverbLevelInput) {
                    this.reverbLevelInput.addEventListener('input', () => {
                        this.reverbLevel = parseFloat(this.reverbLevelInput.value);
                    });
                }
            }
            
            resizeVisualizer() {
                if (!this.visualizerCanvas) return;
                
                const container = this.visualizerCanvas.parentElement;
                this.visualizerCanvas.width = container.clientWidth;
                this.visualizerCanvas.height = container.clientHeight;
            }
            
            playNote(note) {
                if (!this.noteFrequencies[note]) return;
                
                // Criar oscilador
                const oscillator = this.audioContext.createOscillator();
                oscillator.type = this.waveType;
                oscillator.frequency.setValueAtTime(this.noteFrequencies[note], this.audioContext.currentTime);
                
                // Criar envelope de amplitude
                const gainNode = this.audioContext.createGain();
                gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
                gainNode.gain.linearRampToValueAtTime(1, this.audioContext.currentTime + this.attackTime);
                
                // Criar efeito de reverb simples
                const reverbNode = this.audioContext.createConvolver();
                const reverbGain = this.audioContext.createGain();
                reverbGain.gain.value = this.reverbLevel;
                
                // Conectar nós
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                // Adicionar reverb se suportado
                if (this.reverbLevel > 0) {
                    gainNode.connect(reverbGain);
                    reverbGain.connect(this.audioContext.destination);
                }
                
                // Iniciar oscilador
                oscillator.start();
                
                // Armazenar referências para parar depois
                this.activeNotes[note] = {
                    oscillator: oscillator,
                    gainNode: gainNode
                };
            }
            
            stopNote(note) {
                if (!this.activeNotes[note]) return;
                
                const { oscillator, gainNode } = this.activeNotes[note];
                
                // Aplicar envelope de release
                gainNode.gain.cancelScheduledValues(this.audioContext.currentTime);
                gainNode.gain.setValueAtTime(gainNode.gain.value, this.audioContext.currentTime);
                gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + this.releaseTime);
                
                // Parar oscilador após release
                oscillator.stop(this.audioContext.currentTime + this.releaseTime);
                
                // Remover da lista de notas ativas
                delete this.activeNotes[note];
            }
            
            drawVisualizer() {
                if (!this.visualizerCanvas) return;
                
                // Limpar canvas
                this.visualizerCtx.clearRect(0, 0, this.visualizerCanvas.width, this.visualizerCanvas.height);
                
                // Desenhar visualização
                const width = this.visualizerCanvas.width;
                const height = this.visualizerCanvas.height;
                
                // Desenhar ondas para cada nota ativa
                const noteCount = Object.keys(this.activeNotes).length;
                if (noteCount > 0) {
                    this.visualizerCtx.strokeStyle = '#05D8E8';
                    this.visualizerCtx.lineWidth = 2;
                    this.visualizerCtx.beginPath();
                    
                    for (let x = 0; x < width; x++) {
                        const t = x / width;
                        let y = 0;
                        
                        // Somar todas as notas ativas
                        for (const note in this.activeNotes) {
                            const freq = this.noteFrequencies[note];
                            const amplitude = 50 * (this.activeNotes[note].gainNode.gain.value || 0.5);
                            
                            // Gerar forma de onda baseada no tipo selecionado
                            switch (this.waveType) {
                                case 'sine':
                                    y += amplitude * Math.sin(2 * Math.PI * freq * t * 0.01);
                                    break;
                                case 'square':
                                    y += amplitude * Math.sign(Math.sin(2 * Math.PI * freq * t * 0.01));
                                    break;
                                case 'sawtooth':
                                    y += amplitude * ((t * freq * 0.1) % 1 - 0.5);
                                    break;
                                case 'triangle':
                                    y += amplitude * (Math.abs(((t * freq * 0.1) % 1) * 2 - 1) - 0.5);
                                    break;
                            }
                        }
                        
                        // Normalizar e desenhar
                        y = height / 2 - y / noteCount;
                        
                        if (x === 0) {
                            this.visualizerCtx.moveTo(x, y);
                        } else {
                            this.visualizerCtx.lineTo(x, y);
                        }
                    }
                    
                    this.visualizerCtx.stroke();
                } else {
                    // Desenhar linha de base quando não há notas
                    this.visualizerCtx.strokeStyle = 'rgba(5, 216, 232, 0.3)';
                    this.visualizerCtx.lineWidth = 2;
                    this.visualizerCtx.beginPath();
                    this.visualizerCtx.moveTo(0, height / 2);
                    this.visualizerCtx.lineTo(width, height / 2);
                    this.visualizerCtx.stroke();
                }
                
                // Continuar animação
                requestAnimationFrame(() => this.drawVisualizer());
            }
        }
        
        // Criar instância do experimento
        this.experimentInstances.audio = new AudioExperiment();
    }
    
    // Experimento de Física
    initPhysicsExperiment() {
        if (!this.physicsExperiment) return;
        
        // Classe para o experimento de Física
        class PhysicsExperiment {
            constructor() {
                this.canvas = document.getElementById('physics-experiment-canvas');
                this.ctx = this.canvas.getContext('2d');
                
                // Configurações de física
                this.gravity = 0.5;
                this.friction = 0.05;
                this.elasticity = 0.8;
                
                // Objetos
                this.objects = [];
                
                // Controles
                this.gravityInput = document.getElementById('gravity');
                this.frictionInput = document.getElementById('friction');
                this.elasticityInput = document.getElementById('elasticity');
                this.addObjectButton = document.querySelector('.add-object');
                this.resetButton = document.querySelector('.reset-simulation');
                
                // Estado
                this.isRunning = true;
                
                // Inicialização
                this.init();
            }
            
            init() {
                // Configurar canvas
                this.resizeCanvas();
                window.addEventListener('resize', () => this.resizeCanvas());
                
                // Adicionar objetos iniciais
                this.addObject();
                this.addObject();
                this.addObject();
                
                // Adicionar eventos aos controles
                if (this.gravityInput) {
                    this.gravityInput.addEventListener('input', () => {
                        this.gravity = parseFloat(this.gravityInput.value);
                    });
                }
                
                if (this.frictionInput) {
                    this.frictionInput.addEventListener('input', () => {
                        this.friction = parseFloat(this.frictionInput.value);
                    });
                }
                
                if (this.elasticityInput) {
                    this.elasticityInput.addEventListener('input', () => {
                        this.elasticity = parseFloat(this.elasticityInput.value);
                    });
                }
                
                if (this.addObjectButton) {
                    this.addObjectButton.addEventListener('click', () => {
                        this.addObject();
                    });
                }
                
                if (this.resetButton) {
                    this.resetButton.addEventListener('click', () => {
                        this.resetSimulation();
                    });
                }
                
                // Adicionar evento de clique no canvas
                this.canvas.addEventListener('click', (e) => {
                    const rect = this.canvas.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    this.addObjectAt(x, y);
                });
                
                // Iniciar loop de animação
                this.animate();
            }
            
            resizeCanvas() {
                const container = this.canvas.parentElement;
                this.canvas.width = container.clientWidth;
                this.canvas.height = container.clientHeight;
            }
            
            addObject() {
                const x = Math.random() * this.canvas.width;
                const y = Math.random() * (this.canvas.height / 2);
                
                this.addObjectAt(x, y);
            }
            
            addObjectAt(x, y) {
                const radius = Math.random() * 20 + 10;
                const color = utils.color.randomHex();
                
                this.objects.push({
                    x: x,
                    y: y,
                    radius: radius,
                    color: color,
                    vx: Math.random() * 10 - 5,
                    vy: Math.random() * 5,
                    mass: radius
                });
            }
            
            resetSimulation() {
                this.objects = [];
                this.addObject();
                this.addObject();
                this.addObject();
            }
            
            update() {
                // Atualizar posição e velocidade de cada objeto
                for (let i = 0; i < this.objects.length; i++) {
                    const obj = this.objects[i];
                    
                    // Aplicar gravidade
                    obj.vy += this.gravity;
                    
                    // Aplicar fricção
                    obj.vx *= (1 - this.friction);
                    obj.vy *= (1 - this.friction);
                    
                    // Atualizar posição
                    obj.x += obj.vx;
                    obj.y += obj.vy;
                    
                    // Verificar colisão com bordas
                    if (obj.x - obj.radius < 0) {
                        obj.x = obj.radius;
                        obj.vx = -obj.vx * this.elasticity;
                    } else if (obj.x + obj.radius > this.canvas.width) {
                        obj.x = this.canvas.width - obj.radius;
                        obj.vx = -obj.vx * this.elasticity;
                    }
                    
                    if (obj.y - obj.radius < 0) {
                        obj.y = obj.radius;
                        obj.vy = -obj.vy * this.elasticity;
                    } else if (obj.y + obj.radius > this.canvas.height) {
                        obj.y = this.canvas.height - obj.radius;
                        obj.vy = -obj.vy * this.elasticity;
                    }
                    
                    // Verificar colisão com outros objetos
                    for (let j = i + 1; j < this.objects.length; j++) {
                        const obj2 = this.objects[j];
                        
                        const dx = obj2.x - obj.x;
                        const dy = obj2.y - obj.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance < obj.radius + obj2.radius) {
                            // Calcular vetor normal
                            const nx = dx / distance;
                            const ny = dy / distance;
                            
                            // Calcular velocidade relativa
                            const vx = obj2.vx - obj.vx;
                            const vy = obj2.vy - obj.vy;
                            
                            // Calcular produto escalar
                            const dotProduct = nx * vx + ny * vy;
                            
                            // Aplicar impulso
                            const impulse = 2 * dotProduct / (obj.mass + obj2.mass);
                            
                            obj.vx += impulse * obj2.mass * nx * this.elasticity;
                            obj.vy += impulse * obj2.mass * ny * this.elasticity;
                            obj2.vx -= impulse * obj.mass * nx * this.elasticity;
                            obj2.vy -= impulse * obj.mass * ny * this.elasticity;
                            
                            // Separar objetos para evitar sobreposição
                            const overlap = (obj.radius + obj2.radius - distance) / 2;
                            obj.x -= overlap * nx;
                            obj.y -= overlap * ny;
                            obj2.x += overlap * nx;
                            obj2.y += overlap * ny;
                        }
                    }
                }
            }
            
            draw() {
                // Limpar canvas
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                
                // Desenhar cada objeto
                for (const obj of this.objects) {
                    this.ctx.beginPath();
                    this.ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
                    this.ctx.fillStyle = obj.color;
                    this.ctx.fill();
                    
                    // Desenhar brilho
                    this.ctx.beginPath();
                    this.ctx.arc(obj.x - obj.radius * 0.3, obj.y - obj.radius * 0.3, obj.radius * 0.2, 0, Math.PI * 2);
                    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
                    this.ctx.fill();
                }
            }
            
            animate() {
                if (this.isRunning) {
                    this.update();
                    this.draw();
                }
                
                requestAnimationFrame(() => this.animate());
            }
        }
        
        // Criar instância do experimento
        this.experimentInstances.physics = new PhysicsExperiment();
    }
}

// Inicializar gerenciador de experimentos quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.experimentsManager = new ExperimentsManager();
});
