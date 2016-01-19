/* jshint browser: true, esnext: true */

(function () {

    'use strict';

    const self = document.querySelector("body > #index");

    const Api = window.Api;
    const Auth = window.Auth;

    function init() {

        if (!Auth.Test()) {
            Api.Reset();
        }

        self.querySelector(":scope > header > main > input").addEventListener("keyup", function () {
            if (this.value !== "") {
                self.querySelector(":scope > header > main > footer").classList.add("on");
            } else {
                self.querySelector(":scope > header > main > footer").classList.remove("on");
            }
        });
        self.querySelector(":scope > header > main > footer").addEventListener("click", function () {
            location.hash = "#search";
        });
        portraitize(self);
    }

    function portraitize(self) {
        var sl = self.querySelectorAll(":scope > header > table > tbody > tr > td");
        for (var i = 0; i < sl.length; i++) {
            sl[i].style.backgroundImage = "url('img/portrait/doctor/" + Math.randomRange(1, 14) + ".jpg')";
        }
    }

    init();

}());