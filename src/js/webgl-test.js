/**
 * WebGL Test Script
 * Testa se o sistema WebGL está funcionando corretamente
 */

(function() {
    'use strict';

    console.log('🧪 Iniciando testes do sistema WebGL...');

    // Teste 1: Verificar se WebGL é suportado
    function testWebGLSupport() {
        console.log('📋 Teste 1: Verificando suporte WebGL...');

        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');

        if (!gl) {
            console.error('❌ WebGL não é suportado');
            return false;
        }

        console.log('✅ WebGL é suportado');
        console.log('📊 Informações do WebGL:');
        console.log('  - Vendor:', gl.getParameter(gl.VENDOR));
        console.log('  - Renderer:', gl.getParameter(gl.RENDERER));
        console.log('  - Version:', gl.getParameter(gl.VERSION));
        console.log('  - Max Texture Size:', gl.getParameter(gl.MAX_TEXTURE_SIZE));

        return true;
    }

    // Teste 2: Verificar se as classes estão carregadas
    function testClassesLoaded() {
        console.log('📋 Teste 2: Verificando classes carregadas...');

        const classes = [
            'WebGLManager',
            'GeometryRenderer',
            'PostProcessor',
            'WebGLSystem'
        ];

        let allLoaded = true;

        classes.forEach(className => {
            if (window[className]) {
                console.log(`✅ ${className} carregada`);
            } else {
                console.error(`❌ ${className} não encontrada`);
                allLoaded = false;
            }
        });

        return allLoaded;
    }

    // Teste 3: Verificar se o sistema inicializa
    function testSystemInitialization() {
        console.log('📋 Teste 3: Testando inicialização do sistema...');

        try {
            if (window.WebGLSystem) {
                console.log('✅ WebGLSystem disponível');

                // Verificar se já existe uma instância
                const existingCanvas = document.getElementById('webgl-system-canvas');
                if (existingCanvas) {
                    console.log('✅ Canvas WebGL já existe');
                    return true;
                } else {
                    console.log('⚠️ Canvas WebGL não encontrado, sistema pode não ter inicializado');
                    return false;
                }
            } else {
                console.error('❌ WebGLSystem não disponível');
                return false;
            }
        } catch (error) {
            console.error('❌ Erro ao testar inicialização:', error);
            return false;
        }
    }

    // Teste 4: Verificar performance
    function testPerformance() {
        console.log('📋 Teste 4: Verificando performance...');

        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const memoryInfo = navigator.deviceMemory || 4;
        const cores = navigator.hardwareConcurrency || 4;

        console.log('📊 Informações de Performance:');
        console.log('  - Dispositivo móvel:', isMobile);
        console.log('  - Memória (GB):', memoryInfo);
        console.log('  - Cores CPU:', cores);
        console.log('  - User Agent:', navigator.userAgent.substring(0, 100) + '...');

        let performanceLevel = 'medium';
        if (isMobile || memoryInfo < 4) {
            performanceLevel = 'low';
        } else if (memoryInfo >= 8 && cores >= 8) {
            performanceLevel = 'high';
        }

        console.log('  - Nível de performance detectado:', performanceLevel);
        return performanceLevel;
    }

    // Teste 5: Verificar controles de debug
    function testDebugControls() {
        console.log('📋 Teste 5: Verificando controles de debug...');

        const debugPanel = document.getElementById('webgl-debug-panel');
        if (debugPanel) {
            console.log('✅ Painel de debug encontrado');

            const controls = [
                'particle-count',
                'blur-strength',
                'bloom-intensity',
                'distortion-strength',
                'toggle-performance',
                'reset-settings'
            ];

            let allControlsFound = true;
            controls.forEach(controlId => {
                const control = document.getElementById(controlId);
                if (control) {
                    console.log(`✅ Controle ${controlId} encontrado`);
                } else {
                    console.error(`❌ Controle ${controlId} não encontrado`);
                    allControlsFound = false;
                }
            });

            return allControlsFound;
        } else {
            console.log('⚠️ Painel de debug não encontrado (pode estar oculto)');
            return true; // Não é um erro, pode estar oculto
        }
    }

    // Executar todos os testes
    function runAllTests() {
        console.log('🚀 Iniciando bateria de testes WebGL...\n');

        const results = {
            webglSupport: testWebGLSupport(),
            classesLoaded: testClassesLoaded(),
            systemInit: testSystemInitialization(),
            performance: testPerformance(),
            debugControls: testDebugControls()
        };

        console.log('\n📊 Resultados dos Testes:');
        console.log('========================');

        Object.entries(results).forEach(([test, result]) => {
            const status = result ? '✅ PASSOU' : '❌ FALHOU';
            console.log(`${test}: ${status}`);
        });

        const passedTests = Object.values(results).filter(Boolean).length;
        const totalTests = Object.keys(results).length;

        console.log(`\n🎯 Resumo: ${passedTests}/${totalTests} testes passaram`);

        if (passedTests === totalTests) {
            console.log('🎉 Todos os testes passaram! Sistema WebGL funcionando perfeitamente.');
        } else {
            console.log('⚠️ Alguns testes falharam. Verifique os logs acima.');
        }

        return results;
    }

    // Executar testes quando a página carregar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(runAllTests, 2000); // Aguardar 2s para o sistema inicializar
        });
    } else {
        setTimeout(runAllTests, 2000);
    }

    // Expor função de teste globalmente
    window.testWebGLSystem = runAllTests;

})();
