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

    var comment_list = [];

    var comment_index = 0;

    var holder = document.createElement("div");

    function load() {

        document.querySelector("load-mask").dispatchEvent(new Event("on"));

        var fire_click = 0;

        Api.Core("/doctor/read", {
            _id: Param.Get("_id")
        }, function (data) {
            doctor = data[0];
            fire();
            Api.Core("/comment/read", {
                doctor_id: doctor._id
            }, function (comments) {
                comment_list = comments;
                fire();
            });
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

        document.querySelector("body > nav > div.favorite").addEventListener("click", function () {
            var user = Auth.Current.User();
            if (!user.favorite_doctor_list) {
                user.favorite_doctor_list = [];
            }
            user.favorite_doctor_list.push(doctor._id);
            Api.Core("/user/update", user, function () {
                Auth.Login(null, user);
                window.location.reload();
            });
        });

        document.querySelector("body > nav > div.favorited").addEventListener("click", function () {
            var user = Auth.Current.User();
            user.favorite_doctor_list.splice(user.favorite_doctor_list.indexOf(doctor._id), 1);
            Api.Core("/user/update", user, function () {
                Auth.Login(null, user);
                window.location.reload();
            });
        });

        if (Auth.Test()) {
            document.querySelector("body > main.comment > table > tbody > tr > td.action").addEventListener("click", function () {
                var data = {
                    doctor_id: doctor._id,
                    user_id: Auth.Current.User()._id,
                    star: parseInt(document.querySelector("body > main.comment > table > tbody > tr > td.star > select > option:checked").value, 10),
                    content: document.querySelector("body > main.comment > table > tbody > tr > td.content > textarea").value
                };
                Api.Core("/comment/create", data, function () {
                    window.location.reload();
                });
            });
        } else {
            document.querySelector("body > main.comment > table > tbody > tr > td.star").innerHTML = "";
            document.querySelector("body > main.comment > table > tbody > tr > td.content").innerHTML = "";
            document.querySelector("body > main.comment > table > tbody > tr > td.content").classList.add("empty");
            document.querySelector("body > main.comment > table > tbody > tr > td.action").innerHTML = "";
        }
    }

    function render() {

        if (!Auth.Test()) {
            document.querySelectorAll("body > nav > div").removeClass("on");
            document.querySelector("body > nav > div.login").classList.add("on");
        } else {
            var user = Auth.Current.User();
            if (user.favorite_doctor_list && user.favorite_doctor_list.indexOf(doctor._id) > -1) {
                document.querySelector("body > nav > div.favorited").classList.add("on");
            } else {
                document.querySelector("body > nav > div.favorite").classList.add("on");
            }
        }

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

        // Star & Comment
        if (doctor.star.amount === 0) {
            document.querySelectorAll("body > main.comment > table > tbody > tr > td.score, body > main.comment > table > tbody > tr > td.comment").addClass("empty");
            document.querySelectorAll("body > main.comment > table > tbody > tr > td.score, body > main.comment > table > tbody > tr > td.comment").exec(function () {
                this.innerHTML = "";
            });
        } else {
            var score = (doctor.star.total / doctor.star.amount).toFixed(1);
            document.querySelector("body > main.comment > table > tbody > tr > td.score > span:first-of-type").innerHTML = score;
            for (var i = 1; i < score; i++) {
                holder.innerHTML = document.querySelector("body > main.comment > table > tbody > tr > td.score > footer > template.star").innerHTML;
                var svg = holder.firstElementChild;
                document.querySelector("body > main.comment > table > tbody > tr > td.score > footer").appendChild(svg);
            }
            if (Math.floor(score) < score) {
                holder.innerHTML = document.querySelector("body > main.comment > table > tbody > tr > td.score > footer > template.star-empty").innerHTML;
                var svg = holder.firstElementChild;
                document.querySelector("body > main.comment > table > tbody > tr > td.score > footer").appendChild(svg);
            }
            for (var comment of comment_list) {
                holder.innerHTML = document.querySelector("body > main.comment > table > tbody > tr > td.comment > main > template").innerHTML;
                var span = holder.firstElementChild;
                span.querySelector(":scope > main").innerHTML = '"' + comment.content + '"';
                document.querySelector("body > main.comment > table > tbody > tr > td.comment > main").appendChild(span);
                for (var i = 0; i < comment.star; i++) {
                    holder.innerHTML = span.querySelector(":scope > footer > template").innerHTML;
                    var svg = holder.firstElementChild;
                    span.querySelector(":scope > footer").appendChild(svg);
                }
            }
        }

        document.querySelector("load-mask").dispatchEvent(new Event("off"));
    }

    load();

}());