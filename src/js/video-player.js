/**
 * Video Player - Player de Vídeo Personalizado
 * Gerencia a exibição de vídeos MP4 no site
 */

class VideoPlayer {
    constructor() {
        this.videos = new Map();
        this.currentVideo = null;
        this.isInitialized = false;

        this.init();
    }

    init() {
        this.bindEvents();
        this.createVideoElements();
        this.isInitialized = true;
        console.log('🎬 Video Player inicializado');
    }

    bindEvents() {
        // Event listeners para controles de vídeo
        document.addEventListener('click', (e) => {
            if (e.target.matches('.video-play-btn')) {
                this.playVideo(e.target.closest('.video-container'));
            }

            if (e.target.matches('.video-pause-btn')) {
                this.pauseVideo(e.target.closest('.video-container'));
            }

            if (e.target.matches('.video-fullscreen-btn')) {
                this.toggleFullscreen(e.target.closest('.video-container'));
            }
        });

        // Intersection Observer para lazy loading
        this.setupIntersectionObserver();
    }

    createVideoElements() {
        // Criar elementos de vídeo dinamicamente
        const videoContainers = document.querySelectorAll('.video-container');

        videoContainers.forEach(container => {
            const video = container.querySelector('video');
            if (video) {
                this.setupVideo(video, container);
            }
        });
    }

