/* jshint browser: true, esversion: 6, devel: true */

(function () {

    'use strict';

    var tag = "site-header";

    function init() {
        var proto = Object.create(HTMLElement.prototype);
        proto.createdCallback = function () {
            active(this);
        };
        document.registerElement(tag, {
            prototype: proto
        });
    }

    function active(self) {

        self.innerHTML = document.querySelector("link[data-tag='" + tag + "']").import.querySelector("template").innerHTML;

        window.addEventListener("hashchange", function () {
            if (self.querySelector("a[href='" + location.hash + "']")) {
                self.querySelectorAll("a").removeClass("on");
                self.querySelector("a[href='" + location.hash + "']").classList.add("on");
            }
        });

    }

    init();

}());