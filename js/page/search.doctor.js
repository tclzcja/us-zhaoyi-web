/* jshint browser: true, esnext: true, devel: true */

(function () {

    'use strict';

    const self = document.querySelector("body > #search-doctor");
    const holder = document.createElement("div");

    const Api = window.Api;
    const Cache = window.Cache;

    var current_data = [];
    var current_data_filter = [];

    self.addEventListener("hey", function () {
        self.querySelectorAll(":scope > main > div").remove();
        current_data = Cache.Get("doctor");
        filter();
    });

    //self.querySelectorAll(":scope > table > thead > tr > td.name > input").addEventListener("keyup", filter);
    //self.querySelectorAll(":scope > table > thead > tr > td.star > select").addEventListener("change", filter);

    function filter() {

        current_data_filter = [];

        //var name = self.querySelector(":scope > table > thead > tr > td.name > input").value;
        //var star = self.querySelector(":scope > table > thead > tr > td.star > select").value;

        for (var i = 0; i < current_data.length; i++) {
            var flag = true;
            //flag = name === "" ? flag : flag && current_data[i].name.indexOf(name) >= 0;
            //flag = star === "" ? flag : flag && (((current_data[i].star[1] + current_data[i].star[2] * 2 + current_data[i].star[3] * 3 + current_data[i].star[4] * 4 + current_data[i].star[5] * 5) / (current_data[i].star[1] + current_data[i].star[2] + current_data[i].star[3] + current_data[i].star[4] + current_data[i].star[5])) >= parseFloat(star) || (current_data[i].star[1] + current_data[i].star[2] + current_data[i].star[3] + current_data[i].star[4] + current_data[i].star[5] === 0));
            if (flag) {
                current_data_filter.push(current_data[i]);
            }
        }

        jump();
    }

    function jump() {
        for (var i = 0; i < current_data_filter.length; i++) {
            holder.innerHTML = self.querySelector(":scope > main > template").innerHTML;
            var div = holder.firstElementChild;
            if (current_data_filter[i].portrait && current_data_filter[i].portrait.id) {
                div.querySelector(":scope > div.portrait").style.backgroundImage = "url('" + Api.Storage(current_data_filter[i].portrait.id, current_data_filter[i].portrait.extension) + "')";
            }
            div.querySelector(":scope > div.name").innerHTML = current_data_filter[i].name.en;
            div.querySelector(":scope > a").href = "#l=doctor&id=" + current_data_filter[i].id;
            self.querySelector(":scope > main").appendChild(div);
        }
    }

}());