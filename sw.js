// version 1.01
// change version to reinstall service worker and update Files

var cacheName = 'cache_fck';
var filesToCache = [
	'/Fck/',
	'/Fck/fontawesome/css/all.css',
	'/Fck/favicon.svg',
	'/Fck/stylesheet.css',
	'/Fck/Fck.html',
	'/Fck/manifest.json',
	'/Fck/fontawesome/webfonts/fa-regular-400.woff2',
	'/Fck/fontawesome/webfonts/fa-solid-900.woff2',
	'/Fck/title.png'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  self.skipWaiting();
  caches.delete(cacheName);
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});