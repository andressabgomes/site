/**
 * Teste de Compatibilidade de Theme Color
 * Verifica se a solução para Firefox e Opera está funcionando
 */

(function() {
    'use strict';

    console.log('🧪 Iniciando teste de compatibilidade de theme color...');

    // Funções de detecção de navegador
    function detectFirefox() {
        const ua = navigator.userAgent.toLowerCase();
        return ua.indexOf('firefox') > -1 ||
               ua.indexOf('fxios') > -1 ||
               ua.indexOf('fennec') > -1;
    }

    function detectOpera() {
        const ua = navigator.userAgent.toLowerCase();
        return ua.indexOf('opera') > -1 ||
               ua.indexOf('opr') > -1 ||
               ua.indexOf('opera mini') > -1 ||
               ua.indexOf('opera mobi') > -1;
    }

    function detectChrome() {
        const ua = navigator.userAgent.toLowerCase();
        return ua.indexOf('chrome') > -1 && !ua.indexOf('edg') > -1;
    }

    function detectSafari() {
        const ua = navigator.userAgent.toLowerCase();
        return ua.indexOf('safari') > -1 && !ua.indexOf('chrome') > -1;
    }

    function detectEdge() {
        const ua = navigator.userAgent.toLowerCase();
        return ua.indexOf('edg') > -1;
    }

    // Detecta o navegador atual
    const currentBrowser = {
        firefox: detectFirefox(),
        opera: detectOpera(),
        chrome: detectChrome(),
        safari: detectSafari(),
        edge: detectEdge()
    };

    console.log('🌐 Navegador detectado:', Object.keys(currentBrowser).find(key => currentBrowser[key]));

    // Verifica se as meta tags problemáticas foram removidas
    function checkMetaTags() {
        const themeColorTags = document.querySelectorAll('meta[name="theme-color"]');
        const browserThemeTags = document.querySelectorAll('meta[name="browser-theme-color"]');

        console.log('📋 Verificando meta tags:');
        console.log(`   - meta[name="theme-color"]: ${themeColorTags.length} encontradas`);
        console.log(`   - meta[name="browser-theme-color"]: ${browserThemeTags.length} encontradas`);

        if (currentBrowser.firefox || currentBrowser.opera) {
            if (themeColorTags.length === 0 && browserThemeTags.length === 0) {
                console.log('✅ Meta tags problemáticas removidas corretamente');
                return true;
            } else {
                console.log('❌ Meta tags problemáticas ainda presentes');
                return false;
            }
        } else {
            console.log('ℹ️ Navegador suporta theme-color - meta tags devem estar presentes');
            return true;
        }
    }

    // Verifica se as classes CSS foram aplicadas
    function checkCSSClasses() {
        const html = document.documentElement;
        const hasNoThemeSupport = html.classList.contains('no-theme-color-support');
        const hasFirefoxClass = html.classList.contains('firefox-browser');
        const hasOperaClass = html.classList.contains('opera-browser');

        console.log('🎨 Verificando classes CSS:');
        console.log(`   - no-theme-color-support: ${hasNoThemeSupport}`);
        console.log(`   - firefox-browser: ${hasFirefoxClass}`);
        console.log(`   - opera-browser: ${hasOperaClass}`);

        if (currentBrowser.firefox || currentBrowser.opera) {
            if (hasNoThemeSupport) {
                console.log('✅ Classe de compatibilidade aplicada corretamente');
                return true;
            } else {
                console.log('❌ Classe de compatibilidade não aplicada');
                return false;
            }
        } else {
            console.log('ℹ️ Navegador não requer classes de compatibilidade');
            return true;
        }
    }

    // Verifica se o gerenciador de compatibilidade está funcionando
    function checkCompatibilityManager() {
        if (window.themeCompatibilityManager) {
            console.log('✅ Gerenciador de compatibilidade carregado');
            console.log(`   - Firefox detectado: ${window.themeCompatibilityManager.isFirefox}`);
            console.log(`   - Opera detectado: ${window.themeCompatibilityManager.isOpera}`);
            console.log(`   - Navegador sem suporte: ${window.themeCompatibilityManager.isUnsupportedBrowser}`);
            return true;
        } else {
            console.log('❌ Gerenciador de compatibilidade não encontrado');
            return false;
        }
    }

    // Verifica se os estilos CSS estão sendo aplicados
    function checkCSSStyles() {
        const html = document.documentElement;
        const computedStyle = window.getComputedStyle(html);

        console.log('🎨 Verificando estilos CSS aplicados:');
        console.log(`   - color-scheme: ${computedStyle.getPropertyValue('color-scheme')}`);

        // Verifica se as variáveis CSS estão definidas
        const themeColor = getComputedStyle(document.documentElement).getPropertyValue('--fallback-theme-color');
        console.log(`   - --fallback-theme-color: ${themeColor}`);

        if (currentBrowser.firefox || currentBrowser.opera) {
            if (themeColor.trim() !== '') {
                console.log('✅ Variáveis CSS de fallback aplicadas');
                return true;
            } else {
                console.log('❌ Variáveis CSS de fallback não aplicadas');
                return false;
            }
        } else {
            console.log('ℹ️ Navegador não requer fallbacks CSS');
            return true;
        }
    }

    // Executa todos os testes
    function runTests() {
        console.log('\n🧪 Executando testes de compatibilidade...\n');

        const tests = [
            { name: 'Meta Tags', fn: checkMetaTags },
            { name: 'CSS Classes', fn: checkCSSClasses },
            { name: 'Compatibility Manager', fn: checkCompatibilityManager },
            { name: 'CSS Styles', fn: checkCSSStyles }
        ];

        let passedTests = 0;
        let totalTests = tests.length;

        tests.forEach(test => {
            console.log(`\n📋 Teste: ${test.name}`);
            console.log('─'.repeat(50));

            try {
                const result = test.fn();
                if (result) {
                    passedTests++;
                    console.log(`✅ ${test.name}: PASSOU`);
                } else {
                    console.log(`❌ ${test.name}: FALHOU`);
                }
            } catch (error) {
                console.log(`❌ ${test.name}: ERRO - ${error.message}`);
            }
        });

        console.log('\n📊 Resultado dos Testes');
        console.log('─'.repeat(50));
        console.log(`✅ Testes passados: ${passedTests}/${totalTests}`);

        if (passedTests === totalTests) {
            console.log('🎉 Todos os testes passaram! A solução está funcionando corretamente.');
        } else {
            console.log('⚠️ Alguns testes falharam. Verifique a implementação.');
        }
    }

    // Executa os testes quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runTests);
    } else {
        runTests();
    }

    // Executa novamente após um delay para garantir que todos os scripts carregaram
    setTimeout(runTests, 1000);

})();
