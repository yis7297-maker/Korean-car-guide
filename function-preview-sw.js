/* Local preview only: the desktop preview server does not resolve directory index files. */
self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (
    event.request.mode === 'navigate' &&
    url.origin === self.location.origin &&
    /^\/function\/[^/]+\/$/.test(url.pathname)
  ) {
    event.respondWith(
      fetch(`${url.pathname}index.html`, { cache: 'no-store' })
        .then(response => {
          if (response.ok) return response;
          return fetch('/404.html', { cache: 'no-store' });
        })
    );
  }
});
