/*jslint browser: true, esnext: true */

(function () {

    'use strict';

    const key = "page-search";

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
        self.querySelector(":scope > aside > div.keyword > input").addEventListener("keyup", function () {
            if (this.value !== "") {
                this.parentNode.classList.add("on");
            } else {
                this.parentNode.classList.remove("on");
            }
        });
        self.querySelector(":scope > aside > div.star > select").addEventListener("change", function () {
            if (this.value !== "0") {
                this.parentNode.classList.add("on");
            } else {
                this.parentNode.classList.remove("on");
            }
        });
        portraitize(self);
    }

    function portraitize(self) {
        var sl = self.querySelectorAll(":scope > main > table > tbody > tr > td:not(.button)");
        for (var i = 0; i < sl.length; i++) {
            sl[i].style.backgroundImage = "url('./page/search/portrait/doctor/" + (i + 1) + ".jpg')";
        }
    }

    init();

}());