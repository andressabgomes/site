/**
 * Firefox Theme Color Fix
 * Solução para o erro: 'meta[name=theme-color]' não suportado pelo Firefox
 * Aplica configurações de tema programaticamente para Firefox
 */

(function() {
    'use strict';

    // Detecta se é Firefox
    function isFirefox() {
        return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    }

    // Detecta se é Firefox Mobile
    function isFirefoxMobile() {
        return isFirefox() && /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // Remove meta tags theme-color problemáticas no Firefox
    function removeThemeColorMetaTags() {
        if (!isFirefox()) return;

        // Remove todas as meta tags theme-color
        const themeColorMetaTags = document.querySelectorAll('meta[name="theme-color"]');
        themeColorMetaTags.forEach(tag => {
            console.log('🗑️ Removendo meta[name=theme-color] para compatibilidade com Firefox');
            tag.remove();
        });

        // Remove meta tags browser-theme-color também
        const browserThemeColorTags = document.querySelectorAll('meta[name="browser-theme-color"]');
        browserThemeColorTags.forEach(tag => {
            console.log('🗑️ Removendo meta[name=browser-theme-color] para compatibilidade com Firefox');
            tag.remove();
        });
    }

    // Aplica tema para Firefox
    function applyFirefoxTheme() {
        if (!isFirefox()) return;

        const themeColor = '#000000';

        // Aplica cor de fundo ao documento
        document.documentElement.style.backgroundColor = themeColor;
        document.body.style.backgroundColor = themeColor;

        // Define variáveis CSS customizadas
        document.documentElement.style.setProperty('--firefox-theme-color', themeColor);
        document.documentElement.style.setProperty('--firefox-background', themeColor);

        // Para Firefox Mobile, aplica configurações específicas
        if (isFirefoxMobile()) {
            document.documentElement.style.setProperty('--firefox-mobile-theme', themeColor);

            // Aplica configurações específicas para mobile
            const viewport = document.querySelector('meta[name="viewport"]');
            if (viewport) {
                viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, user-scalable=no');
            }
        }

        // Aplica configurações para PWA
        if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
            document.documentElement.style.setProperty('--firefox-pwa-theme', themeColor);
        }

        console.log('🎨 Firefox theme applied successfully');
    }

    // Aplica tema baseado no esquema de cores do sistema
    function applySystemTheme() {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const themeColor = '#000000'; // Mantém o tema escuro para consistência

        document.documentElement.style.setProperty('--system-theme-color', themeColor);
        document.documentElement.style.setProperty('--prefers-color-scheme', prefersDark ? 'dark' : 'light');
    }

    // Inicializa quando o DOM estiver pronto
    function init() {
        // Remove meta tags problemáticas primeiro
        removeThemeColorMetaTags();

        // Aplica tema para Firefox
        applyFirefoxTheme();
        applySystemTheme();

        // Observa mudanças no esquema de cores do sistema
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applySystemTheme);
        }

        // Aplica tema quando a página carrega completamente
        window.addEventListener('load', function() {
            setTimeout(applyFirefoxTheme, 100);
        });
    }

    // Executa imediatamente se o DOM já estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Exporta funções para uso global se necessário
    window.FirefoxThemeFix = {
        isFirefox: isFirefox,
        isFirefoxMobile: isFirefoxMobile,
        removeThemeColorMetaTags: removeThemeColorMetaTags,
        applyTheme: applyFirefoxTheme,
        applySystemTheme: applySystemTheme
    };

})();
