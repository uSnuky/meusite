/**
 * Gerenciamento de Projetos
 */

class ProjectsManager {
    constructor() {
        // Elementos DOM
        this.projectsGrid = document.querySelector('.projects-grid');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.projectCards = document.querySelectorAll('.project-card');
        this.projectViewButtons = document.querySelectorAll('.project-view-btn');
        this.projectModal = document.querySelector('.project-modal');
        this.modalClose = document.querySelector('.modal-close');
        
        // Dados dos projetos
        this.projects = [
            {
                id: 'project1',
                title: 'Plataforma Educacional',
                category: 'Web Development',
                description: 'Plataforma completa para cursos online com recursos interativos. O sistema inclui área de alunos, professores e administradores, com funcionalidades como aulas em vídeo, exercícios interativos, fórum de discussão e certificados automáticos. O design responsivo garante uma experiência consistente em todos os dispositivos.',
                fullDescription: 'Esta plataforma educacional foi desenvolvida para proporcionar uma experiência de aprendizado online completa e interativa. O sistema foi construído com foco na experiência do usuário, garantindo facilidade de uso tanto para alunos quanto para professores.<br><br>Entre as principais funcionalidades estão:<br>- Sistema de aulas em vídeo com controle de progresso<br>- Exercícios interativos com feedback imediato<br>- Fórum de discussão para cada aula<br>- Sistema de avaliação e notas<br>- Emissão automática de certificados<br>- Dashboard personalizado para alunos e professores<br>- Área administrativa para gestão de cursos e usuários<br><br>O frontend foi desenvolvido com HTML5, CSS3 e JavaScript puro, utilizando técnicas avançadas de animação e transição para criar uma experiência fluida. O backend utiliza Node.js com Express e MongoDB para armazenamento de dados.',
                technologies: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'MongoDB'],
                projectUrl: '#',
                repoUrl: '#',
                images: ['project1-main.jpg', 'project1-detail1.jpg', 'project1-detail2.jpg']
            },
            {
                id: 'project2',
                title: 'App de Produtividade',
                category: 'Mobile Development',
                description: 'Aplicativo para gerenciamento de tarefas e aumento de produtividade. Inclui funcionalidades como listas de tarefas, lembretes, notas e estatísticas de produtividade.',
                fullDescription: 'Este aplicativo de produtividade foi desenvolvido para ajudar os usuários a gerenciar seu tempo e tarefas de forma eficiente. Com uma interface intuitiva e minimalista, o app permite que os usuários organizem suas atividades diárias, definam metas e acompanhem seu progresso.<br><br>Funcionalidades principais:<br>- Criação e gerenciamento de múltiplas listas de tarefas<br>- Sistema de lembretes com notificações<br>- Notas rápidas com formatação básica<br>- Técnica Pomodoro integrada<br>- Estatísticas de produtividade com gráficos<br>- Sincronização entre dispositivos<br>- Modo offline<br><br>O aplicativo foi desenvolvido utilizando React Native para garantir compatibilidade com iOS e Android, mantendo uma única base de código. A interface foi cuidadosamente projetada para ser minimalista e não distrair o usuário de suas tarefas.',
                technologies: ['React Native', 'Node.js', 'MongoDB', 'Firebase'],
                projectUrl: '#',
                repoUrl: '#',
                images: ['project2-main.jpg', 'project2-detail1.jpg', 'project2-detail2.jpg']
            },
            {
                id: 'project3',
                title: 'Redesign de E-commerce',
                category: 'UI/UX Design',
                description: 'Redesign completo de interface para loja virtual com foco em conversão. O projeto incluiu pesquisa de usuários, wireframes, protótipos e implementação.',
                fullDescription: 'Este projeto de redesign para uma loja virtual foi realizado com o objetivo principal de melhorar as taxas de conversão e proporcionar uma experiência de compra mais intuitiva e agradável.<br><br>O processo incluiu:<br>- Pesquisa com usuários e análise de dados<br>- Identificação de pontos de atrito na jornada de compra<br>- Criação de personas e mapas de jornada do usuário<br>- Wireframes de baixa e alta fidelidade<br>- Protótipos interativos<br>- Testes de usabilidade<br>- Implementação gradual com testes A/B<br><br>Os resultados foram significativos, com aumento de 35% na taxa de conversão e redução de 40% na taxa de abandono de carrinho. O tempo médio para finalização de compra também foi reduzido em 25%.',
                technologies: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
                projectUrl: '#',
                repoUrl: '#',
                images: ['project3-main.jpg', 'project3-detail1.jpg', 'project3-detail2.jpg']
            },
            {
                id: 'project4',
                title: 'Dashboard Analítico',
                category: 'Web Development',
                description: 'Dashboard interativo para visualização de dados empresariais. Inclui gráficos dinâmicos, filtros avançados e relatórios personalizados.',
                fullDescription: 'Este dashboard analítico foi desenvolvido para uma empresa de médio porte que precisava visualizar e analisar dados de vendas, marketing e operações de forma integrada e intuitiva.<br><br>O dashboard inclui:<br>- Painéis personalizáveis por departamento e função<br>- Visualizações de dados com gráficos interativos<br>- Filtros avançados com múltiplos parâmetros<br>- Sistema de alertas baseado em metas<br>- Exportação de relatórios em múltiplos formatos<br>- Atualizações em tempo real<br>- Controle de acesso baseado em funções<br><br>A implementação foi realizada utilizando JavaScript puro com a biblioteca D3.js para visualizações de dados. O layout foi construído com CSS Grid para garantir flexibilidade e responsividade.',
                technologies: ['JavaScript', 'D3.js', 'CSS Grid', 'SVG', 'REST API'],
                projectUrl: '#',
                repoUrl: '#',
                images: ['project4-main.jpg', 'project4-detail1.jpg', 'project4-detail2.jpg']
            },
            {
                id: 'project5',
                title: 'App de Fitness',
                category: 'Mobile Development',
                description: 'Aplicativo para acompanhamento de treinos e nutrição personalizada. Inclui planos de treino, rastreamento de progresso e integração com dispositivos wearable.',
                fullDescription: 'Este aplicativo de fitness foi desenvolvido para ajudar os usuários a manter uma rotina de exercícios e alimentação saudável, com planos personalizados e acompanhamento de progresso.<br><br>Principais funcionalidades:<br>- Criação de planos de treino personalizados<br>- Biblioteca de exercícios com instruções em vídeo<br>- Rastreamento de métricas como peso, medidas corporais e desempenho<br>- Planos nutricionais com contagem de calorias e macronutrientes<br>- Integração com dispositivos wearable para monitoramento de atividades<br>- Comunidade para compartilhamento de conquistas<br>- Desafios semanais e sistema de recompensas<br><br>O aplicativo foi desenvolvido com Flutter para garantir uma experiência nativa tanto em iOS quanto em Android, com uma única base de código.',
                technologies: ['Flutter', 'Firebase', 'REST API', 'Wearable Integration'],
                projectUrl: '#',
                repoUrl: '#',
                images: ['project5-main.jpg', 'project5-detail1.jpg', 'project5-detail2.jpg']
            },
            {
                id: 'project6',
                title: 'Sistema de Design',
                category: 'UI/UX Design',
                description: 'Sistema de design completo para startup de tecnologia. Inclui biblioteca de componentes, guia de estilo e documentação detalhada.',
                fullDescription: 'Este sistema de design foi criado para uma startup de tecnologia em fase de crescimento, que precisava padronizar sua identidade visual e agilizar o desenvolvimento de produtos digitais.<br><br>O sistema inclui:<br>- Guia de estilo com cores, tipografia e iconografia<br>- Biblioteca de componentes reutilizáveis<br>- Padrões de interação e microinterações<br>- Princípios de design e voz da marca<br>- Documentação detalhada para designers e desenvolvedores<br>- Templates para diferentes tipos de páginas e fluxos<br>- Versões para web, mobile e aplicativos desktop<br><br>O sistema foi implementado utilizando uma abordagem de design atômico, garantindo consistência e flexibilidade. A documentação foi criada de forma a ser acessível tanto para designers quanto para desenvolvedores.',
                technologies: ['Design System', 'Component Library', 'Style Guide', 'Figma', 'Documentation'],
                projectUrl: '#',
                repoUrl: '#',
                images: ['project6-main.jpg', 'project6-detail1.jpg', 'project6-detail2.jpg']
            }
        ];
        
