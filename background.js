chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "storeData") {
        chrome.storage.local.set({[request.key]: request.data}, function() {
            console.log('Data saved');
        });
    }
});
