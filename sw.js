/* EVERETT GRASSLER
  Assignment #2
  You must submit your BOTH your Github pages URL and your Github repository URL for your portfolio website. This must be submitted on Friday, December 21st. No commits pushed after 8:45 AM Friday, December 21st will be evaluated.

  For this assignment, you will be required to add a service worker to your online portfolio from SD100.

  Here are the requirements:

  Your service worker should store all the necessary assets (html, css, images and js) files in a cache.
  Your service worker should delete old caches.
  Your website should be hosted on Github pages, using https.
  Your website should work offline.
  Your service worker should fetch items from the local cache first, then fetch items from the network.
*/

// When sw gets installed then this will run
// How to add things into a cache
const staticCache = 'my-cache-1';// IMPORTANT: increment the num when you change something in the cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(staticCache).then((cache) => {
      return cache.addAll(// .addAll() takes an arr of items that we want to cache
        [
          './',
          './index.html',
          './images/input-icons/f.svg',
          './images/input-icons/n.svg',
          './images/input-icons/d.svg',
          './images/input-icons/df.svg',
          './images/input-icons/2.svg',
          './images/hero.jpg',
          './images/HTML-image.jpg',
          './images/PC-case.jpg',
          './images/video-games.jpg',
          './stylesheet/style.css',
          './js/index.js',
        ]
      );
    })
    .catch((err) => console.warn('make cache ERROR:', err))
  );

});

// When the new sw gets activated this runs
// How to delete old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      console.log(cacheNames);
      return Promise.all(
        cacheNames.filter((cacheName) => {
          return cacheName.startsWith('my-') && cacheName !== staticCache;
        })
        .map((cacheName) => {
          return caches.delete(cacheName);
        })
      );
    })
    .catch((err) => console.warn('delete cache ERROR:', err))
  );

});

// When fetches are made then this will run
// How to get things from the cache
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
    .then((response) => {
      console.log(response);
      return response;
    })
    .then((response) => {
      return response || fetch(e.request);
    })
    .catch((err) => console.warn('retrieve from cache ERROR:', err))
  );

});