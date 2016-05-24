/* jshint browser: true, esnext: true, devel: true, shadow: true, sub: true */

(function () {

    'use strict';

    var Api = window.Api;
    var Cache = window.Cache;

    var current_latitude = 0;
    var current_longitude = 0;

    var doctor_list = Cache.Get("doctor");
    var doctor_hash = Cache.Hash("doctor");
    var doctor_filter = [];
    var hospital_list = Cache.Get("hospital");
    var hospital_hash = Cache.Hash("hospital");
    var hospital_filter = [];
    var subject_list = Cache.Get("subject");
    var subject_hash = Cache.Hash("subject");
    var service_list = Cache.Get("service");
    var service_hash = Cache.Hash("service");
    var insurance_list = Cache.Get("insurance");
    var insurance_hash = Cache.Hash("insurance");

    navigator.geolocation.getCurrentPosition(function (position) {
        current_latitude = position.coords.latitude;
        current_longitude = position.coords.longitude;
    });

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

    filter_doctor();
    filter_hospital();

    document.querySelectorAll("body > nav.doctor > table > tbody > tr > td.name > input").addEventListener("keyup", filter_doctor);
    document.querySelectorAll("body > nav.doctor > table > tbody > tr > td.star > select").addEventListener("change", filter_doctor);
    document.querySelectorAll("body > nav.doctor > table > tbody > tr > td.subject > input").addEventListener("keyup", filter_doctor);
    document.querySelectorAll("body > nav.doctor > table > tbody > tr > td.insurance > input").addEventListener("keyup", filter_doctor);
    document.querySelectorAll("body > nav.doctor > table > tbody > tr > td.distance > select").addEventListener("change", filter_doctor);

    document.querySelectorAll("body > nav.hospital > table > tbody > tr > td.name > input").addEventListener("keyup", filter_hospital);
    document.querySelectorAll("body > nav.hospital > table > tbody > tr > td.service > input").addEventListener("keyup", filter_hospital);
    document.querySelectorAll("body > nav.hospital > table > tbody > tr > td.distance > select").addEventListener("change", filter_hospital);

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
            for (var subject_id in subjects) {
                if (name_checker(Cache.Hash("subject", subjects[subject_id]).name, keyword)) {
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
        doctor_filter = [];
        var name = document.querySelector("body > nav.doctor > table > tbody > tr > td.name > input").value;
        var star = parseFloat(document.querySelector("body > nav.doctor > table > tbody > tr > td.star > select").value);
        var subject = document.querySelector("body > nav.doctor > table > tbody > tr > td.subject > input").value;
        var insurance = document.querySelector("body > nav.doctor > table > tbody > tr > td.insurance > input").value;
        var distance = parseInt(document.querySelector("body > nav.doctor > table > tbody > tr > td.distance > select > option:checked").value, 10);
        //
        for (var i = 0; i < doctor_list.length; i++) {
            if (name_checker(doctor_list[i].name, name)) {
                if (doctor_list[i].star.amount === 0 || (doctor_list[i].star.total / doctor_list[i].star.amount) >= star) {
                    if (subject_checker(doctor_list[i].subjects, subject)) {
                        if (insurance_checker(doctor_list[i].insurances, insurance)) {
                            if (distance_checker(doctor_list[i].schedules, distance)) {
                                doctor_filter.push(doctor_list[i]);
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

        for (var i = 0; i < doctor_filter.length; i++) {

            var current = doctor_filter[i];
            var td = document.querySelector("body > main.doctor > table > tbody > tr > td:empty");

            td.innerHTML = document.querySelector("body > main.doctor > template").innerHTML;

            if (current.portrait && current.portrait._id) {
                td.querySelector(":scope > a > nav").style.backgroundImage = "url('" + Api.Storage(current.portrait._id, current.portrait.extension) + "')";
            }

            td.querySelector(":scope > a > header > header").innerHTML = "Dr. " + current.name['en'];
            td.querySelector(":scope > a > header > nav").innerHTML = current.title['en'];
            var star = ((current.star[1] + current.star[2] * 2 + current.star[3] * 3 + current.star[4] * 4 + current.star[5] * 5) / (current.star[1] + current.star[2] + current.star[3] + current.star[4] + current.star[5]) || 0).toFixed(1);
            star = star <= 0 ? 1 : star;
            if (star > Math.floor(star)) {
                td.querySelector(":scope > a > header > footer").innerHTML += td.querySelector(":scope > a > header > footer > template.star-empty").innerHTML;
            }
            for (var j = 0; j < Math.floor(star); j++) {
                td.querySelector(":scope > a > header > footer").innerHTML += td.querySelector(":scope > a > header > footer > template.star").innerHTML;
            }

            for (var subject_id of current.subject_list) {
                var subject = subject_hash[subject_id];
                var span = document.createElement("span");
                span.innerHTML = subject.name["zh-Hans"];
                td.querySelector(":scope > a > footer > section.subject").appendChild(span);
            }
            for (var service_id of current.service_list) {
                var service = service_hash[service_id];
                var span = document.createElement("span");
                span.innerHTML = service.name["zh-Hans"];
                td.querySelector(":scope > a > footer > section.service").appendChild(span);
            }
            for (var insurance_id of current.insurance_list) {
                var insurance = insurance_hash[insurance_id];
                var span = document.createElement("span");
                span.innerHTML = insurance.provider + "/" + insurance.class + "/" + insurance.subclass;
                td.querySelector(":scope > a > footer > section.insurance").appendChild(span);
            }

            td.querySelector(":scope > a > header > section.phone > div").innerHTML = current.phone || "没有记录";
            td.querySelector(":scope > a > header > section.email > div").innerHTML = current.email || "没有记录";
            td.querySelector(":scope > a").href = "doctor.html?_id=" + current._id;
        }

    }

    function filter_hospital() {
        hospital_filter = [];
        var name = document.querySelector("body > nav.hospital > table > tbody > tr > td.name > input").value;
        var service = document.querySelector("body > nav.hospital > table > tbody > tr > td.service > input").value;
        var distance = parseInt(document.querySelector("body > nav.hospital > table > tbody > tr > td.distance > select > option:checked").value, 10);
        //
        for (var i = 0; i < hospital_list.length; i++) {
            if (name_checker(hospital_list[i].name, name)) {
                if (service_checker(hospital_list[i].services, service)) {
                    if (Math.calculateDistance(current_latitude, current_longitude, parseFloat(hospital_list[i].latitude), parseFloat(hospital_list[i].longitude)) <= distance) {
                        hospital_filter.push(hospital_list[i]);
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

        for (var i = 0; i < hospital_filter.length; i++) {

            var current = doctor_filter[i];
            var td = document.querySelector("body > main.hospital > table > tbody > tr > td:empty");
            td.innerHTML = document.querySelector("body > main.hospital > template").innerHTML;

            if (hospital_filter[i].image && hospital_filter[i].image.id) {
                td.querySelector(":scope > nav > svg").style.backgroundImage = "url('" + Api.Storage(hospital_filter[i].image.id, hospital_filter[i].image.extension) + "')";
            }

            td.querySelector(":scope > a > header > header").innerHTML = hospital_filter[i].name.en;

            td.querySelector(":scope > header > section.address > div.address").innerHTML = hospital_filter[i].address;
            td.querySelector(":scope > header > section.address > div.address2").innerHTML = hospital_filter[i].address2;
            td.querySelector(":scope > header > section.address > div.city").innerHTML = hospital_filter[i].city;
            td.querySelector(":scope > header > section.address > div.state").innerHTML = hospital_filter[i].state + " " + hospital_filter[i].zipcode;
            td.querySelector(":scope > header > section.description").innerHTML = hospital_filter[i].description;
            for (var service_id in hospital_filter[i].service_list) {
                var service = service_hash[hospital_filter[i].service_list[service_id].service_id];
                var div = document.createElement("div");
                div.innerHTML = service.name["zh-Hans"] + " $" + hospital_filter[i].service_list[service_id].price;
            }
            td.querySelector(":scope > a").href = "hospital.html?id=" + hospital_filter[i].id;
        }
    }

}());