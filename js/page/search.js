/* jshint browser: true, esnext: true, devel: true, shadow: true */

(function () {

    'use strict';

    const self = document.querySelector("body > #search");
    const holder = document.createElement("div");

    const Api = window.Api;
    const Cache = window.Cache;

    var current_data_doctor = [];
    var current_data_filter_doctor = [];

    var current_data_hospital = [];
    var current_data_filter_hospital = [];

    var current_type = "doctor";

    self.addEventListener("hey", function () {
        self.querySelectorAll(":scope > aside > div").remove();
        current_data_doctor = Cache.Get("doctor");
        for (var i = 0; i < current_data_doctor.length; i++) {
            current_data_doctor[i].star_num = ((current_data_doctor[i].star[1] + current_data_doctor[i].star[2] * 2 + current_data_doctor[i].star[3] * 3 + current_data_doctor[i].star[4] * 4 + current_data_doctor[i].star[5] * 5) / (current_data_doctor[i].star[1] + current_data_doctor[i].star[2] + current_data_doctor[i].star[3] + current_data_doctor[i].star[4] + current_data_doctor[i].star[5]) || 0).toFixed(1);
        }
        current_data_filter_doctor = current_data_doctor;
        filter_doctor();
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

    self.querySelectorAll(":scope > nav.doctor > main > section.name > input").addEventListener("keyup", filter_doctor);
    self.querySelectorAll(":scope > nav.doctor > main > section.star > select").addEventListener("change", filter_doctor);
    self.querySelectorAll(":scope > nav.doctor > main > section.item > input").addEventListener("keyup", filter_doctor);
    self.querySelectorAll(":scope > nav.doctor > main > section.insurance > input").addEventListener("keyup", filter_doctor);

    function name_checker(name, keyword) {
        var flag = keyword === "";
        for (var n in name) {
            if (name[n].indexOf(keyword) > -1) {
                flag = true;
                break;
            }
        }
        return flag;
    }

    function filter_doctor() {
        current_data_filter_doctor = [];
        var name = self.querySelector(":scope > nav.doctor > main > section.name > input").value;
        var star = parseFloat(self.querySelector(":scope > nav.doctor > main > section.star > select").value);
        var item = self.querySelector(":scope > nav.doctor > main > section.item > input").value;
        var insurance = self.querySelector(":scope > nav.doctor > main > section.insurance > input").value;
        for (var i = 0; i < current_data_doctor.length; i++) {
            if (name_checker(current_data_doctor[i].name, name)) {
                if (current_data_doctor[i].star_num >= star) {
                    var flag_item = item === "";
                    if (!flag_item) {
                        for (var item_id in current_data_doctor[i].items) {
                            if (name_checker(Cache.Hash("item", current_data_doctor[i].items[item_id]).name, item)) {
                                flag_item = true;
                                break;
                            }
                        }
                    }
                    if (flag_item) {
                        var flag_insurance = insurance === "";
                        if (!flag_insurance) {
                            for (var insurance_id in current_data_doctor[i].insurances) {
                                if (name_checker(Cache.Hash("insurance", current_data_doctor[i].insurances[insurance_id]), insurance)) {
                                    flag_insurance = true;
                                    break;
                                }
                            }
                        }
                        if (flag_insurance) {
                            current_data_filter_doctor.push(current_data_doctor[i]);
                        }
                    }
                }
            }
        }
        render_doctor();
    }

    function render_doctor() {
        self.querySelectorAll(":scope > aside.doctor > main").remove();
        for (var i = 0; i < current_data_filter_doctor.length; i++) {
            holder.innerHTML = self.querySelector(":scope > aside > template").innerHTML;
            var div = holder.firstElementChild;
            if (current_data_filter_doctor[i].portrait && current_data_filter_doctor[i].portrait.id) {
                div.querySelector(":scope > nav > svg").style.backgroundImage = "url('" + Api.Storage(current_data_filter_doctor[i].portrait.id, current_data_filter_doctor[i].portrait.extension) + "')";
            }
            div.querySelector(":scope > header > section.name").innerHTML = "Dr. " + current_data_filter_doctor[i].name.en;
            var star = ((current_data_filter_doctor[i].star[1] + current_data_filter_doctor[i].star[2] * 2 + current_data_filter_doctor[i].star[3] * 3 + current_data_filter_doctor[i].star[4] * 4 + current_data_filter_doctor[i].star[5] * 5) / (current_data_filter_doctor[i].star[1] + current_data_filter_doctor[i].star[2] + current_data_filter_doctor[i].star[3] + current_data_filter_doctor[i].star[4] + current_data_filter_doctor[i].star[5]) || 0).toFixed(1);
            star = star <= 0 ? 1 : star;
            if (star > Math.floor(star)) {
                holder.innerHTML = div.querySelector(":scope > footer > section.star > template.star-empty").innerHTML;
                var svg = holder.firstElementChild;
                div.querySelector(":scope > footer > section.star").appendChild(svg);
            }
            for (var j = 0; j < Math.floor(star); j++) {
                holder.innerHTML = div.querySelector(":scope > footer > section.star > template.star").innerHTML;
                var svg = holder.firstElementChild;
                div.querySelector(":scope > footer > section.star").appendChild(svg);
            }
            for (var item_id of current_data_filter_doctor[i].items) {
                var item = Cache.Hash("item", item_id);
                var span = document.createElement("span");
                span.innerHTML = item.name["zh-Hans"];
                div.querySelector(":scope > footer > section.items").appendChild(span);
            }
            for (var service_id of current_data_filter_doctor[i].services) {
                var service = Cache.Hash("service", service_id);
                var span = document.createElement("span");
                span.innerHTML = service.name["zh-Hans"];
                div.querySelector(":scope > footer > section.services").appendChild(span);
            }
            for (var insurance_id of current_data_filter_doctor[i].insurances) {
                var insurance = Cache.Hash("insurance", insurance_id);
                var span = document.createElement("span");
                span.innerHTML = insurance.provider + "/" + insurance.class + "/" + insurance.subclass;
                div.querySelector(":scope > footer > section.insurances").appendChild(span);
            }
            div.querySelector(":scope > header > section.phone").innerHTML = current_data_filter_doctor[i].phone || "没有记录";
            div.querySelector(":scope > header > section.email").innerHTML = current_data_filter_doctor[i].email || "没有记录";
            div.querySelector(":scope > a").href = "#l=doctor&id=" + current_data_filter_doctor[i].id;
            self.querySelector(":scope > aside.doctor").appendChild(div);
        }
    }

}());