const CACHE_NAME = 'muj-web-cache-v1';
// Zde vypiš soubory, které chceš, aby fungovaly offline
const urlsToCache = [
  '/',
  './index.html',
  './styles.css',
  './script.js',
  './images/192.png',
  './images/512.png'
];

// Instalace Service Workeru a uložení souborů do cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Otevřena cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Zpracování požadavků (když uživatel načítá web)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Pokud je soubor v cache, vrátíme ho, jinak ho stáhneme z internetu
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});