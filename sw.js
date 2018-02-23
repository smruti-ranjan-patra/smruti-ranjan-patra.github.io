

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}


self.addEventListener('install', function(event){
	console.log('Install event request :- ');
	console.log(event.request);
});

self.addEventListener('activate', function(event){
	console.log('Activate event request :- ');
	console.log(event.request);
});

self.addEventListener('fetch', function(event){
	console.log('Fetch event request :- ');
	console.log(event.request);
});