var CACHE_NAME = 'v1';
var urlsToCache = [
    '/',
    '/img/headers/dreamstime1.jpg',
    '/img/icons/icn-research.svg',
    '/img/icons/icn-graphic-design.svg',
    '/img/icons/icn-marketing.svg',
    '/img/icons/icn-web-design.svg',
    '/img/icons/icn-web-development.svg',
    '/img/icons/icn-mobile-apps.svg',
    '/img/features/feature-01.jpg',
    '/img/features/2.jpg',
    '/img/case-studies/case-study-01.png',
    '/img/case-studies/case-study-02.png',
    '/img/case-studies/case-study-03.png',
    '/img/home/webdesign1x.png',
    '/img/home/webdevelopment1x.png',
    '/img/startup/bg-3.png',
    '/img/startup/hero-banner.png',
    //'/workflow',
    //'/contact',
    //'/faq',
    //'/blog',
    //'/dist',
    //'/dist/custom_styles.js',
    //'/dist/vendor_src.js',
    //'/dist/main.js'
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