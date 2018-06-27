//Register the serviceworker
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js').then(function(registration) {
		// Registration was successful
		console.log('Serviceworker was registered');
	}, function(err) {
		// Registration failed
		console.log('Serviceworker registration failed');
	});
}
