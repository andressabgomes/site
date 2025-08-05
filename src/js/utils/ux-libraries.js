// ===================================
// UX LIBRARIES CONFIGURATION - 3D & ANIMATIONS
// ===================================

// Import das bibliotecas
import AOS from 'aos';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, Navigation, Pagination, Autoplay } from 'swiper';
import {
    ArrowRight,
    ArrowLeft,
    ChevronDown,
    ChevronUp,
    Mail,
    Phone,
    MessageCircle,
    Zap,
    Code,
    Users,
    Home,
    Settings
} from 'lucide';

// Registrar plugins do GSAP
gsap.registerPlugin(ScrollTrigger);

// ===================================
// AOS (Animate On Scroll) Configuration
// ===================================

AOS.init({
    // Configurações globais
    duration: 1000,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    once: true,
    offset: 100,
    delay: 0,

    // Configurações específicas
    anchorPlacement: 'top-bottom',

    // Desabilitar em mobile para performance
    disable: window.innerWidth < 768,

    // Callbacks
    startEvent: 'DOMContentLoaded',
    initClassName: 'aos-init',
    animatedClassName: 'aos-animate',
    useClassNames: false,
    disableMutationObserver: false,
    debounceDelay: 50,
    throttleDelay: 99,
});

// ===================================
// GSAP 3D Animations
// ===================================

// Hero Section 3D Animation
const heroAnimation3D = () => {
    const tl = gsap.timeline();

    tl.from('.hero-title', {
        duration: 1.5,
        y: 100,
        opacity: 0,
        rotationX: 45,
        transformOrigin: "50% 50% -100px",
        ease: 'power3.out'
    })
    .from('.hero-description', {
        duration: 1.2,
        y: 50,
        opacity: 0,
        rotationX: 30,
        transformOrigin: "50% 50% -50px",
        ease: 'power2.out'
    }, '-=1.2')
    .from('.hero-cta', {
        duration: 1,
        y: 30,
        opacity: 0,
        rotationY: 15,
        scale: 0.8,
        ease: 'back.out(1.7)'
    }, '-=0.8');
};

// Service Cards 3D Animation
const serviceCardsAnimation3D = () => {
    gsap.from('.service-card', {
        duration: 1,
        y: 80,
        opacity: 0,
        rotationX: 20,
        rotationY: 10,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
};

// Stats Counter 3D Animation
const statsAnimation3D = () => {
    const stats = document.querySelectorAll('.stat-number');

    stats.forEach((stat, index) => {
        const target = parseInt(stat.textContent);
        const suffix = stat.textContent.replace(/\d/g, '');

        gsap.fromTo(stat,
            {
                textContent: 0,
                rotationY: 90,
                opacity: 0
            },
            {
                duration: 2.5,
                textContent: target,
                rotationY: 0,
                opacity: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: stat,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                onUpdate: function() {
                    stat.textContent = Math.ceil(this.targets()[0].textContent) + suffix;
                }
            }
        );

        // Animate the stat container
        gsap.fromTo(stat.parentElement,
            {
                rotationX: 45,
                opacity: 0,
                scale: 0.8
            },
            {
                duration: 1.5,
                rotationX: 0,
                opacity: 1,
                scale: 1,
                ease: 'back.out(1.7)',
                delay: index * 0.2,
                scrollTrigger: {
                    trigger: stat.parentElement,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
};

// Principles 3D Animation
const principlesAnimation3D = () => {
    gsap.from('.principle-item', {
        duration: 1.2,
        y: 60,
        opacity: 0,
        rotationY: 30,
        stagger: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.principles-grid',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
};

// Smooth Scroll 3D Animation
const smoothScrollAnimation3D = () => {
    gsap.to('html, body', {
        duration: 1.5,
        scrollTo: { y: target, offsetY: 80 },
        ease: 'power2.inOut'
    });
};

// ===================================
// Swiper Configuration with 3D
// ===================================

const initSwiper3D = () => {
    // Testimonials Swiper (se existir)
    const testimonialsSwiper = new Swiper('.testimonials-swiper', {
        modules: [Navigation, Pagination, Autoplay],
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        },
        on: {
            slideChange: function() {
                // 3D effect on slide change
                gsap.to('.swiper-slide-active', {
                    duration: 0.6,
                    rotationY: 5,
                    scale: 1.05,
                    ease: 'power2.out'
                });

                gsap.to('.swiper-slide:not(.swiper-slide-active)', {
                    duration: 0.6,
                    rotationY: 0,
                    scale: 1,
                    ease: 'power2.out'
                });
            }
        }
    });
};

// ===================================
// 3D Micro-interactions
// ===================================

const microInteractions3D = () => {
    // Button 3D hover effects
    const buttons = document.querySelectorAll('.btn-primary, .service-link');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                duration: 0.4,
                scale: 1.05,
                rotationY: 10,
                rotationX: 5,
                ease: 'power2.out'
            });
        });

        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                duration: 0.4,
                scale: 1,
                rotationY: 0,
                rotationX: 0,
                ease: 'power2.out'
            });
        });
    });

    // Service cards 3D hover
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                duration: 0.6,
                y: -15,
                rotationY: 15,
                rotationX: 5,
                scale: 1.02,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.6,
                y: 0,
                rotationY: 0,
                rotationX: 0,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });

    // 3D tilt effect on cards
    const cards = document.querySelectorAll('.card-3d');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            gsap.to(card, {
                duration: 0.3,
                rotationX: rotateX,
                rotationY: rotateY,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.6,
                rotationX: 0,
                rotationY: 0,
                ease: 'power2.out'
            });
        });
    });
};

