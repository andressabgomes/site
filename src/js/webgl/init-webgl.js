/**
 * WebGL Initialization - Inicialização do Sistema WebGL
 * Carrega e configura todos os componentes WebGL
 */

(function() {
    'use strict';

    let webglSystem = null;
    let isInitialized = false;

    // Configurações de performance
    const performanceConfig = {
        low: {
            particleCount: 500,
            enableGeometry: false,
            enablePostProcessing: false,
            blurStrength: 0,
            bloomIntensity: 0,
            distortionStrength: 0
        },
        medium: {
            particleCount: 1000,
            enableGeometry: true,
            enablePostProcessing: true,
            blurStrength: 0.3,
            bloomIntensity: 1.0,
            distortionStrength: 0.2
        },
        high: {
            particleCount: 2000,
            enableGeometry: true,
            enablePostProcessing: true,
            blurStrength: 0.5,
            bloomIntensity: 1.2,
            distortionStrength: 0.3
        }
    };

    // Detectar performance do dispositivo
    function detectPerformance() {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

        if (!gl) {
            console.warn('WebGL não suportado');
            return 'low';
        }

        // Verificar extensões e capacidades
        const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
        const maxRenderbufferSize = gl.getParameter(gl.MAX_RENDERBUFFER_SIZE);
        const maxViewportDims = gl.getParameter(gl.MAX_VIEWPORT_DIMS);

        // Verificar se é dispositivo móvel
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        // Verificar memória disponível (aproximação)
        const memoryInfo = navigator.deviceMemory || 4; // GB

        // Determinar nível de performance
        if (isMobile || memoryInfo < 4 || maxTextureSize < 2048) {
            return 'low';
        } else if (memoryInfo >= 8 && maxTextureSize >= 4096) {
            return 'high';
        } else {
            return 'medium';
        }
    }

    // Inicializar sistema WebGL
    function initWebGL() {
        if (isInitialized) {
            console.warn('WebGL já foi inicializado');
            return;
        }

        try {
            // Detectar performance
            const performanceLevel = detectPerformance();
            console.log(`🎯 Performance level: ${performanceLevel}`);

            // Aguardar carregamento da página
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    createWebGLSystem(performanceLevel);
                });
            } else {
                createWebGLSystem(performanceLevel);
            }

        } catch (error) {
            console.error('❌ Erro ao inicializar WebGL:', error);
        }
    }

    // Criar sistema WebGL
    function createWebGLSystem(performanceLevel) {
        // Aguardar um pouco para garantir que a página carregou
        setTimeout(() => {
            try {
                webglSystem = new WebGLSystem();

                // Aplicar configurações de performance
                const config = performanceConfig[performanceLevel];
                if (config) {
                    webglSystem.settings.particleCount = config.particleCount;
                    webglSystem.settings.enableGeometry = config.enableGeometry;
                    webglSystem.settings.enablePostProcessing = config.enablePostProcessing;
                    webglSystem.settings.blurStrength = config.blurStrength;
                    webglSystem.settings.bloomIntensity = config.bloomIntensity;
                    webglSystem.settings.distortionStrength = config.distortionStrength;
                }

                isInitialized = true;
                console.log('✅ WebGL System criado com sucesso');

                // Adicionar controles de debug
                addDebugControls();

            } catch (error) {
                console.error('❌ Erro ao criar WebGL System:', error);
            }
        }, 1000);
    }

    // Adicionar controles de debug
    function addDebugControls() {
        // Criar painel de debug
        const debugPanel = document.createElement('div');
        debugPanel.id = 'webgl-debug-panel';
        debugPanel.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 15px;
            border-radius: 8px;
            font-family: 'Inter', sans-serif;
            font-size: 12px;
            z-index: 1000;
            min-width: 200px;
            display: none;
        `;

        debugPanel.innerHTML = `
            <h4 style="margin: 0 0 10px 0; color: #00ccff;">WebGL Debug</h4>
            <div style="margin-bottom: 8px;">
                <label>Partículas: <input type="range" id="particle-count" min="100" max="3000" value="1000" style="width: 100px;"></label>
                <span id="particle-count-value">1000</span>
            </div>
            <div style="margin-bottom: 8px;">
                <label>Blur: <input type="range" id="blur-strength" min="0" max="2" step="0.1" value="0.5" style="width: 100px;"></label>
                <span id="blur-strength-value">0.5</span>
            </div>
            <div style="margin-bottom: 8px;">
                <label>Bloom: <input type="range" id="bloom-intensity" min="0" max="3" step="0.1" value="1.2" style="width: 100px;"></label>
                <span id="bloom-intensity-value">1.2</span>
            </div>
            <div style="margin-bottom: 8px;">
                <label>Distorção: <input type="range" id="distortion-strength" min="0" max="1" step="0.1" value="0.3" style="width: 100px;"></label>
                <span id="distortion-strength-value">0.3</span>
            </div>
            <div style="margin-top: 10px;">
                <button id="toggle-performance" style="background: #00ccff; color: black; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; margin-right: 5px;">Toggle Performance</button>
                <button id="reset-settings" style="background: #ff6b35; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Reset</button>
            </div>
        `;

        document.body.appendChild(debugPanel);

        // Event listeners para controles
        document.getElementById('particle-count').addEventListener('input', (e) => {
            const count = parseInt(e.target.value);
            document.getElementById('particle-count-value').textContent = count;
            if (webglSystem) {
                webglSystem.setParticleCount(count);
            }
        });

        document.getElementById('blur-strength').addEventListener('input', (e) => {
            const strength = parseFloat(e.target.value);
            document.getElementById('blur-strength-value').textContent = strength;
            if (webglSystem) {
                webglSystem.setBlurStrength(strength);
            }
        });

        document.getElementById('bloom-intensity').addEventListener('input', (e) => {
            const intensity = parseFloat(e.target.value);
            document.getElementById('bloom-intensity-value').textContent = intensity;
            if (webglSystem) {
                webglSystem.setBloomIntensity(intensity);
            }
        });

        document.getElementById('distortion-strength').addEventListener('input', (e) => {
            const strength = parseFloat(e.target.value);
            document.getElementById('distortion-strength-value').textContent = strength;
            if (webglSystem) {
                webglSystem.setDistortionStrength(strength);
            }
        });

        document.getElementById('toggle-performance').addEventListener('click', () => {
            if (webglSystem) {
                webglSystem.togglePerformance();
            }
        });

        document.getElementById('reset-settings').addEventListener('click', () => {
            if (webglSystem) {
                webglSystem.settings = {
                    enableParticles: true,
                    enableGeometry: true,
                    enablePostProcessing: true,
                    particleCount: 1000,
                    blurStrength: 0.5,
                    bloomIntensity: 1.2,
                    distortionStrength: 0.3
                };

                // Resetar controles
                document.getElementById('particle-count').value = 1000;
                document.getElementById('particle-count-value').textContent = '1000';
                document.getElementById('blur-strength').value = 0.5;
                document.getElementById('blur-strength-value').textContent = '0.5';
                document.getElementById('bloom-intensity').value = 1.2;
                document.getElementById('bloom-intensity-value').textContent = '1.2';
                document.getElementById('distortion-strength').value = 0.3;
                document.getElementById('distortion-strength-value').textContent = '0.3';
            }
        });

        // Toggle painel com tecla D
        document.addEventListener('keydown', (e) => {
            if (e.key === 'd' || e.key === 'D') {
                debugPanel.style.display = debugPanel.style.display === 'none' ? 'block' : 'none';
            }
        });
    }

    // Verificar se WebGL é suportado
    function checkWebGLSupport() {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

        if (!gl) {
            console.warn('⚠️ WebGL não é suportado neste navegador');
            return false;
        }

        // Verificar extensões necessárias
        const extensions = [
            'OES_standard_derivatives',
            'OES_element_index_uint',
            'WEBGL_depth_texture'
        ];

        for (const ext of extensions) {
            if (!gl.getExtension(ext)) {
                console.warn(`⚠️ Extensão WebGL não suportada: ${ext}`);
            }
        }

        return true;
    }

    // Função pública para inicializar
    window.initWebGLSystem = function() {
        if (checkWebGLSupport()) {
            initWebGL();
        }
    };

    // Função pública para destruir
    window.destroyWebGLSystem = function() {
        if (webglSystem) {
            webglSystem.destroy();
            webglSystem = null;
            isInitialized = false;
        }
    };

    // Auto-inicializar quando o script for carregado
    if (checkWebGLSupport()) {
        // Aguardar carregamento dos outros scripts WebGL
        setTimeout(() => {
            if (window.WebGLSystem) {
                initWebGL();
            } else {
                console.warn('⚠️ WebGLSystem não encontrado, aguardando...');
                // Tentar novamente após um delay
                setTimeout(initWebGL, 2000);
            }
        }, 100);
    }

})();
