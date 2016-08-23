/* jshint browser: true, esversion: 6, devel: true */

(function () {

    window.location.hash = "#info";

    window.addEventListener("hashchange", function () {
        document.querySelector("body > nav > a.on").classList.remove("on");
        document.querySelector("body > nav > a[href='" + window.location.hash + "']").classList.add("on");
    });

}());