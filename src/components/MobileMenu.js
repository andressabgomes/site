/**
 * Mobile Menu Component
 * Gerencia o menu mobile com animações suaves
 */
class MobileMenu {
    constructor() {
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.mobileMenu = document.getElementById('mobileMenu');
        this.mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        this.isMenuOpen = false;
        
        this.init();
    }
    
    init() {
        if (!this.mobileMenuBtn || !this.mobileMenu) return;
        
        this.bindEvents();
    }
    
    bindEvents() {
        this.mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMenu();
        });
        
        this.mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        
        document.addEventListener('click', (event) => {
            if (this.isMenuOpen && 
                !this.mobileMenuBtn.contains(event.target) && 
                !this.mobileMenu.contains(event.target)) {
                this.closeMenu();
            }
        });
    }
    
    openMenu() {
        this.mobileMenu.style.display = 'block';
        this.mobileMenu.style.opacity = '0';
        this.mobileMenu.style.transform = 'translateY(-10px)';
        
        requestAnimationFrame(() => {
            this.mobileMenu.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            this.mobileMenu.style.opacity = '1';
            this.mobileMenu.style.transform = 'translateY(0)';
        });
        
        this.animateHamburger(true);
        this.isMenuOpen = true;
    }
    
    closeMenu() {
        this.mobileMenu.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        this.mobileMenu.style.opacity = '0';
        this.mobileMenu.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            this.mobileMenu.style.display = 'none';
        }, 300);
        
        this.animateHamburger(false);
        this.isMenuOpen = false;
    }
    
    toggleMenu() {
        if (this.isMenuOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }
    
    animateHamburger(isOpen) {
        const hamburgers = this.mobileMenuBtn.querySelectorAll('.hamburger');
        
        if (isOpen) {
            hamburgers[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            hamburgers[1].style.opacity = '0';
            hamburgers[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            hamburgers[0].style.transform = '';
            hamburgers[1].style.opacity = '1';
            hamburgers[2].style.transform = '';
        }
    }
}

export default MobileMenu; 