chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'www.sephora.com'},
        })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.method === 'sephora') {
        var tag = 1;
        var url = "https://www.google.com/search?q=" + message.brand + " " + message.name;
        url = encodeURI(url);
        var products = [];
        var xhr = new XMLHttpRequest();
        xhr.responseType = "document";
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var doc = xhr.response.querySelectorAll('div.gkMlQe')
                    if (doc.length !== 0) {
                        doc.forEach(function (ele) {
                            var tips = {};
                            tips.price = ele.childNodes[0].textContent;
                            tips.name = ele.childNodes[2].childNodes[1].childNodes[0].textContent;
                            tips.url = ele.childNodes[2].childNodes[1].href;
                            products.push(tips);
                        });
                    } else if (doc.length === 0 && tag === 1) {
                        url = "https://www.google.com/search?q=" + message.name;
                        xhr.open("GET", url);
                        xhr.send();
                        tag--;
                    }

                }
            }
        };
        xhr.open("GET", url, true);
        xhr.send();
    }
});


