(function () {

    'use strict';

    function init() {

        document.querySelector("#type > select").addEventListener("change", function () {
            this.parentNode.setAttribute("data-selected", this.value);
        });

        var dl = document.querySelectorAll("td.doctor"),
            i = 0;

        for (i = 0; i < dl.length; i += 1) {
            dl[i].style.backgroundImage = "url('../img/portrait/" + dl[i].getAttribute("data-id") + ".jpg')";
        }

    }

    function portraitize() {

        var pl = document.querySelectorAll("body > table > tbody > tr > td.portrait"),
            i = 0;

        for (i = 0; i < pl.length; i += 1) {
            pl[i].style.backgroundImage = "url(../img/portrait/" + Math.randomRange(1, 15) + ".jpg)";
        }

    }

    init();
    portraitize();

}());