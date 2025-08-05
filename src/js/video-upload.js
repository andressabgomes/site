/**
 * Video Upload Manager
 * Gerencia o upload e exibição de vídeos MP4
 */

class VideoUploadManager {
    constructor() {
        this.uploadInput = null;
        this.videoContainer = null;
        this.placeholder = null;
        this.isInitialized = false;

        this.init();
    }

    init() {
        this.setupElements();
        this.bindEvents();
        this.setupDragAndDrop();
        this.isInitialized = true;
        console.log('📹 Video Upload Manager inicializado');
    }

    setupElements() {
        this.uploadInput = document.getElementById('video-upload');
        this.videoContainer = document.getElementById('custom-video-container');
        this.placeholder = this.videoContainer.querySelector('.video-placeholder');
    }

    bindEvents() {
        if (this.uploadInput) {
            this.uploadInput.addEventListener('change', (e) => {
                this.handleFileSelect(e.target.files[0]);
            });
        }
    }

    setupDragAndDrop() {
        if (this.placeholder) {
            // Prevenir comportamento padrão do navegador
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                this.placeholder.addEventListener(eventName, this.preventDefaults, false);
                document.body.addEventListener(eventName, this.preventDefaults, false);
            });

            // Eventos de drag and drop
            ['dragenter', 'dragover'].forEach(eventName => {
                this.placeholder.addEventListener(eventName, () => {
                    this.placeholder.classList.add('drag-over');
                }, false);
            });

            ['dragleave', 'drop'].forEach(eventName => {
                this.placeholder.addEventListener(eventName, () => {
                    this.placeholder.classList.remove('drag-over');
                }, false);
            });

