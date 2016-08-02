/* jshint browser: true, esversion: 6, devel: true */

(function () {

    'use strict';

    var key = "load-mask";

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

        self.innerHTML = document.querySelector("link[data-template='" + key + "']").import.querySelector("template").innerHTML;

        self.addEventListener("on", function () {
            self.classList.add("on");
        });

        self.addEventListener("off", function () {
            self.classList.remove("on");
        });

    }

    init();

}());