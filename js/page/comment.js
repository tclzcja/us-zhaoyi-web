/* jshint browser: true, esnext: true, devel: true */

(function () {

    'use strict';

    const self = document.querySelector("body > #comment");

    const Api = window.Api;
    const Auth = window.Auth;

    self.addEventListener("click", function () {
        self.classList.remove("on");
    });

    self.querySelector(":scope > article").addEventListener("click", function (e) {
        e.stopPropagation();
    });


}());