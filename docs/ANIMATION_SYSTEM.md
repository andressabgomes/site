# Sistema de Animações Avançado - Cajá

## Visão Geral

Sistema completo de animações para o site da Cajá, integrando:

- **GSAP + ScrollTrigger**: Animações suaves baseadas no scroll
- **Lenis**: Smooth scroll para rolagem fluida
- **Three.js**: Efeitos 3D e partículas (quando necessário)

## Bibliotecas Instaladas

### Via NPM
```bash
npm install gsap @gsap/react lenis three
```

### Via CDN (Recomendado)
```html
<!-- GSAP Core -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

<!-- GSAP Plugins -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/TextPlugin.min.js"></script>

<!-- Lenis Smooth Scroll -->
<script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.27/bundled/lenis.min.js"></script>

<!-- Three.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r158/three.min.js"></script>
```

## Estrutura de Arquivos

```
assets/js/
├── AnimationManager.js          # Versão ES6 Modules
├── AnimationManager-CDN.js      # Versão CDN (recomendada)
├── animation-cdn.js             # Carregador de bibliotecas CDN
└── video-examples.js            # Exemplos de vídeos
```

## Como Usar

### 1. Inicialização Automática

O sistema é inicializado automaticamente quando o DOM carrega:

```javascript
// Inicialização automática
document.addEventListener('DOMContentLoaded', () => {
    window.animationManager = new AnimationManagerCDN();
});
```

### 2. Atributos de Animação no HTML

```html
<!-- Fade in/out -->
<div data-fade="up" data-fade-distance="50">
    Conteúdo que aparece deslizando de baixo
</div>

<div data-fade="left" data-fade-distance="100">
    Conteúdo que aparece deslizando da esquerda
</div>

<!-- Parallax -->
<div data-parallax="0.5">
    Elemento com efeito parallax
</div>

<img data-parallax-image="0.3" src="image.jpg" alt="Imagem com parallax">
```

### 3. JavaScript Programático

```javascript
// Adiciona animação customizada
window.animationManager.addCustomAnimation('meu-elemento', element, {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    }
});

// Remove animação
window.animationManager.removeCustomAnimation('meu-elemento');

// Pausa todas as animações
window.animationManager.pauseAllAnimations();

// Resume todas as animações
window.animationManager.resumeAllAnimations();
```

## Funcionalidades

### 1. Lenis Smooth Scroll

Rolagem suave e fluida:

```javascript
// Configuração do Lenis
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});
```

### 2. GSAP ScrollTrigger

Animações baseadas no scroll:

```javascript
// Animação de entrada
gsap.fromTo(element, 
    { y: 100, opacity: 0 },
    {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    }
);

// Efeito parallax
gsap.to(element, {
    yPercent: -50,
    ease: 'none',
    scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
    }
});
```

### 3. Three.js Efeitos

Efeitos 3D e partículas (apenas em dispositivos capazes):

```javascript
// Partículas flutuantes
const particles = new THREE.Points(geometry, material);
scene.add(particles);

// Anima partículas
gsap.to(particles.rotation, {
    y: Math.PI * 2,
    duration: 20,
    ease: 'none',
    repeat: -1
});
```

## Animações Implementadas

### 1. Hero Section

- **Título**: Fade in com rotação 3D
- **Descrição**: Fade in suave
- **CTA**: Fade in com escala e bounce
- **Partículas**: Movimento flutuante contínuo

### 2. Vídeos

- **Vídeo de Fundo**: Parallax suave
- **Grid de Vídeos**: Fade in escalonado
- **Hover Effects**: Escala suave

### 3. Textos

- **Títulos de Seção**: Fade in de baixo
- **Descrições**: Fade in com delay
- **Cards**: Rotação 3D + fade in

### 4. Efeitos Especiais

- **Parallax**: Elementos de fundo
- **Progress Bar**: Baseada no scroll
- **Partículas 3D**: Flutuantes (Three.js)

