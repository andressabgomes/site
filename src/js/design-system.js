/**
 * Design System JavaScript - Cajá IT
 * Gerencia os componentes do sistema de design moderno
 */

class DesignSystem {
    constructor() {
        this.init();
    }

    init() {
        this.setupProgressBar();
        this.setupHeader();
        this.setupMenuButton();
        this.setupSearchInput();
        this.setupScrollEffects();
    }

    /**
     * Progress Bar Component
     */
    setupProgressBar() {
        const progressBar = document.getElementById('progressBar');
        if (!progressBar) return;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;

            progressBar.style.width = `${scrollPercent}%`;
        });
    }

    /**
     * Header Component
     */
    setupHeader() {
        const header = document.getElementById('header');
        if (!header) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    /**
     * Menu Button Component
     */
    setupMenuButton() {
        const menuButton = document.getElementById('menuButton');
        const navigationMenu = document.getElementById('navigationMenu');

        if (!menuButton || !navigationMenu) return;

        menuButton.addEventListener('click', () => {
            menuButton.classList.toggle('active');
            navigationMenu.classList.toggle('active');

            // Prevenir scroll do body quando menu está aberto
            document.body.style.overflow = navigationMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Fechar menu ao clicar em um item
        const navItems = navigationMenu.querySelectorAll('.NavItem');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                menuButton.classList.remove('active');
                navigationMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Fechar menu ao pressionar ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navigationMenu.classList.contains('active')) {
                menuButton.classList.remove('active');
                navigationMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    /**
     * Search Input Component
     */
    setupSearchInput() {
        const searchInput = document.querySelector('.SearchInput input');
        if (!searchInput) return;

        searchInput.addEventListener('focus', () => {
            searchInput.parentElement.classList.add('focused');
        });

        searchInput.addEventListener('blur', () => {
            searchInput.parentElement.classList.remove('focused');
        });

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            if (query.length > 0) {
                // Implementar lógica de busca aqui
                console.log('Buscando:', query);
            }
        });
    }

    /**
     * Scroll Effects
     */
    setupScrollEffects() {
        // Smooth scroll para links internos
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        internalLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const headerHeight = document.querySelector('.Header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Atualizar item ativo no menu baseado na seção visível
        this.updateActiveNavItem();
        window.addEventListener('scroll', () => {
            this.updateActiveNavItem();
        });
    }

    /**
     * Atualizar item ativo no menu
     */
    updateActiveNavItem() {
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('.NavItem');

        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if (href === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    }

    /**
     * Animações de entrada
     */
    setupAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observar elementos para animação
        const animateElements = document.querySelectorAll('.service-card, .principle-item, .stat, .resource-card');
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }
}

// Inicializar o Design System quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new DesignSystem();
});

// Exportar para uso global se necessário
window.DesignSystem = DesignSystem;
