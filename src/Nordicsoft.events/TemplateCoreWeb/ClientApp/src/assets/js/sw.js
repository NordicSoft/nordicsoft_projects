var CACHE_NAME = 'v1';
var urlsToCache = [
    '/'
];


this.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('v1').then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

this.addEventListener('fetch', function (event) {
    event.respondWith(caches.match(event.request).then(function (response) {
        // caches.match() always resolves
        // but in case of success response will have value
        if (response !== undefined) {
            return response;
        } else {
            return fetch(event.request).then(function (response) {
                // response may be used only once
                // we need to save clone to put one copy in cache
                // and serve second one
                let responseClone = response.clone();

                caches.open('v1').then(function (cache) {
                    cache.put(event.request, responseClone);
                });
                return response;
            });
        }
    }));
});

//this.addEventListener('activate', function (event) {
//    var cacheWhitelist = ['v2'];

//    event.waitUntil(
//        caches.keys().then(function (keyList) {
//            return Promise.all(keyList.map(function (key) {
//                if (cacheWhitelist.indexOf(key) === -1) {
//                    return caches.delete(key);
//                }
//            }));
//        })
//    );
//});