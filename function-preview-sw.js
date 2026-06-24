/* Local preview compatibility: resolves folder URLs when the preview server lacks directory indexes. */
self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (
    event.request.mode === 'navigate' &&
    url.origin === self.location.origin &&
    /^\/function\/[^/]+\/$/.test(url.pathname)
  ) {
    event.respondWith(fetch(`${url.pathname}index.html`, { redirect: 'follow' }));
  }
});
