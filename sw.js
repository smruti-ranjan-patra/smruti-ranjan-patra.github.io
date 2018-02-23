var CACHE_NAME = 'version-4';
var urlsToCache = [
	'./',
];


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

self.addEventListener('fetch', function(event){
	// console.log('Fetch event request :- ');
	// console.log(event.request);
	console.log(333);
});