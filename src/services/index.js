// =============================================================================
// SERVICES INDEX - Organização centralizada dos serviços
// =============================================================================

// Importações dos serviços
import { ApiService } from './ApiService.js';
import { AnalyticsService } from './AnalyticsService.js';
import { StorageService } from './StorageService.js';
import { ValidationService } from './ValidationService.js';

// =============================================================================
// INICIALIZAÇÃO DOS SERVIÇOS
// =============================================================================

export async function initServices() {
  console.log('🔧 Inicializando serviços...');
  
  try {
    // Inicializar serviços em paralelo
    const services = await Promise.allSettled([
      ApiService.init(),
      AnalyticsService.init(),
      StorageService.init(),
      ValidationService.init()
    ]);
    
    // Verificar resultados
    services.forEach((result, index) => {
      const serviceNames = ['ApiService', 'AnalyticsService', 'StorageService', 'ValidationService'];
      if (result.status === 'fulfilled') {
        console.log(`✅ ${serviceNames[index]} inicializado`);
      } else {
        console.warn(`⚠️ ${serviceNames[index]} falhou:`, result.reason);
      }
    });
    
    console.log('✅ Serviços inicializados');
    
  } catch (error) {
    console.error('❌ Erro ao inicializar serviços:', error);
  }
}

// =============================================================================
// EXPORTAÇÕES
// =============================================================================

export {
  ApiService,
  AnalyticsService,
  StorageService,
  ValidationService
}; 