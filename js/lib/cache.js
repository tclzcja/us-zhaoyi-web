/* jshint browser: true, esnext: true */

(function () {

    'use strict';

    var list = {
        "doctor": [],
        "hospital": [],
        "item": [],
        "insurance": [],
        "user": [],
        "comment": []
    };

    var hash = {
        "doctor": [],
        "hospital": [],
        "item": [],
        "insurance": [],
        "user": []
    };

    var Api = window.Api;

    window.Cache = {
        Update: function (type, callback) {
            Api.Core(type, "multiple", null, function (data) {
                list[type] = data;
                if (data.length) {
                    hash[type] = [];
                    for (var i = 0; i < data.length; i++) {
                        hash[type][data[i].id] = data[i];
                    }
                }
                if (callback) {
                    callback();
                }
            });
            return;
        },
        Get: function (type) {
            return list[type];
        },
        Hash: function (type, id) {
            return hash[type][id];
        },
        Count: function (type, callback) {
            Api.Core(type, "count", null, function (data) {
                list[type] = data;
                if (callback) {
                    callback();
                }
            });
            return;
        }
    };

}());