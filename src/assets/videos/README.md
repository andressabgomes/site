# Vídeos Otimizados - Cajá

Esta pasta contém vídeos otimizados para o site da Cajá, seguindo as melhores práticas de performance e acessibilidade.

## Especificações dos Vídeos

### Formato e Qualidade
- **Formatos**: MP4 (H.264) e WebM (VP9)
- **Duração**: 5-10 segundos
- **Loop**: Contínuo
- **Áudio**: Sem áudio (muted)
- **Resolução**: 1920x1080 (Full HD) para desktop, 1280x720 (HD) para mobile

### Otimizações
- **Compressão**: Otimizada para web
- **Tamanho**: Máximo 2MB por vídeo
- **Codec**: H.264 para MP4, VP9 para WebM
- **Bitrate**: 1-2 Mbps para desktop, 500-800 Kbps para mobile

## Estrutura de Arquivos

```
assets/videos/
├── hero-bg.mp4          # Vídeo de fundo do hero (10s)
├── hero-bg.webm         # Versão WebM do hero
├── service-demo.mp4     # Demo dos serviços (8s)
├── service-demo.webm    # Versão WebM do demo
├── mvp-showcase.mp4     # Showcase MVP (6s)
├── mvp-showcase.webm    # Versão WebM do MVP
├── software-demo.mp4    # Demo software (7s)
├── software-demo.webm   # Versão WebM do software
└── README.md           # Esta documentação
```

## Como Adicionar Novos Vídeos

1. **Prepare o vídeo**:
   - Duração: 5-10 segundos
   - Sem áudio
   - Resolução: 1920x1080 ou 1280x720
   - Formato: MP4 (H.264)

2. **Otimize o vídeo**:
   ```bash
   # Usando FFmpeg para otimização
   ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium -movflags +faststart -an output.mp4
   
   # Criar versão WebM
   ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -an output.webm
   ```

3. **Adicione ao HTML**:
   ```html
   <video 
       data-video-manager
       data-autoplay="true"
       data-muted="true"
       data-loop="true"
       data-lazy="true"
       data-no-audio="true"
       class="optimized-video">
       <source src="assets/videos/seu-video.mp4" type="video/mp4">
       <source src="assets/videos/seu-video.webm" type="video/webm">
   </video>
   ```

## Performance

- **Lazy Loading**: Vídeos carregam apenas quando visíveis
- **Pause em Abas Inativas**: Economiza recursos do navegador
- **Adaptação de Qualidade**: Reduz qualidade em conexões lentas
- **Preload**: Apenas metadata para economizar banda

## Acessibilidade

- **Sem Áudio**: Não interfere com leitores de tela
- **Controles**: Suporte a teclado
- **Redução de Movimento**: Respeita preferências do usuário
- **Fallback**: Imagem estática para navegadores sem suporte

## Compatibilidade

- **Desktop**: Chrome, Firefox, Safari, Edge
- **Mobile**: iOS Safari, Chrome Mobile, Samsung Internet
- **Fallback**: Imagem estática para navegadores antigos 