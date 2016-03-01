/* jshint browser: true, esnext: true, devel: true */

(function () {

    'use strict';

    const key = "horizontal-roller";

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

        var target = document.getElementById(self.getAttribute("for"));

        target.addEventListener("mousewheel", function (e) {
            if (e.wheelDelta < 0) {
                target.scrollLeft += 200;
            } else {
                target.scrollLeft -= 200;
            }
            e.preventDefault();
        });

    }

    init();

}());