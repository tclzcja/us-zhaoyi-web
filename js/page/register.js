/* jshint browser: true, esnext: true, devel: true */

(function () {

    'use strict';

    const self = document.querySelector("body > #register");

    const Api = window.Api;
    const Auth = window.Auth;

    self.querySelector(":scope > article > main > footer").addEventListener("click", function () {
        var footer = this;
        footer.classList.add("processing");
        var data = {
            email: self.querySelector(":scope > article > main > section.email > input").value,
            password: self.querySelector(":scope > article > main > section.password > input").value
        };
        Api.Core("user", "create", data, function () {
            footer.classList.remove("wrong");
            footer.classList.add("correct");
            footer.innerHTML = "注册成功，登陆中";
            setTimeout(function () {
                Api.Core("user", "login", data, function (info) {
                    Auth.Login(info.access_token, info.user);
                    location.hash = "#l=profile";
                }, function () {
                    console.error("登陆时出错");
                });
            }, 1000);
        }, function (text) {
            footer.classList.remove("processing");
            footer.classList.remove("correct");
            footer.classList.add("wrong");
            footer.innerHTML = "您注册的邮箱已存在！";
        });
    });

}());