/* jshint browser: true, esnext: true, devel: true, shadow: true */

(function () {

    'use strict';

    var Api = window.Api;
    var Auth = window.Auth;

    var map_insurance = new Map();

    function load() {

        var fire_click = 0;

        Api.Core("/insurance/read", null, function (data) {
            for (var i = 0; i < data.length; i++) {
                map_insurance.set(data[i]._id, data[i]);
            }
            fire();
        });

        function fire() {
            fire_click++;
            if (fire_click >= 1) {
                render();
            }
        }

    }

    document.querySelector("body > main.info > table > tbody > tr > td.name > input").addEventListener("change", update);
    document.querySelector("body > main.info > table > tbody > tr > td.phone > input").addEventListener("change", update);
    document.querySelector("body > main.info > table > tbody > tr > td.insurance > select").addEventListener("change", update);

    function render() {
        var user = Auth.Current.User();
        for (var i of map_insurance.keys()) {
            var insurance = map_insurance.get(i);
            var option = document.createElement("option");
            option.value = i;
            option.innerText = insurance.provider + "/" + insurance.class + "/" + insurance.subclass;
            document.querySelector("body > main.info > table > tbody > tr > td.insurance > select").appendChild(option);
        }

        document.querySelector("body > main.info > table > tbody > tr > td.email > div").innerHTML = user.email;
        document.querySelector("body > main.info > table > tbody > tr > td.name > input").value = user.name || "";
        document.querySelector("body > main.info > table > tbody > tr > td.phone > input").value = user.phone || "";
        document.querySelector("body > main.info > table > tbody > tr > td.insurance > select").value = user.insurance_id;

        if (user.archive_doctor_list && user.archive_doctor_list.length) {
            // Blah
        } else {
            document.querySelector("body > main.archive").innerHTML = "暂时没有收藏任何医生";
        }
    }

    function update() {
        var user = Auth.Current.User();
        user.name = document.querySelector("body > main.info > table > tbody > tr > td.name > input").value;
        user.phone = document.querySelector("body > main.info > table > tbody > tr > td.phone > input").value;
        user.insurance_id = document.querySelector("body > main.info > table > tbody > tr > td.insurance > select > option:checked").value;
        Api.Core("/user/update", user, function () {
            Auth.Login(null, user);
            render();
        });
    }

    if (Auth.Test()) {
        load();
    }

}());