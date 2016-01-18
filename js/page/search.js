/* jshint browser: true, esnext: true */

(function () {

    'use strict';

    const self = document.querySelector("body > #search");

    var dummy_data;
    var current_page = 0;
    var current_latitude = 0;
    var current_longitude = 0;
    var current_data_last = false;
    var filter_keyword = "";
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
        self.querySelector(":scope > aside > div.keyword > input").addEventListener("keyup", function () {
            if (this.value !== "") {
                this.parentNode.classList.add("on");
            } else {
                this.parentNode.classList.remove("on");
            }
            filter_keyword = this.value;
            render();
        });
        self.querySelector(":scope > aside > div.star > select").addEventListener("change", function () {
            if (this.value !== "0") {
                this.parentNode.classList.add("on");
            } else {
                this.parentNode.classList.remove("on");
            }
            filter_star = parseInt(this.value, 10);
            render();
        });
        self.querySelector(":scope > aside > div.item > select").addEventListener("change", function () {
            if (this.value !== "") {
                this.parentNode.classList.add("on");
            } else {
                this.parentNode.classList.remove("on");
            }
            filter_item = this.value;
            render();
        });
        self.querySelector(":scope > aside > div.distance > select").addEventListener("change", function () {
            if (this.value !== "9999") {
                this.parentNode.classList.add("on");
            } else {
                this.parentNode.classList.remove("on");
            }
            filter_distance = parseInt(this.value, 10);
            render();
        });
        self.querySelector(":scope > main > table > tbody > tr > td.button.prev").addEventListener("click", function () {
            if (current_page > 0) {
                current_page--;
                render();
            }
        });
        self.querySelector(":scope > main > table > tbody > tr > td.button.next").addEventListener("click", function () {
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
        flag = flag && data_piece.name.indexOf(filter_keyword) > -1;
        flag = flag && data_piece.star > filter_star;
        flag = flag && data_piece.items.indexOf(filter_item) > -1;
        if (!data_piece.distance) {
            data_piece.distance = Math.calculateDistance(current_latitude, current_longitude, data_piece.position.latitude, data_piece.position.longitude);
        }
        flag = flag && data_piece.distance < filter_distance;
        return flag;
    }

    function render() {
        var td_innerHTML = self.querySelector(":scope > main > template").innerHTML;
        var sl = self.querySelectorAll(":scope > main > table > tbody > tr > td:not(.button)");

        for (var i = 0; i < sl.length; i++) {
            sl[i].innerHTML = "";
            sl[i].style.backgroundImage = "";
            sl[i].classList.remove("on");
        }
        var pointer_data = 0;
        var pointer_sl = 0;
        while (pointer_data + current_page * sl.length < dummy_data.length && pointer_sl < sl.length) {
            var entity = dummy_data[pointer_data + current_page * sl.length];
            if (validate(entity)) {
                sl[pointer_sl].style.backgroundImage = "url('img/portrait/doctor/" + entity.id + ".jpg')";
                sl[pointer_sl].classList.add("on");
                sl[pointer_sl].innerHTML = td_innerHTML;
                sl[pointer_sl].querySelector(":scope > a > header").innerHTML = entity.name;
                for (var j = 0; j < Math.floor(entity.star); j++) {
                    sl[pointer_sl].querySelector(":scope > a > aside").appendChild(document.createElement("span"));
                }
                if (entity.star > Math.floor(entity.star) && entity.star < Math.floor(entity.star) + 1) {
                    sl[pointer_sl].querySelector(":scope > a > aside").appendChild(document.createElement("span"));
                    sl[pointer_sl].querySelector(":scope > a > aside > span:last-child").classList.add("empty");
                }
                sl[pointer_sl].querySelector(":scope > a > aside").setAttribute("data-star", entity.star);
                sl[pointer_sl].querySelector(":scope > a > footer").innerHTML = entity.distance.toFixed(0) + "公里";
                for (var k = 0; k < entity.items.length; k++) {
                    if (entity.items[k] !== "") {
                        var item = document.createElement("div");
                        item.innerHTML = dictionary_item[entity.items[k]];
                        sl[pointer_sl].querySelector(":scope > a > main").appendChild(item);
                    }
                }
                pointer_sl++;
            }
            pointer_data++;
        }
        current_data_last = pointer_data + current_page * sl.length >= dummy_data.length;
        if (current_page === 0) {
            self.querySelector(":scope > main > table > tbody > tr > td.prev").classList.add("off");
        } else {
            self.querySelector(":scope > main > table > tbody > tr > td.prev").classList.remove("off");
        }
        if (current_data_last) {
            self.querySelector(":scope > main > table > tbody > tr > td.next").classList.add("off");
        } else {
            self.querySelector(":scope > main > table > tbody > tr > td.next").classList.remove("off");
        }
    }

    load();

}());