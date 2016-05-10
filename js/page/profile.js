/* jshint browser: true, esnext: true, devel: true, shadow: true */

(function () {

    'use strict';

    var self = document.querySelector("body > #profile");
    var holder = document.createElement("div");

    var Api = window.Api;
    var Auth = window.Auth;
    var Cache = window.Cache;

    self.addEventListener("hey", render);

    self.querySelector(":scope > header > main.logout").addEventListener("click", Auth.Logout);
    self.querySelector(":scope > header > main > section.name > input").addEventListener("change", update);
    self.querySelector(":scope > main > main > section.insurance > select").addEventListener("change", update);

    function render() {
        if (Auth.Test()) {
            var user = Auth.Current.User();
            var insurances = Cache.Get("insurance");
            self.querySelector(":scope > header > main.info > section.email").innerHTML = user.email;
            self.querySelector(":scope > header > main.info > section.name > input").value = user.name;
            self.querySelectorAll(":scope > main > main > section > select > option:not([value='0'])").remove();
            for (var i = 0; i < insurances.length; i++) {
                var option = document.createElement("option");
                option.value = insurances[i].id;
                option.innerText = insurances[i].provider + "/" + insurances[i].class + "/" + insurances[i].subclass;
                self.querySelector(":scope > main > main > section > select").appendChild(option);
            }
            self.querySelector(":scope > main > main > section.insurance > select").value = user.insurance_id;
            if (user.favorite_doctor_list) {
                self.querySelectorAll(":scope > footer > div").remove();
                for (var i = 0; i < user.favorite_doctor_list.length; i++) {
                    holder.innerHTML = self.querySelector(":scope > footer > template").innerHTML;
                    var div = holder.firstElementChild;
                    var doctor = Cache.Hash("doctor", user.favorite_doctor_list[i]);
                    if (doctor.portrait) {
                        div.style.backgroundImage = "url(" + Api.Storage(doctor.portrait.id, doctor.portrait.extension) + ")";
                        div.querySelector(":scope > svg").remove();
                    }
                    div.querySelector(":scope > header").innerHTML = doctor.name.en;
                    div.querySelector(":scope > a").href = "#l=doctor&id=" + doctor.id;
                    self.querySelector(":scope > footer").appendChild(div);
                }
            } else {
                //self.querySelector(":scope > footer > main").innerHTML = "暂时没有收藏任何医生";
            }
        } else {
            window.location.href = "#l=login";
        }
    }

    function update() {
        var user = Auth.Current.User();
        user.name = self.querySelector(":scope > header > main.info > section.name > input").value;
        user.insurance_id = self.querySelector(":scope > main > main > section.insurance > select > option:checked").value;
        Api.Core("user", "update", user, function () {
            Auth.Login(user.token, user);
            render();
            self.querySelector(":scope > span").classList.add("on");
            window.setTimeout(function () {
                self.querySelector(":scope > span").classList.remove("on");
            }, 2000);
        });
    }

}());