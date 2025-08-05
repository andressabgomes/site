# 🎨 Efeitos de Clip-Path - Documentação

## 📋 **Visão Geral**

Este documento descreve a implementação dos efeitos de clip-path para criar sobreposições visuais elegantes, especificamente o efeito "projetado" na seção hero.

---

## 🎯 **Objetivo**

Criar um efeito visual onde o vídeo hero tem um recorte inclinado na base, permitindo que a seção seguinte sobreponha o vídeo de forma elegante.

---

## 🛠️ **Implementação Técnica**

### **1. Clip-Path Polygon**

```css
clip-path: polygon(
    0%   0%,    /* Canto superior esquerdo */
    100% 0%,    /* Canto superior direito */
    100% 80%,   /* Ponto de início do recorte (direita) */
    90%  100%,  /* Ponto final do recorte (direita) */
    0%   100%   /* Canto inferior esquerdo */
);
```

### **2. Estrutura HTML**

```html
<section class="hero">
    <div class="jarallax-container">
        <video class="hero-video" autoplay muted loop>
            <source src="video.mp4" type="video/mp4">
        </video>
        <div class="video-overlay"></div>
    </div>
    <div class="hero-content">
        <!-- Conteúdo do hero -->
    </div>
</section>

<section class="services">
    <!-- Seção que sobrepõe o vídeo -->
</section>
```

### **3. CSS Principal**

```css
/* Container principal */
.hero {
    position: relative;
    overflow: visible !important;
    z-index: 10;
    padding: 6rem 0 0;
    min-height: 60vh;
}

/* Container do vídeo com recorte */
.jarallax-container {
    position: relative;
    width: 100%;
    height: 60vh;
    overflow: visible;
    clip-path: polygon(0% 0%, 100% 0%, 100% 80%, 90% 100%, 0% 100%);
    margin-bottom: -5rem;
}

/* Vídeo com full-cover */
.hero-video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: auto;
    height: 100%;
    object-fit: cover;
    z-index: 1;
}

/* Seção sobreposta */
.services {
    margin-top: -5rem;
    position: relative;
    z-index: 5;
    background: #fff;
    padding-top: 6rem;
    border-radius: 20px 20px 0 0;
    box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.1);
}
```

---

## 📱 **Responsividade**

### **Desktop (> 768px)**

```css
clip-path: polygon(0% 0%, 100% 0%, 100% 80%, 90% 100%, 0% 100%);
margin-top: -5rem;
```

### **Tablet (≤ 768px)**

```css
clip-path: polygon(0% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%);
margin-top: -3rem;
```

### **Mobile (≤ 480px)**

```css
clip-path: polygon(0% 0%, 100% 0%, 100% 90%, 80% 100%, 0% 100%);
margin-top: -2rem;
```

---

## 🎨 **Efeitos Visuais**

### **1. Sombra Sutil**

```css
box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.1);
```

### **2. Bordas Arredondadas**

```css
border-radius: 20px 20px 0 0;
```

### **3. Animação Hover**

```css
.hero-video:hover {
    transform: translate(-50%, -50%) scale(1.02);
    transition: transform 0.3s ease-in-out;
}
```

---

## 🔧 **Configuração**

### **1. Arquivos CSS**

- `public/css/clip-path-effects.css` - Estilos principais
- `public/css/video-player.css` - Estilos do player

### **2. Inclusão no HTML**

```html
<link rel="stylesheet" href="css/clip-path-effects.css">
```

### **3. Dependências**

- CSS3 clip-path support
- Position: absolute/relative
- Z-index management

---

## 🌐 **Compatibilidade**

### **Navegadores Suportados**

- ✅ Chrome 55+
- ✅ Firefox 54+
- ✅ Safari 12+
- ✅ Edge 79+

### **Fallback para Navegadores Antigos**

```css
@supports not (clip-path: polygon(0% 0%, 100% 0%, 100% 80%, 90% 100%, 0% 100%)) {
    .jarallax-container {
        clip-path: none;
        border-radius: 0 0 20px 20px;
    }

    .services {
        margin-top: 0;
        border-radius: 0;
    }
}
```

---

## 🎮 **Personalização**

### **1. Ajustar o Recorte**

Modifique os valores do clip-path:

```css
clip-path: polygon(
    0%   0%,    /* Canto superior esquerdo */
    100% 0%,    /* Canto superior direito */
    100% 75%,   /* Ajuste a altura do recorte */
    85%  100%,  /* Ajuste a inclinação */
    0%   100%   /* Canto inferior esquerdo */
);
```

### **2. Alterar a Sobreposição**

```css
.services {
    margin-top: -3rem; /* Menos sobreposição */
    /* ou */
    margin-top: -7rem; /* Mais sobreposição */
}
```

### **3. Modificar Cores e Sombras**

```css
.services {
    background: #f8f9fa; /* Cor de fundo diferente */
    box-shadow: 0 -15px 40px rgba(0, 0, 0, 0.15); /* Sombra mais intensa */
}
```

---

## 🐛 **Solução de Problemas**

### **1. Vídeo não aparece**

- Verifique se o z-index está correto
- Confirme se o overflow está como `visible`
- Teste se o vídeo tem dimensões válidas

### **2. Sobreposição não funciona**

- Verifique se a margem negativa está aplicada
- Confirme se o z-index da seção seguinte é menor
- Teste se o background está definido

### **3. Clip-path não funciona**

- Verifique a compatibilidade do navegador
- Confirme se o CSS está sendo carregado
- Teste com valores mais simples primeiro

---

## 📊 **Performance**

### **Otimizações**

- Use `transform` em vez de `top/left` para animações
- Aplique `will-change: transform` para elementos animados
- Use `contain: layout` para containers isolados

### **Monitoramento**

- Verifique o FPS no DevTools
- Monitore o uso de GPU
- Teste em dispositivos de baixo desempenho

---

## 🚀 **Próximos Passos**

### **Melhorias Futuras**

- [ ] Animações mais suaves
- [ ] Suporte a múltiplos recortes
- [ ] Efeitos parallax
- [ ] Interatividade com scroll

### **Expansões**

- [ ] Outros formatos de clip-path
- [ ] Efeitos 3D
- [ ] Animações CSS mais avançadas
- [ ] Suporte a SVG paths

---

## 📞 **Suporte**

Para dúvidas ou problemas:

1. Verifique a compatibilidade do navegador
2. Teste com valores mais simples
3. Consulte a documentação do CSS clip-path
4. Verifique o console para erros

---

**🎨 O efeito de clip-path está implementado e funcionando!**
