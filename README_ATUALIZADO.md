# 🚀 Cajá - Tecnologia Artesanal

> Transformando ideias em inovação digital

## 📋 Visão Geral

O site da Cajá é uma plataforma moderna e otimizada para apresentação de serviços de desenvolvimento de software e inovação digital. Implementado com as melhores práticas de performance, SEO e experiência do usuário.

## ✨ Características Principais

### 🎯 **Performance Otimizada**

- **Lighthouse Score**: >90 em todas as categorias
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1

### 🔧 **Tecnologias Utilizadas**

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Animações**: GSAP, AOS, Lenis
- **Carrosséis**: Flickity, Swiper
- **Efeitos**: Jarallax (parallax)
- **Build**: esbuild, Sass
- **PWA**: Service Worker, Manifest

### 📱 **PWA (Progressive Web App)**

- ✅ Instalável
- ✅ Funciona offline
- ✅ Push notifications
- ✅ Background sync
- ✅ Cache inteligente

### 🔍 **SEO Otimizado**

- ✅ Schema markup estruturado
- ✅ Meta tags completas
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Open Graph / Twitter Cards

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js >= 18.0.0
- npm >= 9.0.0
- PHP >= 7.4 (para servidor local)

### Instalação

```bash
# Clonar repositório
git clone https://github.com/cajait/cajait-dev.git
cd cajait-dev

# Instalar dependências
npm install

# Instalar dependências de desenvolvimento
npm install --save-dev sass esbuild imagemin-cli
```

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Servidor local na porta 3000
npm run dev:8000     # Servidor local na porta 8000
npm run watch        # Watch mode para CSS e JS

# Build
npm run build        # Build completo otimizado
npm run build:fast   # Build rápido (apenas CSS/JS)
npm run build:prod   # Build para produção
npm run deploy       # Build para deploy

# Otimização
npm run optimize     # Otimizar imagens
npm run optimize:images # Otimização avançada de imagens

# Limpeza
npm run clean        # Limpar arquivos gerados
npm run clean:all    # Limpeza completa

# Qualidade
npm run lint         # Lint JavaScript
npm run lint:css     # Lint CSS
npm run audit        # Auditoria de segurança
npm run update       # Atualizar dependências
```

## 📁 Estrutura do Projeto

```
cajait-dev/
├── public/                 # Arquivos públicos (produção)
│   ├── index.html         # Página principal
│   ├── css/               # CSS otimizado
│   ├── js/                # JavaScript otimizado
│   ├── images/            # Imagens otimizadas
│   ├── videos/            # Vídeos
│   ├── sw.js              # Service Worker
│   ├── manifest.json      # PWA Manifest
│   ├── .htaccess          # Configurações Apache
│   ├── robots.txt         # SEO
│   ├── sitemap.xml        # Sitemap
│   └── offline.html       # Página offline
├── src/                   # Código fonte
│   ├── css/               # Estilos fonte
│   ├── js/                # JavaScript fonte
│   ├── images/            # Imagens fonte
│   └── videos/            # Vídeos fonte
├── build.js               # Script de build
├── lighthouserc.js        # Configuração Lighthouse
└── package.json           # Dependências
```

## 🚀 Deploy

### Build para Produção

```bash
# Executar build completo
npm run build:prod

# Verificar arquivos gerados
ls -la public/
```

### Configurações de Servidor

O projeto inclui configurações otimizadas para:

- **Apache** (`.htaccess`)
- **Nginx** (configurações incluídas)
- **CDN** (Cloudflare, AWS CloudFront)

### Headers de Segurança

```apache
# Headers implementados
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Security-Policy: [configurado]
Referrer-Policy: strict-origin-when-cross-origin
```

## 📊 Monitoramento

### Lighthouse CI

```bash
# Instalar Lighthouse CI
npm install -g @lhci/cli

# Executar auditoria
lhci autorun
```

### Métricas de Performance

- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1
- **Total Blocking Time**: <300ms
- **Speed Index**: <2s

## 🔧 Configurações Avançadas

### Service Worker

O Service Worker implementa estratégias de cache:

- **Cache First**: Para arquivos estáticos
- **Network First**: Para API calls
- **Stale While Revalidate**: Para outros recursos

### Otimização de Imagens

```bash
# Otimização automática
npm run optimize:images

# Formatos suportados
- JPEG (qualidade 80%)
- PNG (qualidade 65-80%)
- WebP (conversão automática)
- SVG (minificação)
```

### Compressão

- **Gzip**: Ativado via `.htaccess`
- **Brotli**: Suportado (se disponível)
- **Cache**: Configurado para 1 ano (estáticos)

## 🐛 Troubleshooting

### Problemas Comuns

1. **Build falha**

   ```bash
   npm run clean
   npm install
   npm run build
   ```

2. **Performance baixa**

   ```bash
   npm run optimize:images
   npm run build:prod
   ```

3. **Service Worker não funciona**
   - Verificar HTTPS
   - Limpar cache do navegador
   - Verificar console para erros

### Logs e Debug

```bash
# Ver logs do build
npm run build 2>&1 | tee build.log

# Verificar tamanho dos arquivos
ls -lh public/css/
ls -lh public/js/
```

## 📈 Melhorias Implementadas

### ✅ **Performance**

- [x] CSS e JS minificados
- [x] Imagens otimizadas (WebP)
- [x] Lazy loading de vídeos
- [x] Cache inteligente
- [x] Compressão Gzip/Brotli

### ✅ **SEO**

- [x] Schema markup
- [x] Sitemap.xml
- [x] Robots.txt
- [x] Meta tags completas
- [x] Open Graph

### ✅ **PWA**

- [x] Service Worker
- [x] Manifest.json
- [x] Offline support
- [x] Push notifications
- [x] Background sync

### ✅ **Segurança**

- [x] Headers de segurança
- [x] CSP configurado
- [x] HTTPS redirect
- [x] XSS protection

### ✅ **Acessibilidade**

- [x] ARIA labels
- [x] Navegação por teclado
- [x] Contraste adequado
- [x] Screen reader friendly

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

- **Website**: [cajait.com](https://cajait.com)
- **Email**: <andressa@cajait.com>
- **Telefone**: (85) 99217-6713
- **WhatsApp**: [Clique aqui](https://wa.me/5585992176713)

---

**Desenvolvido com ❤️ pela equipe Cajá**
