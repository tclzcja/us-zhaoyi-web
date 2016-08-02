/* jshint browser: true, esversion: 6, devel: true */

(function () {

    'use strict';

    const Page = window.Page;

    var tag = "page-index";

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

        self.querySelector(":scope > main > input").addEventListener("keyup", function () {
            Page.Search.Here(this.value);
        });

    }

    init();

}());