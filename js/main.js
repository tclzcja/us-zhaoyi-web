/* jshint browser: true, esnext: true, devel: true */

(function () {

    'use strict';

    var Api = window.Api;
    var Auth = window.Auth;
    var Cache = window.Cache;
    var Param = window.Param;

    var fire_count = 0;

    Auth.Test();
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
                    document.querySelectorAll("body > main.on").removeClass("on");
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