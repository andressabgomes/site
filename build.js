#!/usr/bin/env node

// ===================================
// CAJÁ - SCRIPT DE BUILD OTIMIZADO
// ===================================

const fs = require('fs');
const { execSync } = require('child_process');

console.log('🚀 Iniciando build otimizado da Cajá...\n');

// Configurações
const config = {
  src: {
    styles: 'src/styles',
    js: 'src/js',
    components: 'src/components',
    services: 'src/services'
  },
  assets: {
    img: 'assets/img',
    videos: 'assets/videos',
    icons: 'assets/icons',
    fonts: 'assets/fonts'
  },
  public: {
    root: 'public',
    dist: 'dist',
    images: 'public/images',
    videos: 'public/videos'
  },
  output: {
    css: 'dist/css/main.min.css',
    js: 'dist/js/main.min.js'
  }
};

// Função para criar diretórios se não existirem
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Criado diretório: ${dir}`);
  }
}

// Função para executar comandos
function runCommand(command, description) {
  try {
    console.log(`⚙️  ${description}...`);
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} concluído\n`);
  } catch (error) {
    console.error(`❌ Erro em ${description}:`, error.message);
    process.exit(1);
  }
}

// Função para consolidar CSS
function buildCSS() {
  console.log('🎨 Consolidando CSS...');
  ensureDir('dist/css');

  const mainScssFile = 'src/styles/main.scss';

  if (fs.existsSync(mainScssFile)) {
    console.log('📁 Usando arquivo principal SCSS');
    const sassCommand = `sass ${mainScssFile}:${config.output.css} --style compressed --no-source-map`;
    runCommand(sassCommand, 'Compilação e minificação CSS');
  } else {
    console.log('📁 Arquivo principal não encontrado, usando arquivos individuais');

    const cssFiles = [
      'src/styles/base/variables.scss',
      'src/styles/base/base.css',
      'src/styles/components/components.css',
      'src/styles/components/video-styles.css',
      'src/styles/animations/ux-libraries.css',
      'src/styles/fix-layout.css',
      'src/styles/colabs-inspired.css',
      'src/styles/firefox-theme.css',
      'src/styles/style.css'
    ];

    const existingFiles = cssFiles.filter(file => fs.existsSync(file));

    if (existingFiles.length === 0) {
      console.log('⚠️  Nenhum arquivo CSS encontrado');
      return;
    }

    let combinedCSS = '';
    existingFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      combinedCSS += `/* ${file} */\n${content}\n\n`;
    });

    fs.writeFileSync(config.output.css, combinedCSS);
    console.log('✅ CSS combinado e salvo');
  }
}

// Função para consolidar JavaScript
function buildJS() {
  console.log('⚡ Consolidando JavaScript...');
  ensureDir('dist/js');

  try {
    execSync('npx esbuild --version', { stdio: 'ignore' });
  } catch (error) {
    console.log('📦 Instalando esbuild...');
    runCommand('npm install --save-dev esbuild', 'Instalação do esbuild');
  }

  const mainBuildCommand = `npx esbuild src/js/main.js --bundle --minify --outfile=${config.output.js} --sourcemap`;
  runCommand(mainBuildCommand, 'Build JavaScript principal');
}

// Função para otimizar imagens
function optimizeImages() {
  console.log('🖼️  Otimizando imagens...');
  ensureDir(config.public.images);

  try {
    execSync('npx imagemin --version', { stdio: 'ignore' });
  } catch (error) {
    console.log('📦 Instalando imagemin...');
    runCommand('npm install --save-dev imagemin imagemin-cli', 'Instalação do imagemin');
  }

  if (fs.existsSync(config.assets.img)) {
    const imageminCommand = `npx imagemin ${config.assets.img}/* --out-dir=${config.public.images} --use=imagemin-gifsicle --use=imagemin-jpegtran`;
    runCommand(imageminCommand, 'Otimização de imagens');
  } else {
    console.log('⚠️  Diretório de imagens não encontrado');
  }
}

// Função para copiar vídeos
function copyVideos() {
  console.log('🎥 Copiando vídeos...');
  ensureDir(config.public.videos);

  if (fs.existsSync(config.assets.videos)) {
    const copyCommand = `cp -r ${config.assets.videos}/* ${config.public.videos}/`;
    runCommand(copyCommand, 'Cópia de vídeos');
  } else {
    console.log('⚠️  Diretório de vídeos não encontrado');
  }
}

