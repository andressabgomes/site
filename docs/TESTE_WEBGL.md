# 🚀 Teste do Sistema WebGL - Cajá

## Como Testar

### 1. Acesse o Site

Abra seu navegador e acesse: **<http://localhost:8000>**

### 2. Verificar Console

1. Pressione **F12** para abrir as ferramentas de desenvolvedor
2. Vá para a aba **Console**
3. Você deve ver logs como:

   ```
   🧪 Iniciando testes do sistema WebGL...
   🚀 Iniciando bateria de testes WebGL...
   ✅ WebGL é suportado
   ✅ WebGLManager carregada
   ✅ GeometryRenderer carregada
   ✅ PostProcessor carregada
   ✅ WebGLSystem carregada
   🎉 Todos os testes passaram! Sistema WebGL funcionando perfeitamente.
   ```

### 3. Controles de Debug

#### Teclas de Atalho

- **D**: Mostrar/ocultar painel de debug
- **P**: Toggle modo performance
- **R**: Reset configurações

#### Painel de Debug (tecla D)

- **Partículas**: Controle quantidade (100-3000)
- **Blur**: Intensidade do blur (0-2)
- **Bloom**: Intensidade do bloom (0-3)
- **Distorção**: Força da distorção (0-1)
- **Botões**: Toggle Performance e Reset

### 4. Efeitos Visuais Esperados

#### Partículas

- Pontos coloridos flutuando pela tela
- Interação com o mouse (atração)
- Cores que mudam de azul ciano para laranja
- Efeitos de brilho

#### Geometrias 3D

- Cubos flutuantes animados
- Esferas com rotação
- Efeitos de transparência
- Iluminação dinâmica

#### Pós-Processamento

- Blur suave nas bordas
- Bloom em áreas claras
- Distorção de onda sutil

### 5. Testes Automáticos

O sistema executa automaticamente uma bateria de testes:

1. **Suporte WebGL**: Verifica se o navegador suporta WebGL
2. **Classes Carregadas**: Confirma se todos os componentes foram carregados
3. **Inicialização**: Testa se o sistema inicializou corretamente
4. **Performance**: Detecta o nível de performance do dispositivo
5. **Controles**: Verifica se os controles de debug estão funcionando

### 6. Níveis de Performance

O sistema detecta automaticamente:

- **Baixa**: Mobile/dispositivos antigos (500 partículas, sem pós-processamento)
- **Média**: Desktop padrão (1000 partículas, efeitos moderados)
- **Alta**: Gaming/workstation (2000 partículas, todos os efeitos)

### 7. Solução de Problemas

#### Se não aparecer nada

1. Verifique o console para erros
2. Confirme que WebGL é suportado
3. Tente recarregar a página
4. Verifique se JavaScript está habilitado

#### Se performance estiver baixa

1. Pressione **P** para toggle performance
2. Reduza quantidade de partículas no painel de debug
3. Desabilite pós-processamento
4. Feche outras abas do navegador

#### Se efeitos não aparecem

1. Verifique se há erros no console
2. Confirme que a GPU suporta shaders
3. Atualize drivers de vídeo
4. Tente outro navegador

### 8. Compatibilidade

#### Navegadores Testados

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Opera 47+

#### Dispositivos

- ✅ Desktop (Windows, macOS, Linux)
- ✅ Mobile (iOS Safari, Chrome Mobile)
- ✅ Tablet (iPad, Android)

### 9. Comandos de Teste

No console do navegador, você pode executar:

```javascript
// Executar testes manualmente
testWebGLSystem();

// Verificar se WebGL está funcionando
console.log('WebGL Support:', !!window.WebGLSystem);

// Verificar performance
console.log('Device Memory:', navigator.deviceMemory);
console.log('CPU Cores:', navigator.hardwareConcurrency);
```

### 10. Logs Esperados

#### Console de Sucesso

```
🧪 Iniciando testes do sistema WebGL...
🚀 Iniciando bateria de testes WebGL...

📋 Teste 1: Verificando suporte WebGL...
✅ WebGL é suportado
📊 Informações do WebGL:
  - Vendor: Google Inc. (Intel)
  - Renderer: Intel Iris OpenGL Engine
  - Version: WebGL 1.0
  - Max Texture Size: 16384

📋 Teste 2: Verificando classes carregadas...
✅ WebGLManager carregada
✅ GeometryRenderer carregada
✅ PostProcessor carregada
✅ WebGLSystem carregada

📋 Teste 3: Testando inicialização do sistema...
✅ WebGLSystem disponível
✅ Canvas WebGL já existe

📋 Teste 4: Verificando performance...
📊 Informações de Performance:
  - Dispositivo móvel: false
  - Memória (GB): 8
  - Cores CPU: 8
  - Nível de performance detectado: high

📋 Teste 5: Verificando controles de debug...
✅ Painel de debug encontrado
✅ Controle particle-count encontrado
✅ Controle blur-strength encontrado
✅ Controle bloom-intensity encontrado
✅ Controle distortion-strength encontrado
✅ Controle toggle-performance encontrado
✅ Controle reset-settings encontrado

📊 Resultados dos Testes:
========================
webglSupport: ✅ PASSOU
classesLoaded: ✅ PASSOU
systemInit: ✅ PASSOU
performance: high
debugControls: ✅ PASSOU

🎯 Resumo: 4/4 testes passaram
🎉 Todos os testes passaram! Sistema WebGL funcionando perfeitamente.
```

### 11. Próximos Passos

Se todos os testes passarem, o sistema WebGL está funcionando perfeitamente! Você pode:

1. **Explorar os efeitos**: Use o painel de debug para ajustar parâmetros
2. **Testar performance**: Compare diferentes configurações
3. **Desenvolver**: Adicione novos efeitos ou modifique os existentes
4. **Otimizar**: Ajuste para diferentes dispositivos

---

**🎉 Parabéns! O sistema WebGL está funcionando!**
