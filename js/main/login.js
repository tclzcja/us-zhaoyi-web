/* jshint browser: true, esnext: true, devel: true */

(function () {

    'use strict';

    const self = document.querySelector("body > #login");

    const Api = window.Api;
    const Auth = window.Auth;

    function init() {
        self.querySelector(":scope > main > footer").addEventListener("click", function () {
            var footer = this;
            footer.classList.add("processing");
            var data = {
                email: self.querySelector(":scope > main > header.email > input").value,
                password: self.querySelector(":scope > main > header.password > input").value
            };
            Api.Core("user", "login", data, function (info) {
                Auth.Login(info.access_token, info.user);
                location.hash = "#profile";
            }, function () {
                console.error("登陆时出错");
            });
        });
    }

    init();

}());