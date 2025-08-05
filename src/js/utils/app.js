/**
 * Cajá - Tecnologia Artesanal
 * Aplicação principal refatorada
 */

// Importar componentes
import MobileMenu from '../../components/MobileMenu.js';
import ContactForm from '../../components/ContactForm.js';
import HelpChat from '../../components/HelpChat.js';

// Importar utilitários
import SmoothScroll from '../../utils/SmoothScroll.js';
import ScrollManager from '../../utils/ScrollManager.js';

/**
 * Classe principal da aplicação
 */
class CajaApp {
    constructor() {
        this.components = {};
        this.utils = {};
        this.init();
    }

    init() {
        // Aguardar DOM estar pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupApp());
        } else {
            this.setupApp();
        }
    }

    setupApp() {
        this.initializeComponents();
        this.initializeUtils();
        this.setupStyles();
        this.setupLazyLoading();
        this.setupPerformanceOptimizations();
    }

    initializeComponents() {
        // Inicializar componentes
        this.components.mobileMenu = new MobileMenu();
        this.components.contactForm = new ContactForm();
        this.components.helpChat = new HelpChat();
    }

    initializeUtils() {
        // Inicializar utilitários
        this.utils.smoothScroll = new SmoothScroll();
        this.utils.scrollManager = new ScrollManager();

        // Configurar scroll to top
        this.setupScrollToTop();
    }

    setupScrollToTop() {
        const scrollToTopBtn = document.getElementById('scrollToTopBtn');
        if (scrollToTopBtn) {
            scrollToTopBtn.addEventListener('click', () => {
                this.utils.smoothScroll.scrollToTop();
            });
        }
    }

    setupStyles() {
        // Adicionar estilos dinâmicos
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }

            .loading-spinner {
                width: 20px;
                height: 20px;
                border: 2px solid #3E2F08;
                border-top: 2px solid transparent;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            .form-group input.error,
            .form-group textarea.error,
            .form-group select.error {
                border-color: #ef4444 !important;
                box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2) !important;
            }

            /* Animações melhoradas */
            .service-card:hover,
            .benefit-card:hover,
            .team-member:hover {
                transform: translateY(-8px) !important;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
            }

            .btn-primary:hover,
            .btn-gold:hover {
                transform: translateY(-3px) scale(1.02) !important;
            }

            /* Melhor responsividade */
            @media (max-width: 768px) {
                .service-card:hover,
                .benefit-card:hover,
                .team-member:hover {
                    transform: translateY(-4px) !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupLazyLoading() {
        // Configurar lazy loading para imagens
        const images = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    setupPerformanceOptimizations() {
        // Preload critical resources
        const criticalLinks = document.querySelectorAll('a[href^="#"]');
        criticalLinks.forEach(link => {
            link.setAttribute('rel', 'prefetch');
        });

        // Focus management para acessibilidade
        this.setupFocusManagement();
    }

    setupFocusManagement() {
        const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const modal = document.getElementById('helpChatMenu');

        if (modal) {
            modal.addEventListener('keydown', (e) => {
                const focusableContent = modal.querySelectorAll(focusableElements);
                const firstFocusableElement = focusableContent[0];
                const lastFocusableElement = focusableContent[focusableContent.length - 1];

                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstFocusableElement) {
                            lastFocusableElement.focus();
                            e.preventDefault();
                        }
                    } else {
                        if (document.activeElement === lastFocusableElement) {
                            firstFocusableElement.focus();
                            e.preventDefault();
                        }
                    }
                }
            });
        }
    }
}

// Inicializar aplicação
const app = new CajaApp();

// Expor para uso global se necessário
window.CajaApp = app;
