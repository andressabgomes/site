/**
 * WebGL System - Sistema Principal de Renderização
 * Integra todos os componentes WebGL e gerencia a renderização
 */

class WebGLSystem {
    constructor() {
        this.canvas = null;
        this.gl = null;
        this.particleManager = null;
        this.geometryRenderer = null;
        this.postProcessor = null;
        this.isActive = false;
        this.time = 0;
        this.lastTime = 0;

        this.settings = {
            enableParticles: true,
            enableGeometry: true,
            enablePostProcessing: true,
            particleCount: 1000,
            blurStrength: 0.5,
            bloomIntensity: 1.2,
            distortionStrength: 0.3
        };

        this.init();
    }

    init() {
        this.createCanvas();
        this.initWebGL();
        this.createComponents();
        this.bindEvents();
        this.start();
    }

    createCanvas() {
        // Criar canvas WebGL principal
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'webgl-system-canvas';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '2';
        this.canvas.style.opacity = '0.4';

        // Adicionar ao body
        document.body.appendChild(this.canvas);

        // Configurar tamanho
        this.resize();
    }

    initWebGL() {
        this.gl = this.canvas.getContext('webgl2') || this.canvas.getContext('webgl');

        if (!this.gl) {
            console.warn('WebGL não suportado, sistema desabilitado');
            return;
        }

        // Configurações do WebGL
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.gl.clearColor(0.0, 0.0, 0.0, 0.0);

        console.log('🚀 WebGL System inicializado');
    }

    createComponents() {
        if (!this.gl) return;

        // Criar componentes
        if (this.settings.enableParticles) {
            this.particleManager = new WebGLManager();
        }

        if (this.settings.enableGeometry) {
            this.geometryRenderer = new GeometryRenderer(this.gl);
        }

        if (this.settings.enablePostProcessing) {
            this.postProcessor = new PostProcessor(this.gl, this.canvas.width, this.canvas.height);
        }
    }

    bindEvents() {
        // Resize
        window.addEventListener('resize', () => this.resize());

        // Performance toggle
        document.addEventListener('keydown', (e) => {
            if (e.key === 'p' || e.key === 'P') {
                this.togglePerformance();
            }
        });

        // Scroll para efeitos de parallax
        window.addEventListener('scroll', () => {
            this.updateScrollEffects();
        });
    }

    resize() {
        this.canvas.width = window.innerWidth * window.devicePixelRatio;
        this.canvas.height = window.innerHeight * window.devicePixelRatio;
        this.canvas.style.width = window.innerWidth + 'px';
        this.canvas.style.height = window.innerHeight + 'px';

        if (this.gl) {
            this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        }

        if (this.postProcessor) {
            this.postProcessor.resize(this.canvas.width, this.canvas.height);
        }
    }

    render() {
        if (!this.gl) return;

        const currentTime = performance.now();
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        this.time += deltaTime;

        // Iniciar renderização com pós-processamento
        if (this.postProcessor) {
            this.postProcessor.beginRender();
        }

        // Limpar buffer
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        // Renderizar partículas
        if (this.particleManager && this.settings.enableParticles) {
            this.particleManager.render();
        }

        // Renderizar geometrias 3D
        if (this.geometryRenderer && this.settings.enableGeometry) {
            this.renderGeometries();
        }

        // Finalizar renderização com pós-processamento
        if (this.postProcessor) {
            this.postProcessor.endRender();

            // Aplicar efeitos de pós-processamento
            let processedTexture = this.postProcessor.colorTexture;

            if (this.settings.blurStrength > 0) {
                processedTexture = this.postProcessor.applyBlur(processedTexture, this.settings.blurStrength);
            }

            if (this.settings.bloomIntensity > 0) {
                processedTexture = this.postProcessor.applyBloom(processedTexture, 0.8, this.settings.bloomIntensity);
            }

            if (this.settings.distortionStrength > 0) {
                processedTexture = this.postProcessor.applyDistortion(processedTexture, this.settings.distortionStrength, this.time);
            }

            // Renderizar resultado final
            this.postProcessor.renderToScreen(processedTexture);
        }
    }

