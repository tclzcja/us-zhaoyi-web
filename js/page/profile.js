/* jshint browser: true, esnext: true, devel: true, shadow: true, loopfunc: true, sub: true */

(function () {

    'use strict';

    var Api = window.Api;
    var Auth = window.Auth;

    var holder = document.createElement("div");

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
    document.querySelector("body > main.info > table > tbody > tr > td.address > input").addEventListener("change", update);
    document.querySelector("body > main.info > table > tbody > tr > td.address2 > input").addEventListener("change", update);
    document.querySelector("body > main.info > table > tbody > tr > td.address3 > input").addEventListener("change", update);
    document.querySelector("body > main.info > table > tbody > tr > td.insurance > select").addEventListener("change", update);

    function render() {
        var user = Auth.Current.User();
        document.querySelectorAll("body > main.info > table > tbody > tr > td.insurance > select > option:not([value='0'])").remove();
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
        document.querySelector("body > main.info > table > tbody > tr > td.address > input").value = user.address || "";
        document.querySelector("body > main.info > table > tbody > tr > td.address2 > input").value = user.address2 || "";
        document.querySelector("body > main.info > table > tbody > tr > td.address3 > input").value = user.address3 || "";
        document.querySelector("body > main.info > table > tbody > tr > td.insurance > select").value = user.insurance_id ? user.insurance_id : 0;

        if (user.favorite_doctor_list) {
            for (var doctor_id of user.favorite_doctor_list) {
                if (doctor_id) {
                    if (document.querySelectorAll("body > main.favorite > table > tbody > tr:last-of-type > td").length === 3) {
                        var tr = document.createElement("tr");
                        document.querySelector("body > main.favorite > table > tbody").appendChild(tr);
                    }
                    var td = document.createElement("td");
                    td.innerHTML = document.querySelector("body > main.favorite > template").innerHTML;
                    td.setAttribute("data-doctor-id", doctor_id);
                    document.querySelector("body > main.favorite > table > tbody > tr:last-of-type").appendChild(td);
                    Api.Core("/doctor/read", {
                        _id: doctor_id
                    }, function (data) {
                        var target_a = document.querySelector("body > main.favorite > table > tbody > tr > td[data-doctor-id='" + data[0]._id + "'] > a");
                        target_a.href = "doctor.html?_id=" + data[0]._id;
                        target_a.querySelector(":scope > footer").innerHTML = data[0].name["en"];
                        if (data[0].portrait) {
                            target_a.style.backgroundImage = "url('" + Api.Storage(data[0].portrait._id, data[0].portrait.extension) + "')";
                        }
                        target_a.querySelector(":scope > div").addEventListener("click", function (e) {
                            e.stopPropagation();
                            e.preventDefault();
                            this.parentNode.parentNode.remove();
                            update();
                        });
                    });
                }
            }
        } else {
            document.querySelector("body > main.favorite").innerHTML = "暂时没有收藏任何医生";
        }
    }

    function update() {
        var user = Auth.Current.User();
        user.name = document.querySelector("body > main.info > table > tbody > tr > td.name > input").value;
        user.phone = document.querySelector("body > main.info > table > tbody > tr > td.phone > input").value;
        user.address = document.querySelector("body > main.info > table > tbody > tr > td.address > input").value;
        user.address2 = document.querySelector("body > main.info > table > tbody > tr > td.address2 > input").value;
        user.address3 = document.querySelector("body > main.info > table > tbody > tr > td.address3 > input").value;
        user.insurance_id = document.querySelector("body > main.info > table > tbody > tr > td.insurance > select > option:checked").value;
        user.favorite_doctor_list = [];
        document.querySelectorAll("body > main.favorite > table > tbody > tr > td").exec(function () {
            user.favorite_doctor_list.push(this.getAttribute("data-doctor-id"));
        });
        Api.Core("/user/update", user, function () {
            Auth.Login(null, user);
            window.location.reload();
        });
    }

    if (Auth.Test()) {
        load();
    }

}());