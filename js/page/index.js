/* jshint browser: true, esnext: true */

(function () {

    'use strict';

    const self = document.querySelector("body > #index");

    const Api = window.Api;
    const Auth = window.Auth;
    const Cache = window.Cache;

    self.addEventListener("hey", function () {

        portraitize(self);

        count(self.querySelector(":scope > main.doctor"), Cache.Get("doctor").length);
        count(self.querySelector(":scope > main.hospital"), Cache.Get("hospital").length);
        count(self.querySelector(":scope > main.item"), Cache.Get("item").length);
        count(self.querySelector(":scope > main.user"), Cache.Get("user").count);
        count(self.querySelector(":scope > main.comment"), 60000);

    });

    self.querySelector(":scope > header > main > input").addEventListener("keyup", function () {
        if (this.value !== "") {
            self.querySelector(":scope > header > main > footer").classList.add("on");
        } else {
            self.querySelector(":scope > header > main > footer").classList.remove("on");
        }
    });

    self.querySelector(":scope > header > main > footer").addEventListener("click", function () {
        location.hash = "#l=search";
    });

    function portraitize(self) {
        var sl = self.querySelectorAll(":scope > header > table > tbody > tr > td");
        for (var i = 0; i < sl.length; i++) {
            sl[i].style.backgroundImage = "url('img/portrait/doctor/" + Math.randomRange(1, 14) + ".jpg')";
        }
    }

    function count(el, target) {
        el.innerHTML = "0";
        var t = 2000 / (target > 50000 ? 50000 : target);
        t = t > 500 ? 500 : t;
        var span = t < 1 ? 47 : 1;
        var i = window.setInterval(function () {
            var c = parseInt(el.innerHTML, 10);
            if (c >= target) {
                window.clearInterval(i);
            } else {
                c += span;
                el.innerHTML = c > 50000 ? "50000+" : c;
            }
        }, t);
    }

}());