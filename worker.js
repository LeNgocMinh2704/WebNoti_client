console.log("worker injection");

self.addEventListener("push", function (e) {
    const data = e.data.json();
    console.log("Log check data", data);
    console.log("Log check self: ", self);
    self.registration
        .showNotification(data.title, {
            body: data.body,
        })
        .then(() => {
            // Send a message to the main thread to speak the notification text
            self.clients.matchAll().then(all => all.forEach(client => {
                client.postMessage(data.body);
            }));
        });
});

