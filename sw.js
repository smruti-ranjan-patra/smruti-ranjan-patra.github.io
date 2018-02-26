var cacheName = 'v4';

var cacheFiles = [
	'./',
	'./index.html',
	'./google_img.png'
];

self.addEventListener('install', function(e){
    console.log("[ServiceWorker] Installed");

    e.waitUntil(
		caches.open(cacheName).then(function(cache) {
			console.log("[ServiceWorker] Caching cacheFiles");
			return cache.addAll(cacheFiles);
		})
	)
});

self.addEventListener('activate', function(e){
    console.log("[ServiceWorker] Acticated");

    e.waitUntil(
    	caches.keys().then(function(cacheNames) {
			return Promise.all(cacheNames.map(function(thisCacheName) {
				if (thisCacheName !== cacheName) {
					console.log("[ServiceWorker] Removing Cached Files from ", thisCacheName);
					return caches.delete(thisCacheName);
				}
			}))
		})
	)
});

self.addEventListener('fetch', function(e){
    console.log("[ServiceWorker] Fetched", e.request);

    e.respondWith(
    	caches.match(e.request).then(function(response) {
    		if (response) {
    			console.log("[ServiceWoekr] Found in cache", e.request.url);
    			return response;
    		}

    		// return fetch(e.request);

    		// --------------------------------------------------------

    		var requestClone = e.request.clone();

    		fetch(requestClone)
	    		.then(function(response) {
	    			if (!response) {
	    				console.log("[ServiceWoekr] No response from Fetch");
	    				return response;
	    			}

	    			var responseClone = response.clone();

	    			caches.open(cacheName).then(function(cache) {
	    				cache.put(e.request, responseClones);
	    				return response;
	    			});
	    		})
	    		.catch(function(err) {
	    			console.log("[ServiceWoekr] Error in Fetching and Caching new data", err);
	    		});

	    	// ------------------------------------------------------------
    	})
    )
});

/*const cacheName = "version-1";
const cacheFiles = [
    './'
];

self.addEventListener('install', function(e){
    console.log("[ServiceWorker] Installed");

    e.waitUntil(
        caches.open(cacheName).then(function(cache){
            console.log("[ServiceWorker] Caching cacheFiles");
            return cache.addAll(cacheFiles);
        })
    )
});

self.addEventListener('activate', function(e){
    console.log("[ServiceWorker] Acticated");

    e.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(cacheNames.map(function(thisCacheName){
                if(thisCacheName !== cacheName) {
                    console.log("[ServiceWorker] Removing cached files from", thisCacheName);
                    return caches.delete(thisCacheName);
                }
            }))
        })
    );
});

self.addEventListener('fetch', function (e) {
    console.log("[ServiceWorker] Fetching", e.request.url);

    e.respondWith(
        caches.match(e.request).then(function (response) {
            if (response) {
                console.log("[Service Worker] Found in cache", e.request.url);
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
});*/