# Sistema de Vídeos Otimizados - Cajá

## Visão Geral

Este sistema implementa vídeos otimizados para o site da Cajá com as seguintes características:

- **Formatos**: MP4 (H.264) e WebM (VP9)
- **Duração**: 5-10 segundos
- **Loop**: Contínuo
- **Áudio**: Sem áudio (muted)
- **Performance**: Lazy loading, pause em abas inativas
- **Animações**: GSAP + ScrollTrigger para movimento suave

## Estrutura de Arquivos

```
assets/
├── videos/                    # Vídeos otimizados
│   ├── hero-bg.mp4           # Vídeo de fundo do hero
│   ├── hero-bg.webm          # Versão WebM
│   ├── service-demo.mp4      # Demo dos serviços
│   ├── service-demo.webm     # Versão WebM
│   ├── mvp-showcase.mp4      # Showcase MVP
│   ├── mvp-showcase.webm     # Versão WebM
│   ├── software-demo.mp4     # Demo software
│   ├── software-demo.webm    # Versão WebM
│   └── README.md             # Documentação dos vídeos
├── js/
│   ├── VideoManager.js       # Gerenciador principal
│   └── video-examples.js     # Exemplos de uso
└── css/
    └── video-styles.css      # Estilos dos vídeos
```

## Como Usar

### 1. HTML Básico

```html
<video 
    data-video-manager
    data-autoplay="true"
    data-muted="true"
    data-loop="true"
    data-lazy="true"
    data-no-audio="true"
    class="optimized-video"
    preload="metadata">
    <source src="assets/videos/seu-video.mp4" type="video/mp4">
    <source src="assets/videos/seu-video.webm" type="video/webm">
    <!-- Fallback para navegadores sem suporte -->
    <div class="video-fallback">
        <div>Seu Título</div>
        <p>Sua descrição</p>
    </div>
</video>
```

### 2. JavaScript Programático

```javascript
// Registra vídeo manualmente
const video = document.querySelector('video');
window.videoManager.registerVideo(video, {
    id: 'meu-video',
    autoplay: true,
    muted: true,
    loop: true,
    lazy: true,
    noAudio: true,
    className: 'custom-video'
});

// Cria vídeo dinamicamente
const newVideo = VideoExamples.createVideoElement({
    sources: [
        { src: 'assets/videos/video.mp4', type: 'video/mp4' },
        { src: 'assets/videos/video.webm', type: 'video/webm' }
    ],
    fallback: '<div>Fallback content</div>',
    autoplay: true,
    muted: true,
    loop: true
});
```

### 3. Configurações Disponíveis

| Atributo | Tipo | Padrão | Descrição |
|----------|------|--------|-----------|
| `data-autoplay` | boolean | true | Reproduz automaticamente |
| `data-muted` | boolean | true | Sem áudio |
| `data-loop` | boolean | true | Loop contínuo |
| `data-lazy` | boolean | true | Lazy loading |
| `data-no-audio` | boolean | true | Remove áudio completamente |
| `preload` | string | metadata | Tipo de preload |

## Funcionalidades

### 1. Lazy Loading
Vídeos carregam apenas quando entram na viewport:

```javascript
// Configuração automática
data-lazy="true"

// Configuração manual
window.videoManager.registerVideo(video, { lazy: true });
```

### 2. Pause em Abas Inativas
Vídeos pausam automaticamente quando a aba não está visível:

```javascript
// Controle automático
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Vídeos pausam automaticamente
    } else {
        // Vídeos resumem automaticamente
    }
});
```

### 3. Animações GSAP
Integração com GSAP + ScrollTrigger para animações suaves:

```javascript
// Animação parallax para vídeos de fundo
gsap.to(video, {
    scrollTrigger: {
        trigger: videoContainer,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
            const progress = self.progress;
            video.style.transform = `scale(${1 + progress * 0.1})`;
        }
    }
});
```

### 4. Controles Customizados

```html
<div class="video-container">
    <video class="optimized-video">...</video>
    <div class="video-controls">
        <button type="button" aria-label="Pausar vídeo" title="Pausar vídeo">
            <svg>...</svg>
        </button>
    </div>
</div>
```

### 5. Performance Monitoring

```javascript
// Monitora uso de memória
if ('memory' in performance) {
    const memory = performance.memory;
    const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
    console.log(`Uso de memória: ${usedMB}MB`);
}

// Monitora FPS
function checkFPS() {
    // Implementação automática no VideoManager
}
```

