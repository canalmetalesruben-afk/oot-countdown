const CACHE_NAME = "oot-countdown-v4";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./manifest.json",
    "./service-worker.js",

    "./hyrule-bg.png",
    "./oot-logo.png",
    "./navi.png",

    "./icon-192-shield.png",
    "./icon-512-shield.png"
];


self.addEventListener("install", event => {

    event.waitUntil(

        caches
            .open(CACHE_NAME)
            .then(cache => {

                return cache.addAll(
                    FILES_TO_CACHE
                );

            })

    );

    self.skipWaiting();

});


self.addEventListener("activate", event => {

    event.waitUntil(

        caches
            .keys()
            .then(keys => {

                return Promise.all(

                    keys
                        .filter(
                            key =>
                                key !== CACHE_NAME
                        )
                        .map(
                            key =>
                                caches.delete(key)
                        )

                );

            })

    );

    self.clients.claim();

});


self.addEventListener("fetch", event => {

    event.respondWith(

        caches
            .match(event.request)
            .then(cachedResponse => {

                return (
                    cachedResponse ||
                    fetch(event.request)
                );

            })

    );

});
