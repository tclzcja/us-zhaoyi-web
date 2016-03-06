/* jshint browser: true, esnext: true */

(function () {

    'use strict';

    const self = document.querySelector("body > #index");

    const Api = window.Api;
    const Auth = window.Auth;
    const Cache = window.Cache;

    self.addEventListener("hey", function () {

        //portraitize(self);

    });

    self.querySelectorAll(":scope > nav > div").addEventListener("click", function () {
        this.parentNode.querySelector(":scope > .on").classList.remove("on");
        this.parentNode.querySelector(":scope > .shadow").classList.remove("shadow");
        this.classList.add("on");
        this.classList.add("shadow");
        if (this.classList.contains("doctor")) {
            self.querySelector(":scope > main > footer").classList.add("doctor");
            self.querySelector(":scope > main > footer").classList.remove("hospital");
        } else {
            self.querySelector(":scope > main > footer").classList.add("hospital");
            self.querySelector(":scope > main > footer").classList.remove("doctor");
        }
    });

    /*
    self.querySelector(":scope > main > input").addEventListener("keyup", function () {
        if (this.value !== "") {
            self.querySelector(":scope > main > footer").classList.add("on");
        } else {
            self.querySelector(":scope > main > footer").classList.remove("on");
        }
    });

    self.querySelector(":scope > main > footer").addEventListener("click", function () {
        if (self.querySelector(":scope > nav > div.doctor").classList.contains("on")) {
            location.hash = "#l=search-doctor";
        } else {
            location.hash = "#l=search-hospital";
        }

    });
    */

}());