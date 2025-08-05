/**
 * Video Compatibility Manager
 * Gerencia compatibilidade de vídeo entre diferentes navegadores
 * Especialmente para o atributo playsinline que não é suportado pelo Firefox
 */

(function() {
    'use strict';

    // Detecta se o navegador suporta o atributo playsinline
    function supportsPlaysInline() {
        const video = document.createElement('video');
        return 'playsInline' in video || 'webkit-playsinline' in video;
    }

    // Detecta se é Firefox
    function isFirefox() {
        const ua = navigator.userAgent.toLowerCase();
        return ua.indexOf('firefox') > -1 || ua.indexOf('fxios') > -1;
    }

        // Aplica atributos de compatibilidade de vídeo
    function applyVideoCompatibility() {
        const videos = document.querySelectorAll('video[data-playsinline="true"]');

        videos.forEach(video => {
            const container = video.closest('.hero-video-container');

            // Remove o atributo data-playsinline
            video.removeAttribute('data-playsinline');

            // Aplica playsinline apenas se suportado
            if (supportsPlaysInline()) {
                video.setAttribute('playsinline', '');
                video.setAttribute('webkit-playsinline', '');
                console.log('✅ Atributo playsinline aplicado para navegador compatível');
            } else {
                console.log('ℹ️ Navegador sem suporte a playsinline detectado - usando fallback');

                // Para Firefox, aplica configurações alternativas
                if (isFirefox()) {
                    // Garante que o vídeo seja reproduzido inline no Firefox
                    video.style.position = 'relative';
                    video.style.zIndex = '1';

                    // Adiciona listener para garantir reprodução inline
                    video.addEventListener('loadedmetadata', function() {
                        if (video.paused) {
                            video.play().catch(function(error) {
                                console.log('⚠️ Erro ao reproduzir vídeo no Firefox:', error);
                                // Fallback: tenta reproduzir sem autoplay
                                video.removeAttribute('autoplay');
                            });
                        }
                    });
                }
            }

            // Gerenciamento de estados do vídeo
            if (container) {
                // Marca como carregado quando o vídeo carrega
                video.addEventListener('loadeddata', function() {
                    container.classList.add('video-loaded');
                    container.classList.remove('video-error');
                });

                // Marca como erro se o vídeo falhar
                video.addEventListener('error', function() {
                    container.classList.add('video-error');
                    container.classList.remove('video-loaded');
                    console.log('❌ Erro ao carregar vídeo - mostrando fallback');
                });

                // Marca como carregado quando começa a reproduzir
                video.addEventListener('play', function() {
                    container.classList.add('video-loaded');
                    container.classList.remove('video-error');
                });
            }
        });
    }

    // Executa quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyVideoCompatibility);
    } else {
        applyVideoCompatibility();
    }

    // Executa novamente quando a página estiver completamente carregada
    window.addEventListener('load', applyVideoCompatibility);

    // Exporta funções para uso global se necessário
    window.VideoCompatibility = {
        supportsPlaysInline: supportsPlaysInline,
        isFirefox: isFirefox,
        applyVideoCompatibility: applyVideoCompatibility
    };

    console.log('🎥 Video Compatibility Manager carregado');
})();
