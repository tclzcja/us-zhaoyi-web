/* jshint browser: true, esnext: true, devel: true */

(function () {

    'use strict';

    const self = document.querySelector("body > header");

    const Auth = window.Auth;

    self.querySelector(":scope > footer").addEventListener("click", function () {
        Auth.Test(function () {
            window.location.href = "#l=profile";
        }, function () {
            document.querySelector("body > #login").classList.add("on");
        });
    });

}());