/* jshint browser: true, esnext: true, devel: true, shadow: true */

(function () {

    'use strict';

    const self = document.querySelector("body > #search");
    const holder = document.createElement("div");

    const Api = window.Api;
    const Cache = window.Cache;

    var current_data = [];
    var current_data_filter = [];

    var current_type = "doctor";

    self.addEventListener("hey", function () {
        self.querySelectorAll(":scope > aside > div").remove();
        current_data = Cache.Get("doctor");
        current_data_filter = current_data;
        render();
    });

    self.querySelectorAll(":scope > div > section.doctor").addEventListener("click", function () {
        this.parentNode.querySelectorAll(":scope > section.hospital").removeClass("shadow");
        this.parentNode.querySelectorAll(":scope > section.hospital").removeClass("on");
        this.classList.add("on");
        this.classList.add("shadow");
        self.querySelectorAll(":scope > *.doctor").addClass("on");
        self.querySelectorAll(":scope > *.hospital").removeClass("on");
        self.scrollTop = 0;
        current_type = "doctor";
    });

    self.querySelectorAll(":scope > div > section.hospital").addEventListener("click", function () {
        this.parentNode.querySelectorAll(":scope > section.doctor").removeClass("shadow");
        this.parentNode.querySelectorAll(":scope > section.doctor").removeClass("on");
        this.classList.add("on");
        this.classList.add("shadow");
        self.querySelectorAll(":scope > *.doctor").removeClass("on");
        self.querySelectorAll(":scope > *.hospital").addClass("on");
        self.scrollTop = 0;
        current_type = "hospital";
    });

    function render() {
        for (var i = 0; i < current_data_filter.length; i++) {
            holder.innerHTML = self.querySelector(":scope > aside > template").innerHTML;
            var div = holder.firstElementChild;
            if (current_data_filter[i].portrait && current_data_filter[i].portrait.id) {
                div.querySelector(":scope > header").style.backgroundImage = "url('" + Api.Storage(current_data_filter[i].portrait.id, current_data_filter[i].portrait.extension) + "')";
            }
            div.querySelector(":scope > section.name").innerHTML = "Dr. " + current_data_filter[i].name.en;
            var star = ((current_data_filter[i].star[1] + current_data_filter[i].star[2] * 2 + current_data_filter[i].star[3] * 3 + current_data_filter[i].star[4] * 4 + current_data_filter[i].star[5] * 5) / (current_data_filter[i].star[1] + current_data_filter[i].star[2] + current_data_filter[i].star[3] + current_data_filter[i].star[4] + current_data_filter[i].star[5]) || 0).toFixed(1);
            star = star <= 0 ? 1 : star;
            for (var j = 0; j < Math.floor(star); j++) {
                div.querySelector(":scope > section.star").appendChild(document.createElement("span"));
            }
            if (star > Math.floor(star)) {
                var span = document.createElement("span");
                span.classList.add("empty");
                div.querySelector(":scope > section.star").appendChild(span);
            }
            for (var item_id of current_data_filter[i].items) {
                var item = Cache.Hash("item", item_id);
                var span = document.createElement("span");
                span.innerHTML = item.name["zh-Hans"];
                div.querySelector(":scope > section.items").appendChild(span);
            }
            for (var service_id of current_data_filter[i].services) {
                var service = Cache.Hash("service", service_id);
                var span = document.createElement("span");
                span.innerHTML = service.name["zh-Hans"];
                div.querySelector(":scope > section.services").appendChild(span);
            }
            for (var insurance_id of current_data_filter[i].insurances) {
                var insurance = Cache.Hash("insurance", insurance_id);
                var span = document.createElement("span");
                span.innerHTML = insurance.provider + "/" + insurance.class + "/" + insurance.subclass;
                div.querySelector(":scope > section.insurances").appendChild(span);
            }
            div.querySelector(":scope > a").href = "#l=doctor&id=" + current_data_filter[i].id;
            self.querySelector(":scope > aside").appendChild(div);
        }
    }

}());