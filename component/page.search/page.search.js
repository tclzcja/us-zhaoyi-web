/* jshint browser: true, esversion: 6, devel: true */

(function () {

    'use strict';

    const Page = window.Page;

    var tag = "page-search";

    function init() {
        var proto = Object.create(HTMLElement.prototype);
        proto.createdCallback = function () {
            active(this);
        };
        document.registerElement(tag, {
            prototype: proto
        });
    }

    function active(self) {

        self.innerHTML = document.querySelector("link[data-tag='" + tag + "']").import.querySelector("template").innerHTML;

    }

    init();

}());