/* jshint browser: true, esnext: true */

(function () {

    'use strict';

    var self = document.querySelector("body > #index");

    var Api = window.Api;
    var Auth = window.Auth;
    var Cache = window.Cache;

    self.querySelector(":scope > article > main > footer").addEventListener("click", function () {
        window.location.href = "#l=search";
    });

}());