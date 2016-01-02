/* jshint browser: true, esnext: true */

(function () {

    'use strict';

    if (location.hash === "") {
        location.hash = "#index";
    } else {
        var hashchange = new Event("hashchange");
        window.dispatchEvent(hashchange);
    }

}());