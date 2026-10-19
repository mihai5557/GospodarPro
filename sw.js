const CACHE = "gospodar-v2"; // Изменили версию с v1 на v2
const ASSETS = ["./", "./manifest.json", "./icon.png", "./bg.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => {
      // Удаляем все старые кэши
      return Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)));
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
