/* jshint browser: true, esnext: true, devel: true */

(function () {

    'use strict';

    var Api = window.Api;
    var Auth = window.Auth;

    document.querySelector("body > main > table > tbody > tr > td.login").addEventListener("click", function () {
        var data = {
            email: document.querySelector("body > main > table > tbody > tr > td.email > input").value,
            password: document.querySelector("body > main > table > tbody > tr > td.password > input").value
        };
        Api.Core("/user/login", data, function (info) {
            Auth.Login(info.token, info);
            window.location.href = "profile.html";
        });
    });

}());