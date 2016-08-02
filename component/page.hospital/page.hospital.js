/* jshint browser: true, esversion: 6, devel: true, sub: true, shadow: true, loopfunc: true */

(function () {

    'use strict';

    var Api = window.Api;
    var Auth = window.Auth;
    var Param = window.Param;

    var hospital = {};
    var map_service = new Map();

    var holder = document.createElement("div");

    function load() {

        document.querySelector("load-mask").dispatchEvent(new Event("on"));

        var fire_click = 0;

        Api.Core("/hospital/read", {
            _id: Param.Get("_id")
        }, function (data) {
            hospital = data[0];
            fire();
        });

        Api.Core("/service/read", null, function (data) {
            for (var i = 0; i < data.length; i++) {
                map_service.set(data[i]._id, data[i]);
            }
            fire();
        });

        function fire() {
            fire_click++;
            if (fire_click >= 2) {
                render();
            }
        }

    }

    function render() {

        // Portrait
        if (hospital.portrait) {
            document.querySelector("body > main.info > table > tbody > tr > td.portrait").style.backgroundImage = 'url("' + Api.Storage(hospital.portrait._id, hospital.portrait.extension) + '")';
        }

        // Name
        document.querySelector("body > main.info > table > tbody > tr > td.name > div").innerHTML = "Dr. " + hospital.name["en"];

        // Description
        document.querySelector("body > main.info > table > tbody > tr > td.description > div").innerHTML = hospital.description;

        // Address
        document.querySelector("body > main.info > table > tbody > tr > td.address > div").innerHTML = hospital.address;

        // Address2
        document.querySelector("body > main.info > table > tbody > tr > td.address2 > div").innerHTML = hospital.address2;

        // City
        document.querySelector("body > main.info > table > tbody > tr > td.city > div").innerHTML = hospital.city;

        // Zipcode
        document.querySelector("body > main.info > table > tbody > tr > td.zipcode > div").innerHTML = hospital.zipcode;

        // State
        document.querySelector("body > main.info > table > tbody > tr > td.state > div").innerHTML = hospital.state;

        // Service List
        for (var service of hospital.service_list) {
            var span = document.createElement("span");
            span.innerHTML = map_service.get(service.service_id).name["zh-Hans"] + " " + map_service.get(service.service_id).name["en"];
            span.setAttribute("data-price", "$" + service.price);
            document.querySelector("body > main.info > table > tbody > tr > td.service").appendChild(span);
        }

        document.querySelector("load-mask").dispatchEvent(new Event("off"));
    }

    load();

}());