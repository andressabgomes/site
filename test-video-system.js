/**
 * Teste do Sistema de Vídeo MP4
 * Verifica se todos os componentes estão funcionando
 */

console.log('🧪 Iniciando testes do sistema de vídeo...');

// Teste 1: Verificar se os scripts foram carregados
function testScriptsLoaded() {
    console.log('📋 Teste 1: Verificando scripts...');

    const scripts = [
        'VideoPlayer',
        'VideoUploadManager'
    ];

    let allLoaded = true;

    scripts.forEach(script => {
        if (window[script]) {
            console.log(`✅ ${script} carregado`);
        } else {
            console.log(`❌ ${script} não encontrado`);
            allLoaded = false;
        }
    });

    return allLoaded;
}

// Teste 2: Verificar se os elementos HTML existem
function testHTMLElements() {
    console.log('📋 Teste 2: Verificando elementos HTML...');

    const elements = [
        'custom-video-container',
        'video-upload'
    ];

    let allExist = true;

    elements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            console.log(`✅ Elemento #${id} encontrado`);
        } else {
            console.log(`❌ Elemento #${id} não encontrado`);
            allExist = false;
        }
    });

    return allExist;
}

// Teste 3: Verificar se os estilos CSS foram aplicados
function testCSSStyles() {
    console.log('📋 Teste 3: Verificando estilos CSS...');

    const container = document.getElementById('custom-video-container');
    if (!container) {
        console.log('❌ Container não encontrado para teste de CSS');
        return false;
    }

    const styles = window.getComputedStyle(container);
    const hasVideoStyles = styles.position === 'relative' && styles.borderRadius === '12px';

    if (hasVideoStyles) {
        console.log('✅ Estilos CSS aplicados corretamente');
        return true;
    } else {
        console.log('❌ Estilos CSS não aplicados');
        return false;
    }
}

// Teste 4: Verificar funcionalidade de upload
function testUploadFunctionality() {
    console.log('📋 Teste 4: Verificando funcionalidade de upload...');

    if (window.videoUploadManager && window.videoUploadManager.isInitialized) {
        console.log('✅ VideoUploadManager inicializado');

        // Testar validação de arquivo
        const mockFile = {
            type: 'video/mp4',
            size: 1024 * 1024, // 1MB
            name: 'test.mp4'
        };

        const isValid = window.videoUploadManager.isValidVideoFile(mockFile);
        if (isValid) {
            console.log('✅ Validação de arquivo funcionando');
        } else {
            console.log('❌ Validação de arquivo falhou');
        }

        return isValid;
    } else {
        console.log('❌ VideoUploadManager não inicializado');
        return false;
    }
}

// Teste 5: Verificar player de vídeo
function testVideoPlayer() {
    console.log('📋 Teste 5: Verificando player de vídeo...');

    if (window.videoPlayer && window.videoPlayer.isInitialized) {
        console.log('✅ VideoPlayer inicializado');

        // Verificar métodos disponíveis
        const methods = ['playVideo', 'pauseVideo', 'toggleFullscreen', 'formatTime'];
        let allMethodsExist = true;

        methods.forEach(method => {
            if (typeof window.videoPlayer[method] === 'function') {
                console.log(`✅ Método ${method} disponível`);
            } else {
                console.log(`❌ Método ${method} não encontrado`);
                allMethodsExist = false;
            }
        });

        return allMethodsExist;
    } else {
        console.log('❌ VideoPlayer não inicializado');
        return false;
    }
}

// Teste 6: Verificar drag and drop
function testDragAndDrop() {
    console.log('📋 Teste 6: Verificando drag and drop...');

    const container = document.getElementById('custom-video-container');
    if (!container) {
        console.log('❌ Container não encontrado para teste de drag and drop');
        return false;
    }

    const placeholder = container.querySelector('.video-placeholder');
    if (placeholder) {
        console.log('✅ Área de drag and drop encontrada');
        return true;
    } else {
        console.log('❌ Área de drag and drop não encontrada');
        return false;
    }
}

// Executar todos os testes
function runAllTests() {
    console.log('🚀 Executando todos os testes...\n');

    const tests = [
        testScriptsLoaded,
        testHTMLElements,
        testCSSStyles,
        testUploadFunctionality,
        testVideoPlayer,
        testDragAndDrop
    ];

    let passedTests = 0;
    const totalTests = tests.length;

    tests.forEach((test, index) => {
        console.log(`\n--- Teste ${index + 1} ---`);
        const result = test();
        if (result) {
            passedTests++;
        }
    });

    console.log('\n📊 Resultados dos Testes:');
    console.log(`✅ Testes aprovados: ${passedTests}/${totalTests}`);
    console.log(`❌ Testes falharam: ${totalTests - passedTests}/${totalTests}`);

    if (passedTests === totalTests) {
        console.log('🎉 Todos os testes passaram! O sistema de vídeo está funcionando perfeitamente.');
    } else {
        console.log('⚠️ Alguns testes falharam. Verifique os logs acima.');
    }

    return passedTests === totalTests;
}

// Executar testes quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(runAllTests, 1000); // Aguardar inicialização dos scripts
    });
} else {
    setTimeout(runAllTests, 1000);
}

// Exportar para uso global
window.testVideoSystem = runAllTests;
