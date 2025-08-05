# Cajá IT - Plataforma de Desenvolvimento

Uma plataforma moderna de desenvolvimento e inovação tecnológica, construída com as melhores práticas de desenvolvimento web.

## 🚀 Características

- **Arquitetura Modular**: Estrutura organizada e escalável
- **Performance Otimizada**: Lazy loading, code splitting e otimizações avançadas
- **Animações Fluidas**: GSAP + ScrollTrigger + Lenis para experiências suaves
- **Vídeos Otimizados**: Sistema de vídeos com lazy loading e controles de performance
- **Design System**: Sistema de design consistente com variáveis SCSS
- **Acessibilidade**: Suporte completo a acessibilidade e preferências de movimento reduzido
- **Responsivo**: Design totalmente responsivo para todos os dispositivos

## 📁 Estrutura do Projeto

```
cajait-dev/
├── public/                 # Arquivos públicos (HTML, CSS, JS compilados)
│   ├── index.html         # Página principal
│   ├── css/              # Estilos compilados
│   ├── js/               # JavaScript compilado
│   └── images/           # Imagens otimizadas
├── src/                  # Código fonte
│   ├── css/             # Estilos SCSS
│   │   ├── base/        # Variáveis, reset, tipografia
│   │   ├── components/  # Componentes reutilizáveis
│   │   ├── animations/  # Animações e transições
│   │   └── main.scss    # Arquivo principal
│   ├── js/              # JavaScript modular
│   │   ├── managers/    # Gerenciadores (Video, Animation)
│   │   ├── components/  # Componentes React-like
│   │   ├── services/    # Serviços (API, Analytics, etc.)
│   │   ├── utils/       # Utilitários e helpers
│   │   ├── animations/  # Configurações de animação
│   │   └── main.js      # Arquivo principal
│   ├── assets/          # Assets (vídeos, imagens)
│   ├── php/             # Backend PHP
│   ├── config/          # Configurações
│   └── includes/        # Includes PHP
├── docs/                # Documentação
├── dist/                # Build de produção
└── node_modules/        # Dependências
```

## 🛠️ Tecnologias

### Frontend
- **HTML5**: Semântico e acessível
- **SCSS**: Sistema de design modular
- **JavaScript ES6+**: Modular e moderno
- **GSAP**: Animações de alta performance
- **Lenis**: Smooth scrolling
- **Three.js**: Efeitos 3D (quando necessário)

### Backend
- **PHP**: Processamento server-side
- **MySQL**: Banco de dados

### Ferramentas
- **Vite**: Build tool e dev server
- **Sass**: Pré-processador CSS
- **ESBuild**: Bundler JavaScript
- **ESLint**: Linting JavaScript
- **Stylelint**: Linting CSS

## 🚀 Instalação

### Pré-requisitos
- Node.js 18+ 
- PHP 8.0+
- MySQL 8.0+

### Setup

1. **Clone o repositório**
```bash
git clone https://github.com/cajait/cajait-dev.git
cd cajait-dev
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o ambiente**
```bash
cp src/config/database.example.php src/config/database.php
# Edite src/config/database.php com suas credenciais
```

4. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

O site estará disponível em `http://localhost:3000`

## 📝 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento (porta 3000) |
| `npm run dev:8000` | Servidor de desenvolvimento (porta 8000) |
| `npm run build` | Build de desenvolvimento |
| `npm run build:prod` | Build de produção otimizado |
| `npm run watch` | Watch mode para desenvolvimento |
| `npm run lint` | Linting JavaScript |
| `npm run lint:css` | Linting CSS |
| `npm run clean` | Limpa arquivos de build |
| `npm run analyze` | Análise do bundle |

## 🎨 Sistema de Design

### Cores
```scss
$primary-color: #2C5AA0;    // Azul principal
$secondary-color: #F7931E;  // Laranja
$accent-color: #00D4AA;     // Verde água
```

### Tipografia
```scss
$font-family-primary: 'Inter', sans-serif;
$font-family-secondary: 'Poppins', sans-serif;
```

### Breakpoints
```scss
$breakpoint-sm: 576px;
$breakpoint-md: 768px;
$breakpoint-lg: 992px;
$breakpoint-xl: 1200px;
$breakpoint-2xl: 1400px;
```

## 🎬 Sistema de Vídeos

### Configuração
```html
<video 
  data-video-manager
  preload="metadata"
  autoplay 
  muted 
  loop 
  playsinline>
  <source src="video.mp4" type="video/mp4">
  <source src="video.webm" type="video/webm">
</video>
```

### Controles Programáticos
```javascript
const videoManager = window.CajaitApp.getModule('videoManager');
videoManager.playVideo('video-id');
videoManager.pauseVideo('video-id');
```

## 🎭 Sistema de Animações

### Configuração
```html
<div data-fade data-fade-distance="50">
  Conteúdo animado
</div>
```

### Controles Programáticos
```javascript
const animationManager = window.CajaitApp.getModule('animationManager');
animationManager.playAnimation('animation-id');
```

## 📱 Componentes

### Formulário de Contato
```javascript
import { initContactForm } from './components/ContactForm.js';
initContactForm();
```

### Menu Mobile
```javascript
import { initMobileMenu } from './components/MobileMenu.js';
initMobileMenu();
```

### Chat de Ajuda
```javascript
import { initHelpChat } from './components/HelpChat.js';
initHelpChat();
```

## 🔧 Configuração

### Variáveis de Ambiente
```javascript
window.CAJAIT_CONFIG = {
  debug: true,
  api: {
    baseUrl: 'http://localhost:3000/api',
    timeout: 10000
  },
  animations: {
    enabled: true,
    reducedMotion: false
  }
};
```

### Performance
- Lazy loading automático de vídeos
- Pause em abas inativas
- Otimização de imagens
- Code splitting automático

## 🧪 Testes

```bash
npm test
```

## 📊 Analytics

O projeto inclui integração com:
- Google Analytics
- Performance monitoring
- Error tracking

## 🔒 Segurança

- Validação de entrada
- Sanitização de dados
- CSRF protection
- XSS prevention

## 🌐 Deploy

### Desenvolvimento
```bash
npm run build
php -S localhost:3000 -t public/
```

### Produção
```bash
npm run build:prod
# Upload dos arquivos da pasta dist/
```

## 📚 Documentação

- [Sistema de Vídeos](./docs/VIDEO_SYSTEM.md)
- [Sistema de Animações](./docs/ANIMATION_SYSTEM.md)
- [Guia de Componentes](./docs/COMPONENTS.md)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

- **Email**: contato@cajait.com.br
- **Website**: https://cajait.com.br
- **Documentação**: [docs/](./docs/)

## 🏆 Créditos

Desenvolvido com ❤️ pela equipe Cajá IT

---

**Cajá IT** - Transformando ideias em realidade digital 