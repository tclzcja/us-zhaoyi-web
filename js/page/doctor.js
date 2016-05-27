/* jshint browser: true, esversion: 6, devel: true, sub: true */

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

        // Star
        var star = doctor.star.total / doctor.star.amount || 1;
        if (star > Math.floor(star)) {
            document.querySelector("body > main.info > table > tbody > tr > td.star").innerHTML += document.querySelector("body > main.info > table > tbody > tr > td.star > template.star-empty").innerHTML;
        }
        for (var j = 0; j < Math.floor(star); j++) {
            document.querySelector("body > main.info > table > tbody > tr > td.star").innerHTML += document.querySelector("body > main.info > table > tbody > tr > td.star > template.star").innerHTML;
        }
        document.querySelector("body > main.info > table > tbody > tr > td.star > div").innerHTML = star.toFixed(1) + '<span>/5.0</span>';

        // Email
        document.querySelector("body > main.info > table > tbody > tr > td.email > div").innerHTML = doctor.email;

        // Phone
        document.querySelector("body > main.info > table > tbody > tr > td.phone > div").innerHTML = doctor.phone;
    }

    load(render);

}());