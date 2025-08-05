/**
 * Theme Compatibility Manager
 * Gerencia compatibilidade de tema entre diferentes navegadores
 * Especialmente para Firefox e Opera que não suportam meta[name=theme-color]
 */

(function() {
    'use strict';

    class ThemeCompatibilityManager {
        constructor() {
            this.isFirefox = this.detectFirefox();
            this.isOpera = this.detectOpera();
            this.isUnsupportedBrowser = this.isFirefox || this.isOpera;

            this.init();
        }

        /**
         * Detecta Firefox com detecção robusta
         */
        detectFirefox() {
            const ua = navigator.userAgent.toLowerCase();
            return ua.indexOf('firefox') > -1 ||
                   ua.indexOf('fxios') > -1 ||
                   ua.indexOf('fennec') > -1;
        }

        /**
         * Detecta Opera com detecção robusta
         */
        detectOpera() {
            const ua = navigator.userAgent.toLowerCase();
            return ua.indexOf('opera') > -1 ||
                   ua.indexOf('opr') > -1 ||
                   ua.indexOf('opera mini') > -1 ||
                   ua.indexOf('opera mobi') > -1;
        }

        /**
         * Remove meta tags problemáticas para navegadores sem suporte
         */
        removeProblematicMetaTags() {
            if (!this.isUnsupportedBrowser) return;

            const problematicSelectors = [
                'meta[name="theme-color"]',
                'meta[name="browser-theme-color"]',
                'meta[name="msapplication-TileColor"]'
            ];

            problematicSelectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(element => {
                    console.log(`🔧 Removendo ${selector} para compatibilidade com ${this.isFirefox ? 'Firefox' : 'Opera'}`);
                    element.remove();
                });
            });
        }

        /**
         * Adiciona classes CSS para navegadores sem suporte
         */
        addCompatibilityClasses() {
            if (this.isUnsupportedBrowser) {
                document.documentElement.classList.add('no-theme-color-support');

                if (this.isFirefox) {
                    document.documentElement.classList.add('firefox-browser');
                }

                if (this.isOpera) {
                    document.documentElement.classList.add('opera-browser');
                }
            }
        }

        /**
         * Aplica fallback CSS para navegadores sem suporte
         */
        applyFallbackStyles() {
            if (!this.isUnsupportedBrowser) return;

            const style = document.createElement('style');
            style.textContent = `
                /* Fallback styles for browsers without theme-color support */
                html.no-theme-color-support {
                    color-scheme: dark light;
                }

                html.no-theme-color-support :root {
                    --fallback-theme-color: #000000;
                    --fallback-background: #000000;
                }

                html.no-theme-color-support body {
                    background-color: var(--fallback-background, #000000);
                }

                /* Mobile specific fallback */
                @media (max-width: 768px) {
                    html.no-theme-color-support :root {
                        --mobile-fallback-theme: #000000;
                    }

                    html.no-theme-color-support body {
                        background-color: var(--mobile-fallback-theme, #000000);
                    }
                }
            `;

            document.head.appendChild(style);
        }

        /**
         * Inicializa o gerenciador
         */
        init() {
            // Executa imediatamente
            this.removeProblematicMetaTags();
            this.addCompatibilityClasses();
            this.applyFallbackStyles();

            // Executa quando o DOM estiver pronto
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    this.removeProblematicMetaTags();
                    this.addCompatibilityClasses();
                });
            }

            // Executa quando a página estiver completamente carregada
            window.addEventListener('load', () => {
                this.removeProblematicMetaTags();
                this.addCompatibilityClasses();
            });

            // Log para debugging
            if (this.isUnsupportedBrowser) {
                console.log(`🎨 Theme Compatibility: ${this.isFirefox ? 'Firefox' : 'Opera'} detectado - aplicando fallbacks`);
            }
        }
    }

    // Inicializa o gerenciador quando o script for carregado
    if (typeof window !== 'undefined') {
        window.themeCompatibilityManager = new ThemeCompatibilityManager();
    }

})();