        // Inicialização
        this.init();
    }
    
    init() {
        // Inicializar filtros
        this.initFilters();
        
        // Inicializar modal
        this.initModal();
    }
    
    initFilters() {
        // Adicionar eventos aos botões de filtro
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remover classe ativa de todos os botões
                this.filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Adicionar classe ativa ao botão clicado
                button.classList.add('active');
                
                // Filtrar projetos
                const filter = button.getAttribute('data-filter');
                this.filterProjects(filter);
            });
        });
    }
    
    filterProjects(filter) {
        // Filtrar cards de projeto
        this.projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                
                // Animar entrada
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                // Esconder após animação
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
    
    initModal() {
        // Adicionar eventos aos botões de visualização
        this.projectViewButtons.forEach(button => {
            button.addEventListener('click', () => {
                const projectId = button.getAttribute('data-project');
                this.openProjectModal(projectId);
            });
        });
        
        // Adicionar evento ao botão de fechar
        if (this.modalClose) {
            this.modalClose.addEventListener('click', () => {
                this.closeProjectModal();
            });
        }
        
        // Fechar modal ao clicar fora
        if (this.projectModal) {
            this.projectModal.addEventListener('click', (e) => {
                if (e.target === this.projectModal) {
                    this.closeProjectModal();
                }
            });
        }
        
        // Fechar modal com tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.projectModal && this.projectModal.classList.contains('active')) {
                this.closeProjectModal();
            }
        });
    }
    
    openProjectModal(projectId) {
        // Encontrar projeto pelo ID
        const project = this.projects.find(p => p.id === projectId);
        
        if (!project || !this.projectModal) return;
        
        // Preencher dados do modal
        const modalTitle = this.projectModal.querySelector('.modal-title');
        const modalSubtitle = this.projectModal.querySelector('.modal-subtitle');
        const modalDescription = this.projectModal.querySelector('.modal-description');
        const modalTechTags = this.projectModal.querySelector('.modal-tech-tags');
        const modalLinks = this.projectModal.querySelector('.modal-links');
        
        if (modalTitle) modalTitle.textContent = project.title;
        if (modalSubtitle) modalSubtitle.textContent = project.category;
        if (modalDescription) modalDescription.innerHTML = project.fullDescription;
        
        // Preencher tags de tecnologia
        if (modalTechTags) {
            modalTechTags.innerHTML = '';
            project.technologies.forEach(tech => {
                const tag = document.createElement('span');
                tag.className = 'tech-tag';
                tag.textContent = tech;
                modalTechTags.appendChild(tag);
            });
        }
        
        // Preencher links
        if (modalLinks) {
            const projectLink = modalLinks.querySelector('a:first-child');
            const repoLink = modalLinks.querySelector('a:last-child');
            
            if (projectLink) projectLink.href = project.projectUrl;
            if (repoLink) repoLink.href = project.repoUrl;
        }
        
        // Mostrar modal
        this.projectModal.classList.add('active');
        
        // Criar efeito de partículas
        if (window.animations) {
            const x = window.innerWidth / 2;
            const y = window.innerHeight / 2;
            window.animations.createParticleExplosion(x, y, 30);
        }
    }
    
    closeProjectModal() {
        if (!this.projectModal) return;
        
        // Esconder modal
        this.projectModal.classList.remove('active');
    }
}

// Inicializar gerenciador de projetos quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.projectsManager = new ProjectsManager();
});
