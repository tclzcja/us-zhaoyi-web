/* jshint browser: true, esnext: true, devel: true */

(function () {

    'use strict';

    var self = document.querySelector("body > #profile");

    var Api = window.Api;
    var Auth = window.Auth;
    var Cache = window.Cache;

    self.addEventListener("hey", function () {
        Auth.Test(init, function () {
            window.location.href = "#l=login";
        });
    });

    self.querySelector(":scope > div > section.logout").addEventListener("click", function () {
        Auth.Logout();
        window.location.href = "#l=index";
    });

    function init() {
        var user = Auth.Current.User();
        var insurances = Cache.Get("insurance");
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

    function update() {
        var user = Auth.Current.User();
        user.name = self.querySelector(":scope > header > main > section.name > input").value;
    }

}());