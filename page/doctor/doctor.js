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
    }

    init();

}());