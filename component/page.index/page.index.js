/* jshint browser: true, esnext: true */

(function () {

    'use strict';

    document.querySelector("body > main > main > div").addEventListener("click", function () {
        window.location.href = "search.html?k=" + document.querySelector("body > main > main > input").value;
    });

}());