    renderGeometries() {
        if (!this.geometryRenderer) return;

        // Criar matrizes de projeção e modelo-visão
        const aspect = this.canvas.width / this.canvas.height;
        const projectionMatrix = this.createPerspectiveMatrix(45, aspect, 0.1, 100);

        // Renderizar cubos flutuantes
        for (let i = 0; i < 5; i++) {
            const modelViewMatrix = this.createModelViewMatrix(
                Math.sin(this.time * 0.001 + i) * 3,
                Math.cos(this.time * 0.001 + i * 0.5) * 2,
                -5 - i * 2,
                this.time * 0.001 + i,
                this.time * 0.002 + i
            );

            const cube = this.geometryRenderer.createCube();
            this.geometryRenderer.renderGeometry(cube, modelViewMatrix, projectionMatrix);
        }

        // Renderizar esferas
        for (let i = 0; i < 3; i++) {
            const modelViewMatrix = this.createModelViewMatrix(
                Math.cos(this.time * 0.001 + i) * 4,
                Math.sin(this.time * 0.001 + i * 0.7) * 3,
                -8 - i * 3,
                0,
                this.time * 0.001 + i * 0.5
            );

            const sphere = this.geometryRenderer.createSphere(0.5, 16);
            this.geometryRenderer.renderGeometry(sphere, modelViewMatrix, projectionMatrix);
        }

        // Atualizar tempo do renderizador de geometria
        this.geometryRenderer.update(deltaTime);
    }

    createPerspectiveMatrix(fov, aspect, near, far) {
        const f = Math.tan(Math.PI * 0.5 - 0.5 * fov * Math.PI / 180);
        const rangeInv = 1.0 / (near - far);

        return new Float32Array([
            f / aspect, 0, 0, 0,
            0, f, 0, 0,
            0, 0, (near + far) * rangeInv, -1,
            0, 0, near * far * rangeInv * 2, 0
        ]);
    }

    createModelViewMatrix(x, y, z, rotX, rotY) {
        const matrix = new Float32Array(16);

        // Matriz de translação
        const translationMatrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            x, y, z, 1
        ];

        // Matriz de rotação X
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const rotationXMatrix = [
            1, 0, 0, 0,
            0, cosX, sinX, 0,
            0, -sinX, cosX, 0,
            0, 0, 0, 1
        ];

        // Matriz de rotação Y
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const rotationYMatrix = [
            cosY, 0, -sinY, 0,
            0, 1, 0, 0,
            sinY, 0, cosY, 0,
            0, 0, 0, 1
        ];

        // Multiplicar matrizes (simplificado)
        this.multiplyMatrices(translationMatrix, rotationXMatrix, matrix);
        this.multiplyMatrices(matrix, rotationYMatrix, matrix);

        return matrix;
    }

    multiplyMatrices(a, b, result) {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                result[i * 4 + j] =
                    a[i * 4 + 0] * b[0 * 4 + j] +
                    a[i * 4 + 1] * b[1 * 4 + j] +
                    a[i * 4 + 2] * b[2 * 4 + j] +
                    a[i * 4 + 3] * b[3 * 4 + j];
            }
        }
    }

    updateScrollEffects() {
        const scrollY = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const scrollProgress = scrollY / maxScroll;

        // Ajustar intensidade dos efeitos baseado no scroll
        if (this.settings.enablePostProcessing) {
            this.settings.blurStrength = 0.5 + scrollProgress * 0.5;
            this.settings.bloomIntensity = 1.2 + scrollProgress * 0.8;
            this.settings.distortionStrength = 0.3 + scrollProgress * 0.4;
        }
    }

    togglePerformance() {
        this.settings.enableParticles = !this.settings.enableParticles;
        this.settings.enableGeometry = !this.settings.enableGeometry;
        this.settings.enablePostProcessing = !this.settings.enablePostProcessing;

        console.log('⚡ Performance mode:', {
            particles: this.settings.enableParticles,
            geometry: this.settings.enableGeometry,
            postProcessing: this.settings.enablePostProcessing
        });
    }

    animate() {
        if (!this.isActive) return;

        this.render();
        requestAnimationFrame(() => this.animate());
    }

    start() {
        this.isActive = true;
        this.lastTime = performance.now();
        this.animate();
        console.log('🎬 WebGL System iniciado');
    }

    stop() {
        this.isActive = false;
        console.log('⏹️ WebGL System parado');
    }

    destroy() {
        this.stop();

        if (this.particleManager) {
            this.particleManager.destroy();
        }

        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }

        console.log('🗑️ WebGL System destruído');
    }

    // Métodos para controle externo
    setParticleCount(count) {
        this.settings.particleCount = count;
        if (this.particleManager) {
            this.particleManager.particleCount = count;
            this.particleManager.createParticles();
        }
    }

    setBlurStrength(strength) {
        this.settings.blurStrength = strength;
    }

    setBloomIntensity(intensity) {
        this.settings.bloomIntensity = intensity;
    }

    setDistortionStrength(strength) {
        this.settings.distortionStrength = strength;
    }
}

// Exportar para uso global
window.WebGLSystem = WebGLSystem;
