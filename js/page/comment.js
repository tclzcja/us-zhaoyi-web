/* jshint browser: true, esnext: true, devel: true */

(function () {

    'use strict';

    const self = document.querySelector("body > #comment");

    const Api = window.Api;
    const Auth = window.Auth;
    const Param = window.Param;

    self.addEventListener("click", function () {
        self.classList.remove("on");
    });

    self.querySelector(":scope > article").addEventListener("click", function (e) {
        e.stopPropagation();
    });

    self.querySelector(":scope > article > footer").addEventListener("click", function () {
        Auth.Test(function () {
            Api.Core("comment", "create", {
                content: self.querySelector(":scope > article > section.content > textarea").value,
                star: parseInt(self.querySelector(":scope > article > section.star > select > option:checked").value, 10),
                user_id: Auth.Current.User().id,
                doctor_id: Param.Get("id")
            }, function () {
                window.location.reload();
            });
        }, function () {});
    });

}());