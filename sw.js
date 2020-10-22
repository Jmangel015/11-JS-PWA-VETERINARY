const nombreCache = 'apv-v2';
const archivos = [
  '/',
  '/index.html',
  '/css/bootstrap.css',
  '/css/styles.css',
  '/js/app.js',
  '/js/apv.js',
  '/error.html',
];

//Cuando se instala el service worker
self.addEventListener('install', (e) => {
  console.log('Instalado el service worker');
  e.waitUntil(
    caches.open(nombreCache).then((cache) => {
      console.log('cacheando');
      cache.addAll(archivos);
    })
  );
});
//Activar Service Worker
self.addEventListener('activate', (e) => {
  console.log('Service Worker Activado');
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== nombreCache)
          .map((key) => caches.delete(key)) // borra las demas versiones de cache
      );
    })
  );
});

//Evneto fetch para descargar archivos estaticos
self.addEventListener('fetch', (e) => {
  console.log('Fetch...', e);
  e.respondWith(
    caches
      .match(e.request)
      .then((respuestaCache) => {
        return respuestaCache;
      })
      .catch(() => caches.match('/error.html'))
  );
});
