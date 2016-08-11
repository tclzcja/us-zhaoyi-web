/* jshint browser: true, esversion: 6 */

(function () {

    'use strict';

    window.Page = {};

    window.Page.Search = {
        Here: function (keyword) {
            document.querySelector("page-search").setAttribute("data-keyword", keyword);
        }
    };

}());