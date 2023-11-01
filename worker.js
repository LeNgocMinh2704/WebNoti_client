console.log("worker injection");

self.addEventListener("push", function (e) {
    const data = e.data.json();
    console.log("Log check data", data);
    self.registration.showNotification(data.title, {
        body: data.body,
    });
});
