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

        self.querySelector(":scope > footer").addEventListener("click", function () {
            if (Auth.Test()) {
                window.location.href = "#l=profile";
            } else {
                document.querySelector("body > #login").classList.add("on");
            }
        });

        self.addEventListener("login", function () {
            self.querySelector(":scope > footer").classList.add("on");
        });

        self.addEventListener("logout", function () {
            self.querySelector(":scope > footer").classList.remove("on");
        });

    }

    init();

}());