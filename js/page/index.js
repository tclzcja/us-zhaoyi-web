/* jshint browser: true, esnext: true */

(function () {

    'use strict';

    const self = document.querySelector("body > #index");

    const Api = window.Api;
    const Auth = window.Auth;
    const Cache = window.Cache;

    self.addEventListener("hey", function () {

        //portraitize(self);

    });

    self.querySelector(":scope > main > input").addEventListener("keyup", function () {
        if (this.value !== "") {
            self.querySelector(":scope > main > footer").classList.add("on");
        } else {
            self.querySelector(":scope > main > footer").classList.remove("on");
        }
    });

    self.querySelector(":scope > main > footer").addEventListener("click", function () {
        location.hash = "#l=search-doctor";
    });

    function portraitize(self) {
        var sl = self.querySelectorAll(":scope > table > tbody > tr > td");
        for (var i = 0; i < sl.length; i++) {
            sl[i].style.backgroundImage = "url('img/portrait/doctor/" + Math.randomRange(1, 14) + ".jpg')";
        }
    }

}());