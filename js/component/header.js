/* jshint browser: true, esnext: true */

(function () {

    'use strict';

    const self = document.querySelector("body > header");

    function init() {
        self.addEventListener("login", function () {
            var user = JSON.parse(self.getAttribute("data-user"));
            self.querySelector(":scope > footer > a[href='#profile']").innerHTML = user.name;
            self.querySelector(":scope > footer > a[href='#login']").classList.remove("on");
            self.querySelector(":scope > footer > a[href='#profile']").classList.add("on");
        });

    }

    init();

}());