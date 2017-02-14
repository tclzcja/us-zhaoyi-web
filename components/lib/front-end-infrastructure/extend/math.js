'use strict';
window.Math.randomRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
window.Number.prototype.toRad = function () {
    return this * Math.PI / 180;
};
window.Math.calculateDistance = function (lat1, lon1, lat2, lon2) {
    var R = 6371, // km
        dLat = (lat2 - lat1).toRad(),
        dLon = (lon2 - lon1).toRad(),
        a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * Math.sin(dLon / 2) * Math.sin(dLon / 2),
        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)),
        d = R * c;
    return d;
};
