// We need to wait until all the data is loaded
window.addEventListener("load", onLoad, false);

// Check if there is ingredients information by searching in the header of the tab
function returnIngredientsTab() {
    var divs = document.getElementsByClassName("css-1lqspdf")[0].getElementsByTagName('div');
    for (var i = 0, l = divs.length; i < l; i++) {
        if (divs[i].textContent === 'Ingredients') {
            return i - 1;
        }
    }
    return -1;
}


function sendProductName() {
    var brand = document.querySelector("a.css-zvvfrv span.css-cjz2sh").textContent;
    var name = document.querySelector("span.css-1g2jq23").textContent;
    chrome.runtime.sendMessage({"method": "sephora" ,"brand": brand, "name": name}, function () {
    });
}

// Insert a text node to show the condition of the cosmetic
function onLoad(e) {

    sendProductName();

    var ingreNum = returnIngredientsTab();
    var h = document.createElement("h3");
    var t = document.createTextNode("Unknown Ingredients");
    h.style.color = 'forestgreen';
    h.appendChild(t);
    document.getElementsByClassName("css-1kaybv4")[0].appendChild(h);
    if (ingreNum === -1) {
        return;
    }
    var content = document.getElementsByClassName("css-8tl366")[ingreNum].textContent;
    var harmfulIngredients = checkIngredients(content);
    if (harmfulIngredients.length !== 0) {
        t.nodeValue = "Unsafe for pregnancy! Contain harmful ingredients: " + harmfulIngredients;
        h.style.color = 'deeppink';
    } else {
        t.nodeValue = "Safe for pregnancy!";
        h.style.color = 'deepskyblue';
    }

}

// Use a string search to find harmful ingredients in the products
function checkIngredients(ingredients) {
    var result = [];
    var skincare_ingredients_to_avoid = ['lead', 'triclosan', 'oxybenzone', 'bht',
        'butylated hydroxyanisole', 'bha',
        'butylated hydroxytoluene', 'coal tar', 'paraben', 'phthalates',
        'formaldehyde',
        'eda', 'dithanolamine', 'triethanolamine', 'toluene', 'retinoids',
        'retin a',
        'salycylic acid', 'bpa', 'bithionol',
        'chlorofluorocarbon propellants', 'chloroform',
        'hexachlorophene', 'mercury', 'methylene chloride', 'vinyl chloride',
        'zirconium', 'talc']
    skincare_ingredients_to_avoid.forEach(function (ele) {
        if (ingredients.includes(ele)) {
            result.push(ele);
        }
    });
    return result;
}