/**
 * Help Chat Widget Component
 * Gerencia o widget de chat de ajuda
 */
class HelpChat {
    constructor() {
        this.widget = document.getElementById('helpChatWidget');
        this.trigger = document.getElementById('helpChatTrigger');
        this.menu = document.getElementById('helpChatMenu');
        this.closeBtn = document.getElementById('helpMenuClose');
        this.isMenuOpen = false;
        
        this.init();
    }
    
    init() {
        if (!this.widget || !this.trigger || !this.menu) return;
        
        this.showWidget();
        this.bindEvents();
    }
    
    showWidget() {
        this.widget.style.display = 'block';
        this.widget.style.visibility = 'visible';
        this.widget.style.opacity = '1';
    }
    
    bindEvents() {
        this.trigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleMenu();
        });
        
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.closeMenu();
            });
        }
        
        document.addEventListener('click', (event) => {
            if (!this.widget.contains(event.target) && this.isMenuOpen) {
                this.closeMenu();
            }
        });
        
        const contactFormLink = this.menu.querySelector('a[href="#contato"]');
        if (contactFormLink) {
            contactFormLink.addEventListener('click', () => {
                this.closeMenu();
            });
        }
    }
    
    openMenu() {
        this.menu.style.display = 'block';
        this.menu.classList.add('show');
        this.menu.style.opacity = '0';
        this.menu.style.transform = 'translateY(10px) scale(0.95)';
        
        requestAnimationFrame(() => {
            this.menu.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            this.menu.style.opacity = '1';
            this.menu.style.transform = 'translateY(0) scale(1)';
        });
        
        this.isMenuOpen = true;
    }
    
    closeMenu() {
        this.menu.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        this.menu.style.opacity = '0';
        this.menu.style.transform = 'translateY(10px) scale(0.95)';
        
        setTimeout(() => {
            this.menu.style.display = 'none';
            this.menu.classList.remove('show');
        }, 300);
        
        this.isMenuOpen = false;
    }
    
    toggleMenu() {
        if (this.isMenuOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }
}

export default HelpChat; 