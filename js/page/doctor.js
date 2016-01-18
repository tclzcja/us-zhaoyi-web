/* jshint browser: true, esnext: true */

(function () {

    'use strict';

    const self = document.querySelector("body > #doctor");

    function init() {
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