/* jshint browser: true, esnext: true, devel: true, shadow: true */

(function () {

    'use strict';

    var self = document.querySelector("body > #search");
    var holder = document.createElement("div");

    var Api = window.Api;
    var Cache = window.Cache;

    var current_data_doctor = [];
    var current_data_filter_doctor = [];

    var current_data_hospital = [];
    var current_data_filter_hospital = [];

    var current_latitude = 0;
    var current_longitude = 0;

    var current_type = "doctor";

    self.addEventListener("hey", function () {
        self.querySelectorAll(":scope > aside > div").remove();
        current_data_doctor = Cache.Get("doctor");
        current_data_hospital = Cache.Get("hospital");
        for (var i = 0; i < current_data_doctor.length; i++) {
            current_data_doctor[i].star_num = ((current_data_doctor[i].star[1] + current_data_doctor[i].star[2] * 2 + current_data_doctor[i].star[3] * 3 + current_data_doctor[i].star[4] * 4 + current_data_doctor[i].star[5] * 5) / (current_data_doctor[i].star[1] + current_data_doctor[i].star[2] + current_data_doctor[i].star[3] + current_data_doctor[i].star[4] + current_data_doctor[i].star[5]) || 0).toFixed(1);
        }
        current_data_filter_doctor = current_data_doctor;
        current_data_filter_hospital = current_data_hospital;
        filter_doctor();
        filter_hospital();
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
    self.querySelectorAll(":scope > nav.doctor > main > section.distance > select").addEventListener("change", filter_doctor);

    self.querySelectorAll(":scope > nav.hospital > main > section.name > input").addEventListener("keyup", filter_hospital);
    self.querySelectorAll(":scope > nav.hospital > main > section.service > input").addEventListener("keyup", filter_hospital);
    self.querySelectorAll(":scope > nav.hospital > main > section.distance > select").addEventListener("change", filter_hospital);

    function name_checker(name, keyword) {
        if (keyword !== "") {
            for (var n in name) {
                if (name[n].indexOf(keyword) > -1) {
                    return true;
                }
            }
        } else {
            return true;
        }
        return false;
    }

    function item_checker(items, keyword) {
        if (keyword !== "") {
            for (var item_id in items) {
                if (name_checker(Cache.Hash("item", items[item_id]).name, keyword)) {
                    return true;
                }
            }
        } else {
            return true;
        }
        return false;
    }

    function service_checker(services, keyword) {
        if (keyword !== "") {
            for (var service_id in services) {
                if (name_checker(Cache.Hash("service", services[service_id].service_id).name, keyword)) {
                    return true;
                }
            }
        } else {
            return true;
        }
        return false;
    }

    function insurance_checker(insurances, keyword) {
        if (keyword !== "") {
            for (var insurance_id in insurances) {
                if (name_checker(Cache.Hash("insurance", insurances[insurance_id]), keyword)) {
                    return true; // Once matched
                }
            }
        } else {
            return true;
        }
        return false;
    }

    function distance_checker(schedules, distance) {
        if (distance !== 9999) {
            for (var schedule in schedules) {
                var hospital = Cache.Hash("hospital", schedules[schedule].hospital_id);
                if (Math.calculateDistance(current_latitude, current_longitude, parseFloat(hospital.latitude), parseFloat(hospital.longitude)) <= distance) {
                    return true;
                }
            }
        } else {
            return true;
        }
        return false;
    }

    function filter_doctor() {
        self.scrollTop = 0;
        current_data_filter_doctor = [];
        var name = self.querySelector(":scope > nav.doctor > main > section.name > input").value;
        var star = parseFloat(self.querySelector(":scope > nav.doctor > main > section.star > select").value);
        var item = self.querySelector(":scope > nav.doctor > main > section.item > input").value;
        var insurance = self.querySelector(":scope > nav.doctor > main > section.insurance > input").value;
        var distance = parseInt(self.querySelector(":scope > nav.doctor > main > section.distance > select > option:checked").value, 10);
        //
        for (var i = 0; i < current_data_doctor.length; i++) {
            if (name_checker(current_data_doctor[i].name, name)) {
                if (current_data_doctor[i].star_num >= star) {
                    if (item_checker(current_data_doctor[i].items, item)) {
                        if (insurance_checker(current_data_doctor[i].insurances, insurance)) {
                            if (distance_checker(current_data_doctor[i].schedules, distance)) {
                                current_data_filter_doctor.push(current_data_doctor[i]);
                            }
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
            holder.innerHTML = self.querySelector(":scope > aside.doctor > template").innerHTML;
            var main = holder.firstElementChild;
            if (current_data_filter_doctor[i].portrait && current_data_filter_doctor[i].portrait.id) {
                main.querySelector(":scope > nav > svg").style.backgroundImage = "url('" + Api.Storage(current_data_filter_doctor[i].portrait.id, current_data_filter_doctor[i].portrait.extension) + "')";
            }
            main.querySelector(":scope > header > section.name").innerHTML = "Dr. " + current_data_filter_doctor[i].name.en;
            var star = ((current_data_filter_doctor[i].star[1] + current_data_filter_doctor[i].star[2] * 2 + current_data_filter_doctor[i].star[3] * 3 + current_data_filter_doctor[i].star[4] * 4 + current_data_filter_doctor[i].star[5] * 5) / (current_data_filter_doctor[i].star[1] + current_data_filter_doctor[i].star[2] + current_data_filter_doctor[i].star[3] + current_data_filter_doctor[i].star[4] + current_data_filter_doctor[i].star[5]) || 0).toFixed(1);
            star = star <= 0 ? 1 : star;
            if (star > Math.floor(star)) {
                holder.innerHTML = main.querySelector(":scope > footer > section.star > template.star-empty").innerHTML;
                var svg = holder.firstElementChild;
                main.querySelector(":scope > footer > section.star").appendChild(svg);
            }
            for (var j = 0; j < Math.floor(star); j++) {
                holder.innerHTML = main.querySelector(":scope > footer > section.star > template.star").innerHTML;
                var svg = holder.firstElementChild;
                main.querySelector(":scope > footer > section.star").appendChild(svg);
            }
            for (var item_id of current_data_filter_doctor[i].items) {
                var item = Cache.Hash("item", item_id);
                var span = document.createElement("span");
                span.innerHTML = item.name["zh-Hans"];
                main.querySelector(":scope > footer > section.items").appendChild(span);
            }
            for (var service_id of current_data_filter_doctor[i].services) {
                var service = Cache.Hash("service", service_id);
                var span = document.createElement("span");
                span.innerHTML = service.name["zh-Hans"];
                main.querySelector(":scope > footer > section.services").appendChild(span);
            }
            for (var insurance_id of current_data_filter_doctor[i].insurances) {
                var insurance = Cache.Hash("insurance", insurance_id);
                var span = document.createElement("span");
                span.innerHTML = insurance.provider + "/" + insurance.class + "/" + insurance.subclass;
                main.querySelector(":scope > footer > section.insurances").appendChild(span);
            }
            main.querySelector(":scope > header > section.phone").innerHTML = current_data_filter_doctor[i].phone || "没有记录";
            main.querySelector(":scope > header > section.email").innerHTML = current_data_filter_doctor[i].email || "没有记录";
            main.querySelector(":scope > a").href = "#l=doctor&id=" + current_data_filter_doctor[i].id;
            self.querySelector(":scope > aside.doctor").appendChild(main);
        }
    }

    function filter_hospital() {
        self.scrollTop = 0;
        current_data_filter_hospital = [];
        var name = self.querySelector(":scope > nav.hospital > main > section.name > input").value;
        var service = self.querySelector(":scope > nav.hospital > main > section.service > input").value;
        var distance = parseInt(self.querySelector(":scope > nav.hospital > main > section.distance > select > option:checked").value, 10);
        //
        for (var i = 0; i < current_data_hospital.length; i++) {
            if (name_checker(current_data_hospital[i].name, name)) {
                if (service_checker(current_data_hospital[i].services, service)) {
                    if (Math.calculateDistance(current_latitude, current_longitude, parseFloat(current_data_hospital[i].latitude), parseFloat(current_data_hospital[i].longitude)) <= distance) {
                        current_data_filter_hospital.push(current_data_hospital[i]);
                    }
                }
            }
        }
        render_hospital();
    }

    function render_hospital() {
        self.querySelectorAll(":scope > aside.hospital > main").remove();
        for (var i = 0; i < current_data_filter_hospital.length; i++) {
            holder.innerHTML = self.querySelector(":scope > aside.hospital > template").innerHTML;
            var main = holder.firstElementChild;
            if (current_data_filter_hospital[i].image && current_data_filter_hospital[i].image.id) {
                main.querySelector(":scope > nav > svg").style.backgroundImage = "url('" + Api.Storage(current_data_filter_hospital[i].image.id, current_data_filter_hospital[i].image.extension) + "')";
            }
            main.querySelector(":scope > header > section.address > div.address").innerHTML = current_data_filter_hospital[i].address;
            main.querySelector(":scope > header > section.address > div.address2").innerHTML = current_data_filter_hospital[i].address2;
            main.querySelector(":scope > header > section.address > div.city").innerHTML = current_data_filter_hospital[i].city;
            main.querySelector(":scope > header > section.address > div.state").innerHTML = current_data_filter_hospital[i].state + " " + current_data_filter_hospital[i].zipcode;
            main.querySelector(":scope > header > section.description").innerHTML = current_data_filter_hospital[i].description;
            for (var service_id in current_data_filter_hospital[i].services) {
                var service = Cache.Hash("service", current_data_filter_hospital[i].services[service_id].service_id);
                var div = document.createElement("div");
                div.innerHTML = service.name["zh-Hans"] + " $" + current_data_filter_hospital[i].services[service_id].money;
                main.querySelector(":scope > footer > section.services").appendChild(div);
            }
            main.querySelector(":scope > header > section.name").innerHTML = current_data_filter_hospital[i].name.en;
            main.querySelector(":scope > a").href = "#l=hospital&id=" + current_data_filter_hospital[i].id;
            self.querySelector(":scope > aside.hospital").appendChild(main);
        }
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        current_latitude = position.coords.latitude;
        current_longitude = position.coords.longitude;
    });

}());