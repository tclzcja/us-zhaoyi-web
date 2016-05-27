/* jshint browser: true, esnext: true */

(function () {

    'use strict';

    var Api = window.Api;
    var Auth = window.Auth;

    document.querySelector("body > nav > section > footer").addEventListener("click", function () {
        window.location.href = "search.html";
    });

    window.setInterval(function () {
        var current = document.querySelector("body > main.search > footer > section.on");
        current.classList.remove("on");
        if (current.nextElementSibling) {
            current.nextElementSibling.classList.add("on");
        } else {
            document.querySelector("body > main.search > footer > section:first-of-type").classList.add("on");
        }
    }, 4000);

}());