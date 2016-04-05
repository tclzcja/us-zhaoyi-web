/* jshint browser: true, esnext: true, devel: true, shadow: true */

(function () {

    'use strict';

    var self = document.querySelector("body > #hospital");
    var holder = document.createElement("div");

    var Api = window.Api;
    var Auth = window.Auth;
    var Cache = window.Cache;
    var Param = window.Param;

    self.addEventListener("hey", function () {
        Api.Core("hospital", "single", {
            id: Param.Get("id")
        }, reset);
    });

    function reset(data) {
        self.querySelector(":scope > main:nth-of-type(1) > main.image").style.backgroundImage = "";
        self.querySelector(":scope > main:nth-of-type(1) > main.name").innerHTML = "";
        self.querySelectorAll(":scope > main:nth-of-type(1) > main.items > div").remove();
        render(data);
    }

    function render(data) {
        if (data.image) {
            self.querySelector(":scope > main:nth-of-type(1) > main.image").style.backgroundImage = "url(" + Api.Storage(data.image.id, data.image.extension) + ")";
        }
        self.querySelector(":scope > main:nth-of-type(1) > main.name").innerHTML = data.name.en;
        for (var i = 0; i < data.items.length; i++) {
            var item = Cache.Hash("item", data.items[i].service_id);
            if (item) {
                var div = document.createElement("div");
                div.innerHTML = item.name["zh-Hans"] + " $" + data.items[i].money;
                self.querySelector(":scope > main:nth-of-type(1) > main.items").appendChild(div);
            }
        }
        self.querySelector(":scope > main:nth-of-type(2) > main.address").innerHTML = data.address;
        self.querySelector(":scope > main:nth-of-type(2) > main.address2").innerHTML = data.address2;
        self.querySelector(":scope > main:nth-of-type(2) > main.city").innerHTML = data.city;
        self.querySelector(":scope > main:nth-of-type(2) > main.state").innerHTML = data.state;
        self.querySelector(":scope > main:nth-of-type(2) > main.zipcode").innerHTML = data.zipcode;
        if (data.iframe) {
            self.querySelector(":scope > main:nth-of-type(2) > main.iframe").innerHTML = data.iframe;
        }
    }

}());