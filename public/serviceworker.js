const CACHE_NAME="version-1";

const staticAssets= [
    'index.html',
    'offline.html',
    'images/bg.webp'
 ]//page to show when app is offline
const self = this; // why alias?

//install ServiceWorker - callback function after install
self.addEventListener('install', async (event) => {
    const cache =  await caches.open(CACHE_NAME);
    await cache.addAll(staticAssets);
    return self.skipWaiting();
    // event.waitUntil(
    //     caches.open(CACHE_NAME)//create & open a cache db
    //     .then((cache) => {
    //         console.log('staticAssets added to cache '+ CACHE_NAME);
    //         return cache.addAll(staticAssets);
    //     })
    // )

});






//Activate - remove previos caches and add new ones.
self.addEventListener('activate', async (event) => { //On 'activate'
    self.clients.claim();
// const cacheWhitelist = []; // clean slate
    // cacheWhitelist.push(CACHE_NAME); //retain only cacheable items

    // event.waitUntil(
    //     caches.keys().then((cacheNames) => Promise.all(
    //         cacheNames.map((cacheName) => {
    //             if(!cacheWhitelist.includes(cacheName)) { //keep only cache "version-1"
    //                 return caches.delete(cacheName);
    //             }
    //         })
    //     )) 
    // )
});

//FOr offlien Listen for FETCH requests - if something is not fetchable, assume WIFI problem, return 'offline.html'
self.addEventListener('fetch',  async (event) => {
    const req =  event.request;
    const url = new URL(req.url);
    if(url.origin === location.origin){
        event.respondWith(cacheFirst(req));
    }else{
        event.respondWith(networkAndCache(req));
    }
    // event.respondWith(
    //     caches.match(event.request) //if the request is for a cached object e.g /index.html
    //     .then( () => {
    //         return fetch(event.request) //just return the fetch, what if this cant be fetched? due to WIFI problem?
    //             .catch(() => caches.match('offline.html'))
    //     })
    // )

});


async function cacheFirst(req){
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(req);
    if (req.cache === 'only-if-cached'){
        return cached;//https://github.com/sveltejs/sapper-template/issues/34
    }else{
        return fetch(req);
    }
    // return cached || fetch(req);
}

async function networkAndCache(req){
    const cache = await caches.open(CACHE_NAME);
    try{
        const fresh = await fetch(req);
        await cache.put(req, fresh.clone());
        return fresh;
    }catch(e){
        // return caches.match('offline.html');
    }
}