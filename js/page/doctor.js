/* jshint browser: true, esversion: 6, devel: true, sub: true, shadow: true, loopfunc: true */

(function () {

    'use strict';

    var Api = window.Api;
    var Auth = window.Auth;
    var Param = window.Param;

    var doctor = {};
    var map_hospital = new Map();
    var map_subject = new Map();
    var map_service = new Map();
    var map_insurance = new Map();

    var comment_index = 0;

    function load() {

        var fire_click = 0;

        Api.Core("/doctor/read", {
            _id: Param.Get("_id")
        }, function (data) {
            doctor = data[0];
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
            if (fire_click >= 5) {
                init();
                render();
            }
        }

    }

    function init() {
        document.querySelector("body > main.schedule > nav:first-of-type").addEventListener("click", function () {
            var current = document.querySelector("body > main.schedule > main.on");
            current.classList.remove("on");
            if (current.previousElementSibling && current.previousElementSibling.tagName === "MAIN") {
                current.previousElementSibling.classList.add("on");
            } else {
                document.querySelector("body > main.schedule > main:last-of-type").classList.add("on");
            }
        });
        document.querySelector("body > main.schedule > nav:last-of-type").addEventListener("click", function () {
            var current = document.querySelector("body > main.schedule > main.on");
            current.classList.remove("on");
            if (current.nextElementSibling && current.nextElementSibling.tagName === "MAIN") {
                current.nextElementSibling.classList.add("on");
            } else {
                document.querySelector("body > main.schedule > main:first-of-type").classList.add("on");
            }
        });
    }

    function render() {

        // Portrait
        if (doctor.portrait) {
            document.querySelector("body > main.info > table > tbody > tr > td.portrait").style.backgroundImage = 'url("' + Api.Storage(doctor.portrait._id, doctor.portrait.extension) + '")';
        }

        // Name
        document.querySelector("body > main.info > table > tbody > tr > td.name > div").innerHTML = "Dr. " + doctor.name["en"];

        // Title
        document.querySelector("body > main.info > table > tbody > tr > td.title > div").innerHTML = doctor.title["en"];

        // Description
        document.querySelector("body > main.info > table > tbody > tr > td.description > div").innerHTML = doctor.description;

        // Code
        document.querySelector("body > main.info > table > tbody > tr > td.code > div").innerHTML = doctor.code;

        // Startyear
        document.querySelector("body > main.info > table > tbody > tr > td.startyear > div > span").innerHTML = doctor.startyear;

        // Email
        document.querySelector("body > main.info > table > tbody > tr > td.email > div").innerHTML = doctor.email;

        // Phone
        document.querySelector("body > main.info > table > tbody > tr > td.phone > div").innerHTML = doctor.phone;

        // Subject List
        for (var subject_id of doctor.subject_list) {
            var span = document.createElement("span");
            span.innerHTML = map_subject.get(subject_id).name["zh-Hans"] + " " + map_subject.get(subject_id).name["en"];
            document.querySelector("body > main.info > table > tbody > tr > td.subject").appendChild(span);
        }

        // Service List
        for (var service_id of doctor.service_list) {
            var span = document.createElement("span");
            span.innerHTML = map_service.get(service_id).name["zh-Hans"] + " " + map_service.get(service_id).name["en"];
            document.querySelector("body > main.info > table > tbody > tr > td.service").appendChild(span);
        }

        // Insurance List
        for (var insurance_id of doctor.insurance_list) {
            var span = document.createElement("span");
            span.innerHTML = map_insurance.get(insurance_id).provider + " " + map_insurance.get(insurance_id).class + " " + map_insurance.get(insurance_id).subclass;
            document.querySelector("body > main.info > table > tbody > tr > td.insurance").appendChild(span);
        }

        // Star
        if (doctor.star.amount === 0) {
            document.querySelectorAll("body > main.comment > table > tbody > tr > td").setAttribute("data-empty", true);
        } else {
            var star = doctor.star.total / doctor.star.amount;
            document.querySelector("body > main.comment > table > tbody > tr > td.star > div").innerHTML = star.toFixed(1) + '<span>/5.0</span>';
            for (var i = 1; i <= 5; i++) {
                if (star >= i) {
                    document.querySelector("body > main.comment > table > tbody > tr > td.star > footer").innerHTML += document.querySelector("body > main.comment > table > tbody > tr > td.star > footer > template.star").innerHTML;
                } else {
                    document.querySelector("body > main.comment > table > tbody > tr > td.star > footer").innerHTML += document.querySelector("body > main.comment > table > tbody > tr > td.star > footer > template.star-empty").innerHTML;
                }
            }
            Api.Core("/comment/read", {
                doctor_id: doctor._id
            }, function () {

            });
        }

        // Schedule
        for (var schedule of doctor.schedule) {
            if (!document.querySelector("body > main.schedule > main[data-hospital-id='" + schedule.hospital_id + "']")) {
                var main = document.createElement("div");
                main.innerHTML = document.querySelector("body > main.schedule > template").innerHTML;
                main = main.firstElementChild;
                main.setAttribute("data-hospital-id", schedule.hospital_id);
                document.querySelector("body > main.schedule").appendChild(main);
                if (document.querySelector("body > main.schedule > main.on")) {
                    document.querySelector("body > main.schedule > main.on").classList.remove("on");
                }
                main.classList.add("on");
                var hospital = map_hospital.get(schedule.hospital_id);

                var table = document.querySelector("body > main.schedule > main[data-hospital-id='" + hospital._id + "'] > table");

                // Portrait
                if (hospital.portrait) {
                    table.querySelector(":scope > tbody > tr > td.portrait").style.backgroundImage = 'url("' + Api.Storage(hospital.portrait._id, hospital.portrait.extension) + '")';
                }

                // Name
                table.querySelector(":scope > tbody > tr > td.name > div").innerHTML = hospital.name["en"];

                // Description
                table.querySelector(":scope > tbody > tr > td.description > div").innerHTML = hospital.description;

                // Address
                table.querySelector(":scope > tbody > tr > td.address > div").innerHTML = hospital.address;

                // Address 2
                table.querySelector(":scope > tbody > tr > td.address2 > div").innerHTML = hospital.address2;

                // City
                table.querySelector(":scope > tbody > tr > td.city > div").innerHTML = hospital.city;

                // State
                table.querySelector(":scope > tbody > tr > td.state > div").innerHTML = hospital.state;

                // Zipcode
                table.querySelector(":scope > tbody > tr > td.zipcode > div").innerHTML = hospital.zipcode;

                // Iframe
                if (hospital.iframe) {
                    table.querySelector(":scope > tbody > tr > td.iframe").innerHTML = hospital.iframe;
                    table.querySelector(":scope > tbody > tr > td.iframe").classList.add("on");
                }
            }
            // Calendar
            var div = document.querySelector("body > main.schedule > main[data-hospital-id='" + schedule.hospital_id + "'] > table > tbody > tr > td.calendar > main > div:nth-child(" + Math.floor(schedule.calendar) + ")");
            if (Math.round(schedule.calendar) <= schedule.calendar) {
                div.querySelector(":scope > header").classList.add("on");
            } else {
                div.querySelector(":scope > footer").classList.add("on");
            }
        }
    }

    function fetch_comment() {

    }

    load();

}());