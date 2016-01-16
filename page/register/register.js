/* jshint browser: true, esnext: true */

(function () {

    'use strict';

    const key = "page-register";

    var self;

    function init() {
        var proto = Object.create(HTMLElement.prototype);
        proto.createdCallback = function () {
            self = this;
            active();
        };
        document.registerElement(key, {
            prototype: proto
        });
    }

    function active() {
        self.innerHTML = document.querySelector("link[data-component='" + key + "']").import.querySelector("template").innerHTML;
    }

    init();

}());