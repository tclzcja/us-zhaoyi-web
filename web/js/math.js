(function () {

    'use strict';

    Math.randomRange = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

}());