## Otimizações de Performance

### 1. Compressão de Vídeo
```bash
# MP4 otimizado
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium -movflags +faststart -an output.mp4

# WebM otimizado
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -an output.webm
```

### 2. Adaptação de Qualidade
```javascript
// Reduz qualidade em conexões lentas
if (navigator.connection.effectiveType === '3g') {
    // Carrega versão de baixa qualidade
    video.src = video.src.replace('high-quality', 'low-quality');
}
```

### 3. Preload Otimizado
```html
<!-- Apenas metadata para economizar banda -->
<video preload="metadata">...</video>

<!-- Sem preload para lazy loading -->
<video preload="none">...</video>
```

## Acessibilidade

### 1. Suporte a Teclado
```javascript
// Navegação por teclado
video.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        e.preventDefault();
        video.paused ? video.play() : video.pause();
    }
});
```

### 2. Redução de Movimento
```css
@media (prefers-reduced-motion: reduce) {
    .optimized-video {
        animation: none;
        transition: none;
    }
}
```

### 3. Fallbacks
```html
<!-- Fallback para navegadores sem suporte -->
<div class="video-fallback">
    <div>Conteúdo Alternativo</div>
    <p>Descrição do vídeo</p>
</div>
```

## Eventos Disponíveis

```javascript
// Vídeo começa a reproduzir
document.addEventListener('videoPlay', (event) => {
    const { video, videoId } = event.detail;
    console.log(`Vídeo ${videoId} começou a reproduzir`);
});

// Vídeo pausa
video.addEventListener('pause', () => {
    console.log('Vídeo pausado');
});

// Vídeo termina
video.addEventListener('ended', () => {
    console.log('Vídeo terminou');
});

// Erro de carregamento
video.addEventListener('error', () => {
    console.error('Erro ao carregar vídeo');
});
```

## Compatibilidade

### Navegadores Suportados
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Chrome Mobile 60+

### Fallbacks
- Imagem estática para navegadores antigos
- Controles nativos para navegadores sem suporte a autoplay
- Mensagem informativa para usuários com JavaScript desabilitado

## Troubleshooting

### Problema: Vídeo não reproduz
```javascript
// Verifica se autoplay é suportado
video.play().catch(error => {
    console.warn('Autoplay não suportado:', error);
    // Mostra controles manuais
});
```

### Problema: Performance ruim
```javascript
// Reduz qualidade em dispositivos lentos
if (navigator.hardwareConcurrency < 4) {
    // Usa versão de baixa qualidade
}
```

### Problema: Memória alta
```javascript
// Limpa vídeos não visíveis
window.videoManager.pauseAllVideos();
```

## Exemplos Práticos

### 1. Vídeo de Fundo Hero
```html
<div class="video-background">
    <video 
        data-video-manager
        data-autoplay="true"
        data-muted="true"
        data-loop="true"
        data-lazy="false"
        class="hero-video optimized-video">
        <source src="assets/videos/hero-bg.mp4" type="video/mp4">
        <source src="assets/videos/hero-bg.webm" type="video/webm">
    </video>
    <div class="video-overlay"></div>
</div>
```

### 2. Grid de Vídeos
```html
<div class="video-grid">
    <div class="video-grid-item">
        <div class="video-container">
            <video data-video-manager class="optimized-video">
                <source src="assets/videos/demo.mp4" type="video/mp4">
            </video>
            <div class="video-controls">
                <button type="button" aria-label="Controle de vídeo">▶</button>
            </div>
        </div>
        <div class="video-info">
            <h3>Título do Vídeo</h3>
            <p>Descrição do vídeo</p>
        </div>
    </div>
</div>
```

### 3. Vídeo com Controles Customizados
```javascript
// Configura controles personalizados
VideoExamples.setupCustomControls();

// Adiciona eventos customizados
VideoExamples.setupVideoEvents();

// Monitora performance
VideoExamples.setupPerformanceMonitoring();
```

## Conclusão

Este sistema de vídeos otimizados oferece:

- ✅ Performance otimizada com lazy loading
- ✅ Controle automático de recursos
- ✅ Animações suaves com GSAP
- ✅ Acessibilidade completa
- ✅ Compatibilidade ampla
- ✅ Fallbacks robustos
- ✅ Monitoramento de performance

Para mais informações, consulte os arquivos de exemplo e a documentação específica de cada componente. 