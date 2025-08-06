// Service Worker для кеширования статических ресурсов
const CACHE_NAME = 'workstab-v1.0.0';
const STATIC_CACHE_URLS = [
  '/',
  '/manifest.json',
  '/favicon.svg',
  '/favicon-32x32.svg',
  '/favicon-16x16.svg',
  '/apple-touch-icon.svg'
];

// Установка SW
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Активация SW
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Стратегия кеширования
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Не кешируем запросы к API и динамические ресурсы
  if (url.pathname.startsWith('/api') || 
      url.hostname === 'cdn.poehali.dev' ||
      url.hostname === 'mc.yandex.ru') {
    return fetch(request);
  }

  // Кешируем статические ресурсы
  if (request.method === 'GET') {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) {
            return response;
          }

          return fetch(request.clone())
            .then((response) => {
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  // Кешируем только нужные ресурсы
                  if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|webp|avif)$/)) {
                    cache.put(request, responseToCache);
                  }
                });

              return response;
            })
            .catch(() => {
              // Fallback для офлайн режима
              if (request.destination === 'document') {
                return caches.match('/');
              }
            });
        })
    );
  }
});