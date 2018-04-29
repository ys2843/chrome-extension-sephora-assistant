window.addEventListener("load", onLoad, false);

function returnIngredientsTab() {
    var parent = document.getElementsByClassName("css-1lqspdf");
    var divs = parent[0].getElementsByTagName('div')
    for (var i = 0, l = divs.length; i < l; i++) {
        if (divs[i].textContent === 'Ingredients') {
            return i - 1;
        }
    }
    return -1;
}


function onLoad(e) {
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