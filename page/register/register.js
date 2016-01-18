/* jshint browser: true, esnext: true, devel: true */

(function () {

    'use strict';

    const key = "page-register";

    var self;
    var Api = window.Api;

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
        self.querySelector(":scope > main > footer").addEventListener("click", function () {
            var footer = this;
            footer.classList.add("processing");
            var data = {
                email: self.querySelector(":scope > main > header.email > input").value,
                password: self.querySelector(":scope > main > header.password > input").value
            };
            Api.Core("user", "insert", data, function () {
                footer.classList.remove("processing");
                footer.classList.remove("wrong");
                footer.classList.add("correct");
                footer.innerHTML = "注册成功，登陆中";
                setTimeout(function () {
                    location.hash = "profile";
                }, 1000);
            }, function (text) {
                footer.classList.remove("processing");
                footer.classList.remove("correct");
                footer.classList.add("wrong");
                footer.innerHTML = "您注册的邮箱已存在！";
            });
        });
    }

    init();

}());