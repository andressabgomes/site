/**
 * Colab Video Manager - Replicando o site original
 * Gerenciador simples para o vídeo "colab" sem controles personalizados
 */

class ColabVideoManager {
    constructor() {
        this.video = null;
        this.container = null;
        this.isInitialized = false;

        this.init();
    }

    init() {
        this.setupElements();
        this.bindEvents();
        this.setupVideo();
        this.isInitialized = true;
        console.log('🎬 Colab Video Manager inicializado (modo original)');
    }

    setupElements() {
        this.video = document.getElementById('colab-video');
        this.container = document.getElementById('colab-video-container');

        if (!this.video || !this.container) {
            console.error('❌ Elementos do vídeo Colab não encontrados');
            return;
        }
    }

    bindEvents() {
        if (!this.video) return;

        // Eventos básicos do vídeo
        this.video.addEventListener('loadedmetadata', () => {
            this.showVideoReady();
        });

        this.video.addEventListener('error', (e) => {
            this.handleVideoError(e);
        });

        this.video.addEventListener('ended', () => {
            this.handleVideoEnd();
        });
    }

    setupVideo() {
        if (!this.video) return;

        // Configurar vídeo como no site original
        this.video.playsinline = true;
        this.video.autoplay = true;
        this.video.muted = true;
        this.video.loop = true;
        this.video.controls = false; // Sem controles personalizados

        console.log('🎬 Vídeo Colab configurado (modo original)');
    }

    handleVideoEnd() {
        console.log('🏁 Vídeo Colab finalizado');

        // Como o vídeo está em loop, ele reiniciará automaticamente
        if (this.video.loop) {
            console.log('🔄 Vídeo Colab reiniciando (loop)');
        }
    }

    handleVideoError(event) {
        console.error('❌ Erro no vídeo Colab:', event);

        // Mostrar fallback
        const fallback = this.container.querySelector('.video-fallback');
        if (fallback) {
            fallback.style.display = 'block';
        }
    }

    showVideoReady() {
        console.log('✅ Vídeo Colab pronto para reprodução (modo original)');

        // Log das propriedades do vídeo como no site original
        console.log('📊 Propriedades do vídeo Colab:', {
            autoplay: this.video.autoplay,
            muted: this.video.muted,
            loop: this.video.loop,
            playsinline: this.video.playsinline,
            controls: this.video.controls,
            duration: this.video.duration,
            videoWidth: this.video.videoWidth,
            videoHeight: this.video.videoHeight
        });
    }

    // Métodos públicos simples
    getVideoInfo() {
        if (!this.video) return null;

        return {
            duration: this.video.duration,
            currentTime: this.video.currentTime,
            isPlaying: !this.video.paused,
            isMuted: this.video.muted,
            isLooping: this.video.loop,
            videoWidth: this.video.videoWidth,
            videoHeight: this.video.videoHeight
        };
    }
}

// Auto-inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.colabVideoManager = new ColabVideoManager();
    });
} else {
    window.colabVideoManager = new ColabVideoManager();
}
