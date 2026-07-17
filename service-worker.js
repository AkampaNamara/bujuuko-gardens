// ============================================================
//  SERVICE WORKER FOR MIRACLE PARK GARDENS & HOTEL BUJUUKO
//  Enables offline support and app-like experience
// ============================================================

const CACHE_NAME = 'miracle-park-v1';
const urlsToCache = [
  '/bujuuko-gardens/',
  '/bujuuko-gardens/index.html',
  '/bujuuko-gardens/about.html',
  '/bujuuko-gardens/contact.html',
  '/bujuuko-gardens/menu.html',
  '/bujuuko-gardens/cart.html',
  '/bujuuko-gardens/style.css',
  '/bujuuko-gardens/script.js',
  '/bujuuko-gardens/logo.jpeg',
  '/bujuuko-gardens/overview.jpeg',
  '/bujuuko-gardens/logo-192.png',
  '/bujuuko-gardens/logo-512.png',
  '/bujuuko-gardens/manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
];

// Install Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Service Worker: Caching assets');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch from cache or network
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Update Service Worker
self.addEventListener('activate', function(event) {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
