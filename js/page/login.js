/* jshint browser: true, esnext: true, devel: true */

(function () {

    'use strict';

    var self = document.querySelector("body > #login");

    var Api = window.Api;
    var Auth = window.Auth;

    self.querySelector(":scope > article > footer").addEventListener("click", function () {
        this.classList.add("processing");
        var data = {
            email: self.querySelector(":scope > article > section.email > input").value,
            password: self.querySelector(":scope > article > section.password > input").value
        };
        Api.Core("user", "login", data, function (info) {
            Auth.Login(info.token, info);
            self.classList.remove("on");
            location.hash = "#l=profile";
        });
    });

    self.addEventListener("click", function () {
        self.classList.remove("on");
    });

    self.querySelector(":scope > article").addEventListener("click", function (e) {
        e.stopPropagation();
    });

}());