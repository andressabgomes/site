/**
 * Geometry Renderer - Renderizador de Geometrias 3D
 * Cria efeitos geométricos complexos e animações 3D
 */

class GeometryRenderer {
    constructor(gl) {
        this.gl = gl;
        this.program = null;
        this.geometries = new Map();
        this.time = 0;

        this.createShaders();
    }

    createShaders() {
        const vertexShaderSource = `
            attribute vec3 a_position;
            attribute vec3 a_normal;
            attribute vec2 a_texCoord;

            uniform mat4 u_modelViewMatrix;
            uniform mat4 u_projectionMatrix;
            uniform mat4 u_normalMatrix;
            uniform float u_time;

            varying vec3 v_normal;
            varying vec3 v_position;
            varying vec2 v_texCoord;

            void main() {
                // Animar posição baseada no tempo
                vec3 animatedPosition = a_position;
                animatedPosition.x += sin(u_time * 0.001 + a_position.y * 0.1) * 0.1;
                animatedPosition.y += cos(u_time * 0.001 + a_position.x * 0.1) * 0.1;

                v_position = (u_modelViewMatrix * vec4(animatedPosition, 1.0)).xyz;
                v_normal = (u_normalMatrix * vec4(a_normal, 0.0)).xyz;
                v_texCoord = a_texCoord;

                gl_Position = u_projectionMatrix * u_modelViewMatrix * vec4(animatedPosition, 1.0);
            }
        `;

        const fragmentShaderSource = `
            precision mediump float;

            varying vec3 v_normal;
            varying vec3 v_position;
            varying vec2 v_texCoord;

            uniform float u_time;
            uniform vec3 u_lightPosition;
            uniform vec3 u_viewPosition;

            void main() {
                // Normalização
                vec3 normal = normalize(v_normal);
                vec3 lightDir = normalize(u_lightPosition - v_position);
                vec3 viewDir = normalize(u_viewPosition - v_position);

                // Cálculo de iluminação
                float diff = max(dot(normal, lightDir), 0.0);
                vec3 reflectDir = reflect(-lightDir, normal);
                float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);

                // Cores baseadas na posição e tempo
                vec3 baseColor = vec3(0.0, 0.8, 1.0);
                vec3 accentColor = vec3(1.0, 0.4, 0.0);

                float colorMix = sin(u_time * 0.002 + v_position.x * 0.01) * 0.5 + 0.5;
                vec3 color = mix(baseColor, accentColor, colorMix);

                // Efeito de brilho
                float glow = sin(u_time * 0.003 + v_position.y * 0.02) * 0.5 + 0.5;
                color += vec3(glow * 0.3);

                // Aplicar iluminação
                vec3 ambient = color * 0.3;
                vec3 diffuse = color * diff * 0.7;
                vec3 specular = vec3(1.0) * spec * 0.5;

                vec3 finalColor = ambient + diffuse + specular;

                // Transparência baseada na profundidade
                float alpha = 0.8 - length(v_position) * 0.01;
                alpha = clamp(alpha, 0.1, 0.8);

                gl_FragColor = vec4(finalColor, alpha);
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
            console.error('Erro ao linkar programa de geometria:', this.gl.getProgramInfoLog(program));
            return null;
        }

        return program;
    }

    createShader(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error('Erro ao compilar shader de geometria:', this.gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
    }

    createCube() {
        const vertices = new Float32Array([
            // Frente
            -1, -1,  1,  0,  0,  1,  0, 0,
             1, -1,  1,  0,  0,  1,  1, 0,
             1,  1,  1,  0,  0,  1,  1, 1,
            -1,  1,  1,  0,  0,  1,  0, 1,

            // Traseira
            -1, -1, -1,  0,  0, -1,  1, 0,
            -1,  1, -1,  0,  0, -1,  1, 1,
             1,  1, -1,  0,  0, -1,  0, 1,
             1, -1, -1,  0,  0, -1,  0, 0,

            // Topo
            -1,  1, -1,  0,  1,  0,  0, 1,
            -1,  1,  1,  0,  1,  0,  0, 0,
             1,  1,  1,  0,  1,  0,  1, 0,
             1,  1, -1,  0,  1,  0,  1, 1,

            // Base
            -1, -1, -1,  0, -1,  0,  1, 1,
             1, -1, -1,  0, -1,  0,  0, 1,
             1, -1,  1,  0, -1,  0,  0, 0,
            -1, -1,  1,  0, -1,  0,  1, 0,

            // Direita
             1, -1, -1,  1,  0,  0,  1, 0,
             1,  1, -1,  1,  0,  0,  1, 1,
             1,  1,  1,  1,  0,  0,  0, 1,
             1, -1,  1,  1,  0,  0,  0, 0,

            // Esquerda
            -1, -1, -1, -1,  0,  0,  0, 0,
            -1, -1,  1, -1,  0,  0,  1, 0,
            -1,  1,  1, -1,  0,  0,  1, 1,
            -1,  1, -1, -1,  0,  0,  0, 1,
        ]);

        const indices = new Uint16Array([
            0,  1,  2,    0,  2,  3,   // Frente
            4,  5,  6,    4,  6,  7,   // Traseira
            8,  9,  10,   8,  10, 11,  // Topo
            12, 13, 14,   12, 14, 15,  // Base
            16, 17, 18,   16, 18, 19,  // Direita
            20, 21, 22,   20, 22, 23,  // Esquerda
        ]);

        const geometry = {
            vertexBuffer: this.gl.createBuffer(),
            indexBuffer: this.gl.createBuffer(),
            indexCount: indices.length
        };

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, geometry.vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);

        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, geometry.indexBuffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, indices, this.gl.STATIC_DRAW);

        return geometry;
    }

    createSphere(radius = 1, segments = 32) {
        const vertices = [];
        const indices = [];

        for (let lat = 0; lat <= segments; lat++) {
            const theta = lat * Math.PI / segments;
            const sinTheta = Math.sin(theta);
            const cosTheta = Math.cos(theta);

            for (let lon = 0; lon <= segments; lon++) {
                const phi = lon * 2 * Math.PI / segments;
                const sinPhi = Math.sin(phi);
                const cosPhi = Math.cos(phi);

                const x = cosPhi * sinTheta;
                const y = cosTheta;
                const z = sinPhi * sinTheta;

                vertices.push(
                    x * radius, y * radius, z * radius,  // Posição
                    x, y, z,                             // Normal
                    lon / segments, lat / segments       // TexCoord
                );
            }
        }

        for (let lat = 0; lat < segments; lat++) {
            for (let lon = 0; lon < segments; lon++) {
                const first = lat * (segments + 1) + lon;
                const second = first + segments + 1;

                indices.push(first, second, first + 1);
                indices.push(second, second + 1, first + 1);
            }
        }

        const geometry = {
            vertexBuffer: this.gl.createBuffer(),
            indexBuffer: this.gl.createBuffer(),
            indexCount: indices.length
        };

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, geometry.vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);

        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, geometry.indexBuffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), this.gl.STATIC_DRAW);

        return geometry;
    }

    renderGeometry(geometry, modelViewMatrix, projectionMatrix) {
        if (!this.program) return;

        this.gl.useProgram(this.program);

        // Configurar matrizes
        const modelViewLocation = this.gl.getUniformLocation(this.program, 'u_modelViewMatrix');
        this.gl.uniformMatrix4fv(modelViewLocation, false, modelViewMatrix);

        const projectionLocation = this.gl.getUniformLocation(this.program, 'u_projectionMatrix');
        this.gl.uniformMatrix4fv(projectionLocation, false, projectionMatrix);

        // Matriz normal
        const normalMatrix = this.calculateNormalMatrix(modelViewMatrix);
        const normalMatrixLocation = this.gl.getUniformLocation(this.program, 'u_normalMatrix');
        this.gl.uniformMatrix4fv(normalMatrixLocation, false, normalMatrix);

        // Uniforms
        const timeLocation = this.gl.getUniformLocation(this.program, 'u_time');
        this.gl.uniform1f(timeLocation, this.time);

        const lightLocation = this.gl.getUniformLocation(this.program, 'u_lightPosition');
        this.gl.uniform3f(lightLocation, 5, 5, 5);

        const viewLocation = this.gl.getUniformLocation(this.program, 'u_viewPosition');
        this.gl.uniform3f(viewLocation, 0, 0, 5);

        // Configurar atributos
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, geometry.vertexBuffer);

        const positionLocation = this.gl.getAttribLocation(this.program, 'a_position');
        this.gl.enableVertexAttribArray(positionLocation);
        this.gl.vertexAttribPointer(positionLocation, 3, this.gl.FLOAT, false, 32, 0);

        const normalLocation = this.gl.getAttribLocation(this.program, 'a_normal');
        this.gl.enableVertexAttribArray(normalLocation);
        this.gl.vertexAttribPointer(normalLocation, 3, this.gl.FLOAT, false, 32, 12);

        const texCoordLocation = this.gl.getAttribLocation(this.program, 'a_texCoord');
        this.gl.enableVertexAttribArray(texCoordLocation);
        this.gl.vertexAttribPointer(texCoordLocation, 2, this.gl.FLOAT, false, 32, 24);

        // Renderizar
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, geometry.indexBuffer);
        this.gl.drawElements(this.gl.TRIANGLES, geometry.indexCount, this.gl.UNSIGNED_SHORT, 0);
    }

    calculateNormalMatrix(modelViewMatrix) {
        // Calcular matriz normal (inversa transposta da matriz modelo-visão)
        const normalMatrix = new Float32Array(16);

        // Para simplificar, vamos usar apenas a parte 3x3 da matriz
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                normalMatrix[i * 4 + j] = modelViewMatrix[i * 4 + j];
            }
        }
        normalMatrix[3] = 0;
        normalMatrix[7] = 0;
        normalMatrix[11] = 0;
        normalMatrix[12] = 0;
        normalMatrix[13] = 0;
        normalMatrix[14] = 0;
        normalMatrix[15] = 1;

        return normalMatrix;
    }

    update(deltaTime) {
        this.time += deltaTime;
    }
}

// Exportar para uso global
window.GeometryRenderer = GeometryRenderer;
