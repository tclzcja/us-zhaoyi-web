/* jshint browser: true, esversion: 6, devel: true */

(function () {

    'use strict';

    var key = "site-header";

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

        if (Auth.Test()) {
            self.querySelector(":scope > footer").classList.add("on");
        }

    }

    init();

}());