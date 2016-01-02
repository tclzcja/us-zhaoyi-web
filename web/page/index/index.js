/*jslint browser: true, esnext: true */

(function () {

    'use strict';

    const key = "page-index";

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
        self.innerHTML = document.querySelector("link[data-component='" + key + "']").import.querySelector("template").innerHTML;
        portraitize();
    }

    function portraitize() {
        var sl = document.querySelectorAll("body > page-index > header > table > tbody > tr > td");
        for (var i = 0; i < sl.length; i++) {
            sl[i].style.backgroundImage = "url('./page/index/portrait/doctor/" + Math.randomRange(1, 14) + ".jpg')";
        }
    }

    init();

}());