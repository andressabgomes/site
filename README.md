# Cajá - Tecnologia Artesanal

Transformando ideias em inovação digital através de desenvolvimento de MVP, software personalizado e consultoria em tecnologia.

## 🏗️ Estrutura do Projeto

```
├── .github/           ← Configurações do GitHub
├── .vscode/          ← Configurações do VS Code
├── assets/           ← Arquivos de mídia, fontes, ícones, etc.
│   ├── img/         ← Imagens do projeto
│   ├── fonts/       ← Fontes personalizadas
│   ├── videos/      ← Vídeos e animações
│   └── icons/       ← Ícones e SVGs
├── docs/            ← Documentação do projeto
│   ├── README.md
│   ├── THEME_COLOR_FIX.md
│   └── ...          ← Outros arquivos de documentação
├── node_modules/    ← Dependências do Node.js
├── public/          ← Arquivos que vão "puros" para o servidor
│   ├── index.html   ← Arquivo HTML principal
│   ├── manifest.json
│   ├── robots.txt
│   ├── sitemap.xml
│   └── sw.js        ← Service Worker
├── src/             ← Código-fonte (JS, CSS, componentes)
│   ├── styles/      ← Arquivos CSS/SCSS
│   ├── js/          ← Scripts JavaScript
│   ├── components/  ← Componentes reutilizáveis
│   └── services/    ← Serviços e APIs
├── dist/            ← Saída do build (gerado automaticamente)
├── .gitignore
├── package.json
├── build.js         ← Script de build personalizado
├── vite.config.js   ← Configuração do Vite
└── README.md        ← Este arquivo
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js 16+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone [url-do-repositorio]
cd cajait_dev-main-2

# Instale as dependências
npm install
```

### Desenvolvimento

```bash
# Inicie o servidor de desenvolvimento
npm run dev

# Ou use o Vite diretamente
npx vite
```

### Build para Produção

```bash
# Build otimizado
npm run build

# Ou use o script personalizado
node build.js
```

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Build Tools**: Vite, Sass
- **Libraries**: GSAP, Three.js, Swiper, AOS
- **PWA**: Service Worker, Manifest
- **Performance**: Lazy loading, Code splitting

## 📁 Organização dos Arquivos

### `assets/`

- **img/**: Imagens, logos, screenshots
- **videos/**: Vídeos de demonstração e animações
- **fonts/**: Fontes personalizadas
- **icons/**: Ícones SVG e PNG

### `src/`

- **styles/**: Todos os arquivos CSS/SCSS organizados por funcionalidade
- **js/**: Scripts JavaScript organizados por módulos
- **components/**: Componentes reutilizáveis
- **services/**: APIs e serviços backend

### `public/`

- **index.html**: Página principal
- **manifest.json**: Configuração PWA
- **sw.js**: Service Worker
- **robots.txt**: Configuração SEO
- **sitemap.xml**: Mapa do site

## 🎨 Sistema de Design

O projeto utiliza um sistema de design modular com:

- Variáveis CSS customizadas
- Componentes reutilizáveis
- Animações otimizadas
- Suporte a tema escuro/claro
- Compatibilidade cross-browser

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build
npm run lint         # Linting do código
npm run format       # Formatação do código
```

## 📱 PWA Features

- ✅ Service Worker para cache offline
- ✅ Manifest para instalação
- ✅ Compatibilidade cross-browser
- ✅ Performance otimizada
- ✅ SEO otimizado

## 🌐 Compatibilidade

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers

## 📄 Licença

Este projeto é propriedade da Cajá - Tecnologia Artesanal.

## 📞 Contato

- **Email**: <andressa@cajait.com>
- **Instagram**: [@caja.it](https://instagram.com/caja.it)
- **Site**: [cajait.com](https://cajait.com)

---

**Cajá - Transformando ideias em inovação digital** 🚀
