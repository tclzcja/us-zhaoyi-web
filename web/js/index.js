(function () {

    'use strict';

    function portraitize() {

        var pl = document.querySelectorAll("body > table > tbody > tr > td.portrait"),
            i = 0;

        for (i = 0; i < pl.length; i += 1) {
            pl[i].style.backgroundImage = "url(../img/portrait/doctor." + Math.randomRange(1, 15) + ".jpg)";
        }

    }

    portraitize();

}());