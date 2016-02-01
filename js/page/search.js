/* jshint browser: true, esnext: true */

(function () {

    'use strict';

    const self = document.querySelector("body > #search");

    const Template = window.Template;

    var dummy_data;
    var current_page = 0;
    var current_latitude = 0;
    var current_longitude = 0;
    var current_data_last = false;
    var filter_name = "";
    var filter_star = 0;
    var filter_item = "";
    var filter_distance = 9999;

    var dictionary_item = {
        "dentist": "牙医",
        "chiropractic": "脊椎矫正",
        "ophthalmology": "眼科"
    };

    function load() {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'data/search.json', true);
        xobj.onreadystatechange = function () {
            if (xobj.readyState === 4 && xobj.status === 200) {
                dummy_data = JSON.parse(xobj.responseText).data;
                init();
            }
        };
        xobj.send(null);
    }

    function init() {
        self.querySelector(":scope > table > thead > tr > td.name > input").addEventListener("keyup", function () {
            if (this.value !== "") {
                this.parentNode.classList.add("on");
            } else {
                this.parentNode.classList.remove("on");
            }
            filter_name = this.value;
            render();
        });
        self.querySelector(":scope > table > thead > tr > td.star > select").addEventListener("change", function () {
            if (this.value !== "0") {
                this.parentNode.classList.add("on");
            } else {
                this.parentNode.classList.remove("on");
            }
            filter_star = parseInt(this.value, 10);
            render();
        });
        self.querySelector(":scope > table > thead > tr > td.item > select").addEventListener("change", function () {
            if (this.value !== "") {
                this.parentNode.classList.add("on");
            } else {
                this.parentNode.classList.remove("on");
            }
            filter_item = this.value;
            render();
        });
        self.querySelector(":scope > table > thead > tr > td.distance > select").addEventListener("change", function () {
            if (this.value !== "9999") {
                this.parentNode.classList.add("on");
            } else {
                this.parentNode.classList.remove("on");
            }
            filter_distance = parseInt(this.value, 10);
            render();
        });
        self.querySelector(":scope > aside.prev").addEventListener("click", function () {
            if (current_page > 0) {
                current_page--;
                render();
            }
        });
        self.querySelector(":scope > aside.next").addEventListener("click", function () {
            if (!current_data_last) {
                current_page++;
                render();
            }
        });
        navigator.geolocation.getCurrentPosition(function (position) {
            current_latitude = position.coords.latitude;
            current_longitude = position.coords.longitude;
            render();
        });
    }

    function validate(data_piece) {
        var flag = true;
        flag = flag && data_piece.name.indexOf(filter_name) > -1;
        flag = flag && data_piece.star > filter_star;
        flag = flag && data_piece.items.indexOf(filter_item) > -1;
        if (!data_piece.distance) {
            data_piece.distance = Math.calculateDistance(current_latitude, current_longitude, data_piece.position.latitude, data_piece.position.longitude);
        }
        flag = flag && data_piece.distance < filter_distance;
        return flag;
    }

    function render() {

        var al = self.querySelectorAll(":scope > table > tbody > tr > td > a");
        for (var i = 0; i < al.length; i++) {
            al[i].innerHTML = "";
        }

        var pointer_data = 0;
        var pointer_tr = 0;

        while (pointer_tr < 10 && pointer_data + current_page * 10 < dummy_data.length) {
            var entity = dummy_data[pointer_data + current_page * 10];
            if (validate(entity)) {
                var tr = self.querySelector(":scope > table > tbody > tr:nth-child(" + (pointer_tr + 1) + ")");
                tr.querySelector(":scope > td:nth-child(1) > a").innerHTML = entity.name;
                tr.querySelector(":scope > td:nth-child(2) > a").innerHTML = entity.star;
                pointer_tr++;
            }
            pointer_data++;
        }

        current_data_last = pointer_data + current_page * 10 >= dummy_data.length;
        if (current_page === 0) {
            self.querySelector(":scope > aside.prev").classList.add("off");
        } else {
            self.querySelector(":scope > aside.prev").classList.remove("off");
        }
        if (current_data_last) {
            self.querySelector(":scope > aside.next").classList.add("off");
        } else {
            self.querySelector(":scope > aside.next").classList.remove("off");
        }
    }

    load();

}());