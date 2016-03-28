/* jshint browser: true, esnext: true */

(function () {

    'use strict';

    const self = document.querySelector("body > #index");

    const Api = window.Api;
    const Auth = window.Auth;
    const Cache = window.Cache;

    self.querySelector(":scope > article > main > footer").addEventListener("click", function () {
        window.location.href = "#l=search-doctor";
    });

}());