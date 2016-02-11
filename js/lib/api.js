/* jshint browser: true, esnext: true */

(function () {

    'use strict';

    const Auth = window.Auth;

    const Session_Name_Address_Api = "api address api";
    const Storage_Address = "https://s3-us-west-1.amazonaws.com/us-zhaoyi/";

    window.Api = {
        Reset: function () {
            //sessionStorage.setItem(Session_Name_Address_Api, "http://taleland.mod.bz");
            sessionStorage.setItem(Session_Name_Address_Api, "http://localhost:1337");
        },
        Core: function (target, action, data, callback_correct) {
            data = data || {};
            let xhr = new XMLHttpRequest();
            xhr.open("POST", sessionStorage.getItem(Session_Name_Address_Api) + "/" + target + "/" + action, true);
            xhr.responseType = "json";
            xhr.setRequestHeader("Content-Type", "application/json");
            //xhr.setRequestHeader("Authorization", Auth.Current.Token());
            //xhr.setRequestHeader("Authorization", "");
            data.access_token = Auth.Current.Token();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    callback_correct(xhr.response);
                } else if (xhr.status !== 200) {
                    // Centralized error processing component
                }
            };
            xhr.send(JSON.stringify(data));
        },
        File: function (area, type, action, file, callback) {

            let fd = new FormData();
            let xhr = new XMLHttpRequest();

            fd.append("file", file);

            xhr.responseType = "json";
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Authorization", Auth.Current.Token());

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    callback(xhr.response);
                }
            };

            xhr.open("POST", sessionStorage.getItem(Session_Name_Address_Api) + "/api/" + area.toLowerCase() + "/" + type.toLowerCase() + "/" + action.toLowerCase());
            xhr.send(fd);

        },
        Storage: function (id, extension) {
            return Storage_Address + id + "." + extension;
        }
    };

}());