'use strict';



function toggleDarkMode(elBtn) {
    console.log(elBtn);

    var elTheme = document.getElementsByTagName('link')[0]

    if (elTheme.getAttribute('href') == './css/light.css') {
        elTheme.setAttribute('href', './css/dark.css')
        elBtn.src = 'img/sun.png'
    } else {
        elTheme.setAttribute('href', './css/light.css')
        elBtn.src = 'img/moon.png'
    }
}

