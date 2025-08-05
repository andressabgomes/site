# 🎬 Vídeo Colab - Cajá IT

## 📋 **Informações do Vídeo**

- **Nome**: colab.mp4
- **Descrição**: Vídeo especial da Cajá IT demonstrando colaboração e inovação
- **Formato**: MP4 (H.264)
- **Resolução**: 1920x1080 (Full HD)
- **Duração**: Variável
- **Áudio**: Sem áudio (muted)

## 🚀 **Como usar**

### **1. Adicionar o vídeo**

Coloque o arquivo `colab.mp4` nesta pasta:

```
public/videos/colab.mp4
```

### **2. O sistema irá:**

- ✅ Carregar automaticamente o vídeo
- ✅ Reproduzir em loop contínuo
- ✅ Sem controles visíveis (como no site original)
- ✅ Autoplay e muted por padrão
- ✅ Responsivo e otimizado

### **3. Comportamento:**

- 🔄 Loop automático
- 🔇 Sem áudio (muted)
- ▶️ Autoplay
- 📱 Responsivo
- 🎯 Sem controles visuais

## 🎨 **Estilos específicos**

O vídeo Colab replica o site original:

- **Design**: Minimalista e limpo
- **Controles**: Nenhum (autoplay + loop)
- **Responsivo**: Adapta-se a qualquer tela
- **Performance**: Otimizado para carregamento rápido

## 🔧 **Configuração técnica**

### **HTML:**

```html
<video id="colab-video" class="colab-video-element" playsinline autoplay muted loop>
    <source src="videos/colab.mp4" type="video/mp4">
</video>
```

### **JavaScript:**

```javascript
// Acessar o gerenciador
const colabManager = window.colabVideoManager;

// Informações do vídeo
const info = colabManager.getVideoInfo();
console.log('Duração:', info.duration);
console.log('Reproduzindo:', info.isPlaying);
```

## 📊 **Compatibilidade**

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers

## 🎯 **Localização no site**

O vídeo Colab aparece na seção:

- **URL**: <http://localhost:8000>
- **Seção**: "Nossos Projetos em Vídeo"
- **Subseção**: "Vídeo Colab"

## 🚀 **Próximos passos**

1. **Adicione o arquivo** `colab.mp4` nesta pasta
2. **Acesse o site** para ver o vídeo
3. **Teste os controles** e funcionalidades
4. **Verifique o console** para logs

## 📞 **Suporte**

Se o vídeo não aparecer:

1. Verifique se o arquivo está na pasta correta
2. Confirme que o nome é `colab.mp4`
3. Verifique o console (F12) para erros
4. Teste em outro navegador

---

**🎬 Coloque o arquivo colab.mp4 aqui e o sistema irá exibi-lo automaticamente!**