// Função para gerar arquivos de configuração
function generateConfigFiles() {
  console.log('📝 Gerando arquivos de configuração...');

  if (fs.existsSync('public/sitemap.xml')) {
    let sitemap = fs.readFileSync('public/sitemap.xml', 'utf8');
    const today = new Date().toISOString().split('T')[0];
    sitemap = sitemap.replace(/<lastmod>.*?<\/lastmod>/g, `<lastmod>${today}</lastmod>`);
    fs.writeFileSync('public/sitemap.xml', sitemap);
    console.log('✅ Sitemap.xml atualizado');
  }

  const version = {
    version: '2.0.0',
    buildDate: new Date().toISOString(),
    buildNumber: Date.now()
  };

  fs.writeFileSync('public/version.json', JSON.stringify(version, null, 2));
  console.log('✅ version.json gerado');
}

// Função para validar build
function validateBuild() {
  console.log('🔍 Validando build...');

  const requiredFiles = [
    config.output.css,
    config.output.js,
    'public/sw.js',
    'public/.htaccess',
    'public/robots.txt',
    'public/sitemap.xml'
  ];

  const missingFiles = requiredFiles.filter(file => !fs.existsSync(file));

  if (missingFiles.length > 0) {
    console.log('❌ Arquivos ausentes:');
    missingFiles.forEach(file => console.log(`   - ${file}`));
    return false;
  }

  console.log('✅ Build validado com sucesso');
  return true;
}

// Função para gerar relatório de build
function generateBuildReport() {
  const report = {
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    files: {
      css: fs.existsSync(config.output.css) ? fs.statSync(config.output.css).size : 0,
      js: fs.existsSync(config.output.js) ? fs.statSync(config.output.js).size : 0
    },
    totalSize: 0
  };

  report.totalSize = Object.values(report.files).reduce((sum, size) => sum + size, 0);

  fs.writeFileSync('public/build-report.json', JSON.stringify(report, null, 2));
  console.log('📊 Relatório de build gerado');

  console.log('\n📋 RESUMO DO BUILD:');
  console.log(`   CSS: ${(report.files.css / 1024).toFixed(2)} KB`);
  console.log(`   JS: ${(report.files.js / 1024).toFixed(2)} KB`);
  console.log(`   Total: ${(report.totalSize / 1024).toFixed(2)} KB`);
}

// Função principal
function main() {
  try {
    buildCSS();
    buildJS();
    optimizeImages();
    copyVideos();
    copyStaticFiles();
    generateConfigFiles();

    if (validateBuild()) {
      generateBuildReport();
      console.log('\n🎉 Build concluído com sucesso!');
      console.log('🌐 Site pronto para produção em: public/');
    } else {
      console.log('\n❌ Build falhou na validação');
      process.exit(1);
    }

  } catch (error) {
    console.error('\n💥 Erro durante o build:', error.message);
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = {
  buildCSS,
  buildJS,
  optimizeImages,
  copyVideos,
  generateConfigFiles,
  validateBuild,
  generateBuildReport
};


// Função para copiar arquivos estáticos
function copyStaticFiles() {
  console.log("📄 Copiando arquivos estáticos...");
  const staticFiles = [
    { src: 'src/js/sw.js', dest: 'public/sw.js' },
    { src: 'robots.txt', dest: 'public/robots.txt' },
    { src: 'sitemap.xml', dest: 'public/sitemap.xml' },
    { src: '.htaccess', dest: 'public/.htaccess' }
  ];

  staticFiles.forEach(file => {
    if (fs.existsSync(file.src)) {
      runCommand(`cp ${file.src} ${file.dest}`, `Copiando ${file.src}`);
    } else {
      console.log(`⚠️  Arquivo estático não encontrado: ${file.src}`);
      // Criar arquivos vazios se não existirem para evitar falha no build
      if (file.src === 'robots.txt') {
        fs.writeFileSync('public/robots.txt', 'User-agent: *\nDisallow:');
        console.log('✅ robots.txt criado.');
      } else if (file.src === 'sitemap.xml') {
        fs.writeFileSync('public/sitemap.xml', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>');
        console.log('✅ sitemap.xml criado.');
      } else if (file.src === '.htaccess') {
        fs.writeFileSync('public/.htaccess', '');
        console.log('✅ .htaccess criado.');
      }
    }
  });
  console.log("✅ Arquivos estáticos copiados.\n");
}


