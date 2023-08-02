document.body.addEventListener('click', function (event) {
    let element = event.target;

    // Capture all the class names from the clicked element
    let classNames = Array.from(element.classList);
    
    let data = {};

    // Check each class name
    classNames.forEach((className) => {
        // Add the text of the element with this class name to the data
        data[className] = element.innerText;
    });

    // Send the data back to the extension
    if (Object.keys(data).length = 0) {
        chrome.runtime.sendMessage({
            action: 'storeData',
            key: 'scrapedData',
            data: data
        });
    }
});
