/**
 * VideoManager.js - Gerenciador de Vídeos Otimizados
 * Implementa vídeos MP4/WebM com autoplay, loop, sem áudio
 * Integração com GSAP + ScrollTrigger para animações suaves
 * Controle de desempenho com lazy loading e pause em abas inativas
 */

class VideoManager {
    constructor() {
        this.videos = new Map();
        this.intersectionObserver = null;
        this.visibilityObserver = null;
        this.isPageVisible = true;
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupVisibilityObserver();
        this.setupScrollTrigger();
        this.bindEvents();
    }

    /**
     * Configura Intersection Observer para lazy loading
     */
    setupIntersectionObserver() {
        this.intersectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    const video = entry.target;
                    const videoId = video.dataset.videoId;
                    
                    if (entry.isIntersecting) {
                        this.loadVideo(video, videoId);
                    } else {
                        this.pauseVideo(video, videoId);
                    }
                });
            },
            {
                rootMargin: '50px 0px',
                threshold: 0.1
            }
        );
    }

    /**
     * Configura Visibility Observer para pausar vídeos em abas inativas
     */
    setupVisibilityObserver() {
        this.visibilityObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    const video = entry.target;
                    const videoId = video.dataset.videoId;
                    
                    if (entry.isIntersecting) {
                        this.resumeVideo(video, videoId);
                    } else {
                        this.pauseVideo(video, videoId);
                    }
                });
            },
            {
                threshold: 0.5
            }
        );
    }

    /**
     * Configura GSAP ScrollTrigger para animações suaves
     */
    setupScrollTrigger() {
        if (typeof gsap !== 'undefined' && gsap.ScrollTrigger) {
            gsap.registerPlugin(ScrollTrigger);
            
            // Animação para vídeos de fundo
            gsap.utils.toArray('.video-background').forEach(videoContainer => {
                const video = videoContainer.querySelector('video');
                if (video) {
                    gsap.to(video, {
                        scrollTrigger: {
                            trigger: videoContainer,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 1,
                            onUpdate: (self) => {
                                // Efeito parallax suave
                                const progress = self.progress;
                                video.style.transform = `scale(${1 + progress * 0.1})`;
                            }
                        }
                    });
                }
            });

            // Animação para vídeos de showcase
            gsap.utils.toArray('.showcase-video').forEach(showcase => {
                const video = showcase.querySelector('video');
                if (video) {
                    gsap.fromTo(video, 
                        { scale: 0.8, opacity: 0 },
                        {
                            scale: 1,
                            opacity: 1,
                            duration: 1,
                            scrollTrigger: {
                                trigger: showcase,
                                start: 'top 80%',
                                end: 'bottom 20%',
                                toggleActions: 'play none none reverse'
                            }
                        }
                    );
                }
            });
        }
    }

    /**
     * Registra um vídeo no gerenciador
     */
    registerVideo(videoElement, options = {}) {
        const videoId = options.id || `video-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        const videoConfig = {
            element: videoElement,
            src: options.src || videoElement.src,
            poster: options.poster || videoElement.poster,
            autoplay: options.autoplay !== false,
            muted: options.muted !== false,
            loop: options.loop !== false,
            playsinline: options.playsinline !== false,
            lazy: options.lazy !== false,
            preload: options.preload || 'metadata',
            ...options
        };

        // Configura atributos do vídeo
        this.configureVideo(videoElement, videoConfig);
        
        // Adiciona ao mapa de vídeos
        this.videos.set(videoId, videoConfig);
        videoElement.dataset.videoId = videoId;

        // Observa o vídeo se lazy loading estiver ativado
        if (videoConfig.lazy) {
            this.intersectionObserver.observe(videoElement);
        } else {
            this.loadVideo(videoElement, videoId);
        }

        // Observa visibilidade para controle de performance
        this.visibilityObserver.observe(videoElement);

        return videoId;
    }

    /**
     * Configura atributos do vídeo
     */
    configureVideo(video, config) {
        video.autoplay = config.autoplay;
        video.muted = config.muted;
        video.loop = config.loop;
        video.playsinline = config.playsinline;
        video.preload = config.preload;
        
        // Remove áudio se especificado
        if (config.noAudio) {
            video.volume = 0;
            video.muted = true;
        }

        // Adiciona classes CSS para estilização
        video.classList.add('optimized-video');
        if (config.className) {
            video.classList.add(config.className);
        }
    }

    /**
     * Carrega um vídeo
     */
    loadVideo(video, videoId) {
        const config = this.videos.get(videoId);
        if (!config || config.loaded) return;

        // Carrega o vídeo apenas se a página estiver visível
        if (!this.isPageVisible) return;

        try {
            // Configura sources se não estiverem definidos
            if (!video.src && config.src) {
                if (Array.isArray(config.src)) {
                    config.src.forEach(src => {
                        const source = document.createElement('source');
                        source.src = src.url;
                        source.type = src.type;
                        video.appendChild(source);
                    });
                } else {
                    video.src = config.src;
                }
            }

            // Tenta reproduzir o vídeo
            if (config.autoplay) {
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            config.loaded = true;
                            config.playing = true;
                            video.classList.add('video-loaded');
                            this.onVideoPlay(video, videoId);
                        })
                        .catch(error => {
                            console.warn('Erro ao reproduzir vídeo:', error);
                            // Fallback: tenta reproduzir sem autoplay
                            video.autoplay = false;
                        });
                }
            }

            config.loaded = true;
        } catch (error) {
            console.error('Erro ao carregar vídeo:', error);
        }
    }

    /**
     * Pausa um vídeo
     */
    pauseVideo(video, videoId) {
        const config = this.videos.get(videoId);
        if (!config || !config.playing) return;

        try {
            video.pause();
            config.playing = false;
            video.classList.remove('video-playing');
            video.classList.add('video-paused');
        } catch (error) {
            console.warn('Erro ao pausar vídeo:', error);
        }
    }

    /**
     * Resume um vídeo
     */
    resumeVideo(video, videoId) {
        const config = this.videos.get(videoId);
        if (!config || config.playing || !this.isPageVisible) return;

        try {
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        config.playing = true;
                        video.classList.add('video-playing');
                        video.classList.remove('video-paused');
                    })
                    .catch(error => {
                        console.warn('Erro ao resumir vídeo:', error);
                    });
            }
        } catch (error) {
            console.warn('Erro ao resumir vídeo:', error);
        }
    }

    /**
     * Callback quando vídeo começa a reproduzir
     */
    onVideoPlay(video, videoId) {
        video.classList.add('video-playing');
        
        // Adiciona efeitos visuais
        gsap.fromTo(video, 
            { opacity: 0, scale: 0.95 },
            { 
                opacity: 1, 
                scale: 1, 
                duration: 0.8, 
                ease: 'power2.out' 
            }
        );

        // Dispara evento customizado
        const event = new CustomEvent('videoPlay', {
            detail: { video, videoId }
        });
        document.dispatchEvent(event);
    }

    /**
     * Bind de eventos
     */
    bindEvents() {
        // Controle de visibilidade da página
        document.addEventListener('visibilitychange', () => {
            this.isPageVisible = !document.hidden;
            
            if (this.isPageVisible) {
                this.resumeAllVideos();
            } else {
                this.pauseAllVideos();
            }
        });

        // Controle de foco da janela
        window.addEventListener('focus', () => {
            this.isPageVisible = true;
            this.resumeAllVideos();
        });

        window.addEventListener('blur', () => {
            this.isPageVisible = false;
            this.pauseAllVideos();
        });

        // Controle de performance em dispositivos móveis
        if ('connection' in navigator) {
            navigator.connection.addEventListener('change', () => {
                this.handleConnectionChange();
            });
        }

        // Pausa vídeos quando usuário interage com outros elementos
        document.addEventListener('scroll', this.debounce(() => {
            this.handleScroll();
        }, 100));
    }

    /**
     * Resume todos os vídeos
     */
    resumeAllVideos() {
        this.videos.forEach((config, videoId) => {
            if (config.loaded && !config.playing) {
                this.resumeVideo(config.element, videoId);
            }
        });
    }

    /**
     * Pausa todos os vídeos
     */
    pauseAllVideos() {
        this.videos.forEach((config, videoId) => {
            if (config.playing) {
                this.pauseVideo(config.element, videoId);
            }
        });
    }

    /**
     * Manipula mudanças de conexão
     */
    handleConnectionChange() {
        const connection = navigator.connection;
        const isSlowConnection = connection.effectiveType === 'slow-2g' || 
                               connection.effectiveType === '2g' || 
                               connection.effectiveType === '3g';

        if (isSlowConnection) {
            // Reduz qualidade dos vídeos em conexões lentas
            this.videos.forEach((config, videoId) => {
                if (config.element.src && config.element.src.includes('high-quality')) {
                    config.element.src = config.element.src.replace('high-quality', 'low-quality');
                }
            });
        }
    }

    /**
     * Manipula scroll para otimização
     */
    handleScroll() {
        // Pausa vídeos que não estão visíveis
        this.videos.forEach((config, videoId) => {
            const rect = config.element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (!isVisible && config.playing) {
                this.pauseVideo(config.element, videoId);
            } else if (isVisible && !config.playing && this.isPageVisible) {
                this.resumeVideo(config.element, videoId);
            }
        });
    }

    /**
     * Debounce utility
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Destroi o gerenciador
     */
    destroy() {
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }
        if (this.visibilityObserver) {
            this.visibilityObserver.disconnect();
        }
        this.videos.clear();
    }
}

// Inicializa o gerenciador quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.videoManager = new VideoManager();
    
    // Registra vídeos existentes automaticamente
    document.querySelectorAll('video[data-video-manager]').forEach(video => {
        const options = {
            id: video.dataset.videoId,
            autoplay: video.dataset.autoplay !== 'false',
            muted: video.dataset.muted !== 'false',
            loop: video.dataset.loop !== 'false',
            lazy: video.dataset.lazy !== 'false',
            noAudio: video.dataset.noAudio === 'true'
        };
        
        window.videoManager.registerVideo(video, options);
    });
});

// Exporta para uso em módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VideoManager;
} 