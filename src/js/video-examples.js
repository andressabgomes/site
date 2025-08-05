/**
 * Video Examples - Exemplos de uso do VideoManager
 * Demonstra diferentes configurações e funcionalidades
 */

// Aguarda o DOM estar pronto
document.addEventListener('DOMContentLoaded', () => {
    // Exemplo 1: Vídeo de fundo com parallax
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo && window.videoManager) {
        window.videoManager.registerVideo(heroVideo, {
            id: 'hero-background',
            autoplay: true,
            muted: true,
            loop: true,
            lazy: false, // Carrega imediatamente
            noAudio: true,
            className: 'hero-video-bg'
        });
    }

    // Exemplo 2: Vídeo de showcase com lazy loading
    const showcaseVideo = document.querySelector('.showcase-video-element');
    if (showcaseVideo && window.videoManager) {
        window.videoManager.registerVideo(showcaseVideo, {
            id: 'service-showcase',
            autoplay: true,
            muted: true,
            loop: true,
            lazy: true, // Lazy loading
            noAudio: true,
            className: 'showcase-video-element'
        });
    }

    // Exemplo 3: Grid de vídeos com controles customizados
    const gridVideos = document.querySelectorAll('.video-grid .optimized-video');
    gridVideos.forEach((video, index) => {
        if (window.videoManager) {
            window.videoManager.registerVideo(video, {
                id: `grid-video-${index}`,
                autoplay: true,
                muted: true,
                loop: true,
                lazy: true,
                noAudio: true,
                className: 'grid-video'
            });
        }
    });

    // Exemplo 4: Controles customizados para vídeos
    setupCustomControls();

    // Exemplo 5: Eventos de vídeo
    setupVideoEvents();

    // Exemplo 6: Performance monitoring
    setupPerformanceMonitoring();
});

/**
 * Configura controles customizados para vídeos
 */
function setupCustomControls() {
    const videoContainers = document.querySelectorAll('.video-container');
    
    videoContainers.forEach(container => {
        const video = container.querySelector('video');
        const playButton = container.querySelector('.video-controls button');
        
        if (video && playButton) {
            // Toggle play/pause
            playButton.addEventListener('click', () => {
                if (video.paused) {
                    video.play();
                    playButton.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="6" y="4" width="4" height="16"></rect>
                            <rect x="14" y="4" width="4" height="16"></rect>
                        </svg>
                    `;
                    playButton.setAttribute('aria-label', 'Pausar vídeo');
                    playButton.setAttribute('title', 'Pausar vídeo');
                } else {
                    video.pause();
                    playButton.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="5,3 19,12 5,21"></polygon>
                        </svg>
                    `;
                    playButton.setAttribute('aria-label', 'Reproduzir vídeo');
                    playButton.setAttribute('title', 'Reproduzir vídeo');
                }
            });

            // Atualiza ícone baseado no estado do vídeo
            video.addEventListener('play', () => {
                playButton.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="6" y="4" width="4" height="16"></rect>
                        <rect x="14" y="4" width="4" height="16"></rect>
                    </svg>
                `;
                playButton.setAttribute('aria-label', 'Pausar vídeo');
                playButton.setAttribute('title', 'Pausar vídeo');
            });

            video.addEventListener('pause', () => {
                playButton.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="5,3 19,12 5,21"></polygon>
                    </svg>
                `;
                playButton.setAttribute('aria-label', 'Reproduzir vídeo');
                playButton.setAttribute('title', 'Reproduzir vídeo');
            });
        }
    });
}

/**
 * Configura eventos de vídeo
 */
function setupVideoEvents() {
    // Evento customizado quando vídeo começa a reproduzir
    document.addEventListener('videoPlay', (event) => {
        const { video, videoId } = event.detail;
        console.log(`Vídeo ${videoId} começou a reproduzir`);
        
        // Adiciona classe de animação
        video.closest('.video-grid-item')?.classList.add('video-active');
    });

    // Evento quando vídeo termina
    document.addEventListener('ended', (event) => {
        if (event.target.tagName === 'VIDEO') {
            console.log('Vídeo terminou de reproduzir');
        }
    });

    // Evento de erro de vídeo
    document.addEventListener('error', (event) => {
        if (event.target.tagName === 'VIDEO') {
            console.error('Erro ao carregar vídeo:', event.target.src);
            
            // Mostra fallback
            const fallback = event.target.querySelector('.video-fallback');
            if (fallback) {
                fallback.style.display = 'flex';
            }
        }
    });
}

/**
 * Monitora performance dos vídeos
 */
function setupPerformanceMonitoring() {
    // Monitora uso de memória
    if ('memory' in performance) {
        setInterval(() => {
            const memory = performance.memory;
            const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
            const totalMB = Math.round(memory.totalJSHeapSize / 1048576);
            
            if (usedMB > 100) { // Alerta se usar mais de 100MB
                console.warn(`Uso de memória alto: ${usedMB}MB / ${totalMB}MB`);
            }
        }, 10000); // Verifica a cada 10 segundos
    }

    // Monitora FPS
    let frameCount = 0;
    let lastTime = performance.now();
    
    function checkFPS() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - lastTime >= 1000) {
            const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
            
            if (fps < 30) { // Alerta se FPS baixo
                console.warn(`FPS baixo detectado: ${fps}`);
            }
            
            frameCount = 0;
            lastTime = currentTime;
        }
        
        requestAnimationFrame(checkFPS);
    }
    
    requestAnimationFrame(checkFPS);
}

/**
 * Função para criar vídeo dinamicamente
 */
function createVideoElement(options = {}) {
    const video = document.createElement('video');
    
    // Configurações padrão
    const defaultOptions = {
        autoplay: true,
        muted: true,
        loop: true,
        playsinline: true,
        preload: 'metadata',
        className: 'optimized-video',
        ...options
    };
    
    // Aplica configurações
    Object.keys(defaultOptions).forEach(key => {
        if (key === 'className') {
            video.className = defaultOptions[key];
        } else if (key !== 'sources') {
            video[key] = defaultOptions[key];
        }
    });
    
    // Adiciona sources
    if (options.sources) {
        options.sources.forEach(source => {
            const sourceElement = document.createElement('source');
            sourceElement.src = source.src;
            sourceElement.type = source.type;
            video.appendChild(sourceElement);
        });
    }
    
    // Adiciona fallback
    if (options.fallback) {
        const fallback = document.createElement('div');
        fallback.className = 'video-fallback';
        fallback.innerHTML = options.fallback;
        video.appendChild(fallback);
    }
    
    return video;
}

/**
 * Função para otimizar vídeos baseado na conexão
 */
function optimizeForConnection() {
    if ('connection' in navigator) {
        const connection = navigator.connection;
        const isSlowConnection = connection.effectiveType === 'slow-2g' || 
                               connection.effectiveType === '2g' || 
                               connection.effectiveType === '3g';
        
        if (isSlowConnection) {
            // Reduz qualidade dos vídeos
            const videos = document.querySelectorAll('video[data-video-manager]');
            videos.forEach(video => {
                const sources = video.querySelectorAll('source');
                sources.forEach(source => {
                    if (source.src.includes('high-quality')) {
                        source.src = source.src.replace('high-quality', 'low-quality');
                    }
                });
            });
            
            console.log('Vídeos otimizados para conexão lenta');
        }
    }
}

// Exporta funções para uso global
window.VideoExamples = {
    createVideoElement,
    optimizeForConnection,
    setupCustomControls,
    setupVideoEvents,
    setupPerformanceMonitoring
}; 