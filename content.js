function onclick(e) {
    console.log("=============click button==============");
    var divs = document.getElementsByClassName("css-8tl366")[2];
    console.log(divs)
    divs.style.backgroundColor = 'blue';
}

function onload(e) {
    console.log("=================onload===================")
    var button = document.getElementsByClassName("css-1vn6k0o")
    button[0].addEventListener("click", onclick);

}

window.addEventListener("load", onload);

const skincare_ingredients_to_avoid = ['lead', 'triclosan', 'oxybenzone', 'bht',
    'butylated hydroxyanisole', 'bha',
    'butylated hydroxytoluene', 'coal tar', 'paraben', 'phthalates',
    'formaldehyde',
    'eda', 'dithanolamine', 'triethanolamine', 'toluene', 'retinoids',
    'retin a',
    'salycylic acid', 'bpa', 'bithionol',
    'chlorofluorocarbon propellants', 'chloroform',
    'hexachlorophene', 'mercury', 'methylene chloride', 'vinyl chloride',
    'zirconium', 'talc']