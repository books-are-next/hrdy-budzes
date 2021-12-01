/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-357c05c';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./10073_split_001.html","./10073_split_002.html","./10073_split_000.html","./10073_split_003.html","./10073_split_004.html","./10073_split_005.html","./10073_split_006.html","./10073_split_007.html","./10073_split_008.html","./10073_split_009.html","./10073_split_010.html","./10073_split_011.html","./10073_split_012.html","./10073_split_013.html","./10073_split_014.html","./10073_split_015.html","./10073_split_016.html","./10073_split_017.html","./10073_split_018.html","./10073_split_019.html","./10073_split_020.html","./10073_split_021.html","./10073_split_022.html","./10073_split_023.html","./colophon.html","./favicon.png","./index.html","./manifest.json","./titlepage.html","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/9498-1.png","./resources/cover.jpg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
