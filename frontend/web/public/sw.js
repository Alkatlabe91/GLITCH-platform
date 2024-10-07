this.addEventListener('push', function(event) {
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: '/icon.png',
    };
    event.waitUntil(
        this.registration.showNotification(data.title, options)
    );
});
