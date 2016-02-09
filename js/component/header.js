/* jshint browser: true, esnext: true */

(function () {

    'use strict';

    const self = document.querySelector("body > header");

    const Auth = window.Auth;

    function init() {
        self.addEventListener("login", function () {
            var user = Auth.Current.User();
            self.querySelector(":scope > footer > a[href='#l=profile']").innerHTML = user.name;
            self.querySelector(":scope > footer > a[href='#l=login']").classList.remove("on");
            self.querySelector(":scope > footer > a[href='#l=profile']").classList.add("on");
        });
        self.addEventListener("logout", function () {
            var user = Auth.Current.User();
            self.querySelector(":scope > footer > a[href='#l=profile']").innerHTML = "";
            self.querySelector(":scope > footer > a[href='#l=login']").classList.add("on");
            self.querySelector(":scope > footer > a[href='#l=profile']").classList.remove("on");
            location.hash = "#index";
        });
    }

    init();

}());