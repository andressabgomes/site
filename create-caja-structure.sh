#!/bin/bash

# ===================================
# SCRIPT PARA CRIAR ESTRUTURA CAJÁ
# ===================================

echo "🚀 Criando estrutura do projeto Cajá..."
echo ""

# Verificar se estamos em um diretório vazio
if [ "$(ls -A)" ]; then
    echo "⚠️  Aviso: Este diretório não está vazio!"
    echo "   O script criará a estrutura mesmo assim."
    echo ""
fi

# Criar diretórios principais
echo "📁 Criando diretórios..."
mkdir -p .github/workflows
mkdir -p .vscode
mkdir -p assets/img
mkdir -p assets/videos
mkdir -p assets/icons
mkdir -p assets/fonts
mkdir -p docs
mkdir -p node_modules
mkdir -p public
mkdir -p src/styles/base
mkdir -p src/styles/components
mkdir -p src/styles/animations
mkdir -p src/js/managers
mkdir -p src/js/webgl
mkdir -p src/js/animations
mkdir -p src/components
mkdir -p src/services
mkdir -p dist

# Criar arquivos na raiz
echo "📄 Criando arquivos na raiz..."
touch .gitignore
touch .hintrc
touch .htaccess
touch .prettierrc
touch .stylelintrc.js
touch .eslintrc.js
touch build.js
touch database_hostinger.php
touch database.php
touch lighthouserc.js
touch monitor-webgl.sh
touch package.json
touch README.md
touch test-theme-compatibility.js
touch test-video-system.js
touch vendor-entry.js
touch vite.config.js
touch .gitconfig

# Criar arquivos em public/
echo "📄 Criando arquivos em public/..."
touch public/index.html
touch public/manifest.json
touch public/robots.txt
touch public/sitemap.xml
touch public/sw.js
touch public/offline.html

# Criar arquivos em src/styles/
echo "📄 Criando arquivos em src/styles/..."
touch src/styles/main.scss
touch src/styles/main.min.css
touch src/styles/design-system.css
touch src/styles/theme-support.css
touch src/styles/firefox-theme.css
touch src/styles/firefox-video-fixes.css
touch src/styles/theme-compatibility.css
touch src/styles/webgl-styles.css
touch src/styles/video-player.css
touch src/styles/clip-path-effects.css
touch src/styles/full-bleed-video.css
touch src/styles/hero-white-background.css
touch src/styles/fixes.css
touch src/styles/overlay-fixes.css
touch src/styles/carousel-fixes.css
touch src/styles/style.css
touch src/styles/colabs-inspired.css
touch src/styles/fix-layout.css

# Criar arquivos em src/styles/base/
touch src/styles/base/base.css
touch src/styles/base/variables.scss

# Criar arquivos em src/styles/components/
touch src/styles/components/components.css
touch src/styles/components/video-styles.css

# Criar arquivos em src/styles/animations/
touch src/styles/animations/ux-libraries.css

# Criar arquivos em src/js/
echo "📄 Criando arquivos em src/js/..."
touch src/js/main.js
touch src/js/main.min.js
touch src/js/theme-detection.js
touch src/js/firefox-theme-fix.js
touch src/js/theme-compatibility.js
touch src/js/video-player.js
touch src/js/video-upload.js
touch src/js/colab-video-manager.js
touch src/js/video-compatibility.js
touch src/js/design-system.js
touch src/js/app.js
touch src/js/ux-libraries.js
touch src/js/video-examples.js
touch src/js/ScrollManager.js
touch src/js/SmoothScroll.js

# Criar arquivos em src/js/managers/
touch src/js/managers/AnimationManager.js
touch src/js/managers/AnimationManager-CDN.js
touch src/js/managers/VideoManager.js

# Criar arquivos em src/js/webgl/
touch src/js/webgl/WebGLManager.js
touch src/js/webgl/GeometryRenderer.js
touch src/js/webgl/PostProcessor.js
touch src/js/webgl/WebGLSystem.js
touch src/js/webgl/init-webgl.js
touch src/js/webgl-test.js

