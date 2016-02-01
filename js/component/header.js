/* jshint browser: true, esnext: true */

(function () {

    'use strict';

    const self = document.querySelector("body > header");

    const Auth = window.Auth;

    function init() {
        self.addEventListener("login", function () {
            var user = Auth.Current.User();
            self.querySelector(":scope > footer > a[href='#profile']").innerHTML = user.name;
            self.querySelector(":scope > footer > a[href='#login']").classList.remove("on");
            self.querySelector(":scope > footer > a[href='#profile']").classList.add("on");
        });
        self.addEventListener("logout", function () {
            var user = Auth.Current.User();
            self.querySelector(":scope > footer > a[href='#profile']").innerHTML = "";
            self.querySelector(":scope > footer > a[href='#login']").classList.add("on");
            self.querySelector(":scope > footer > a[href='#profile']").classList.remove("on");
            location.hash = "#index";
        });
    }

    init();

}());