/* jshint browser: true, esnext: true, devel: true, shadow: true, sub: true */

(function () {

    'use strict';

    var Api = window.Api;

    var holder = document.createElement("div");

    var current_latitude = 0;
    var current_longitude = 0;
    var zipcode_coordinate = null;

    var map_doctor = new Map();
    var map_hospital = new Map();
    var map_subject = new Map();
    var map_service = new Map();
    var map_insurance = new Map();
    var result_doctor = new Map();
    var result_hospital = new Map();

    function name_checker(name, keyword) {
        for (var n in name) {
            if (name[n].indexOf(keyword) > -1) {
                return true;
            }
        }
        return false;
    }

    function subject_checker(subjects, keyword) {
        for (var _id in subjects) {
            if (name_checker(map_subject[subjects[_id]].name, keyword)) {
                return true;
            }
        }
        return keyword === "";
    }

    function service_checker(services, keyword) {
        for (var _id in services) {
            if (name_checker(map_service[services[_id]].name, keyword)) {
                return true;
            }
        }
        return keyword === "";
    }

    function insurance_checker(insurances, keyword) {
        for (var _id in insurances) {
            if (name_checker(map_insurance[insurances[_id]], keyword)) {
                return true;
            }
        }
        return keyword === "";
    }

    function distance_checker(schedules, distance, origin_latitude, origin_longitude) {
        for (var schedule in schedules) {
            var hospital = map_hospital[schedules[schedule].hospital_id];
            if (Math.calculateDistance(origin_latitude, origin_longitude, hospital.latitude, hospital.longitude) <= distance) {
                return true;
            }
        }
        return distance === 999999;
    }

    function filter_doctor() {
        result_doctor.clear();
        var name = document.querySelector("body > nav.doctor > table > tbody > tr > td.name > input").value;
        var star = parseFloat(document.querySelector("body > nav.doctor > table > tbody > tr > td.star > select").value);
        var subject = document.querySelector("body > nav.doctor > table > tbody > tr > td.subject > input").value;
        var insurance = document.querySelector("body > nav.doctor > table > tbody > tr > td.insurance > input").value;
        var distance = parseInt(document.querySelector("body > nav.doctor > table > tbody > tr > td.distance > select > option:checked").value, 10);
        var origin_latitude = current_latitude;
        var origin_longitude = current_longitude;
        var zco = zipcode_coordinate[parseInt(document.querySelector("body > nav.doctor > table > tbody > tr > td.origin > input").value, 10)];
        if (zco) {
            origin_latitude = zco.x;
            origin_longitude = zco.y;
        }
        for (var d of map_doctor.values()) {
            if (name_checker(d.name, name)) {
                if ((d.star.total / d.star.amount || 0) >= star) {
                    if (subject_checker(d.subjects, subject)) {
                        if (insurance_checker(d.insurances, insurance)) {
                            if (distance_checker(d.schedules, distance, origin_latitude, origin_longitude)) {
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

        document.querySelectorAll("body > main.doctor > a").remove();
        document.querySelector("body > main.doctor").classList.remove("empty");

        for (var current of result_doctor.values()) {

            holder.innerHTML = document.querySelector("body > main.doctor > template").innerHTML;

            var a = holder.firstElementChild;
            var table = a.firstElementChild;

            // Portrait
            if (current.portrait && current.portrait._id) {
                table.querySelector(":scope > tbody > tr > td.portrait").style.backgroundImage = "url('" + Api.Storage(current.portrait._id, current.portrait.extension) + "')";
            }
            // Name
            table.querySelector(":scope > tbody > tr > td.name > div").innerHTML = "Dr. " + current.name['en'];

            // Title
            table.querySelector(":scope > tbody > tr > td.title > div").innerHTML = current.title['en'];

            // Star
            var star = (current.star.total / current.star.amount || 1).toFixed(1);
            for (var j = 0; j < Math.floor(star); j++) {
                table.querySelector(":scope > tbody > tr > td.star > header").innerHTML += table.querySelector(":scope > tbody > tr > td.star > header > template.star").innerHTML;
            }
            if (star > Math.floor(star)) {
                table.querySelector(":scope > tbody > tr > td.star > header").innerHTML += table.querySelector(":scope > tbody > tr > td.star > header > template.star-empty").innerHTML;
            }

            table.querySelector(":scope > tbody > tr > td.star > div > span:first-of-type").innerHTML = star;
            table.querySelector(":scope > tbody > tr > td.star > div > span:last-of-type").innerHTML = current.star.amount;

            // Subject List
            table.querySelector(":scope > tbody > tr > td.subject > div > span").innerHTML = current.subject_list.length;

            // Service List
            table.querySelector(":scope > tbody > tr > td.service > div > span").innerHTML = current.service_list.length;

            // Insurance List
            table.querySelector(":scope > tbody > tr > td.insurance > div > span").innerHTML = current.insurance_list.length;

            table.querySelector(":scope > tbody > tr > td.phone > div").innerHTML = current.phone || "";
            table.querySelector(":scope > tbody > tr > td.email > div").innerHTML = current.email || "";
            a.href = "doctor.html?_id=" + current._id;

            document.querySelector("body > main.doctor").appendChild(a);

        }

        if (result_doctor.size === 0) {
            document.querySelector("body > main.doctor").classList.add("empty");
        }

    }

    function filter_hospital() {
        result_hospital.clear();
        var name = document.querySelector("body > nav.hospital > table > tbody > tr > td.name > input").value;
        var service = document.querySelector("body > nav.hospital > table > tbody > tr > td.service > input").value;
        var distance = parseInt(document.querySelector("body > nav.hospital > table > tbody > tr > td.distance > select > option:checked").value, 10);
        //
        for (var h of map_hospital.values()) {
            result_hospital.set(h._id, h);
            /*
            if (name_checker(h.name, name)) {
                if (service_checker(h.services, service)) {
                    if (Math.calculateDistance(current_latitude, current_longitude, parseFloat(h.latitude), parseFloat(h.longitude)) <= distance) {
                        result_hospital.set(h._id, h);
                    }
                }
            }*/
        }
        render_hospital();
    }

    function render_hospital() {

        document.querySelectorAll("body > main.hospital > a").remove();
        document.querySelector("body > main.hospital").classList.remove("empty");

        for (var current of result_hospital.values()) {

            holder.innerHTML = document.querySelector("body > main.hospital > template").innerHTML;

            var a = holder.firstElementChild;
            var table = a.firstElementChild;

            // Portrait
            if (current.portrait && current.portrait._id) {
                table.querySelector(":scope > tbody > tr > td.portrait").style.backgroundImage = "url('" + Api.Storage(current.portrait._id, current.portrait.extension) + "')";
            }

            // Name
            table.querySelector(":scope > tbody > tr > td.name > div").innerHTML = current.name['en'];

            // Description
            table.querySelector(":scope > tbody > tr > td.description > div").innerHTML = current.description;

            // Service List
            table.querySelector(":scope > tbody > tr > td.service > div > span").innerHTML = current.service_list.length;

            // Address
            table.querySelector(":scope > tbody > tr > td.address > div").innerHTML = current.address;

            // Address2
            table.querySelector(":scope > tbody > tr > td.address2 > div").innerHTML = current.address2;

            // City
            table.querySelector(":scope > tbody > tr > td.city > div").innerHTML = current.city;

            // Zipcode
            table.querySelector(":scope > tbody > tr > td.zipcode > div").innerHTML = current.zipcode;

            // State
            table.querySelector(":scope > tbody > tr > td.state > div").innerHTML = current.state;

            a.href = "hospital.html?_id=" + current._id;
            document.querySelector("body > main.hospital").appendChild(a);

        }

        if (result_hospital.size === 0) {
            document.querySelector("body > main.hospital").classList.add("empty");
        }
    }

    function init() {

        navigator.geolocation.getCurrentPosition(function (position) {
            current_latitude = position.coords.latitude;
            current_longitude = position.coords.longitude;
        });

        document.querySelector("load-mask").dispatchEvent(new Event("on"));

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

        var fire_click = 0;

        Api.Local("/resource/zipcode.coordinate.json", function (data) {
            zipcode_coordinate = data;
            fire();
        });

        Api.Core("/doctor/read", null, function (data) {
            for (var i = 0; i < data.length; i++) {
                map_doctor.set(data[i]._id, data[i]);
            }
            fire();
        });

        Api.Core("/hospital/read", null, function (data) {
            for (var i = 0; i < data.length; i++) {
                map_hospital.set(data[i]._id, data[i]);
            }
            fire();
        });

        Api.Core("/subject/read", null, function (data) {
            for (var i = 0; i < data.length; i++) {
                map_subject.set(data[i]._id, data[i]);
            }
            fire();
        });

        Api.Core("/service/read", null, function (data) {
            for (var i = 0; i < data.length; i++) {
                map_service.set(data[i]._id, data[i]);
            }
            fire();
        });

        Api.Core("/insurance/read", null, function (data) {
            for (var i = 0; i < data.length; i++) {
                map_insurance.set(data[i]._id, data[i]);
            }
            fire();
        });

        function fire() {
            fire_click++;
            if (fire_click >= 6) {
                callback();
            }
        }

    }

    init();
    load(function () {
        document.querySelector("load-mask").dispatchEvent(new Event("off"));
        filter_doctor();
        filter_hospital();
    });

}());