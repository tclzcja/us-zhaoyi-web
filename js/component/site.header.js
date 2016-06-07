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
            self.querySelector(":scope > footer > a").href = "profile.html";
        } else {
            self.querySelector(":scope > footer > a").href = "login.html";
        }

        self.addEventListener("login", function () {
            self.querySelector(":scope > footer").classList.add("on");
        });

        self.addEventListener("logout", function () {
            self.querySelector(":scope > footer").classList.remove("on");
        });

    }

    init();

}());