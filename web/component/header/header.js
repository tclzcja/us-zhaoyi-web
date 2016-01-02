/*jslint browser: true, esnext: true */

(function () {

    'use strict';

    const key = "component-header";

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