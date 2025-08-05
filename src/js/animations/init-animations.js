/**
 * init-animations.js - Inicializador do Sistema de Animações
 * Conecta AnimationManager com VideoManager para uma experiência completa
 */

// Aguarda todas as bibliotecas carregarem
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 Inicializando sistema de animações...');
    
    try {
        // Aguarda bibliotecas carregarem
        await waitForLibraries();
        
        // Inicializa AnimationManager
        if (window.AnimationManagerCDN) {
            window.animationManager = new window.AnimationManagerCDN();
        }
        
        // Inicializa VideoManager se disponível
        if (window.videoManager) {
            console.log('📹 VideoManager já inicializado');
        }
        
        // Configura integrações
        setupIntegrations();
        
        // Adiciona animações customizadas
        addCustomAnimations();
        
        console.log('✅ Sistema de animações inicializado com sucesso!');
        
    } catch (error) {
        console.error('❌ Erro ao inicializar sistema de animações:', error);
    }
});

/**
 * Aguarda bibliotecas carregarem
 */
function waitForLibraries() {
    return new Promise((resolve) => {
        const checkLibraries = () => {
            if (window.gsap && window.ScrollTrigger && window.Lenis) {
                resolve();
            } else {
                setTimeout(checkLibraries, 100);
            }
        };
        checkLibraries();
    });
}

/**
 * Configura integrações entre sistemas
 */
