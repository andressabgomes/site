// ===================================
// CAJÁ - SCRIPT PRINCIPAL
// ===================================

// Import das bibliotecas UX
import { initUXLibraries3D } from './assets/js/ux-libraries.js';

// ===================================
// DOM ELEMENTS
// ===================================

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
const helpChatTrigger = document.getElementById('helpChatTrigger');
const helpChatMenu = document.getElementById('helpChatMenu');
const helpMenuClose = document.getElementById('helpMenuClose');
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const submitText = document.getElementById('submitText');
const formMessage = document.getElementById('formMessage');
const scrollProgress = document.getElementById('scrollProgress');

// ===================================
// MOBILE MENU
// ===================================

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        
        // Animate hamburger
        const hamburgers = mobileMenuBtn.querySelectorAll('.hamburger');
        hamburgers.forEach((hamburger, index) => {
            hamburger.style.transform = mobileMenu.classList.contains('active') 
                ? `rotate(${45 * (index === 1 ? 0 : 1)}deg) translateY(${index === 1 ? '0' : index === 0 ? '8px' : '-8px'})`
                : 'none';
        });
    });

    // Close menu when clicking on links
    const mobileNavLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
}

// ===================================
// SMOOTH SCROLLING
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        const target = document.querySelector(href);

                            if (target) {
                        const headerHeight = 60; /* Reduzido de 80 para 60 */
                        const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// ACTIVE SECTION HIGHLIGHTING
// ===================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('nav-link-active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('nav-link-active');
        }
    });
});

// ===================================
// SCROLL TO TOP
// ===================================

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (scrollToTopBtn) {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    }
    
    // Update scroll progress
    if (scrollProgress) {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollProgress.style.width = `${scrollPercent}%`;
    }
});

// ===================================
// FORM HANDLING
// ===================================

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        submitBtn.disabled = true;
        submitText.textContent = 'Enviando...';
        submitBtn.classList.add('loading');
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        try {
            const response = await fetch('contact.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
                showMessage('success', result.message);
                contactForm.reset();
            } else {
                showMessage('error', result.message || 'Erro ao enviar mensagem. Tente novamente.');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('error', 'Erro de conexão. Verifique sua internet e tente novamente.');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitText.textContent = 'Inscrever-se';
            submitBtn.classList.remove('loading');
        }
    });
}

function showMessage(type, message) {
    if (formMessage) {
        formMessage.className = `form-message ${type}`;
        formMessage.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                ${type === 'success' 
                    ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/>'
                    : '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>'
                }
            </svg>
            <span>${message}</span>
        `;
        formMessage.style.display = 'flex';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// ===================================
// HELP CHAT WIDGET
// ===================================

if (helpChatTrigger && helpChatMenu) {
    helpChatTrigger.addEventListener('click', () => {
        helpChatMenu.style.display = 'block';
        setTimeout(() => {
            helpChatMenu.classList.add('show');
        }, 10);
    });
    
    if (helpMenuClose) {
        helpMenuClose.addEventListener('click', () => {
            helpChatMenu.classList.remove('show');
            setTimeout(() => {
                helpChatMenu.style.display = 'none';
            }, 300);
        });
    }
    
    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!helpChatTrigger.contains(e.target) && !helpChatMenu.contains(e.target)) {
            helpChatMenu.classList.remove('show');
            setTimeout(() => {
                helpChatMenu.style.display = 'none';
            }, 300);
        }
    });
}

// ===================================
// HEADER SCROLL EFFECT
// ===================================

const header = document.querySelector('.header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (header) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
    }
    
    lastScrollY = currentScrollY;
});

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.querySelectorAll('.gsap-fade-in, .gsap-scale-in').forEach(el => {
    observer.observe(el);
});

// ===================================
// LAZY LOADING
// ===================================

const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// ===================================
// PERFORMANCE AND ACCESSIBILITY
// ===================================

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Scroll handling logic
    }, 16); // ~60fps
});

// ===================================
// INITIALIZE UX LIBRARIES
// ===================================

    // Initialize UX libraries when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            try {
                initUXLibraries3D();
                initDropdownNavigation();
            } catch (error) {
                console.warn('UX libraries not available:', error);
            }
        });
    } else {
        try {
            initUXLibraries3D();
            initDropdownNavigation();
        } catch (error) {
            console.warn('UX libraries not available:', error);
        }
    }

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===================================
// EXPORT FOR MODULE USE
// ===================================

export {
    scrollToTop,
    showMessage,
    debounce,
    throttle
};

// ===================================
// DROPDOWN NAVIGATION
// ===================================

const initDropdownNavigation = () => {
    const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
    
    dropdownItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        const menu = item.querySelector('.dropdown-menu');
        const icon = item.querySelector('.dropdown-icon');
        
        // Mouse events
        item.addEventListener('mouseenter', () => {
            menu.style.opacity = '1';
            menu.style.visibility = 'visible';
            menu.style.transform = 'translateY(0)';
            if (icon) icon.style.transform = 'rotate(180deg)';
        });
        
        item.addEventListener('mouseleave', () => {
            menu.style.opacity = '0';
            menu.style.visibility = 'hidden';
            menu.style.transform = 'translateY(-10px)';
            if (icon) icon.style.transform = 'rotate(0deg)';
        });
        
        // Keyboard navigation
        link.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const isOpen = menu.style.visibility === 'visible';
                
                if (isOpen) {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                    menu.style.transform = 'translateY(-10px)';
                    if (icon) icon.style.transform = 'rotate(0deg)';
                } else {
                    menu.style.opacity = '1';
                    menu.style.visibility = 'visible';
                    menu.style.transform = 'translateY(0)';
                    if (icon) icon.style.transform = 'rotate(180deg)';
                }
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!item.contains(e.target)) {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateY(-10px)';
                if (icon) icon.style.transform = 'rotate(0deg)';
            }
        });
        
        // Focus management for dropdown items
        const dropdownLinks = menu.querySelectorAll('.dropdown-item');
        dropdownLinks.forEach((link, index) => {
            link.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextLink = dropdownLinks[index + 1];
                    if (nextLink) nextLink.focus();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prevLink = dropdownLinks[index - 1];
                    if (prevLink) prevLink.focus();
                } else if (e.key === 'Escape') {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                    menu.style.transform = 'translateY(-10px)';
                    if (icon) icon.style.transform = 'rotate(0deg)';
                    link.focus();
                }
            });
        });
    });
};