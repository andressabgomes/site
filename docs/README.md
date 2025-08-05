# 🚀 Cajá - Tecnologia Artesanal

## 📋 Sobre o Projeto

Site institucional da **Cajá - Tecnologia Artesanal**, empresa especializada em desenvolvimento de MVP e software personalizado em Fortaleza.

## 🏗️ Estrutura Refatorada

### 📁 Organização de Arquivos

```
cajait_dev-main-2/
├── assets/
│   ├── css/
│   │   ├── base.css          # Estilos base e reset
│   │   └── components.css    # Componentes reutilizáveis
│   ├── js/
│   │   └── app.js           # Aplicação principal modular
│   └── images/              # Imagens otimizadas
├── src/
│   ├── components/          # Componentes JavaScript
│   │   ├── MobileMenu.js
│   │   ├── ContactForm.js
│   │   └── HelpChat.js
│   ├── utils/              # Utilitários
│   │   ├── SmoothScroll.js
│   │   └── ScrollManager.js
│   └── services/           # Serviços (futuro)
├── config/
│   ├── database.php        # Configuração local
│   └── database_hostinger.php
├── includes/              # Includes PHP (futuro)
├── index.html            # Página principal
├── contact.php           # Formulário de contato
├── style.css             # Estilos específicos
├── package.json          # Configuração do projeto
└── README.md
```

## 🚀 Como Executar

### Desenvolvimento Local

```bash
# Instalar dependências (se necessário)
npm install

# Iniciar servidor de desenvolvimento
npm run dev
# ou
php -S localhost:8000
```

### Produção (Hostinger)

1. **Executar SQL:** Conteúdo de `create_table.sql` no phpMyAdmin
2. **Upload arquivos** para `public_html/`
3. **Renomear:**
   - `contact.php` → `contact.php` (já configurado)
   - `config/database.php` → `config/database.php` (já configurado)
4. **Testar:** Acessar o site
5. **Finalizar:** Remover arquivos de desenvolvimento

## 🔧 Melhorias da Refatoração

### ✅ JavaScript Modular
- **Componentes separados:** Menu mobile, formulário, chat de ajuda
- **Utilitários organizados:** Scroll, animações, performance
- **ES6 Modules:** Import/export para melhor organização
- **Performance otimizada:** Lazy loading, debouncing, requestAnimationFrame

### ✅ CSS Organizado
- **Base styles:** Reset e estilos fundamentais
- **Componentes:** Estilos específicos de componentes
- **Responsividade:** Melhor adaptação mobile
- **Acessibilidade:** Melhor contraste e navegação por teclado

### ✅ PHP Melhorado
- **Configuração local:** Funciona sem banco de dados
- **Validação robusta:** Sanitização e validação de dados
- **Logs estruturados:** Melhor debugging
- **Modo local:** Salva mensagens em arquivo

### ✅ Performance
- **Lazy loading:** Imagens carregadas sob demanda
- **Intersection Observer:** Animações otimizadas
- **Debouncing:** Scroll events otimizados
- **Preload:** Recursos críticos pré-carregados

## 🎯 Funcionalidades

### ✅ Implementadas
- [x] **Menu responsivo** com animações suaves
- [x] **Formulário de contato** com validação
- [x] **Chat de ajuda** integrado
- [x] **Scroll suave** entre seções
- [x] **Animações** com Intersection Observer
- [x] **Lazy loading** de imagens
- [x] **Acessibilidade** melhorada
- [x] **Performance** otimizada

### 🔄 Futuras Melhorias
- [ ] **PWA:** Progressive Web App
- [ ] **CMS:** Sistema de gerenciamento de conteúdo
- [ ] **Blog:** Seção de artigos
- [ ] **Portfolio:** Galeria de projetos
- [ ] **Analytics:** Métricas de performance

## 🛠️ Tecnologias

- **Frontend:** HTML5, CSS3, JavaScript ES6+
- **Backend:** PHP 7.4+
- **Banco:** MySQL (opcional para local)
- **Servidor:** PHP Built-in Server / Hostinger
- **Performance:** Intersection Observer, RequestAnimationFrame

## 📱 Responsividade

- ✅ **Desktop:** 1200px+
- ✅ **Tablet:** 768px - 1199px
- ✅ **Mobile:** 320px - 767px
- ✅ **Landscape:** Orientação paisagem otimizada

## 🔒 Segurança

- ✅ **Validação:** Cliente e servidor
- ✅ **Sanitização:** Dados de entrada
- ✅ **CSRF:** Proteção básica
- ✅ **XSS:** Prevenção de ataques
- ✅ **SQL Injection:** Prepared statements

## 📊 Performance

- ✅ **Lighthouse Score:** 90+ (objetivo)
- ✅ **First Contentful Paint:** < 2s
- ✅ **Largest Contentful Paint:** < 3s
- ✅ **Cumulative Layout Shift:** < 0.1

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Contato

- **Website:** [cajait.com](https://cajait.com)
- **Email:** andressa@cajait.com
- **WhatsApp:** (85) 99217-6713
- **Instagram:** [@caja.it](https://instagram.com/caja.it)

---

**Cajá - Tecnologia Artesanal** 🚀  
*Transformando ideias em produtos digitais únicos*