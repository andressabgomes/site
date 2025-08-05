# Sistema WebGL - Cajá

## Visão Geral

O sistema WebGL implementado para o site da Cajá oferece efeitos visuais avançados e interativos, criando uma experiência moderna e envolvente para os usuários.

## Componentes do Sistema

### 1. WebGLManager.js

**Gerenciador de Partículas**

- Sistema de partículas animadas com 1000+ partículas
- Interação com mouse/touch
- Efeitos de atração e repulsão
- Cores dinâmicas baseadas na vida da partícula

**Características:**

- Shaders GLSL personalizados
- Animações suaves a 60fps
- Otimização automática de performance
- Suporte a dispositivos móveis

### 2. GeometryRenderer.js

**Renderizador de Geometrias 3D**

- Cubos e esferas animadas
- Iluminação dinâmica
- Efeitos de transparência
- Animações baseadas em tempo

**Geometrias Suportadas:**

- Cubos com rotação e translação
- Esferas com diferentes resoluções
- Sistema de matrizes 3D
- Projeção perspectiva

### 3. PostProcessor.js

**Sistema de Pós-Processamento**

- Blur gaussiano
- Efeito bloom
- Distorção de onda
- Framebuffers múltiplos

**Efeitos Disponíveis:**

- **Blur**: Suavização gaussiana configurável
- **Bloom**: Brilho em áreas claras
- **Distorção**: Ondas animadas
- **Composição**: Múltiplos efeitos simultâneos

### 4. WebGLSystem.js

**Sistema Principal**

- Integração de todos os componentes
- Gerenciamento de performance
- Controles de debug
- Detecção automática de capacidades

**Funcionalidades:**

- Auto-detecção de performance
- Controles em tempo real
- Otimização automática
- Fallbacks para dispositivos limitados

### 5. init-webgl.js

**Inicialização e Configuração**

- Carregamento automático
- Detecção de suporte WebGL
- Configurações de performance
- Painel de debug interativo

## Configurações de Performance

### Baixa Performance (Mobile/Dispositivos Antigos)

```javascript
{
    particleCount: 500,
    enableGeometry: false,
    enablePostProcessing: false,
    blurStrength: 0,
    bloomIntensity: 0,
    distortionStrength: 0
}
```

### Performance Média (Desktop Padrão)

```javascript
{
    particleCount: 1000,
    enableGeometry: true,
    enablePostProcessing: true,
    blurStrength: 0.3,
    bloomIntensity: 1.0,
    distortionStrength: 0.2
}
```

### Alta Performance (Gaming/Workstation)

```javascript
{
    particleCount: 2000,
    enableGeometry: true,
    enablePostProcessing: true,
    blurStrength: 0.5,
    bloomIntensity: 1.2,
    distortionStrength: 0.3
}
```

## Controles de Debug

### Teclas de Atalho

- **D**: Toggle painel de debug
- **P**: Toggle modo performance
- **R**: Reset configurações

### Painel de Debug

- Controle de quantidade de partículas (100-3000)
- Ajuste de intensidade de blur (0-2)
- Controle de bloom (0-3)
- Ajuste de distorção (0-1)
- Botões de toggle e reset

## Compatibilidade

### Navegadores Suportados

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Opera 47+

### Dispositivos

- ✅ Desktop (Windows, macOS, Linux)
- ✅ Mobile (iOS Safari, Chrome Mobile)
- ✅ Tablet (iPad, Android)

### Requisitos Mínimos

- WebGL 1.0 ou superior
- 2GB RAM
- GPU com suporte a shaders
- JavaScript habilitado

## Otimizações Implementadas

### Performance

- Detecção automática de capacidades
- LOD (Level of Detail) dinâmico
- Culling de objetos fora da tela
- Otimização de shaders
- Gerenciamento de memória

### Mobile

- Redução automática de partículas
- Desabilitação de efeitos pesados
- Touch events otimizados
- Responsividade adaptativa

### Acessibilidade

- Controles de intensidade
- Modo de baixa performance
- Fallbacks para navegadores antigos
- Indicadores visuais de status

## Efeitos Visuais

### Partículas

- Movimento fluido e natural
- Interação com cursor
- Cores dinâmicas (azul ciano → laranja)
- Efeitos de brilho e fade

### Geometrias 3D

- Cubos flutuantes animados
- Esferas com rotação
- Iluminação dinâmica
- Transparência configurável

### Pós-Processamento

- Blur gaussiano suave
- Bloom em áreas claras
- Distorção de onda animada
- Composição de múltiplos efeitos

## Integração com o Site

### Posicionamento

- Canvas fixo em tela cheia
- Z-index otimizado
- Opacidade configurável
- Pointer-events desabilitados

### Interação

- Resposta ao scroll
- Efeitos de parallax
- Animações baseadas em tempo
- Controles de performance

## Monitoramento e Debug

### Console Logs

```
🚀 WebGL System inicializado
🎯 Performance level: medium
✅ WebGL System criado com sucesso
🎬 WebGL System iniciado
```

### Indicadores Visuais

- Painel de debug (tecla D)
- Indicador de performance
- Status de carregamento
- Controles em tempo real

## Troubleshooting

### Problemas Comuns

**WebGL não suportado**

- Verificar drivers de GPU
- Atualizar navegador
- Habilitar aceleração de hardware

**Performance baixa**

- Reduzir quantidade de partículas
- Desabilitar pós-processamento
- Fechar outras abas

**Efeitos não aparecem**

- Verificar console para erros
- Recarregar página
- Limpar cache do navegador

### Logs de Erro

```javascript
// Erro de compilação de shader
console.error('Erro ao compilar shader:', gl.getShaderInfoLog(shader));

// Erro de linkagem de programa
console.error('Erro ao linkar programa:', gl.getProgramInfoLog(program));

// Framebuffer incompleto
console.error('Framebuffer incompleto');
```

## Futuras Melhorias

### Planejadas

- Efeitos de partículas mais complexos
- Geometrias procedurais
- Shaders personalizados
- Integração com Three.js

### Possíveis

- Efeitos de água
- Simulação de fumaça
- Partículas de fogo
- Efeitos de explosão

## Conclusão

O sistema WebGL implementado oferece uma base sólida para efeitos visuais avançados, com foco em performance e compatibilidade. A arquitetura modular permite fácil extensão e manutenção, enquanto os controles de debug facilitam o desenvolvimento e teste.
