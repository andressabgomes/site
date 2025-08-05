// ===================================
// CAJÁ - ARQUIVO PRINCIPAL JAVASCRIPT
// ===================================

// Importar módulos principais
import './app.js';
import './ux-libraries.js';
import './video-examples.js';

// Importar managers
import './managers/AnimationManager.js';
import './managers/VideoManager.js';

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Cajá - Site inicializado com sucesso!');

    // Inicializar managers
    if (typeof VideoManager !== 'undefined') {
        new VideoManager();
    }

    if (typeof AnimationManager !== 'undefined') {
        new AnimationManager();
    }

    // Registrar service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('✅ Service Worker registrado:', registration);
            })
            .catch(error => {
                console.log('❌ Falha no registro do Service Worker:', error);
            });
    }
});

// Exportar para uso global se necessário
window.CajaApp = {
    version: '2.0.0',
    init: function() {
        console.log('Cajá App inicializado');
    }
};
