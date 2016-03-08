/* jshint browser: true, esnext: true */

(function () {

    'use strict';

    const Auth = window.Auth;

    const Api_Address = window.location.href.indexOf("localhost") > -1 ? "http://localhost:1337" : "http://52.91.68.202:8080";
    const Storage_Address = "https://s3.amazonaws.com/storage.uszhaoyi.com/";

    window.Api = {
        Core: function (target, action, data, callback_correct) {
            data = data || {};
            let xhr = new XMLHttpRequest();
            xhr.open("POST", Api_Address + "/" + target + "/" + action, true);
            xhr.responseType = "json";
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Authorization", Auth.Current.Token());
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
            xhr.open("POST", Api_Address + "/api/" + area.toLowerCase() + "/" + type.toLowerCase() + "/" + action.toLowerCase());
            xhr.send(fd);
        },
        Storage: function (id, extension) {
            return Storage_Address + id + "." + extension;
        }
    };

}());