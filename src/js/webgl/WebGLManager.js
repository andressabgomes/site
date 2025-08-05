/**
 * WebGL Manager - Sistema de Renderização 3D
 * Gerencia partículas, efeitos visuais e interações WebGL
 */

class WebGLManager {
    constructor() {
        this.canvas = null;
        this.gl = null;
        this.program = null;
        this.particles = [];
        this.particleCount = 1000;
        this.isActive = false;
        this.mouse = { x: 0, y: 0 };
        this.time = 0;

        this.init();
    }

    init() {
        this.createCanvas();
        this.initWebGL();
        this.createShaders();
        this.createParticles();
        this.bindEvents();
        this.start();
    }

    createCanvas() {
        // Criar canvas WebGL
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'webgl-canvas';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        this.canvas.style.opacity = '0.3';

        // Adicionar ao body
        document.body.appendChild(this.canvas);

        // Configurar tamanho
        this.resize();
    }

    initWebGL() {
        this.gl = this.canvas.getContext('webgl2') || this.canvas.getContext('webgl');

        if (!this.gl) {
            console.warn('WebGL não suportado, usando fallback');
            return;
        }

        // Configurações do WebGL
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        this.gl.clearColor(0.0, 0.0, 0.0, 0.0);
    }

    createShaders() {
        const vertexShaderSource = `
            attribute vec2 a_position;
            attribute vec2 a_velocity;
            attribute float a_size;
            attribute float a_life;

            uniform vec2 u_resolution;
            uniform float u_time;
            uniform vec2 u_mouse;

            varying float v_life;
            varying vec2 v_position;

            void main() {
                // Calcular posição baseada na velocidade e tempo
                vec2 position = a_position + a_velocity * u_time * 0.001;

                // Efeito de atração do mouse
                vec2 toMouse = u_mouse - position;
                float distance = length(toMouse);
                if (distance < 200.0) {
                    position += normalize(toMouse) * (200.0 - distance) * 0.1;
                }

                // Converter para coordenadas do clip space
                vec2 clipSpace = (position / u_resolution) * 2.0 - 1.0;
                clipSpace.y *= -1.0;

                gl_Position = vec4(clipSpace, 0.0, 1.0);
                gl_PointSize = a_size * (1.0 - a_life);

                v_life = a_life;
                v_position = position;
            }
        `;

        const fragmentShaderSource = `
            precision mediump float;

            varying float v_life;
            varying vec2 v_position;

            uniform float u_time;

            void main() {
                // Calcular distância do centro do ponto
                vec2 center = gl_PointCoord - 0.5;
                float dist = length(center);

                // Criar forma circular suave
                float alpha = 1.0 - smoothstep(0.0, 0.5, dist);

                // Efeito de vida da partícula
                alpha *= (1.0 - v_life);

                // Cor baseada na vida e posição
                vec3 color = mix(
                    vec3(0.0, 0.8, 1.0),  // Azul ciano
                    vec3(1.0, 0.4, 0.0),  // Laranja
                    v_life
                );

                // Efeito de brilho
                float glow = sin(u_time * 0.01 + v_position.x * 0.01) * 0.5 + 0.5;
                color += vec3(glow * 0.3);

                gl_FragColor = vec4(color, alpha * 0.6);
            }
        `;

        this.program = this.createProgram(vertexShaderSource, fragmentShaderSource);
    }

    createProgram(vertexSource, fragmentSource) {
        const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexSource);
        const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentSource);

        const program = this.gl.createProgram();
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);

        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            console.error('Erro ao linkar programa:', this.gl.getProgramInfoLog(program));
            return null;
        }

        return program;
    }

    createShader(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error('Erro ao compilar shader:', this.gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
    }

    createParticles() {
        const positions = new Float32Array(this.particleCount * 2);
        const velocities = new Float32Array(this.particleCount * 2);
        const sizes = new Float32Array(this.particleCount);
        const lives = new Float32Array(this.particleCount);

        for (let i = 0; i < this.particleCount; i++) {
            // Posição inicial aleatória
            positions[i * 2] = Math.random() * this.canvas.width;
            positions[i * 2 + 1] = Math.random() * this.canvas.height;

            // Velocidade aleatória
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 50 + 10;
            velocities[i * 2] = Math.cos(angle) * speed;
            velocities[i * 2 + 1] = Math.sin(angle) * speed;

            // Tamanho aleatório
            sizes[i] = Math.random() * 4 + 2;

            // Vida inicial
            lives[i] = Math.random();
        }

        // Criar buffers
        this.positionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, positions, this.gl.STATIC_DRAW);

        this.velocityBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.velocityBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, velocities, this.gl.STATIC_DRAW);

        this.sizeBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.sizeBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, sizes, this.gl.STATIC_DRAW);

        this.lifeBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.lifeBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, lives, this.gl.STATIC_DRAW);
    }

    bindEvents() {
        // Resize
        window.addEventListener('resize', () => this.resize());

        // Mouse move
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        // Touch events para mobile
        document.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.mouse.x = touch.clientX;
            this.mouse.y = touch.clientY;
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
    }

    render() {
        if (!this.gl || !this.program) return;

        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.useProgram(this.program);

        // Atualizar uniforms
        const resolutionLocation = this.gl.getUniformLocation(this.program, 'u_resolution');
        this.gl.uniform2f(resolutionLocation, this.canvas.width, this.canvas.height);

        const timeLocation = this.gl.getUniformLocation(this.program, 'u_time');
        this.gl.uniform1f(timeLocation, this.time);

        const mouseLocation = this.gl.getUniformLocation(this.program, 'u_mouse');
        this.gl.uniform2f(mouseLocation, this.mouse.x * window.devicePixelRatio, this.mouse.y * window.devicePixelRatio);

        // Configurar atributos
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        const positionLocation = this.gl.getAttribLocation(this.program, 'a_position');
        this.gl.enableVertexAttribArray(positionLocation);
        this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 0, 0);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.velocityBuffer);
        const velocityLocation = this.gl.getAttribLocation(this.program, 'a_velocity');
        this.gl.enableVertexAttribArray(velocityLocation);
        this.gl.vertexAttribPointer(velocityLocation, 2, this.gl.FLOAT, false, 0, 0);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.sizeBuffer);
        const sizeLocation = this.gl.getAttribLocation(this.program, 'a_size');
        this.gl.enableVertexAttribArray(sizeLocation);
        this.gl.vertexAttribPointer(sizeLocation, 1, this.gl.FLOAT, false, 0, 0);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.lifeBuffer);
        const lifeLocation = this.gl.getAttribLocation(this.program, 'a_life');
        this.gl.enableVertexAttribArray(lifeLocation);
        this.gl.vertexAttribPointer(lifeLocation, 1, this.gl.FLOAT, false, 0, 0);

        // Renderizar partículas
        this.gl.drawArrays(this.gl.POINTS, 0, this.particleCount);
    }

    animate() {
        if (!this.isActive) return;

        this.time += 16; // ~60fps
        this.render();
        requestAnimationFrame(() => this.animate());
    }

    start() {
        this.isActive = true;
        this.animate();
    }

    stop() {
        this.isActive = false;
    }

    destroy() {
        this.stop();
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// Exportar para uso global
window.WebGLManager = WebGLManager;
