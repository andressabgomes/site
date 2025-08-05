/**
 * Animation CDN - Versão CDN das bibliotecas de animação
 * Para uso sem npm, carregando via CDN
 */

// Carrega GSAP e plugins via CDN
function loadGSAP() {
    return new Promise((resolve) => {
        // Carrega GSAP core
        const gsapScript = document.createElement('script');
        gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        gsapScript.onload = () => {
            // Carrega ScrollTrigger
            const scrollTriggerScript = document.createElement('script');
            scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
            scrollTriggerScript.onload = () => {
                // Carrega TextPlugin
                const textPluginScript = document.createElement('script');
                textPluginScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/TextPlugin.min.js';
                textPluginScript.onload = () => {
                    // Registra plugins
                    if (window.gsap) {
                        window.gsap.registerPlugin(window.ScrollTrigger, window.TextPlugin);
                        resolve(window.gsap);
                    }
                };
                document.head.appendChild(textPluginScript);
            };
            document.head.appendChild(scrollTriggerScript);
        };
        document.head.appendChild(gsapScript);
    });
}

// Carrega Lenis via CDN
function loadLenis() {
    return new Promise((resolve) => {
        const lenisScript = document.createElement('script');
        lenisScript.src = 'https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.27/bundled/lenis.min.js';
        lenisScript.onload = () => {
            resolve(window.Lenis);
        };
        document.head.appendChild(lenisScript);
    });
}

// Carrega Three.js via CDN
function loadThreeJS() {
    return new Promise((resolve) => {
        const threeScript = document.createElement('script');
        threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r158/three.min.js';
        threeScript.onload = () => {
            resolve(window.THREE);
        };
        document.head.appendChild(threeScript);
    });
}

// Carrega todas as bibliotecas
async function loadAnimationLibraries() {
    try {
        console.log('📦 Carregando bibliotecas de animação...');
        
        const [gsap, Lenis, THREE] = await Promise.all([
            loadGSAP(),
            loadLenis(),
            loadThreeJS()
        ]);
        
        console.log('✅ Bibliotecas carregadas com sucesso');
        
        // Disponibiliza globalmente
        window.gsap = gsap;
        window.Lenis = Lenis;
        window.THREE = THREE;
        
        return { gsap, Lenis, THREE };
    } catch (error) {
        console.error('❌ Erro ao carregar bibliotecas:', error);
        return null;
    }
}

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', async () => {
    const libraries = await loadAnimationLibraries();
    
    if (libraries) {
        // Inicializa o AnimationManager
        if (window.AnimationManager) {
            window.animationManager = new window.AnimationManager();
        }
    }
});

// Exporta para uso
window.loadAnimationLibraries = loadAnimationLibraries; 