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

    function load(callback) {

        var init_click = 0;

        Api.Core("/doctor/read", {
            _id: Param.Get("_id")
        }, function (data) {
            doctor = data[0];
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
        for (var i = 0; i < doctor.schedule.length; i++) {
            Api.Core("/hospital/read", {
                _id: doctor.schedule[i].hospital_id
            }, function (hospital) {
                console.log(hospital[0]);
                var main = document.createElement("div");
                main.innerHTML = document.querySelector("body > main.schedule > template").innerHTML;
                main = main.firstElementChild;
                document.querySelector("body > main.schedule").appendChild(main);
                var table = main.querySelector(":scope > table");

                // Portrait
                if (hospital[0].portrait) {
                    table.querySelector(":scope > tbody > tr > td.portrait").style.backgroundImage = 'url("' + Api.Storage(hospital[0].portrait._id, hospital[0].portrait.extension) + '")';
                }

                // Name
                table.querySelector(":scope > tbody > tr > td.name > div").innerHTML = hospital[0].name["en"];

                // Description
                table.querySelector(":scope > tbody > tr > td.description > div").innerHTML = hospital[0].description;

                // Address
                table.querySelector(":scope > tbody > tr > td.address > div").innerHTML = hospital[0].address;

                // Address 2
                table.querySelector(":scope > tbody > tr > td.address2 > div").innerHTML = hospital[0].address2;

                // City
                table.querySelector(":scope > tbody > tr > td.city > div").innerHTML = hospital[0].city;

                // State
                table.querySelector(":scope > tbody > tr > td.state > div").innerHTML = hospital[0].state;

                // Zipcode
                table.querySelector(":scope > tbody > tr > td.zipcode > div").innerHTML = hospital[0].zipcode;

                // Iframe
                if (hospital[0].iframe) {
                    main.querySelector(":scope > header").innerHTML = hospital[0].iframe;
                }
            });
        }
    }

    function fetch_comment() {

    }

    load(render);

}());