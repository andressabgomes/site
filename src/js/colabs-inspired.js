// Co-Labs Inspired JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Jarallax
    if (typeof jarallax !== 'undefined') {
        jarallax(document.querySelectorAll('.jarallax'), {
            speed: 0.5,
            imgSrc: null,
            imgElement: '.jarallax-img'
        });
    }

    // Initialize Flickity Carousels
    if (typeof Flickity !== 'undefined') {
        // Services Carousel
        const servicesCarousel = new Flickity('.services-carousel', {
            cellAlign: 'left',
            contain: true,
            pageDots: true,
            prevNextButtons: true,
            adaptiveHeight: true,
            wrapAround: true,
            autoPlay: 5000,
            pauseAutoPlayOnHover: true
        });

        // Resources Carousel
        const resourcesCarousel = new Flickity('.resources-carousel', {
            cellAlign: 'left',
            contain: true,
            pageDots: true,
            prevNextButtons: true,
            wrapAround: true,
            autoPlay: 4000,
            pauseAutoPlayOnHover: true
        });
    }

    // Enhanced Form Submission with SweetAlert2
    const contactForm = document.getElementById('contactForm');
    if (contactForm && typeof Swal !== 'undefined') {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const submitBtn = document.getElementById('submitBtn');
            const submitText = document.getElementById('submitText');

            // Show loading state
            submitBtn.classList.add('loading');
            submitText.textContent = 'Enviando...';

            // Simulate form submission (replace with actual endpoint)
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitText.textContent = 'Enviar Mensagem';

                // Show success message with SweetAlert2
                Swal.fire({
                    title: 'Mensagem Enviada!',
                    text: 'Obrigado pelo contato. Retornaremos em breve!',
                    icon: 'success',
                    confirmButtonText: 'Ótimo!',
                    confirmButtonColor: '#667eea',
                    customClass: {
                        popup: 'swal2-popup',
                        title: 'swal2-title',
                        content: 'swal2-content'
                    }
                });

                // Reset form
                contactForm.reset();
            }, 2000);
        });
    }

    // Resource Modal Function
    window.showResourceModal = function(resourceType) {
        if (typeof Swal !== 'undefined') {
            const resources = {
                'mvp-guide': {
                    title: 'Guia de MVP',
                    text: 'Baixando o guia completo de desenvolvimento de MVP...',
                    icon: 'info'
                },
                'innovation-checklist': {
                    title: 'Checklist de Inovação',
                    text: 'Baixando a lista completa para validar suas ideias...',
                    icon: 'info'
                },
                'caja-prospectus': {
                    title: 'Prospectus Cajá',
                    text: 'Baixando nosso prospectus com todos os serviços...',
                    icon: 'info'
                }
            };

            const resource = resources[resourceType];

            Swal.fire({
                title: resource.title,
                text: resource.text,
                icon: resource.icon,
                showCancelButton: true,
                confirmButtonText: 'Baixar PDF',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#667eea',
                cancelButtonColor: '#6c757d',
                customClass: {
                    popup: 'swal2-popup',
                    title: 'swal2-title',
                    content: 'swal2-content'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    // Simulate download
                    Swal.fire({
                        title: 'Download Iniciado!',
                        text: 'O arquivo será baixado automaticamente.',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false
                    });
                }
            });
        }
    };

    // Enhanced Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-card, .resource-card, .principle-item').forEach(el => {
        observer.observe(el);
    });

    // Enhanced Mobile Menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Close menu when clicking on links
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Enhanced Loading States
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(element => {
        element.addEventListener('click', function() {
            this.classList.add('loading');
        });
    });

    // Performance Optimization: Lazy Loading for Images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Enhanced Accessibility
    document.addEventListener('keydown', function(e) {
        // ESC key closes modals and mobile menu
        if (e.key === 'Escape') {
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        }
    });

    // Console welcome message
    console.log('%c🚀 Cajá IT - Inspirado no Co-Labs', 'color: #667eea; font-size: 20px; font-weight: bold;');
    console.log('%cTecnologia Artesanal em Ação', 'color: #764ba2; font-size: 14px;');
});
