// Network first, cached copy when offline (app files + Firebase scripts).
const C = 'fc1';
addEventListener('install', e => e.waitUntil(caches.open(C).then(c => c.addAll(['./', 'index.html', 'config.js', 'icon.svg']))));
addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method != 'GET' || (u.origin != location.origin && u.host != 'www.gstatic.com')) return;
  e.respondWith(fetch(e.request).then(r => {
    const k = r.clone();
    caches.open(C).then(c => c.put(e.request, k));
    return r;
  }).catch(() => caches.match(e.request)));
});
