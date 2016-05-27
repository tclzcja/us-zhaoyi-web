/* jshint browser: true, esnext: true, devel: true, shadow: true, sub: true */

(function () {

    'use strict';

    var Api = window.Api;

    var current_latitude = 0;
    var current_longitude = 0;

    var map_doctor = new Map();
    var map_hospital = new Map();
    var map_subject = new Map();
    var map_service = new Map();
    var map_insurance = new Map();
    var result_doctor = new Map();
    var result_hospital = new Map();

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

    function subject_checker(subjects, keyword) {
        if (keyword !== "") {
            for (var _id in subjects) {
                if (name_checker(map_subject[subjects[_id]].name, keyword)) {
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
            for (var _id in services) {
                if (name_checker(map_service[services[_id]].name, keyword)) {
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
            for (var _id in insurances) {
                if (name_checker(map_insurance[insurances[_id]], keyword)) {
                    return true;
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
                var hospital = map_hospital[schedules[schedule].hospital_id];
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
        result_doctor.clear();
        var name = document.querySelector("body > nav.doctor > table > tbody > tr > td.name > input").value;
        var star = parseFloat(document.querySelector("body > nav.doctor > table > tbody > tr > td.star > select").value);
        var subject = document.querySelector("body > nav.doctor > table > tbody > tr > td.subject > input").value;
        var insurance = document.querySelector("body > nav.doctor > table > tbody > tr > td.insurance > input").value;
        var distance = parseInt(document.querySelector("body > nav.doctor > table > tbody > tr > td.distance > select > option:checked").value, 10);
        //
        for (var d of map_doctor.values()) {
            if (name_checker(d.name, name)) {
                if (d.star.amount === 0 || (d.star.total / d.star.amount) >= star) {
                    if (subject_checker(d.subjects, subject)) {
                        if (insurance_checker(d.insurances, insurance)) {
                            if (distance_checker(d.schedules, distance)) {
                                result_doctor.set(d._id, d);
                            }
                        }
                    }
                }
            }
        }
        render_doctor();
    }

    function render_doctor() {

        document.querySelectorAll("body > main.doctor > table > tbody > tr > td").exec(function () {
            this.innerHTML = "";
        });

        for (var current of result_doctor.values()) {

            var td = document.querySelector("body > main.doctor > table > tbody > tr > td:empty");

            td.innerHTML = document.querySelector("body > main.doctor > template").innerHTML;

            // Portrait
            if (current.portrait && current.portrait._id) {
                td.querySelector(":scope > a > nav").style.backgroundImage = "url('" + Api.Storage(current.portrait._id, current.portrait.extension) + "')";
            }
            // Name
            td.querySelector(":scope > a > header > header").innerHTML = "Dr. " + current.name['en'];

            // Title
            td.querySelector(":scope > a > header > nav").innerHTML = current.title['en'];

            // Star
            var star = current.star.total / current.star.amount || 1;
            if (star > Math.floor(star)) {
                td.querySelector(":scope > a > header > footer").innerHTML += td.querySelector(":scope > a > header > footer > template.star-empty").innerHTML;
            }
            for (var j = 0; j < Math.floor(star); j++) {
                td.querySelector(":scope > a > header > footer").innerHTML += td.querySelector(":scope > a > header > footer > template.star").innerHTML;
            }

            // Subject List
            for (var subject_id of current.subject_list) {
                var subject = map_subject.get(subject_id);
                var span = document.createElement("span");
                span.innerHTML = subject.name["zh-Hans"];
                td.querySelector(":scope > a > footer > section.subject").appendChild(span);
            }

            // Service List
            for (var service_id of current.service_list) {
                var service = map_service.get(service_id);
                var span = document.createElement("span");
                span.innerHTML = service.name["zh-Hans"];
                td.querySelector(":scope > a > footer > section.service").appendChild(span);
            }

            // Insurance List
            for (var insurance_id of current.insurance_list) {
                var insurance = map_insurance.get(insurance_id);
                var span = document.createElement("span");
                span.innerHTML = insurance.provider + "/" + insurance.class + "/" + insurance.subclass;
                td.querySelector(":scope > a > footer > section.insurance").appendChild(span);
            }

            td.querySelector(":scope > a > header > section.phone > div").innerHTML = current.phone || "";
            td.querySelector(":scope > a > header > section.email > div").innerHTML = current.email || "";
            td.querySelector(":scope > a").href = "doctor.html?_id=" + current._id;
        }

    }

    function filter_hospital() {
        result_hospital.clear();
        var name = document.querySelector("body > nav.hospital > table > tbody > tr > td.name > input").value;
        var service = document.querySelector("body > nav.hospital > table > tbody > tr > td.service > input").value;
        var distance = parseInt(document.querySelector("body > nav.hospital > table > tbody > tr > td.distance > select > option:checked").value, 10);
        //
        for (var h of map_hospital.values()) {
            if (name_checker(h.name, name)) {
                if (service_checker(h.services, service)) {
                    if (Math.calculateDistance(current_latitude, current_longitude, parseFloat(h.latitude), parseFloat(h.longitude)) <= distance) {
                        result_hospital.set(h._id, h);
                    }
                }
            }
        }
        render_hospital();
    }

    function render_hospital() {

        document.querySelectorAll("body > main.hospital > table > tbody > tr > td").exec(function () {
            this.innerHTML = "";
        });

        for (var current of result_hospital.values()) {

            var td = document.querySelector("body > main.hospital > table > tbody > tr > td:empty");
            td.innerHTML = document.querySelector("body > main.hospital > template").innerHTML;

            if (current.image && current.image.id) {
                td.querySelector(":scope > nav > svg").style.backgroundImage = "url('" + Api.Storage(current.image.id, current.image.extension) + "')";
            }

            td.querySelector(":scope > a > header > header").innerHTML = current.name.en;

            td.querySelector(":scope > header > section.address > div.address").innerHTML = current.address;
            td.querySelector(":scope > header > section.address > div.address2").innerHTML = current.address2;
            td.querySelector(":scope > header > section.address > div.city").innerHTML = current.city;
            td.querySelector(":scope > header > section.address > div.state").innerHTML = current.state + " " + current.zipcode;
            td.querySelector(":scope > header > section.description").innerHTML = current.description;
            for (var service_id in current.map_service) {
                var service = map_service[current.map_service[service_id].service_id];
                var div = document.createElement("div");
                div.innerHTML = service.name["zh-Hans"] + " $" + current.map_service[service_id].price;
            }
            td.querySelector(":scope > a").href = "hospital.html?id=" + current.id;
        }
    }

    function get_geo() {
        navigator.geolocation.getCurrentPosition(function (position) {
            current_latitude = position.coords.latitude;
            current_longitude = position.coords.longitude;
        });
    }

    function set_event() {

        document.querySelector("body > aside > div.doctor").addEventListener("click", function () {
            document.querySelector("body > nav.hospital").classList.remove("on");
            document.querySelector("body > main.hospital").classList.remove("on");
            document.querySelector("body > aside > div.hospital").classList.remove("on");
            this.classList.add("on");
            document.querySelector("body > nav.doctor").classList.add("on");
            document.querySelector("body > main.doctor").classList.add("on");
        });

        document.querySelector("body > aside > div.hospital").addEventListener("click", function () {
            document.querySelector("body > nav.doctor").classList.remove("on");
            document.querySelector("body > main.doctor").classList.remove("on");
            document.querySelector("body > aside > div.doctor").classList.remove("on");
            this.classList.add("on");
            document.querySelector("body > nav.hospital").classList.add("on");
            document.querySelector("body > main.hospital").classList.add("on");
        });

        document.querySelectorAll("body > nav.doctor > table > tbody > tr > td.name > input").addEventListener("keyup", filter_doctor);
        document.querySelectorAll("body > nav.doctor > table > tbody > tr > td.star > select").addEventListener("change", filter_doctor);
        document.querySelectorAll("body > nav.doctor > table > tbody > tr > td.subject > input").addEventListener("keyup", filter_doctor);
        document.querySelectorAll("body > nav.doctor > table > tbody > tr > td.insurance > input").addEventListener("keyup", filter_doctor);
        document.querySelectorAll("body > nav.doctor > table > tbody > tr > td.distance > select").addEventListener("change", filter_doctor);

        document.querySelectorAll("body > nav.hospital > table > tbody > tr > td.name > input").addEventListener("keyup", filter_hospital);
        document.querySelectorAll("body > nav.hospital > table > tbody > tr > td.service > input").addEventListener("keyup", filter_hospital);
        document.querySelectorAll("body > nav.hospital > table > tbody > tr > td.distance > select").addEventListener("change", filter_hospital);

    }

    function load(callback) {

        var init_click = 0;

        Api.Core("/doctor/read", null, function (data) {
            for (var i = 0; i < data.length; i++) {
                map_doctor.set(data[i]._id, data[i]);
            }
            init();
        });

        Api.Core("/hospital/read", null, function (data) {
            for (var i = 0; i < data.length; i++) {
                map_hospital.set(data[i]._id, data[i]);
            }
            init();
        });

        Api.Core("/subject/read", null, function (data) {
            for (var i = 0; i < data.length; i++) {
                map_subject.set(data[i]._id, data[i]);
            }
            init();
        });

        Api.Core("/service/read", null, function (data) {
            for (var i = 0; i < data.length; i++) {
                map_service.set(data[i]._id, data[i]);
            }
            init();
        });

        Api.Core("/insurance/read", null, function (data) {
            for (var i = 0; i < data.length; i++) {
                map_insurance.set(data[i]._id, data[i]);
            }
            init();
        });

        function init() {
            init_click++;
            if (init_click >= 5) {
                callback();
            }
        }

    }

    get_geo();
    set_event();
    load(function () {
        filter_doctor();
        filter_hospital();
    });

}());