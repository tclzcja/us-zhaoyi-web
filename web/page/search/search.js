/*jslint browser: true, esnext: true */

(function () {

    'use strict';

    const key = "page-search";

    var self;
    var dummy_data = [
        {
            id: 1,
            type: "doctor",
            name: "Jebb Bush",
            star: 0.9,
            items: ["", "chiropractic", "dentist", "ophthalmology"],
            insurances: ["obamacare", "anthem"],
            position: {
                latitude: 41,
                longitude: -73
            }
        }, {
            id: 2,
            type: "doctor",
            name: "Janiffer Aniston",
            star: 1.2,
            items: ["", "ophthalmology"],
            insurances: ["obamacare", "anthem"],
            position: {
                latitude: 39,
                longitude: -72
            }
        }, {
            id: 3,
            type: "doctor",
            name: "Lucy Chen",
            star: 3.9,
            items: ["", "ophthalmology"],
            insurances: ["obamacare", "anthem"],
            position: {
                latitude: 34,
                longitude: -118
            }
        }, {
            id: 4,
            type: "doctor",
            name: "Lawrance Tao",
            star: 4.1,
            items: ["", "ophthalmology"],
            insurances: ["obamacare", "anthem"],
            position: {
                latitude: 33,
                longitude: -117
            }
        }, {
            id: 5,
            type: "doctor",
            name: "John Brown",
            star: 1.2,
            items: ["", "chiropractic", "ophthalmology"],
            insurances: ["obamacare", "anthem"],
            position: {
                latitude: 33.8,
                longitude: -118.17
            }
        }, {
            id: 6,
            type: "doctor",
            name: "Maple Xu",
            star: 3.2,
            items: ["", "chiropractic"],
            insurances: ["obamacare", "anthem"],
            position: {
                latitude: 33.80,
                longitude: -118.27
            }
        }, {
            id: 7,
            type: "doctor",
            name: "Arianna Sefron",
            star: 4.2,
            items: ["", "chiropractic", "dentist"],
            insurances: ["obamacare", "anthem"],
            position: {
                latitude: 33.787,
                longitude: -118.02
            }
        }, {
            id: 8,
            type: "doctor",
            name: "Lia Tong",
            star: 4.8,
            items: ["", "chiropractic", "dentist"],
            insurances: ["obamacare", "anthem"],
            position: {
                latitude: 33.998,
                longitude: -118.288
            }
        }, {
            id: 9,
            type: "doctor",
            name: "Faye Wong",
            star: 1.7,
            items: ["", "ophthalmology"],
            insurances: ["obamacare", "anthem"],
            position: {
                latitude: 33.656,
                longitude: -117.9324
            }
        }, {
            id: 10,
            type: "doctor",
            name: "Mai Nagaoka",
            star: 2.2,
            items: ["", "chiropractic"],
            insurances: ["obamacare", "anthem"],
            position: {
                latitude: 37.856,
                longitude: -122.275
            }
        }, {
            id: 11,
            type: "doctor",
            name: "Avery Scholy",
            star: 5,
            items: ["", "chiropractic", "ophthalmology"],
            insurances: ["obamacare", "anthem"],
            position: {
                latitude: 39.936,
                longitude: -75.1726
            }
        }, {
            id: 12,
            type: "doctor",
            name: "Randy Dolton",
            star: 3.9,
            items: ["", "chiropractic", "ophthalmology"],
            insurances: ["obamacare", "anthem"],
            position: {
                latitude: 39.681,
                longitude: -75.7542
            }
        }, {
            id: 13,
            type: "doctor",
            name: "Sam Bruces",
            star: 2.9,
            items: ["", "dentist"],
            insurances: ["obamacare", "anthem"],
            position: {
                latitude: 40.677,
                longitude: -73.965
            }
        }, {
            id: 14,
            type: "doctor",
            name: "Michael Kain",
            star: 4.2,
            items: ["", "dentist"],
            insurances: ["obamacare", "anthem"],
            position: {
                latitude: 40.768,
                longitude: -73.988
            }
        }, {
            id: 15,
            type: "doctor",
            name: "Shubert van Gaal",
            star: 4.1,
            items: ["", "dentist"],
            insurances: ["obamacare", "anthem"],
            position: {
                latitude: 40.722,
                longitude: -73.980
            }
        }, {
            id: 16,
            type: "doctor",
            name: "John Safrosa",
            star: 4.2,
            items: ["", "chiropractic", "dentist", "ophthalmology"],
            insurances: ["obamacare", "anthem"],
            position: {
                latitude: 40.761,
                longitude: -73.914
            }
        }, {
            id: 17,
            type: "doctor",
            name: "Nancy Olups",
            star: 4.7,
            items: ["", "chiropractic", "dentist", "ophthalmology"],
            insurances: ["obamacare", "anthem"],
            position: {
                latitude: 40.697,
                longitude: -73.916
            }
        }, {
            id: 18,
            type: "doctor",
            name: "Burne West",
            star: 3.2,
            items: ["", "chiropractic", "ophthalmology"],
            insurances: ["obamacare", "anthem"],
            position: {
                latitude: 40.732,
                longitude: -73.636
            }
        }, {
            id: 19,
            type: "doctor",
            name: "Duplo D'Angelo",
            star: 4.7,
            items: ["", "ophthalmology"],
            insurances: ["obamacare"],
            position: {
                latitude: 41.732,
                longitude: -72.636
            }
        }, {
            id: 20,
            type: "doctor",
            name: "Daniel Siphers",
            star: 4.1,
            items: ["", "ophthalmology"],
            insurances: ["obamacare"],
            position: {
                latitude: 41.112,
                longitude: -71.009
            }
        }, {
            id: 21,
            type: "doctor",
            name: "White Dude",
            star: 3.2,
            items: ["", "ophthalmology"],
            insurances: ["obamacare"],
            position: {
                latitude: 45.112,
                longitude: -71.009
            }
        }, {
            id: 22,
            type: "doctor",
            name: "Ricky Rubio",
            star: 4.9,
            items: ["", "dentist"],
            insurances: ["obamacare", "anthem"],
            position: {
                latitude: 44.112,
                longitude: -71.999
            }
        }, {
            id: 23,
            type: "doctor",
            name: "Nancy Welkins",
            star: 4.1,
            items: ["", "dentist"],
            insurances: ["obamacare", "anthem"],
            position: {
                latitude: 44.791,
                longitude: -71.554
            }
        }
        ];
    var current_page = 0;
    var current_latitude = 0;
    var current_longitude = 0;
    var filter_keyword = "";
    var filter_star = 0;
    var filter_item = "";
    var filter_distance = 9999;

    function init() {
        var proto = Object.create(HTMLElement.prototype);
        proto.createdCallback = function () {
            self = this;
            active();
        };
        document.registerElement(key, {
            prototype: proto
        });
    }

    function active() {
        self.innerHTML = document.querySelector("link[data-component='" + key + "']").import.querySelector("template").innerHTML;
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
            if (this.value !== "0") {
                this.parentNode.classList.add("on");
            } else {
                this.parentNode.classList.remove("on");
            }
            filter_distance = parseInt(this.value, 10);
            render();
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
        flag = flag && Math.calculateDistance(current_latitude, current_longitude, data_piece.position.latitude, data_piece.position.longitude) < filter_distance;
        return flag;
    }

    function render() {
        var sl = self.querySelectorAll(":scope > main > table > tbody > tr > td:not(.button)");
        for (var i = 0; i < sl.length; i++) {
            sl[i].style.backgroundImage = "";
            sl[i].classList.remove("on");
        }
        var pointer_data = 0;
        var pointer_sl = 0;
        while (pointer_data + current_page * sl.length < dummy_data.length && pointer_sl < sl.length) {
            if (validate(dummy_data[pointer_data])) {
                sl[pointer_sl].style.backgroundImage = "url('page/search/portrait/doctor/" + dummy_data[pointer_data].id + ".jpg')";
                sl[pointer_sl].classList.add("on");
                pointer_sl++;
            }
            pointer_data++;
        }
    }

    init();

}());