    setupVideo(video, container) {
        // Configurar controles personalizados
        video.addEventListener('loadedmetadata', () => {
            this.updateVideoInfo(video, container);
        });

        video.addEventListener('timeupdate', () => {
            this.updateProgress(video, container);
        });

        video.addEventListener('ended', () => {
            this.handleVideoEnd(video, container);
        });

        video.addEventListener('error', (e) => {
            this.handleVideoError(e, container);
        });

        // Adicionar ao mapa de vídeos
        this.videos.set(container.id || `video-${Date.now()}`, {
            video: video,
            container: container,
            isPlaying: false,
            isMuted: true
        });
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target.querySelector('video');
                    if (video && video.dataset.lazy === 'true') {
                        this.loadVideo(video);
                    }
                }
            });
        }, options);

        // Observar todos os vídeos com lazy loading
        document.querySelectorAll('video[data-lazy="true"]').forEach(video => {
            observer.observe(video.closest('.video-container'));
        });
    }

    loadVideo(video) {
        if (video.dataset.src) {
            video.src = video.dataset.src;
            video.removeAttribute('data-lazy');
            video.removeAttribute('data-src');
            console.log('📹 Vídeo carregado:', video.dataset.src);
        }
    }

    playVideo(container) {
        const video = container.querySelector('video');
        if (video) {
            video.play().then(() => {
                this.updatePlayButton(container, true);
                this.videos.get(container.id).isPlaying = true;
            }).catch(error => {
                console.error('Erro ao reproduzir vídeo:', error);
            });
        }
    }

    pauseVideo(container) {
        const video = container.querySelector('video');
        if (video) {
            video.pause();
            this.updatePlayButton(container, false);
            this.videos.get(container.id).isPlaying = false;
        }
    }

    toggleFullscreen(container) {
        const video = container.querySelector('video');
        if (video) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                video.requestFullscreen().catch(error => {
                    console.error('Erro ao entrar em fullscreen:', error);
                });
            }
        }
    }

    updateVideoInfo(video, container) {
        const duration = video.duration;
        const durationDisplay = container.querySelector('.video-duration');

        if (durationDisplay && !isNaN(duration)) {
            durationDisplay.textContent = this.formatTime(duration);
        }
    }

    updateProgress(video, container) {
        const progress = container.querySelector('.video-progress');
        if (progress && !isNaN(video.duration)) {
            const percentage = (video.currentTime / video.duration) * 100;
            progress.style.width = `${percentage}%`;
        }

        const currentTime = container.querySelector('.video-current-time');
        if (currentTime) {
            currentTime.textContent = this.formatTime(video.currentTime);
        }
    }

    updatePlayButton(container, isPlaying) {
        const playBtn = container.querySelector('.video-play-btn');
        const pauseBtn = container.querySelector('.video-pause-btn');

        if (playBtn && pauseBtn) {
            if (isPlaying) {
                playBtn.style.display = 'none';
                pauseBtn.style.display = 'block';
            } else {
                playBtn.style.display = 'block';
                pauseBtn.style.display = 'none';
            }
        }
    }

    handleVideoEnd(video, container) {
        this.updatePlayButton(container, false);
        this.videos.get(container.id).isPlaying = false;

        // Opcional: reiniciar vídeo
        if (container.dataset.loop === 'true') {
            video.currentTime = 0;
            this.playVideo(container);
        }
    }

    handleVideoError(event, container) {
        console.error('Erro no vídeo:', event);

        // Mostrar fallback
        const fallback = container.querySelector('.video-fallback');
        if (fallback) {
            fallback.style.display = 'block';
        }

        // Esconder controles
        const controls = container.querySelector('.video-controls');
        if (controls) {
            controls.style.display = 'none';
        }
    }

    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // Métodos públicos para controle externo
    loadVideoFromFile(file) {
        return new Promise((resolve, reject) => {
            if (!file || !file.type.startsWith('video/')) {
                reject(new Error('Arquivo inválido. Selecione um arquivo de vídeo.'));
                return;
            }

            const url = URL.createObjectURL(file);
            const video = document.createElement('video');

            video.addEventListener('loadedmetadata', () => {
                resolve({
                    url: url,
                    duration: video.duration,
                    width: video.videoWidth,
                    height: video.videoHeight
                });
            });

            video.addEventListener('error', () => {
                reject(new Error('Erro ao carregar vídeo'));
            });

            video.src = url;
        });
    }

    createVideoContainer(videoInfo, options = {}) {
        const container = document.createElement('div');
        container.className = 'video-container';
        container.id = `video-${Date.now()}`;

        const video = document.createElement('video');
        video.src = videoInfo.url;
        video.preload = options.preload || 'metadata';
        video.muted = options.muted !== false;
        video.loop = options.loop || false;
        video.autoplay = options.autoplay || false;

        if (options.controls) {
            video.controls = true;
        }

        const controls = this.createVideoControls();

        container.appendChild(video);
        container.appendChild(controls);

        // Adicionar ao DOM
        const targetElement = options.target || document.body;
        targetElement.appendChild(container);

        // Configurar o vídeo
        this.setupVideo(video, container);

        return container;
    }

    createVideoControls() {
        const controls = document.createElement('div');
        controls.className = 'video-controls';

        controls.innerHTML = `
            <div class="video-progress-bar">
                <div class="video-progress"></div>
            </div>
            <div class="video-controls-main">
                <button class="video-play-btn" aria-label="Reproduzir vídeo">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="5,3 19,12 5,21"></polygon>
                    </svg>
                </button>
                <button class="video-pause-btn" aria-label="Pausar vídeo" style="display: none;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="6" y="4" width="4" height="16"></rect>
                        <rect x="14" y="4" width="4" height="16"></rect>
                    </svg>
                </button>
                <div class="video-time">
                    <span class="video-current-time">0:00</span>
                    <span>/</span>
                    <span class="video-duration">0:00</span>
                </div>
                <button class="video-fullscreen-btn" aria-label="Tela cheia">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="8,3 12,3 12,7 16,7 16,11 20,11 20,15 16,15 16,19 12,19 12,23 8,23 8,19 4,19 4,15 8,15"></polygon>
                    </svg>
                </button>
            </div>
        `;

        return controls;
    }
}

// Exportar para uso global
window.VideoPlayer = VideoPlayer;

// Auto-inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.videoPlayer = new VideoPlayer();
    });
} else {
    window.videoPlayer = new VideoPlayer();
}
