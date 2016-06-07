/* jshint browser: true, esnext: true, devel: true */

(function () {

    'use strict';

    var Api = window.Api;
    var Auth = window.Auth;

    document.querySelector("body > main > table > tbody > tr > td.register").addEventListener("click", function () {
        var footer = this;
        var data = {
            email: document.querySelector("body > main > table > tbody > tr > td.email > input").value,
            password: document.querySelector("body > main > table > tbody > tr > td.password > input").value
        };
        Api.Core("/user/create", data, function () {
            footer.classList.remove("wrong");
            footer.classList.add("correct");
            footer.innerHTML = "注册成功，登陆中";
            setTimeout(function () {
                Api.Core("/user/login", data, function (info) {
                    Auth.Login(info.access_token, info.user);
                    location.href = "profile.html";
                }, function () {
                    console.error("登陆时出错");
                });
            }, 1000);
        }, function (text) {
            footer.classList.remove("processing");
            footer.classList.remove("correct");
            footer.classList.add("wrong");
            footer.innerHTML = "您注册的邮箱已存在";
        });
    });

}());