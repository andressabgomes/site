/**
 * Post Processor - Sistema de Pós-Processamento
 * Aplica efeitos visuais avançados como blur, bloom, distorção
 */

class PostProcessor {
    constructor(gl, width, height) {
        this.gl = gl;
        this.width = width;
        this.height = height;
        this.effects = new Map();

        this.createFramebuffers();
        this.createShaders();
    }

    createFramebuffers() {
        // Framebuffer principal
        this.mainFramebuffer = this.gl.createFramebuffer();
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.mainFramebuffer);

        // Textura de cor
        this.colorTexture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.colorTexture);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.width, this.height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);

        // Renderbuffer de profundidade
        this.depthRenderbuffer = this.gl.createRenderbuffer();
        this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthRenderbuffer);
        this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, this.width, this.height);

        // Anexar ao framebuffer
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this.colorTexture, 0);
        this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, this.depthRenderbuffer);

        // Verificar status
        if (this.gl.checkFramebufferStatus(this.gl.FRAMEBUFFER) !== this.gl.FRAMEBUFFER_COMPLETE) {
            console.error('Framebuffer incompleto');
        }

        // Voltar ao framebuffer padrão
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
    }

    createShaders() {
        // Shader para renderização de quad de tela cheia
        const screenVertexShader = `
            attribute vec2 a_position;
            attribute vec2 a_texCoord;

            varying vec2 v_texCoord;

            void main() {
                gl_Position = vec4(a_position, 0.0, 1.0);
                v_texCoord = a_texCoord;
            }
        `;

        // Shader de blur gaussiano
        const blurFragmentShader = `
            precision mediump float;

            uniform sampler2D u_texture;
            uniform vec2 u_resolution;
            uniform float u_blurStrength;
            uniform vec2 u_direction;

            varying vec2 v_texCoord;

            void main() {
                vec2 texelSize = 1.0 / u_resolution;
                vec2 direction = u_direction * texelSize * u_blurStrength;

                vec4 color = vec4(0.0);
                float total = 0.0;

                // Kernel gaussiano 9x9
                float weights[9];
                weights[0] = 0.077847;
                weights[1] = 0.123317;
                weights[2] = 0.077847;
                weights[3] = 0.123317;
                weights[4] = 0.195346;
                weights[5] = 0.123317;
                weights[6] = 0.077847;
                weights[7] = 0.123317;
                weights[8] = 0.077847;

                for (int i = -4; i <= 4; i++) {
                    vec2 offset = direction * float(i);
                    vec2 sampleCoord = v_texCoord + offset;
                    color += texture2D(u_texture, sampleCoord) * weights[i + 4];
                    total += weights[i + 4];
                }

                gl_FragColor = color / total;
            }
        `;

        // Shader de bloom
        const bloomFragmentShader = `
            precision mediump float;

            uniform sampler2D u_texture;
            uniform float u_threshold;
            uniform float u_intensity;

            varying vec2 v_texCoord;

            void main() {
                vec4 color = texture2D(u_texture, v_texCoord);

                // Calcular luminância
                float luminance = dot(color.rgb, vec3(0.299, 0.587, 0.114));

                // Aplicar threshold
                if (luminance > u_threshold) {
                    color.rgb *= u_intensity;
                } else {
                    color.rgb = vec3(0.0);
                }

                gl_FragColor = color;
            }
        `;

        // Shader de distorção
        const distortionFragmentShader = `
            precision mediump float;

            uniform sampler2D u_texture;
            uniform float u_time;
            uniform float u_strength;

            varying vec2 v_texCoord;

            void main() {
                vec2 uv = v_texCoord;

                // Efeito de onda
                float wave = sin(uv.x * 10.0 + u_time * 0.001) * 0.01 * u_strength;
                wave += sin(uv.y * 8.0 + u_time * 0.0015) * 0.01 * u_strength;

                vec2 distortedUV = uv + vec2(wave, wave);

                gl_FragColor = texture2D(u_texture, distortedUV);
            }
        `;

        // Criar programas
        this.blurProgram = this.createProgram(screenVertexShader, blurFragmentShader);
        this.bloomProgram = this.createProgram(screenVertexShader, bloomFragmentShader);
        this.distortionProgram = this.createProgram(screenVertexShader, distortionFragmentShader);

        // Criar geometria de quad
        this.createScreenQuad();
    }

    createProgram(vertexSource, fragmentSource) {
        const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexSource);
        const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentSource);

        const program = this.gl.createProgram();
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);

        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            console.error('Erro ao linkar programa de pós-processamento:', this.gl.getProgramInfoLog(program));
            return null;
        }

        return program;
    }

    createShader(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error('Erro ao compilar shader de pós-processamento:', this.gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
    }

    createScreenQuad() {
        const vertices = new Float32Array([
            -1, -1,  0, 0,  // Posição, TexCoord
             1, -1,  1, 0,
             1,  1,  1, 1,
            -1,  1,  0, 1
        ]);

        const indices = new Uint16Array([0, 1, 2, 0, 2, 3]);

        this.quadVertexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.quadVertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);

        this.quadIndexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.quadIndexBuffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, indices, this.gl.STATIC_DRAW);

        this.quadIndexCount = indices.length;
    }

    beginRender() {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.mainFramebuffer);
        this.gl.viewport(0, 0, this.width, this.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }

    endRender() {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
        this.gl.viewport(0, 0, this.width, this.height);
    }

    applyBlur(texture, strength = 1.0) {
        if (!this.blurProgram) return texture;

        // Aplicar blur horizontal
        this.gl.useProgram(this.blurProgram);
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);

        const resolutionLocation = this.gl.getUniformLocation(this.blurProgram, 'u_resolution');
        this.gl.uniform2f(resolutionLocation, this.width, this.height);

        const strengthLocation = this.gl.getUniformLocation(this.blurProgram, 'u_blurStrength');
        this.gl.uniform1f(strengthLocation, strength);

        const directionLocation = this.gl.getUniformLocation(this.blurProgram, 'u_direction');
        this.gl.uniform2f(directionLocation, 1.0, 0.0); // Horizontal

        this.renderScreenQuad();

        // Aplicar blur vertical
        this.gl.uniform2f(directionLocation, 0.0, 1.0); // Vertical
        this.renderScreenQuad();

        return texture;
    }

    applyBloom(texture, threshold = 0.8, intensity = 1.5) {
        if (!this.bloomProgram) return texture;

        this.gl.useProgram(this.bloomProgram);
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);

        const thresholdLocation = this.gl.getUniformLocation(this.bloomProgram, 'u_threshold');
        this.gl.uniform1f(thresholdLocation, threshold);

        const intensityLocation = this.gl.getUniformLocation(this.bloomProgram, 'u_intensity');
        this.gl.uniform1f(intensityLocation, intensity);

        this.renderScreenQuad();

        return texture;
    }

    applyDistortion(texture, strength = 0.5, time = 0) {
        if (!this.distortionProgram) return texture;

        this.gl.useProgram(this.distortionProgram);
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);

        const timeLocation = this.gl.getUniformLocation(this.distortionProgram, 'u_time');
        this.gl.uniform1f(timeLocation, time);

        const strengthLocation = this.gl.getUniformLocation(this.distortionProgram, 'u_strength');
        this.gl.uniform1f(strengthLocation, strength);

        this.renderScreenQuad();

        return texture;
    }

    renderScreenQuad() {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.quadVertexBuffer);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.quadIndexBuffer);

        const positionLocation = this.gl.getAttribLocation(this.gl.getParameter(this.gl.CURRENT_PROGRAM), 'a_position');
        this.gl.enableVertexAttribArray(positionLocation);
        this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 16, 0);

        const texCoordLocation = this.gl.getAttribLocation(this.gl.getParameter(this.gl.CURRENT_PROGRAM), 'a_texCoord');
        this.gl.enableVertexAttribArray(texCoordLocation);
        this.gl.vertexAttribPointer(texCoordLocation, 2, this.gl.FLOAT, false, 16, 8);

        this.gl.drawElements(this.gl.TRIANGLES, this.quadIndexCount, this.gl.UNSIGNED_SHORT, 0);
    }

    renderToScreen(texture) {
        this.gl.useProgram(this.blurProgram); // Usar qualquer programa que tenha o shader de tela
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
        this.renderScreenQuad();
    }

    resize(width, height) {
        this.width = width;
        this.height = height;

        // Recriar framebuffers com novo tamanho
        this.gl.deleteTexture(this.colorTexture);
        this.gl.deleteRenderbuffer(this.depthRenderbuffer);
        this.gl.deleteFramebuffer(this.mainFramebuffer);

        this.createFramebuffers();
    }
}

// Exportar para uso global
window.PostProcessor = PostProcessor;
