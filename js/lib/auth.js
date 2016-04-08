/* jshint browser: true, esnext: true, devel: true */

(function () {

    'use strict';

    var Api = window.Api;

    var Session_Name_Pass = "auth pass";
    var Session_Name_Current_Token = "auth current token";
    var Session_Name_Current_User = "auth current user";

    window.Auth = {
        // Test if the user already logged in
        Test: function (success, fail) {
            if (sessionStorage.getItem(Session_Name_Pass) === "1") {
                document.querySelector("body > header > footer").classList.add("on");
                success();
            } else {
                document.querySelector("body > header > footer").classList.remove("on");
                fail();
            }
        },
        // Reset all the status
        Reset: function () {
            sessionStorage.removeItem(Session_Name_Pass);
            sessionStorage.removeItem(Session_Name_Current_Token);
            sessionStorage.removeItem(Session_Name_Current_User);
        },
        //Put in Token and User info
        Login: function (token, info) {
            sessionStorage.setItem(Session_Name_Pass, "1");
            sessionStorage.setItem(Session_Name_Current_Token, "Bearer " + token);
            sessionStorage.setItem(Session_Name_Current_User, JSON.stringify(info));
            document.querySelector("body > header").dispatchEvent(new Event("login"));
        },
        Logout: function () {
            sessionStorage.removeItem(Session_Name_Pass);
            sessionStorage.removeItem(Session_Name_Current_Token);
            sessionStorage.removeItem(Session_Name_Current_User);
            document.querySelector("body > header").dispatchEvent(new Event("logout"));
        },
        Current: {
            //Get the current Header
            Token: function () {
                return sessionStorage.getItem(Session_Name_Current_Token);
            },
            //Get the current User
            User: function () {
                return JSON.parse(sessionStorage.getItem(Session_Name_Current_User));
            }
        }
    };

}());