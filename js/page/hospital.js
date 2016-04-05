/* jshint browser: true, esnext: true, devel: true, shadow: true */

(function () {

    'use strict';

    const self = document.querySelector("body > #hospital");
    const holder = document.createElement("div");

    const Api = window.Api;
    const Auth = window.Auth;
    const Cache = window.Cache;
    const Param = window.Param;

    self.addEventListener("hey", function () {
        reset();
        Api.Core("hospital", "single", {
            id: Param.Get("id")
        }, render);
    });

    function reset() {
        self.scrollTop = 0;
        self.querySelector(":scope > header > main > header > svg").removeAttribute("style");
        self.querySelector(":scope > header > main > section.name").innerHTML = "";
        self.querySelector(":scope > header > main > section.address").innerHTML = "";
        self.querySelector(":scope > header > main > section.address2").innerHTML = "";
        self.querySelector(":scope > header > main > section.city").innerHTML = "";
        self.querySelector(":scope > header > main > section.state").innerHTML = "";
        self.querySelector(":scope > header > main > section.zipcode").innerHTML = "";
        self.querySelector(":scope > main > main > section.iframe").innerHTML = "没有地图数据";
        self.querySelector(":scope > footer > main > section.services > table > tbody").innerHTML = "";
    }

    function render(data) {
        if (data.image.id) {
            self.querySelector(":scope > header > main > header > svg").style.backgroundImage = "url(" + Api.Storage(data.image.id, data.image.extension) + ")";
        }
        self.querySelector(":scope > header > main > section.name").innerHTML = data.name.en;
        self.querySelector(":scope > header > main > section.address").innerHTML = data.address;
        self.querySelector(":scope > header > main > section.address2").innerHTML = data.address2;
        self.querySelector(":scope > header > main > section.city").innerHTML = data.city;
        self.querySelector(":scope > header > main > section.state").innerHTML = data.state;
        self.querySelector(":scope > header > main > section.zipcode").innerHTML = data.zipcode;
        if (data.iframe) {
            self.querySelector(":scope > main > main > section.iframe").innerHTML = data.iframe;
        }
        for (var i = 0; i < data.services.length; i++) {
            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            td1.innerHTML = Cache.Hash("service", data.services[i].id).name["zh-Hans"];
            var td2 = document.createElement("td");
            td2.innerHTML = "$" + data.services[i].money;
            tr.appendChild(td1);
            tr.appendChild(td2);
            self.querySelector(":scope > footer > main > section.services > table > tbody").appendChild(tr);
        }
    }

}());