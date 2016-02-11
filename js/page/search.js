/* jshint browser: true, esnext: true */

(function () {

    'use strict';

    const self = document.querySelector("body > #search");

    const Cache = window.Cache;

    var current_data = [];
    var current_data_filter = [];

    var current_page = 0;
    var current_latitude = 0;
    var current_longitude = 0;
    var current_data_last = false;

    self.addEventListener("hey", function () {
        current_data = Cache.Get("doctor");
        current_page = 0;
        filter();
    });

    self.querySelector(":scope > aside.next").addEventListener("click", function () {
        if (!this.classList.contains("disable")) {
            current_page++;
            jump();
        }
    });
    self.querySelector(":scope > aside.prev").addEventListener("click", function () {
        if (!this.classList.contains("disable")) {
            current_page--;
            jump();
        }
    });

    self.querySelectorAll(":scope > table > thead > tr > td.name > input").addEventListener("keyup", filter);
    self.querySelectorAll(":scope > table > thead > tr > td.star > select").addEventListener("change", filter);

    function filter() {
        current_data_filter = [];

        var name = self.querySelector(":scope > table > thead > tr > td.name > input").value;
        var star = self.querySelector(":scope > table > thead > tr > td.star > select").value;

        for (var i = 0; i < current_data.length; i++) {
            var flag = true;
            flag = name === "" ? flag : flag && current_data[i].name.indexOf(name) >= 0;
            flag = star === "" ? flag : flag && ((current_data[i].star.one + current_data[i].star.two * 2 + current_data[i].star.three * 3 + current_data[i].star.four * 4 + current_data[i].star.five * 5) / (current_data[i].star.one + current_data[i].star.two + current_data[i].star.three + current_data[i].star.four + current_data[i].star.five)) >= parseFloat(star);
            if (flag) {
                current_data_filter.push(current_data[i]);
            }
        }

        jump();
    }

    function jump() {
        self.querySelector(":scope > aside.next").classList.remove("disable");
        self.querySelector(":scope > aside.prev").classList.remove("disable");
        for (var i = 0; i < 10; i++) {
            var tr = self.querySelector(":scope > table > tbody > tr:nth-child(" + (i + 1) + ")");
            if (i + current_page * 10 < current_data_filter.length) {
                tr.querySelectorAll(":scope > td > a").setAttribute("href", "#l=doctor&id=" + current_data_filter[i + current_page * 10].id);
                tr.querySelector(":scope > td:nth-child(1) > a").innerHTML = current_data_filter[i + current_page * 10].name;
                tr.querySelector(":scope > td:nth-child(2) > a").innerHTML = ((current_data[i].star.one + current_data[i].star.two * 2 + current_data[i].star.three * 3 + current_data[i].star.four * 4 + current_data[i].star.five * 5) / (current_data[i].star.one + current_data[i].star.two + current_data[i].star.three + current_data[i].star.four + current_data[i].star.five)).toFixed(1);
            } else {
                self.querySelector(":scope > aside.next").classList.add("disable");
                tr.querySelectorAll(":scope > td > a").removeAttribute("href");
                tr.querySelector(":scope > td:nth-child(1) > a").innerHTML = "";
                tr.querySelector(":scope > td:nth-child(2) > a").innerHTML = "";
            }
        }
        if (current_page <= 0) {
            self.querySelector(":scope > aside.prev").classList.add("disable");
        }
    }

}());