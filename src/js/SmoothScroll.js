/**
 * Smooth Scroll Utility
 * Gerencia navegação suave entre seções
 */
class SmoothScroll {
    constructor() {
        this.headerHeight = 80;
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => this.handleClick(e));
        });
    }
    
    handleClick(e) {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        const target = document.querySelector(href);
        
        if (target) {
            const targetPosition = target.offsetTop - this.headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

export default SmoothScroll; 