function setupIntegrations() {
    // Integra VideoManager com AnimationManager
    if (window.videoManager && window.animationManager) {
        // Evento quando vídeo começa a reproduzir
        document.addEventListener('videoPlay', (event) => {
            const { video, videoId } = event.detail;
            
            // Adiciona animação de entrada para o vídeo
            window.gsap.fromTo(video, 
                { scale: 0.95, opacity: 0 },
                { 
                    scale: 1, 
                    opacity: 1, 
                    duration: 0.8, 
                    ease: 'power2.out' 
                }
            );
            
            // Anima container do vídeo
            const container = video.closest('.video-container, .video-grid-item');
            if (container) {
                window.gsap.to(container, {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            }
        });
        
        // Evento quando vídeo pausa
        document.addEventListener('videoPause', (event) => {
            const { video } = event.detail;
            
            // Efeito sutil de pausa
            window.gsap.to(video, {
                scale: 0.98,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    }
    
    // Configura scroll progress indicator compatível com Lenis
    setupScrollProgress();
    
    // Integra com AOS (Animate On Scroll)
    if (window.AOS) {
        window.AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }
    
    // Configura observador de performance
    setupPerformanceObserver();
}

/**
 * Adiciona animações customizadas
 */
function addCustomAnimations() {
    // Animação do logo
    const logo = document.querySelector('.logo-img');
    if (logo) {
        window.gsap.fromTo(logo,
            { scale: 0.8, opacity: 0 },
            { 
                scale: 1, 
                opacity: 1, 
                duration: 1, 
                ease: 'back.out(1.7)',
                delay: 0.2
            }
        );
    }
    
    // Animação dos botões de navegação
    const navButtons = document.querySelectorAll('.nav-link, .btn-primary');
    navButtons.forEach((button, index) => {
        window.gsap.fromTo(button,
            { y: 20, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 0.6, 
                ease: 'power2.out',
                delay: 0.5 + (index * 0.1)
            }
        );
    });
    
    // Animação dos números de estatísticas
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach((stat, index) => {
        const finalValue = stat.textContent;
        const numericValue = parseInt(finalValue);
        
        if (!isNaN(numericValue)) {
            window.gsap.fromTo(stat,
                { textContent: 0 },
                {
                    textContent: numericValue,
                    duration: 2,
                    ease: 'power2.out',
                    delay: 0.8 + (index * 0.2),
                    scrollTrigger: {
                        trigger: stat,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    },
                    snap: { textContent: 1 }
                }
            );
        }
    });
    
    // Animação do formulário de contato
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const formElements = contactForm.querySelectorAll('input, textarea, select, button');
        formElements.forEach((element, index) => {
            window.gsap.fromTo(element,
                { x: -50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: 'power2.out',
                    delay: index * 0.1,
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 90%',
                        end: 'bottom 10%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
    }
    
    // Animação do footer
    const footer = document.querySelector('.footer');
    if (footer) {
        const footerElements = footer.querySelectorAll('.footer-section, .footer-brand');
        footerElements.forEach((element, index) => {
            window.gsap.fromTo(element,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.out',
                    delay: index * 0.2,
                    scrollTrigger: {
                        trigger: footer,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
    }
}

/**
 * Configura observador de performance
 */
function setupPerformanceObserver() {
    // Monitora FPS
    let frameCount = 0;
    let lastTime = performance.now();
    
    function checkFPS() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - lastTime >= 1000) {
            const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
            
            if (fps < 30) {
                console.warn(`⚠️ FPS baixo detectado: ${fps}`);
                // Reduz qualidade das animações
                reduceAnimationQuality();
            }
            
            frameCount = 0;
            lastTime = currentTime;
        }
        
        requestAnimationFrame(checkFPS);
    }
    
    requestAnimationFrame(checkFPS);
    
    // Monitora uso de memória
    if ('memory' in performance) {
        setInterval(() => {
            const memory = performance.memory;
            const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
            const totalMB = Math.round(memory.totalJSHeapSize / 1048576);
            
            if (usedMB > 100) {
                console.warn(`⚠️ Uso de memória alto: ${usedMB}MB / ${totalMB}MB`);
                // Limpa recursos desnecessários
                cleanupResources();
            }
        }, 10000);
    }
}

/**
 * Reduz qualidade das animações em caso de performance ruim
 */
function reduceAnimationQuality() {
    if (window.animationManager) {
        // Pausa animações Three.js
        if (window.animationManager.scene) {
            window.animationManager.scene.visible = false;
        }
        
        // Reduz número de partículas
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            if (index > 3) {
                particle.style.display = 'none';
            }
        });
        
        // Simplifica animações GSAP
        window.gsap.globalTimeline.timeScale(0.5);
    }
}

/**
 * Limpa recursos desnecessários
 */
function cleanupResources() {
    // Limpa animações não visíveis
    if (window.animationManager) {
        window.animationManager.animations.forEach((anim, id) => {
            const element = anim.element;
            if (element && !isElementVisible(element)) {
                window.animationManager.removeCustomAnimation(id);
            }
        });
    }
    
    // Força garbage collection se disponível
    if (window.gc) {
        window.gc();
    }
}

/**
 * Verifica se elemento está visível
 */
function isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth
    );
}

/**
 * Funções utilitárias globais
 */
window.AnimationUtils = {
    getStatus() {
        return {
            animationManager: !!window.animationManager,
            videoManager: !!window.videoManager,
            lenis: !!window.lenis,
            gsap: !!window.gsap,
            scrollTrigger: !!window.ScrollTrigger
        };
    },
    
    pauseAll() {
        if (window.animationManager) {
            window.animationManager.pauseAllAnimations();
        }
        if (window.videoManager) {
            window.videoManager.pauseAllVideos();
        }
        if (window.lenis) {
            window.lenis.stop();
        }
    },
    
    resumeAll() {
        if (window.animationManager) {
            window.animationManager.resumeAllAnimations();
        }
        if (window.videoManager) {
            window.videoManager.resumeAllVideos();
        }
        if (window.lenis) {
            window.lenis.start();
        }
    }
};

/**
 * Configura scroll progress indicator compatível com Lenis
 */
function setupScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    if (!scrollProgress) return;
    
    // Se Lenis estiver disponível, usa ele para o progress
    if (window.lenis) {
        window.lenis.on('scroll', (e) => {
            const progress = e.progress;
            window.gsap.to(scrollProgress, {
                duration: 0.1,
                width: `${progress * 100}%`,
                ease: 'power2.out'
            });
        });
    } else {
        // Fallback para scroll nativo
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            window.gsap.to(scrollProgress, {
                duration: 0.1,
                width: `${scrollPercent}%`,
                ease: 'power2.out'
            });
        });
    }
    
    console.log('📊 Scroll progress indicator configurado');
} 