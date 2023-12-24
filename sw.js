const CACHE_ELEMENTS = [
    "./",
    "https://unpkg.com/react@18/umd/react.development.js",
    "https://unpkg.com/react-dom@18/umd/react-dom.development.js",
    "https://unpkg.com/@babel/standalone/babel.min.js",
    "style.css"
];

const CACHE_NAME = "v1_cache_pwa_react"

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => cache.addAll(CACHE_ELEMENTS).then(() => self.skipWaiting()))
        .catch(e => console.log(e))
    )
})

self.addEventListener("activate", (e) => {
    
    const cacheWhitelist = [CACHE_NAME]
    e.waitUntil(
        caches.keys().then(cachesNames => Promise.all(cachesNames).map(cacheName => 
            cacheWhitelist.indexOf(cacheName) === -1 && caches.delete(cacheName))
        .then(() => self.clients.claim())
        ))
})

self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request)
        .then(res => {
            if(res)
                return res;
            return fetch(e.request);
        })
    )
})