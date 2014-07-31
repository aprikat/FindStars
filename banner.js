addEventListener('message', function(event) {
    if (event.data && event.data.extensionMessage) {
        alert("hello from banner.js");
    }
});