## Performance

### 1. Detecção Automática

```javascript
const performanceMode = {
    isMobile: window.innerWidth < 768,
    isLowEnd: navigator.hardwareConcurrency < 4,
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    useThreeJS: !isMobile && !isLowEnd && !prefersReducedMotion,
    useSmoothScroll: !prefersReducedMotion
};
```

### 2. Otimizações

- **Three.js**: Apenas em dispositivos capazes
- **Smooth Scroll**: Desabilitado se preferir redução de movimento
- **Partículas**: Reduzidas em dispositivos móveis
- **FPS Monitoring**: Alerta se performance baixa

### 3. Controle de Recursos

```javascript
// Pausa animações em abas inativas
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        animationManager.pauseAllAnimations();
    } else {
        animationManager.resumeAllAnimations();
    }
});
```

## Atributos HTML Disponíveis

### Fade Animations
```html
data-fade="up|down|left|right"
data-fade-distance="50"
```

### Parallax Effects
```html
data-parallax="0.5"
data-parallax-image="0.3"
```

### Scroll Triggers
```html
data-scroll-trigger="true"
data-scroll-start="top 80%"
data-scroll-end="bottom 20%"
```

## Eventos Disponíveis

```javascript
// Animação iniciada
element.addEventListener('animationStart', (e) => {
    console.log('Animação iniciada:', e.detail);
});

// Animação concluída
element.addEventListener('animationComplete', (e) => {
    console.log('Animação concluída:', e.detail);
});

// Scroll progress
window.addEventListener('scroll', (e) => {
    const progress = e.target.scrollTop / (e.target.scrollHeight - e.target.clientHeight);
    console.log('Progresso do scroll:', progress);
});
```

## Compatibilidade

### Navegadores Suportados
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- iOS Safari 12+

### Fallbacks
- Animações CSS para navegadores antigos
- Redução de movimento respeitada
- Performance adaptativa

## Troubleshooting

### Problema: Animações não funcionam
```javascript
// Verifica se as bibliotecas carregaram
if (window.gsap && window.ScrollTrigger) {
    console.log('Bibliotecas carregadas');
} else {
    console.error('Bibliotecas não carregadas');
}
```

### Problema: Performance ruim
```javascript
// Reduz qualidade das animações
if (navigator.hardwareConcurrency < 4) {
    // Desabilita Three.js
    // Reduz número de partículas
    // Simplifica animações
}
```

### Problema: Smooth scroll não funciona
```javascript
// Verifica se Lenis está disponível
if (window.Lenis) {
    console.log('Lenis disponível');
} else {
    console.error('Lenis não carregado');
}
```

## Exemplos Práticos

### 1. Animação de Texto
```html
<h2 class="section-title" data-fade="up" data-fade-distance="30">
    Título Animado
</h2>
```

### 2. Card com Hover
```html
<div class="service-card" data-fade="up">
    <div class="card-content">
        <h3>Serviço</h3>
        <p>Descrição</p>
    </div>
</div>
```

### 3. Imagem com Parallax
```html
<img src="background.jpg" data-parallax-image="0.4" alt="Fundo com parallax">
```

### 4. Seção com Efeitos
```html
<section class="hero" data-parallax="0.3">
    <div class="hero-content" data-fade="up">
        <h1>Título Principal</h1>
        <p>Descrição</p>
    </div>
</section>
```

## Conclusão

Este sistema de animações oferece:

- ✅ Animações suaves e profissionais
- ✅ Performance otimizada
- ✅ Compatibilidade ampla
- ✅ Controle granular
- ✅ Fallbacks robustos
- ✅ Integração perfeita com vídeos

Para mais informações, consulte a documentação específica de cada biblioteca:
- [GSAP Documentation](https://greensock.com/docs/)
- [Lenis Documentation](https://github.com/studio-freight/lenis)
- [Three.js Documentation](https://threejs.org/docs/) 