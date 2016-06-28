/* jshint browser: true, esnext: true */

(function () {

    'use strict';

    document.querySelector("body > nav > section > footer").addEventListener("click", function () {
        window.location.href = "search.html?k=" + document.querySelector("body > nav > section > input").value;
    });

}());