/* jshint browser: true, esnext: true */

(function () {

    'use strict';

    NodeList.prototype.addEventListener = function (eventName, handler) {
        for (var i = 0; i < this.length; i++) {
            this[i].addEventListener(eventName, handler);
        }
    };

    NodeList.prototype.remove = function () {
        for (var i = 0; i < this.length; i++) {
            this[i].remove();
        }
    };

    NodeList.prototype.exec = function (callback) {
        for (var i = 0; i < this.length; i++) {
            callback.call(this[i]);
        }
    };

    NodeList.prototype.setAttribute = function (key, value) {
        for (var i = 0; i < this.length; i++) {
            this[i].setAttribute(key, value);
        }
    };

    NodeList.prototype.removeAttribute = function (key) {
        for (var i = 0; i < this.length; i++) {
            this[i].removeAttribute(key);
        }
    };

    NodeList.prototype.addClass = function (name) {
        for (var i = 0; i < this.length; i++) {
            this[i].classList.add(name);
        }
    };

    NodeList.prototype.removeClass = function (name) {
        for (var i = 0; i < this.length; i++) {
            this[i].classList.remove(name);
        }
    };

}());