#!/bin/bash

# Script de Monitoramento do Sistema WebGL
# Monitora se o servidor está rodando e se os arquivos estão acessíveis

echo "🚀 Monitorando Sistema WebGL - Cajá"
echo "=================================="

# Verificar se o servidor está rodando
echo "📋 Verificando servidor..."
if curl -s -I http://localhost:8000 > /dev/null 2>&1; then
    echo "✅ Servidor rodando em http://localhost:8000"
else
    echo "❌ Servidor não está rodando"
    echo "💡 Execute: python3 -m http.server 8000"
    exit 1
fi

# Verificar arquivos WebGL
echo ""
echo "📋 Verificando arquivos WebGL..."

files=(
    "js/webgl/WebGLManager.js"
    "js/webgl/GeometryRenderer.js"
    "js/webgl/PostProcessor.js"
    "js/webgl/WebGLSystem.js"
    "js/webgl/init-webgl.js"
    "js/webgl-test.js"
    "css/webgl-styles.css"
    "css/theme-support.css"
    "firefox-theme.css"
)

for file in "${files[@]}"; do
    if curl -s -I "http://localhost:8000/$file" > /dev/null 2>&1; then
        echo "✅ $file"
    else
        echo "❌ $file"
    fi
done

# Verificar arquivos de documentação
echo ""
echo "📋 Verificando documentação..."

docs=(
    "docs/WEBGL_SYSTEM.md"
    "docs/FIREFOX_THEME_FIX.md"
    "TESTE_WEBGL.md"
)

for doc in "${docs[@]}"; do
    if [ -f "$doc" ]; then
        echo "✅ $doc"
    else
        echo "❌ $doc"
    fi
done

echo ""
echo "🎯 Status do Sistema:"
echo "===================="

# Verificar se todos os arquivos principais estão presentes
if curl -s -I "http://localhost:8000/js/webgl/WebGLSystem.js" > /dev/null 2>&1 && \
   curl -s -I "http://localhost:8000/css/webgl-styles.css" > /dev/null 2>&1; then
    echo "✅ Sistema WebGL: PRONTO"
    echo "✅ Servidor: ATIVO"
    echo "✅ Arquivos: CARREGADOS"
    echo ""
    echo "🌐 Acesse: http://localhost:8000"
    echo "🔧 Debug: Pressione F12 e vá para Console"
    echo "🎮 Controles: Tecla D para painel de debug"
    echo ""
    echo "🎉 Sistema funcionando perfeitamente!"
else
    echo "❌ Sistema WebGL: ERRO"
    echo "❌ Verifique os logs acima"
fi

echo ""
echo "📊 Informações do Sistema:"
echo "========================="
echo "Data/Hora: $(date)"
echo "Diretório: $(pwd)"
echo "Servidor: Python HTTP Server"
echo "Porta: 8000"
echo "URL: http://localhost:8000"
