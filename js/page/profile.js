/* jshint browser: true, esnext: true, devel: true */

(function () {

    'use strict';

    const self = document.querySelector("body > #profile");

    const Api = window.Api;
    const Auth = window.Auth;

    function init() {
        var user = Auth.Current.User();
        self.querySelector(":scope > main.info > main.email").innerHTML = user.email;
        self.querySelector(":scope > main.info > main.name > input").value = user.name;
    }

    function event() {
        self.querySelector(":scope > footer.update").addEventListener("click", function () {
            var user = {
                email: Auth.Current.User().email,
                name: self.querySelector(":scope > main.info > main.name > input").value
            };
            Api.Core("user", "update", user, function () {
                alert("good");
            }, function () {});
        });

        self.querySelector(":scope > footer.logout").addEventListener("click", Auth.Logout);
    }

    window.addEventListener("hashchange", function () {
        if (location.hash === "#" + self.id) {
            Auth.Test(init, function () {
                location.hash = "#login";
            });
        }
    });

    event();

}());