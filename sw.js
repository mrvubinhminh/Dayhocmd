// Service worker: chạy được khi mất mạng (lưu app + MathJax + phông chữ)
const CACHE="day-hoc-toan-v21";
const SHELL=["./","index.html","manifest.webmanifest","icon.svg","icon-192.png","icon-512.png",
  "https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-svg.js"];
self.addEventListener("install",e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())); });
self.addEventListener("activate",e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener("fetch",e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=="GET") return;
  const mine=u.origin===location.origin, lib=/cdn\.jsdelivr\.net|fonts\.(googleapis|gstatic)\.com/.test(u.hostname);
  if(!mine && !lib) return;                       // các trang web nhúng (iframe) đi thẳng mạng
  if(mine && (e.request.mode==="navigate" || u.pathname.endsWith(".html"))){
    // trang chính: ưu tiên bản mới trên mạng, mất mạng thì dùng bản đã lưu
    e.respondWith(fetch(e.request).then(r=>{ const c=r.clone(); caches.open(CACHE).then(x=>x.put(e.request,c)); return r; }).catch(()=>caches.match(e.request).then(r=>r||caches.match("index.html"))));
    return;
  }
  e.respondWith(caches.match(e.request).then(hit=>{
    const net=fetch(e.request).then(r=>{ if(r.ok||r.type==="opaque"){ const c=r.clone(); caches.open(CACHE).then(x=>x.put(e.request,c)); } return r; }).catch(()=>hit);
    return hit||net;
  }));
});
