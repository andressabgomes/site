// =============================================================================
// MAIN.JS - Arquivo principal de JavaScript
// =============================================================================

// Importações dos managers
import { VideoManager } from './managers/VideoManager.js';
import { AnimationManagerCDN } from './managers/AnimationManager-CDN.js';

// Importações dos utilitários
import { initAnimations } from './animations/init-animations.js';
import { loadAnimationLibraries } from './animations/animation-cdn.js';

// Importações dos componentes
import { initContactForm } from './components/ContactForm.js';
import { initHelpChat } from './components/HelpChat.js';
import { initMobileMenu } from './components/MobileMenu.js';

// Importações dos serviços
import { initServices } from './services/index.js';

// Importações dos utilitários
import { ScrollManager } from './utils/ScrollManager.js';
import { SmoothScroll } from './utils/SmoothScroll.js';

// =============================================================================
// CONFIGURAÇÃO GLOBAL
// =============================================================================

// Configurações globais
window.CAJAIT_CONFIG = {
  debug: process.env.NODE_ENV === 'development',
  api: {
    baseUrl: process.env.NODE_ENV === 'production' 
      ? 'https://api.cajait.com.br' 
      : 'http://localhost:3000/api',
    timeout: 10000
  },
  animations: {
    enabled: true,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
  },
  performance: {
    lazyLoad: true,
    preloadVideos: false,
    maxConcurrentVideos: 2
  }
};

// =============================================================================
// INICIALIZAÇÃO DA APLICAÇÃO
// =============================================================================

class CajaitApp {
  constructor() {
    this.isInitialized = false;
    this.modules = new Map();
    this.init();
  }

  async init() {
    try {
      console.log('🚀 Iniciando Cajá IT Application...');
      
      // Aguarda o DOM estar pronto
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.setup());
      } else {
        this.setup();
      }
    } catch (error) {
      console.error('❌ Erro ao inicializar aplicação:', error);
    }
  }

  async setup() {
    try {
      // 1. Carregar bibliotecas de animação
      await this.loadLibraries();
      
      // 2. Inicializar managers
      await this.initManagers();
      
      // 3. Inicializar componentes
      await this.initComponents();
      
      // 4. Inicializar serviços
      await this.initServices();
      
      // 5. Configurar utilitários
      this.setupUtils();
      
      // 6. Finalizar inicialização
      this.finalize();
      
    } catch (error) {
      console.error('❌ Erro no setup da aplicação:', error);
    }
  }

  async loadLibraries() {
    console.log('📚 Carregando bibliotecas...');
    
    try {
      await loadAnimationLibraries();
      console.log('✅ Bibliotecas carregadas com sucesso');
    } catch (error) {
      console.warn('⚠️ Erro ao carregar bibliotecas:', error);
    }
  }

  async initManagers() {
    console.log('🎛️ Inicializando managers...');
    
    try {
      // Video Manager
      const videoManager = new VideoManager();
      this.modules.set('videoManager', videoManager);
      
      // Animation Manager
      const animationManager = new AnimationManagerCDN();
      this.modules.set('animationManager', animationManager);
      
      console.log('✅ Managers inicializados');
    } catch (error) {
      console.error('❌ Erro ao inicializar managers:', error);
    }
  }

  async initComponents() {
    console.log('🧩 Inicializando componentes...');
    
    try {
      // Inicializar animações
      await initAnimations();
      
      // Inicializar formulário de contato
      initContactForm();
      
      // Inicializar chat de ajuda
      initHelpChat();
      
      // Inicializar menu mobile
      initMobileMenu();
      
      console.log('✅ Componentes inicializados');
    } catch (error) {
      console.error('❌ Erro ao inicializar componentes:', error);
    }
  }

  async initServices() {
    console.log('🔧 Inicializando serviços...');
    
    try {
      await initServices();
      console.log('✅ Serviços inicializados');
    } catch (error) {
      console.error('❌ Erro ao inicializar serviços:', error);
    }
  }

  setupUtils() {
    console.log('🛠️ Configurando utilitários...');
    
    try {
      // Scroll Manager
      const scrollManager = new ScrollManager();
      this.modules.set('scrollManager', scrollManager);
      
      // Smooth Scroll
      const smoothScroll = new SmoothScroll();
      this.modules.set('smoothScroll', smoothScroll);
      
      console.log('✅ Utilitários configurados');
    } catch (error) {
      console.error('❌ Erro ao configurar utilitários:', error);
    }
  }

  finalize() {
    console.log('🎉 Aplicação inicializada com sucesso!');
    
    this.isInitialized = true;
    
    // Emitir evento de inicialização
    window.dispatchEvent(new CustomEvent('cajait:ready', {
      detail: { modules: this.modules }
    }));
    
    // Adicionar classe ao body
    document.body.classList.add('cajait-ready');
    
    // Performance monitoring
    if (window.CAJAIT_CONFIG.debug) {
      this.setupPerformanceMonitoring();
    }
  }

  setupPerformanceMonitoring() {
    // Monitor de performance
    if ('performance' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            console.log('📊 Performance:', {
              loadTime: entry.loadEventEnd - entry.loadEventStart,
              domContentLoaded: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
              firstPaint: performance.getEntriesByType('paint')[0]?.startTime
            });
          }
        }
      });
      
      observer.observe({ entryTypes: ['navigation', 'paint'] });
    }
  }

  // Métodos públicos para acessar módulos
  getModule(name) {
    return this.modules.get(name);
  }

  getAllModules() {
    return this.modules;
  }

  // Método para reinicializar módulos específicos
  async reinitModule(moduleName) {
    const module = this.modules.get(moduleName);
    if (module && typeof module.reinit === 'function') {
      await module.reinit();
      console.log(`🔄 Módulo ${moduleName} reinicializado`);
    }
  }
}

// =============================================================================
// INICIALIZAÇÃO GLOBAL
// =============================================================================

// Criar instância global da aplicação
window.CajaitApp = new CajaitApp();

// Exportar para uso em módulos
export default window.CajaitApp;

// =============================================================================
// HANDLERS GLOBAIS
// =============================================================================

// Handler para mudança de preferência de movimento reduzido
window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
  window.CAJAIT_CONFIG.animations.reducedMotion = e.matches;
  
  if (window.CajaitApp.isInitialized) {
    const animationManager = window.CajaitApp.getModule('animationManager');
    if (animationManager) {
      animationManager.updateReducedMotion(e.matches);
    }
  }
});

// Handler para visibilidade da página
document.addEventListener('visibilitychange', () => {
  if (window.CajaitApp.isInitialized) {
    const videoManager = window.CajaitApp.getModule('videoManager');
    if (videoManager) {
      if (document.hidden) {
        videoManager.pauseAllVideos();
      } else {
        videoManager.resumeVisibleVideos();
      }
    }
  }
});

// Handler para redimensionamento da janela
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (window.CajaitApp.isInitialized) {
      // Recalcular posições e tamanhos
      window.dispatchEvent(new CustomEvent('cajait:resize'));
    }
  }, 250);
});

// Handler para erros não capturados
window.addEventListener('error', (event) => {
  if (window.CAJAIT_CONFIG.debug) {
    console.error('❌ Erro não capturado:', event.error);
  }
});

// Handler para promessas rejeitadas
window.addEventListener('unhandledrejection', (event) => {
  if (window.CAJAIT_CONFIG.debug) {
    console.error('❌ Promise rejeitada:', event.reason);
  }
}); 