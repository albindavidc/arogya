// Define a unique name for the cache
const CACHE_NAME = 'arogya-cache-v1';

// List all the essential files that make up the application shell
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/index.tsx',
  '/metadata.json',
  '/src/app.component.ts',
  '/src/app.component.html',
  '/src/models/pose.model.ts',
  '/src/pose-detail-modal.component.ts',
  '/favicon.png'
];

// 'install' event: triggers when the service worker is first installed.
self.addEventListener('install', event => {
  // waitUntil() ensures that the service worker will not install until the code inside has successfully completed.
  event.waitUntil(
    // Open the cache by name.
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // Add all specified URLs to the cache.
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// 'fetch' event: triggers for every network request made by the page.
self.addEventListener('fetch', event => {
  // respondWith() hijacks the request and allows us to provide our own response.
  event.respondWith(
    // Check if the request exists in our cache.
    caches.match(event.request)
      .then(response => {
        // If a cached response is found, return it.
        if (response) {
          return response;
        }
        // If the request is not in the cache, fetch it from the network.
        return fetch(event.request);
      }
    )
  );
});

// 'activate' event: triggers when the service worker is activated.
// This is a good time to clean up old, unused caches.
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        // Map over all cache names
        cacheNames.map(cacheName => {
          // If a cache is not in our whitelist, delete it.
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});