# Criar arquivos em src/js/animations/
touch src/js/animations/animation-cdn.js
touch src/js/animations/init-animations.js

# Criar arquivos em src/components/
touch src/components/ContactForm.js
touch src/components/MobileMenu.js

# Criar arquivos em src/services/
touch src/services/index.js
touch src/services/contact_hostinger.php
touch src/services/contact.php
touch src/services/test_hostinger.php
touch src/services/create_table.sql

# Criar arquivos em docs/
echo "📄 Criando arquivos em docs/..."
touch docs/README.md
touch docs/THEME_COLOR_FIX.md
touch docs/FIREFOX_VIDEO_FIX.md
touch docs/SOLUCAO_THEME_COLOR.md
touch docs/FIREFOX_THEME_FIX.md
touch docs/COLABS_VIDEO_IMPLEMENTATION.md
touch docs/HERO_WHITE_BACKGROUND_IMPLEMENTATION.md
touch docs/CLIP_PATH_IMPLEMENTED.md
touch docs/COLAB_VIDEO_SIMPLIFIED.md
touch docs/COLAB_VIDEO_READY.md
touch docs/VIDEO_SYSTEM_READY.md
touch docs/STATUS_PROJETO.md
touch docs/TESTE_WEBGL.md
touch docs/REVISAO_SITE_CAJA.md
touch docs/README_ATUALIZADO.md
touch docs/REORGANIZATION_SUMMARY.md
touch docs/ANIMATION_SYSTEM.md
touch docs/CLIP_PATH_EFFECTS.md
touch docs/FIREFOX_THEME_FIX.md
touch docs/README.md
touch docs/VIDEO_SYSTEM.md
touch docs/WEBGL_SYSTEM.md

# Criar arquivos em .vscode/
touch .vscode/settings.json
touch .vscode/extensions.json

# Criar arquivos em .github/
touch .github/workflows/ci.yml

echo ""
echo "✅ Estrutura do projeto Cajá criada com sucesso!"
echo ""
echo "📁 Diretórios criados:"
echo "   ├── .github/"
echo "   │   └── workflows/"
echo "   ├── .vscode/"
echo "   ├── assets/"
echo "   │   ├── img/"
echo "   │   ├── videos/"
echo "   │   ├── icons/"
echo "   │   └── fonts/"
echo "   ├── docs/"
echo "   ├── node_modules/"
echo "   ├── public/"
echo "   ├── src/"
echo "   │   ├── styles/"
echo "   │   │   ├── base/"
echo "   │   │   ├── components/"
echo "   │   │   └── animations/"
echo "   │   ├── js/"
echo "   │   │   ├── managers/"
echo "   │   │   ├── webgl/"
echo "   │   │   └── animations/"
echo "   │   ├── components/"
echo "   │   └── services/"
echo "   └── dist/"
echo ""
echo "📄 Arquivos criados:"
echo "   - 17 arquivos de configuração na raiz"
echo "   - 6 arquivos em public/"
echo "   - 18 arquivos em src/styles/"
echo "   - 3 arquivos em src/styles/base/"
echo "   - 2 arquivos em src/styles/components/"
echo "   - 1 arquivo em src/styles/animations/"
echo "   - 15 arquivos em src/js/"
echo "   - 3 arquivos em src/js/managers/"
echo "   - 6 arquivos em src/js/webgl/"
echo "   - 2 arquivos em src/js/animations/"
echo "   - 2 arquivos em src/components/"
echo "   - 5 arquivos em src/services/"
echo "   - 22 arquivos em docs/"
echo "   - 2 arquivos em .vscode/"
echo "   - 1 arquivo em .github/workflows/"
echo ""
echo "🚀 Próximos passos:"
echo "   1. Execute 'npm install' para instalar as dependências"
echo "   2. Configure o package.json com as dependências necessárias"
echo "   3. Adicione o conteúdo aos arquivos conforme necessário"
echo "   4. Execute 'npm run dev' para iniciar o desenvolvimento"
echo ""
echo "📚 Documentação disponível em: docs/"
echo "🔧 Configurações em: .vscode/, .github/, etc."
echo ""
