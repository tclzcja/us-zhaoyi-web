/* jshint browser: true, esnext: true, devel: true, loopfunc: true */

(function () {

    'use strict';

    var Auth = window.Auth;

    var Api_Address = (window.location.href.indexOf("localhost") > -1 || window.location.href.indexOf("127.0.0.1") > -1) ? "http://localhost:8080" : "https://uszhaoyi.mod.bz";

    var Storage_Address = "https://s3.amazonaws.com/us-zhaoyi-storage/";

    window.Api = {
        Core: function (resource, data, callback_correct) {
            data = data || {};
            var xhr = new XMLHttpRequest();
            xhr.open('POST', Api_Address + resource, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Authorization", Auth.Current.Token());
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    callback_correct(xhr.response ? JSON.parse(xhr.response) : null);
                } else if (xhr.status !== 200) {
                    // A centralized error processing component here
                }
            };
            xhr.send(JSON.stringify(data));
        },
        File: function (resource, file, callback_correct) {
            file = file || {};
            var xhr = new XMLHttpRequest();
            xhr.open('POST', Api_Address + resource, true);
            xhr.setRequestHeader("Authorization", Auth.Current.Token());
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    callback_correct(xhr.response ? JSON.parse(xhr.response) : null);
                } else if (xhr.status !== 200) {
                    // A centralized error processing component here
                }
            };
            xhr.send(file);
        },
        Storage: function (id, extension) {
            return Storage_Address + id + "." + extension;
        }
    };

}());