            // Evento de drop
            this.placeholder.addEventListener('drop', (e) => {
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    this.handleFileSelect(files[0]);
                }
            }, false);
        }
    }

    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    handleFileSelect(file) {
        if (!file) return;

        // Validar tipo de arquivo
        if (!this.isValidVideoFile(file)) {
            this.showError('Por favor, selecione um arquivo de vídeo válido (MP4, WebM, OGG)');
            return;
        }

        // Validar tamanho (máximo 100MB)
        if (file.size > 100 * 1024 * 1024) {
            this.showError('O arquivo é muito grande. Tamanho máximo: 100MB');
            return;
        }

        this.loadVideo(file);
    }

    isValidVideoFile(file) {
        const validTypes = [
            'video/mp4',
            'video/webm',
            'video/ogg',
            'video/quicktime'
        ];
        return validTypes.includes(file.type);
    }

    async loadVideo(file) {
        try {
            this.showLoading();

            // Criar URL do arquivo
            const videoUrl = URL.createObjectURL(file);

            // Informações do vídeo
            const videoInfo = await this.getVideoInfo(videoUrl);

            // Criar elemento de vídeo
            this.createVideoElement(videoUrl, videoInfo, file.name);

            this.hideLoading();
            this.showSuccess(`Vídeo "${file.name}" carregado com sucesso!`);

        } catch (error) {
            console.error('Erro ao carregar vídeo:', error);
            this.hideLoading();
            this.showError('Erro ao carregar o vídeo. Tente novamente.');
        }
    }

    getVideoInfo(videoUrl) {
        return new Promise((resolve, reject) => {
            const video = document.createElement('video');

            video.addEventListener('loadedmetadata', () => {
                resolve({
                    duration: video.duration,
                    width: video.videoWidth,
                    height: video.videoHeight,
                    aspectRatio: video.videoWidth / video.videoHeight
                });
            });

            video.addEventListener('error', () => {
                reject(new Error('Erro ao carregar metadados do vídeo'));
            });

            video.src = videoUrl;
        });
    }

    createVideoElement(videoUrl, videoInfo, fileName) {
        // Limpar container
        this.videoContainer.innerHTML = '';

        // Criar elemento de vídeo
        const video = document.createElement('video');
        video.src = videoUrl;
        video.preload = 'metadata';
        video.muted = true;
        video.controls = false; // Usar controles personalizados

        // Adicionar classes
        this.videoContainer.classList.add('large', 'centered', 'glow');
        this.videoContainer.id = 'custom-video-player';

        // Criar controles personalizados
        const controls = this.createCustomControls();

        // Adicionar elementos ao container
        this.videoContainer.appendChild(video);
        this.videoContainer.appendChild(controls);

        // Configurar o vídeo no VideoPlayer
        if (window.videoPlayer) {
            window.videoPlayer.setupVideo(video, this.videoContainer);
        }

        // Adicionar informações do arquivo
        this.addVideoInfo(videoInfo, fileName);

        console.log('🎬 Vídeo criado:', {
            url: videoUrl,
            info: videoInfo,
            fileName: fileName
        });
    }

    createCustomControls() {
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
                <button class="video-remove-btn" aria-label="Remover vídeo" title="Remover vídeo">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        `;

        // Adicionar evento para remover vídeo
        const removeBtn = controls.querySelector('.video-remove-btn');
        if (removeBtn) {
            removeBtn.addEventListener('click', () => {
                this.removeVideo();
            });
        }

        return controls;
    }

    addVideoInfo(videoInfo, fileName) {
        const infoDiv = document.createElement('div');
        infoDiv.className = 'video-info-overlay';
        infoDiv.innerHTML = `
            <div class="video-info">
                <h4>${fileName}</h4>
                <p>Duração: ${this.formatTime(videoInfo.duration)} | Resolução: ${videoInfo.width}x${videoInfo.height}</p>
            </div>
        `;

        this.videoContainer.appendChild(infoDiv);

        // Remover após 3 segundos
        setTimeout(() => {
            if (infoDiv.parentNode) {
                infoDiv.remove();
            }
        }, 3000);
    }

    removeVideo() {
        // Limpar container
        this.videoContainer.innerHTML = '';

        // Restaurar placeholder
        this.restorePlaceholder();

        // Limpar input
        if (this.uploadInput) {
            this.uploadInput.value = '';
        }

        console.log('🗑️ Vídeo removido');
    }

    restorePlaceholder() {
        this.videoContainer.innerHTML = `
            <div class="video-placeholder">
                <div class="video-upload-area">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14,2 14,8 20,8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10,9 9,9 8,9"></polyline>
                    </svg>
                    <h4>Selecione um Vídeo MP4</h4>
                    <p>Clique para anexar seu vídeo ou arraste e solte aqui</p>
                    <input type="file" id="video-upload" accept="video/mp4,video/webm,video/ogg" style="display: none;">
                    <button class="btn-primary upload-btn" onclick="document.getElementById('video-upload').click()">
                        Escolher Arquivo
                    </button>
                </div>
            </div>
        `;

        // Reconfigurar elementos
        this.setupElements();
        this.bindEvents();
        this.setupDragAndDrop();
    }

    showLoading() {
        if (this.placeholder) {
            this.placeholder.classList.add('loading');
            const uploadArea = this.placeholder.querySelector('.video-upload-area');
            if (uploadArea) {
                uploadArea.innerHTML = `
                    <div class="loading-spinner">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10" stroke-dasharray="31.416" stroke-dashoffset="31.416">
                                <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
                                <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
                            </circle>
                        </svg>
                    </div>
                    <h4>Carregando vídeo...</h4>
                    <p>Aguarde enquanto processamos seu arquivo</p>
                `;
            }
        }
    }

    hideLoading() {
        if (this.placeholder) {
            this.placeholder.classList.remove('loading');
        }
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `video-notification ${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Animar entrada
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Remover após 3 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }

    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
}

// Auto-inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.videoUploadManager = new VideoUploadManager();
    });
} else {
    window.videoUploadManager = new VideoUploadManager();
}
