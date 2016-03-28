/* jshint browser: true, esnext: true, devel: true */

(function () {

    'use strict';

    const self = document.querySelector("body > #profile");

    const Api = window.Api;
    const Auth = window.Auth;
    const Cache = window.Cache;

    self.addEventListener("hey", function () {
        Auth.Test(init, function () {
            window.location.href = "#l=login";
        });
    });

    function init() {
        const user = Auth.Current.User();
        const insurances = Cache.Get("insurance");
        self.querySelector(":scope > header > main > section.email").innerHTML = user.email;
        self.querySelector(":scope > header > main > section.name > input").value = user.name;
        self.querySelectorAll(":scope > main > main > section > select > option:not([value='0'])").remove();
        for (var i = 0; i < insurances.length; i++) {
            var option = document.createElement("option");
            option.value = insurances[i].id;
            option.innerText = insurances[i].provider + "/" + insurances[i].class + "/" + insurances[i].subclass;
            self.querySelector(":scope > main > main > section > select").appendChild(option);
        }
    }

}());