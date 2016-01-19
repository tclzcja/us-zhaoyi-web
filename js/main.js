/* jshint browser: true, esnext: true */

(function () {

    'use strict';

    const Api = window.Api;
    const Auth = window.Auth;

    Api.Reset();
    if (!Auth.Test()) {
        Auth.Reset();
    }

    if (location.hash === "") {
        location.hash = "#index";
    } else {
        var hashchange = new Event("hashchange");
        window.dispatchEvent(hashchange);
    }

}());