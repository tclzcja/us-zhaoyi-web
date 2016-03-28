/* jshint browser: true, esnext: true, devel: true */

(function () {

    'use strict';

    const Api = window.Api;
    const Auth = window.Auth;
    const Cache = window.Cache;
    const Param = window.Param;

    var fire_count = 0;

    Auth.Test(function () {
        document.querySelector("body > header").dispatchEvent(new Event("login"));
    }, Auth.Reset);
    Cache.Update("item", fire);
    Cache.Update("service", fire);
    Cache.Update("hospital", fire);
    Cache.Update("insurance", fire);
    Cache.Update("doctor", fire);

    function fire() {
        fire_count++;
        if (fire_count >= 5) {
            window.addEventListener("hashchange", function () {
                if (document.querySelector("body > main#" + Param.Get("l"))) {
                    if (document.querySelector("body > main.on")) {
                        document.querySelector("body > main.on").classList.remove("on");
                    }
                    document.querySelector("body > main#" + Param.Get("l")).dispatchEvent(new Event("hey"));
                    document.querySelector("body > main#" + Param.Get("l")).classList.add("on");
                }
            });
            if (location.hash === "") {
                location.hash = "#l=index";
            } else {
                window.dispatchEvent(new Event("hashchange"));
            }
        }
    }

}());