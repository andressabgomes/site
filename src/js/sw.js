// ===================================
// CAJÁ - SERVICE WORKER
// ===================================

const CACHE_NAME = 'caja-v2.0.0';
const STATIC_CACHE = 'caja-static-v2.0.0';
const DYNAMIC_CACHE = 'caja-dynamic-v2.0.0';

// Arquivos para cache estático
const STATIC_FILES = [
    '/',
    '/index.html',
    '/css/main.min.css',
    '/js/main.min.js',
    '/manifest.json',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap',
    'https://fonts.cdnfonts.com/css/sohne',
    'https://fonts.cdnfonts.com/css/circular-std',
    'https://unpkg.com/aos@2.3.1/dist/aos.css',
    'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
    'https://unpkg.com/flickity@3.0.0/dist/flickity.css',
    'https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css',
    'https://unpkg.com/aos@2.3.1/dist/aos.js',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/TextPlugin.min.js',
    'https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.27/bundled/lenis.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/three.js/r158/three.min.js',
    'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
    'https://unpkg.com/jarallax@2.1.3/dist/jarallax.min.js',
    'https://unpkg.com/flickity@3.0.0/dist/flickity.pkgd.min.js',
    'https://cdn.jsdelivr.net/npm/sweetalert2@11'
];

// Imagens e assets para cache
const ASSETS_FILES = [
    'https://customer-assets.emergentagent.com/job_caja-tech/artifacts/haipaigv_Logo%20fundo%20transparente.png',
    'https://customer-assets.emergentagent.com/job_caja-tech/artifacts/ab2iz7t6_i%CC%81cone%20fundo%20transparente.png'
];

// Instalação do Service Worker
self.addEventListener('install', event => {
    console.log('Service Worker: Instalando...');

    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('Service Worker: Cacheando arquivos estáticos');
                return cache.addAll(STATIC_FILES);
            })
            .then(() => {
                console.log('Service Worker: Instalação concluída');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('Service Worker: Erro na instalação', error);
            })
    );
});

// Ativação do Service Worker
self.addEventListener('activate', event => {
    console.log('Service Worker: Ativando...');

    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('Service Worker: Removendo cache antigo', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker: Ativação concluída');
                return self.clients.claim();
            })
    );
});

// Interceptação de requisições
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Estratégia: Cache First para arquivos estáticos
    if (request.method === 'GET' && isStaticFile(url.pathname)) {
        event.respondWith(
            caches.match(request)
                .then(response => {
                    if (response) {
                        return response;
                    }
                    return fetch(request)
                        .then(fetchResponse => {
                            if (fetchResponse.status === 200) {
                                const responseClone = fetchResponse.clone();
                                caches.open(DYNAMIC_CACHE)
                                    .then(cache => {
                                        cache.put(request, responseClone);
                                    });
                            }
                            return fetchResponse;
                        });
                })
                .catch(() => {
                    // Fallback para página offline
                    if (request.destination === 'document') {
                        return caches.match('/offline.html');
                    }
                })
        );
    }

    // Estratégia: Network First para API calls
    else if (isApiCall(url.pathname)) {
        event.respondWith(
            fetch(request)
                .then(response => {
                    if (response.status === 200) {
                        const responseClone = response.clone();
                        caches.open(DYNAMIC_CACHE)
                            .then(cache => {
                                cache.put(request, responseClone);
                            });
                    }
                    return response;
                })
                .catch(() => {
                    return caches.match(request);
                })
        );
    }

    // Estratégia: Stale While Revalidate para outros recursos
    else {
        event.respondWith(
            caches.match(request)
                .then(cachedResponse => {
                    const fetchPromise = fetch(request)
                        .then(networkResponse => {
                            if (networkResponse.status === 200) {
                                const responseClone = networkResponse.clone();
                                caches.open(DYNAMIC_CACHE)
                                    .then(cache => {
                                        cache.put(request, responseClone);
                                    });
                            }
                            return networkResponse;
                        })
                        .catch(() => cachedResponse);

                    return cachedResponse || fetchPromise;
                })
        );
    }
});

// Função para verificar se é arquivo estático
function isStaticFile(pathname) {
    const staticExtensions = ['.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.woff', '.woff2'];
    return staticExtensions.some(ext => pathname.endsWith(ext)) ||
           pathname === '/' ||
           pathname === '/index.html' ||
           pathname === '/manifest.json';
}

// Função para verificar se é API call
function isApiCall(pathname) {
    return pathname.startsWith('/api/') ||
           pathname.includes('contact.php') ||
           pathname.includes('test_hostinger.php');
}

// Background Sync para formulários offline
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    try {
        const requests = await getOfflineRequests();
        for (const request of requests) {
            await fetch(request.url, request.options);
            await removeOfflineRequest(request.id);
        }
    } catch (error) {
        console.error('Background sync failed:', error);
    }
}

// Push notifications
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'Nova atualização da Cajá!',
        icon: 'https://customer-assets.emergentagent.com/job_caja-tech/artifacts/ab2iz7t6_i%CC%81cone%20fundo%20transparente.png',
        badge: 'https://customer-assets.emergentagent.com/job_caja-tech/artifacts/ab2iz7t6_i%CC%81cone%20fundo%20transparente.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Ver mais',
                icon: 'https://customer-assets.emergentagent.com/job_caja-tech/artifacts/ab2iz7t6_i%CC%81cone%20fundo%20transparente.png'
            },
            {
                action: 'close',
                title: 'Fechar',
                icon: 'https://customer-assets.emergentagent.com/job_caja-tech/artifacts/ab2iz7t6_i%CC%81cone%20fundo%20transparente.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Cajá - Tecnologia Artesanal', options)
    );
});

// Click em notificação
self.addEventListener('notificationclick', event => {
    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('https://cajait.com')
        );
    }
});

// Funções auxiliares para background sync
async function getOfflineRequests() {
    // Implementar lógica para buscar requisições offline
    return [];
}

async function removeOfflineRequest(id) {
    // Implementar lógica para remover requisição processada
    return true;
}
