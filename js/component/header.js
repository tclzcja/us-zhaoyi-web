/* jshint browser: true, esnext: true, devel: true */

(function () {

    'use strict';

    var self = document.querySelector("body > header");

    var Auth = window.Auth;

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

}());