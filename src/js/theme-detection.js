/**
 * Theme Detection and Browser Compatibility
 * Detecta o navegador e aplica configurações de tema apropriadas
 */

(function() {
    'use strict';

    // Detectar o navegador
    function detectBrowser() {
        const userAgent = navigator.userAgent;

        if (userAgent.includes('Firefox')) {
            return 'firefox';
        } else if (userAgent.includes('Chrome')) {
            return 'chrome';
        } else if (userAgent.includes('Safari')) {
            return 'safari';
        } else if (userAgent.includes('Edge')) {
            return 'edge';
        } else if (userAgent.includes('Opera')) {
            return 'opera';
        }

        return 'unknown';
    }

    // Aplicar configurações específicas do navegador
    function applyBrowserSpecificTheme(browser) {
        const root = document.documentElement;

        switch (browser) {
            case 'firefox':
                // Firefox não suporta meta theme-color, usar CSS custom properties
                root.style.setProperty('--browser-theme-color', '#000000');
                root.style.setProperty('--firefox-compatibility', 'true');
                break;

            case 'chrome':
            case 'edge':
                // Chrome e Edge suportam meta theme-color
                root.style.setProperty('--browser-theme-color', '#000000');
                root.style.setProperty('--chrome-compatibility', 'true');
                break;

            case 'safari':
                // Safari tem suporte limitado
                root.style.setProperty('--browser-theme-color', '#000000');
                root.style.setProperty('--safari-compatibility', 'true');
                break;

            default:
                // Fallback para navegadores desconhecidos
                root.style.setProperty('--browser-theme-color', '#000000');
                break;
        }
    }

    // Detectar preferência de cor do sistema
    function detectColorScheme() {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const root = document.documentElement;

        if (isDark) {
            root.style.setProperty('--preferred-color-scheme', 'dark');
            root.style.setProperty('--theme-background', '#000000');
            root.style.setProperty('--theme-text', '#ffffff');
        } else {
            root.style.setProperty('--preferred-color-scheme', 'light');
            root.style.setProperty('--theme-background', '#ffffff');
            root.style.setProperty('--theme-text', '#000000');
        }
    }

    // Listener para mudanças na preferência de cor
    function setupColorSchemeListener() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        mediaQuery.addEventListener('change', function(e) {
            detectColorScheme();
        });
    }

    // Inicializar quando o DOM estiver pronto
    function init() {
        const browser = detectBrowser();
        applyBrowserSpecificTheme(browser);
        detectColorScheme();
        setupColorSchemeListener();

        // Log para debug (remover em produção)
        console.log('🌐 Browser detected:', browser);
        console.log('🎨 Theme compatibility applied');
    }

    // Executar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
