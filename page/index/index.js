/* jshint browser: true, esnext: true */

(function () {

    'use strict';

    const key = "page-index";

    var Api = window.Api;
    var Auth = window.Auth;

    function init() {
        var proto = Object.create(HTMLElement.prototype);
        proto.createdCallback = function () {
            active(this);
        };
        document.registerElement(key, {
            prototype: proto
        });
    }

    function active(self) {

        if (!Auth.Test()) {
            Api.Reset();
        }

        self.innerHTML = document.querySelector("link[data-component='" + key + "']").import.querySelector("template").innerHTML;
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
            sl[i].style.backgroundImage = "url('./page/index/portrait/doctor/" + Math.randomRange(1, 14) + ".jpg')";
        }
    }

    init();

}());