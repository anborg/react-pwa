const CACHE_NAME="version-1";

const urlsToCache= ['index.html','offline.html', 'images/bg.webp' ]//page to show when app is offline
const self = this; // why alias?

//install ServiceWorker - callback function after install
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)//create & open a cache db
        .then((cache) => {
            console.log('urlsToCache added to cache '+ CACHE_NAME);
            return cache.addAll(urlsToCache);
        })
    )

});



//Listen for FETCH requests - if something is not fetchable, assume WIFI problem, return 'offline.html'
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request) //if the request is for a cached object e.g /index.html
        .then( () => {
            return fetch(event.request) //just return the fetch, what if this cant be fetched? due to WIFI problem?
                .catch(() => caches.match('offline.html'))
        })
    )

});



//Activate - remove previos caches and add new ones.
self.addEventListener('activate', (event) => { //On 'activate'
    const cacheWhitelist = []; // clean slate
    cacheWhitelist.push(CACHE_NAME); //retain only cacheable items

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhitelist.includes(cacheName)) { //keep only cache "version-1"
                    return caches.delete(cacheName);
                }
            })
        )) 
    )
});