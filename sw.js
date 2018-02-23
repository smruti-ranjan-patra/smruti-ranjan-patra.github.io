var CACHE_NAME = 'version-7';
var urlsToCache = [
	'./',
];

var excludeUrls = [];


self.addEventListener('install', function(event){
	// Perform install steps
	event.waitUntil(
	caches.open(CACHE_NAME)
		.then(function(cache) {
			console.log('Opened cache');
		return cache.addAll(urlsToCache);
		})
	);
});

/*self.addEventListener('activate', function(event){
	console.log('Activate event request :- ');
	console.log(event.request);
});*/

/*self.addEventListener('fetch', function(event){
	// console.log('Fetch event request :- ');
	// console.log(event.request);
	console.log(777);
});*/

self.addEventListener('fetch', function (e) {
    console.log("[ServiceWorker] Fetching", e.request.url);
    const excludeList = excludeUrls.map(function (route) {
        return e.request.url.includes(route);
    });
    if (!excludeList.includes(true)) {
        e.respondWith(
            caches.match(e.request).then(function (response) {
                if (response) {
                    console.log("[Service Worker] Found in cache", e.request.url)
                    return response;
                }

                const requestClone = e.request.clone();
                fetch(requestClone)
                    .then(function (response) {
                        if (!response) {
                            console.log("[ServiceWorker] No response from fetch");
                            return response;
                        }

                        const responseClone = response.clone();
                        caches.open(cacheName).then(function (cache) {
                            cache.put(e.request, responseClone);
                            return response;
                        });
                    })
                    .catch(function (error) {
                        console.log("[ServiceWorker] Error Fetching && caching new data");
                    })
            })
        )
    }

    console.log(777);
});