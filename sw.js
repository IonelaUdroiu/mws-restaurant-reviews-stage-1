// Serviceworker name and version
let cacheID = 'restaurant-reviews-001';
// Data to be cached
let urlsToCache = ['/', './index.html', 'restaurant.html', './js/', '/js/dbhelper.js', '/js/main.js', '/js/register.js', '/js/restaurant_info.js', '/css/styles.css', '/data/restaurants.json', '/img/', '/img/1.jpg', '/img/2.jpg', '/img/3.jpg', '/img/4.jpg', '/img/5.jpg', '/img/6.jpg', '/img/7.jpg', '/img/8.jpg', '/img/9.jpg', '/img/10.jpg'];
//Install the serviceworker and open a new cache
self.addEventListener('install', function(event) {
	console.log('Serviceworker is installing');
	event.waitUntil(caches.open(cacheID).then(function(cache) {
		console.log('Cache is open');
		return cache.addAll(urlsToCache);
	}).then(function() {
		console.log('Serviceworker installation is complete');
	}));
});
// Fetch updates from the network
self.addEventListener('fetch', function(event) {
	console.log('Updates are received from the network');
	event.respondWith(caches.match(event.request).then(function(response) {
		if (response) {
			return response;
		}
		return fetch(event.request);
	}));
});
// Activate a new cache and delete the old cache
self.addEventListener('activate', function(event) {
	console.log('Activate a new cache');
	event.waitUntil(caches.keys().then(function(cacheNames) {
		return Promise.all(cacheNames.filter(function(cacheName) {
			return cacheName.startsWith('restaurant-reviews-') && cacheName != cacheID;
		}).map(function(cacheName) {
			return cache.delete(cacheName);
		}))
	}));
});