// ===================================
// 3D Performance Optimizations
// ===================================

const performanceOptimizations3D = () => {
    // Lazy loading para imagens com 3D effect
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');

                // 3D fade in effect
                gsap.fromTo(img,
                    {
                        opacity: 0,
                        rotationY: 90,
                        scale: 0.8
                    },
                    {
                        duration: 0.8,
                        opacity: 1,
                        rotationY: 0,
                        scale: 1,
                        ease: 'power2.out'
                    }
                );

                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Debounce para scroll events com 3D - DESABILITADO para evitar conflito com Lenis
    // let scrollTimeout;
    // window.addEventListener('scroll', () => {
    //     clearTimeout(scrollTimeout);
    //     scrollTimeout = setTimeout(() => {
    //         // 3D scroll handling logic
    //         const scrolled = window.pageYOffset;
    //         const parallaxElements = document.querySelectorAll('.parallax-bg');

    //         parallaxElements.forEach(element => {
    //             const speed = 0.5;
    //             const yPos = -(scrolled * speed);
    //             gsap.set(element, {
    //                 y: yPos,
    //                 rotationY: scrolled * 0.01
    //             });
    //         });
    //     }, 16); // ~60fps
    // });
};

// ===================================
// 3D Accessibility Improvements
// ===================================

const accessibilityImprovements3D = () => {
    // Keyboard navigation with 3D feedback
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });

    // Focus management with 3D effects
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            const focusable = [...document.querySelectorAll(focusableElements)];
            const firstFocusable = focusable[0];
            const lastFocusable = focusable[focusable.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });

    // 3D focus effects
    const focusable = document.querySelectorAll(focusableElements);
    focusable.forEach(element => {
        element.addEventListener('focus', () => {
            gsap.to(element, {
                duration: 0.3,
                scale: 1.02,
                rotationY: 5,
                ease: 'power2.out'
            });
        });

        element.addEventListener('blur', () => {
            gsap.to(element, {
                duration: 0.3,
                scale: 1,
                rotationY: 0,
                ease: 'power2.out'
            });
        });
    });
};

// ===================================
// Initialize Everything 3D
// ===================================

const initUXLibraries3D = () => {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initUXLibraries3D);
        return;
    }

    // Initialize all 3D UX features
    heroAnimation3D();
    serviceCardsAnimation3D();
    statsAnimation3D();
    principlesAnimation3D();
    initSwiper3D();
    microInteractions3D();
    performanceOptimizations3D();
    accessibilityImprovements3D();

    // Re-initialize AOS on window resize
    window.addEventListener('resize', () => {
        AOS.refresh();
    });

    // 3D scroll progress indicator - DESABILITADO para evitar conflito com Lenis
    // const scrollProgress = document.getElementById('scrollProgress');
    // if (scrollProgress) {
    //     window.addEventListener('scroll', () => {
    //         const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    //         gsap.to(scrollProgress, {
    //             duration: 0.1,
    //             width: `${scrollPercent}%`,
    //             ease: 'power2.out'
    //             });
    //     });
    // }
};

// Export for use in main script
export {
    initUXLibraries3D,
    heroAnimation3D,
    serviceCardsAnimation3D,
    statsAnimation3D,
    principlesAnimation3D,
    microInteractions3D,
    performanceOptimizations3D,
    accessibilityImprovements3D
};

// Auto-initialize
initUXLibraries3D(); 