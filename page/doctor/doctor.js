/* jshint browser: true, esnext: true */

(function () {

    'use strict';

    const key = "page-doctor";

    function init() {
        var proto = Object.create(HTMLElement.prototype);
        proto.createdCallback = function () {
            active(this);
        };
        document.registerElement(key, {
            prototype: proto
        });
    }

    function active(self) {
        self.innerHTML = document.querySelector("link[data-component='" + key + "']").import.querySelector("template").innerHTML;
        self.querySelector(":scope > main.schedule > aside:nth-of-type(1)").addEventListener("click", function () {
            var on = self.querySelector(":scope > main.schedule > main > section.on");
            if (on.previousElementSibling) {
                on.classList.remove("on");
                on.previousElementSibling.classList.add("on");
                var num = self.querySelector(":scope > main.schedule > header > span:nth-of-type(1)");
                num.innerHTML = parseInt(num.innerHTML, 10) - 1;
            }
        });
        self.querySelector(":scope > main.schedule > aside:nth-of-type(2)").addEventListener("click", function () {
            var on = self.querySelector(":scope > main.schedule > main > section.on");
            if (on.nextElementSibling) {
                on.classList.remove("on");
                on.nextElementSibling.classList.add("on");
                var num = self.querySelector(":scope > main.schedule > header > span:nth-of-type(1)");
                num.innerHTML = parseInt(num.innerHTML, 10) + 1;
            }
        });
    }

    init();

}());