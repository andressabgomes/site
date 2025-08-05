/**
 * AnimationManager.js - Sistema de Animações Avançado
 * Integra GSAP + ScrollTrigger, Lenis Smooth Scroll e Three.js
 * Para animações suaves de vídeos e textos conforme scroll
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import Lenis from '@studio-freight/lenis';
import * as THREE from 'three';

// Registra plugins GSAP
gsap.registerPlugin(ScrollTrigger, TextPlugin, MorphSVGPlugin);

class AnimationManager {
    constructor() {
        this.lenis = null;
        this.scene = null;
        this.renderer = null;
        this.camera = null;
        this.animations = new Map();
        this.isInitialized = false;
        this.performanceMode = this.detectPerformanceMode();
        
        this.init();
    }

    /**
     * Detecta modo de performance baseado no dispositivo
     */
    detectPerformanceMode() {
        const isMobile = window.innerWidth < 768;
        const isLowEnd = navigator.hardwareConcurrency < 4;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        return {
            isMobile,
            isLowEnd,
            prefersReducedMotion,
            useThreeJS: !isMobile && !isLowEnd && !prefersReducedMotion,
            useSmoothScroll: !prefersReducedMotion
        };
    }

    /**
     * Inicializa o sistema de animações
     */
    async init() {
        try {
            // Inicializa Lenis Smooth Scroll
            if (this.performanceMode.useSmoothScroll) {
                this.initLenis();
            }

            // Inicializa Three.js se necessário
            if (this.performanceMode.useThreeJS) {
                await this.initThreeJS();
            }

            // Configura GSAP ScrollTrigger
            this.setupScrollTrigger();

            // Inicializa animações
            this.initAnimations();

            this.isInitialized = true;
            console.log('🎬 AnimationManager inicializado com sucesso');
        } catch (error) {
            console.error('❌ Erro ao inicializar AnimationManager:', error);
        }
    }

    /**
     * Inicializa Lenis Smooth Scroll
     */
    initLenis() {
        this.lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        // Integra Lenis com GSAP ScrollTrigger
        this.lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            this.lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        console.log('🔄 Lenis Smooth Scroll inicializado');
    }

    /**
     * Inicializa Three.js para efeitos especiais
     */
    async initThreeJS() {
        // Cria container para Three.js
        const container = document.createElement('div');
        container.id = 'threejs-container';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;
        document.body.appendChild(container);

        // Configura cena Three.js
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true,
            powerPreference: 'high-performance'
        });

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(this.renderer.domElement);

        // Posiciona câmera
        this.camera.position.z = 5;

        // Adiciona luzes
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(0, 1, 1);
        this.scene.add(directionalLight);

        // Inicia loop de renderização
        this.animate();

        console.log('🎨 Three.js inicializado');
    }

    /**
     * Loop de animação Three.js
     */
    animate() {
        if (!this.renderer) return;

        requestAnimationFrame(() => this.animate());
        this.renderer.render(this.scene, this.camera);
    }

    /**
     * Configura GSAP ScrollTrigger
     */
    setupScrollTrigger() {
        // Configurações globais do ScrollTrigger
        ScrollTrigger.config({
            ignoreMobileResize: true,
            autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load'
        });

        // Atualiza ScrollTrigger quando a janela é redimensionada
        window.addEventListener('resize', () => {
            ScrollTrigger.refresh();
        });

        console.log('📜 ScrollTrigger configurado');
    }

    /**
     * Inicializa todas as animações
     */
    initAnimations() {
        this.initHeroAnimations();
        this.initVideoAnimations();
        this.initTextAnimations();
        this.initParallaxEffects();
        this.initScrollAnimations();
        this.initThreeJSEffects();
    }

    /**
     * Animações do Hero Section
     */
    initHeroAnimations() {
        // Animação do título principal
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            gsap.fromTo(heroTitle, 
                { 
                    y: 100, 
                    opacity: 0,
                    rotationX: 15
                },
                {
                    y: 0,
                    opacity: 1,
                    rotationX: 0,
                    duration: 1.5,
                    ease: 'power3.out',
                    delay: 0.3
                }
            );
        }

        // Animação da descrição
        const heroDescription = document.querySelector('.hero-description');
        if (heroDescription) {
            gsap.fromTo(heroDescription,
                { 
                    y: 50, 
                    opacity: 0 
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power2.out',
                    delay: 0.6
                }
            );
        }

        // Animação do CTA
        const heroCTA = document.querySelector('.hero-cta');
        if (heroCTA) {
            gsap.fromTo(heroCTA,
                { 
                    y: 30, 
                    opacity: 0,
                    scale: 0.9
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: 'back.out(1.7)',
                    delay: 0.9
                }
            );
        }

        // Animação das partículas
        this.animateParticles();
    }

    /**
     * Anima partículas do hero
     */
    animateParticles() {
        const particles = document.querySelectorAll('.particle');
        
        particles.forEach((particle, index) => {
            const speed = parseFloat(particle.dataset.speed) || 1;
            
            gsap.to(particle, {
                y: '-100vh',
                x: `random(-50, 50)`,
                rotation: `random(-180, 180)`,
                duration: `random(8, 15)`,
                ease: 'none',
                repeat: -1,
                delay: index * 0.5,
                modifiers: {
                    y: gsap.utils.unitize(y => parseFloat(y) % window.innerHeight)
                }
            });
        });
    }

    /**
     * Animações de vídeos
     */
    initVideoAnimations() {
        // Vídeo de fundo do hero
        const heroVideo = document.querySelector('.hero-video');
        if (heroVideo) {
            gsap.fromTo(heroVideo,
                { 
                    scale: 1.1,
                    opacity: 0 
                },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 2,
                    ease: 'power2.out'
                }
            );

            // Efeito parallax no scroll
            gsap.to(heroVideo, {
                yPercent: -20,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            });
        }

        // Vídeos do grid
        const gridVideos = document.querySelectorAll('.video-grid-item');
        gridVideos.forEach((item, index) => {
            const video = item.querySelector('video');
            
            if (video) {
                // Animação de entrada
                gsap.fromTo(item,
                    { 
                        y: 100, 
                        opacity: 0,
                        scale: 0.8
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 80%',
                            end: 'bottom 20%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );

                // Efeito hover
                item.addEventListener('mouseenter', () => {
                    gsap.to(video, {
                        scale: 1.05,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });

                item.addEventListener('mouseleave', () => {
                    gsap.to(video, {
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
            }
        });
    }

    /**
     * Animações de texto
     */
    initTextAnimations() {
        // Títulos de seção
        const sectionTitles = document.querySelectorAll('.section-title');
        sectionTitles.forEach(title => {
            gsap.fromTo(title,
                { 
                    y: 50, 
                    opacity: 0 
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: title,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        // Descrições de seção
        const sectionDescriptions = document.querySelectorAll('.section-description');
        sectionDescriptions.forEach(desc => {
            gsap.fromTo(desc,
                { 
                    y: 30, 
                    opacity: 0 
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: desc,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        // Cards de serviço
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            gsap.fromTo(card,
                { 
                    y: 60, 
                    opacity: 0,
                    rotationY: 15
                },
                {
                    y: 0,
                    opacity: 1,
                    rotationY: 0,
                    duration: 1,
                    ease: 'power2.out',
                    delay: index * 0.1,
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        end: 'bottom 15%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
    }

    /**
     * Efeitos parallax
     */
    initParallaxEffects() {
        // Parallax para elementos de fundo
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.parallax) || 0.5;
            
            gsap.to(element, {
                yPercent: -50 * speed,
                ease: 'none',
                scrollTrigger: {
                    trigger: element,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            });
        });

        // Parallax para imagens
        const parallaxImages = document.querySelectorAll('[data-parallax-image]');
        parallaxImages.forEach(image => {
            const speed = parseFloat(image.dataset.parallaxImage) || 0.3;
            
            gsap.to(image, {
                yPercent: -30 * speed,
                scale: 1 + (speed * 0.1),
                ease: 'none',
                scrollTrigger: {
                    trigger: image,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            });
        });
    }

    /**
     * Animações baseadas no scroll
     */
    initScrollAnimations() {
        // Progress bar do scroll
        const scrollProgress = document.getElementById('scrollProgress');
        if (scrollProgress) {
            gsap.to(scrollProgress, {
                scaleX: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: 'body',
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1,
                    onUpdate: (self) => {
                        scrollProgress.style.transform = `scaleX(${self.progress})`;
                    }
                }
            });
        }

        // Fade in/out de elementos
        const fadeElements = document.querySelectorAll('[data-fade]');
        fadeElements.forEach(element => {
            const direction = element.dataset.fade || 'up';
            const distance = element.dataset.fadeDistance || 50;
            
            let fromVars = { opacity: 0 };
            let toVars = { opacity: 1 };
            
            switch (direction) {
                case 'up':
                    fromVars.y = distance;
                    toVars.y = 0;
                    break;
                case 'down':
                    fromVars.y = -distance;
                    toVars.y = 0;
                    break;
                case 'left':
                    fromVars.x = -distance;
                    toVars.x = 0;
                    break;
                case 'right':
                    fromVars.x = distance;
                    toVars.x = 0;
                    break;
            }
            
            gsap.fromTo(element, fromVars, {
                ...toVars,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    }

    /**
     * Efeitos Three.js
     */
    initThreeJSEffects() {
        if (!this.performanceMode.useThreeJS || !this.scene) return;

        // Cria partículas flutuantes
        this.createFloatingParticles();
        
        // Cria efeito de ondas
        this.createWaveEffect();
    }

    /**
     * Cria partículas flutuantes com Three.js
     */
    createFloatingParticles() {
        const particleCount = 100;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 20;
            positions[i + 1] = (Math.random() - 0.5) * 20;
            positions[i + 2] = (Math.random() - 0.5) * 20;

            colors[i] = Math.random() * 0.5 + 0.5;
            colors[i + 1] = Math.random() * 0.5 + 0.5;
            colors[i + 2] = 1;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            transparent: true,
            opacity: 0.6
        });

        const particles = new THREE.Points(geometry, material);
        this.scene.add(particles);

        // Anima partículas
        gsap.to(particles.rotation, {
            y: Math.PI * 2,
            duration: 20,
            ease: 'none',
            repeat: -1
        });
    }

    /**
     * Cria efeito de ondas
     */
    createWaveEffect() {
        const geometry = new THREE.PlaneGeometry(10, 10, 32, 32);
        const material = new THREE.MeshBasicMaterial({
            color: 0x007bff,
            transparent: true,
            opacity: 0.1,
            wireframe: true
        });

        const wave = new THREE.Mesh(geometry, material);
        wave.position.z = -5;
        this.scene.add(wave);

        // Anima ondas
        gsap.to(wave.material, {
            opacity: 0.3,
            duration: 2,
            ease: 'power2.inOut',
            repeat: -1,
            yoyo: true
        });
    }

    /**
     * Adiciona animação customizada
     */
    addCustomAnimation(id, element, animation) {
        this.animations.set(id, {
            element,
            animation: gsap.to(element, animation)
        });
    }

    /**
     * Remove animação customizada
     */
    removeCustomAnimation(id) {
        const anim = this.animations.get(id);
        if (anim) {
            anim.animation.kill();
            this.animations.delete(id);
        }
    }

    /**
     * Pausa todas as animações
     */
    pauseAllAnimations() {
        gsap.globalTimeline.pause();
        if (this.lenis) {
            this.lenis.stop();
        }
    }

    /**
     * Resume todas as animações
     */
    resumeAllAnimations() {
        gsap.globalTimeline.resume();
        if (this.lenis) {
            this.lenis.start();
        }
    }

    /**
     * Limpa recursos
     */
    destroy() {
        // Limpa ScrollTrigger
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        
        // Para Lenis
        if (this.lenis) {
            this.lenis.destroy();
        }
        
        // Limpa Three.js
        if (this.renderer) {
            this.renderer.dispose();
            this.renderer.domElement.remove();
        }
        
        // Limpa animações customizadas
        this.animations.forEach(anim => anim.animation.kill());
        this.animations.clear();
        
        console.log('🧹 AnimationManager destruído');
    }
}

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.animationManager = new AnimationManager();
});

// Exporta para uso em módulos
export default AnimationManager; 