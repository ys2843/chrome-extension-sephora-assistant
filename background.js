chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'www.sephora.com'},
        })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
});

var products = [];
var xhr = new XMLHttpRequest();
xhr.responseType = "document";
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            var doc = xhr.response.getElementById("uid_2").querySelectorAll('div.gkMlQe')
            doc.forEach(function (ele) {
                var tips = {};
                tips.price = ele.childNodes[0].textContent;
                tips.name = ele.childNodes[2].childNodes[1].childNodes[0].textContent;
                tips.url = ele.childNodes[2].childNodes[1].href;
                products.push(tips);
            });
        }
    }
};

xhr.open("GET", "https://www.google.com/search?q=Sk%20II%20Facial%20Treatment%20Essence", true);
xhr.send();

