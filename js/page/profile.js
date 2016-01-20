/* jshint browser: true, esnext: true, devel: true */

(function () {

    'use strict';

    const self = document.querySelector("body > #register");

    const Api = window.Api;
    const Auth = window.Auth;

    function init() {
        var user = Auth.Current.User();

    }

    window.addEventListener("hashchange", function () {
        if (location.hash === "#" + self.id) {
            init();
        }
    });

}());