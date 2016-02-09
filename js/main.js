/* jshint browser: true, esnext: true, devel: true */

(function () {

    'use strict';

    const Api = window.Api;
    const Cache = window.Cache;
    const Param = window.Param;

    Api.Reset();
    Auth.Test(function () {
        document.querySelector("body > header").dispatchEvent(new Event("login"));
    }, Auth.Reset);
    Cache.Update("item");
    Cache.Update("hospital");
    Cache.Update("insurance");
    Cache.Update("doctor");

    window.addEventListener("hashchange", function () {
        if (document.querySelector("body > main#" + Param.Get("l"))) {
            document.querySelector("body > main.on").classList.remove("on");
            document.querySelector("body > main#" + Param.Get("l")).dispatchEvent(new Event("hey"));
            document.querySelector("body > main#" + Param.Get("l")).classList.add("on");
        }
    });

    if (location.hash === "") {
        location.hash = "#l=index";
    } else {
        window.dispatchEvent(new Event("hashchange"));
    }

}());