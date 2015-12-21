(function () {

    'use strict';

    var current_latitude = 0,
        current_longitude = 0,
        filter_star = 0,
        filter_type = "any",
        filter_name = "",
        filter_item = "any",
        filter_distance = 99999,
        filter_insurance = "any",
        dummy_data = [
            {
                id: 1,
                type: "doctor",
                name: "Jebb Bush",
                star: 0.9,
                items: ["chiropractic", "dentist", "orthodontics"],
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
                items: ["orthodontics"],
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
                items: ["orthodontics"],
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
                items: ["orthodontics"],
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
                items: ["chiropractic", "orthodontics"],
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
                items: ["chiropractic"],
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
                items: ["chiropractic", "dentist"],
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
                items: ["chiropractic", "dentist"],
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
                items: ["orthodontics"],
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
                items: ["chiropractic"],
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
                items: ["chiropractic", "orthodontics"],
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
                items: ["chiropractic", "orthodontics"],
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
                items: ["dentist"],
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
                items: ["dentist"],
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
                items: ["dentist"],
                insurances: ["obamacare", "anthem"],
                position: {
                    latitude: 40.722,
                    longitude: -73.980
                }
            }, {
                id: 16,
                type: "hospital",
                name: "Children’s Hospital",
                star: 4.2,
                items: ["chiropractic", "dentist", "orthodontics"],
                insurances: ["obamacare", "anthem"],
                position: {
                    latitude: 40.761,
                    longitude: -73.914
                }
            }, {
                id: 17,
                type: "hospital",
                name: "Shriners Hospitals for Children",
                star: 4.7,
                items: ["chiropractic", "dentist", "orthodontics"],
                insurances: ["obamacare", "anthem"],
                position: {
                    latitude: 40.697,
                    longitude: -73.916
                }
            }, {
                id: 18,
                type: "hospital",
                name: "Good Samaritan Hospital",
                star: 3.2,
                items: ["chiropractic", "orthodontics"],
                insurances: ["obamacare", "anthem"],
                position: {
                    latitude: 40.732,
                    longitude: -73.636
                }
            }
        ];

    function filter(entity) {
        var flag = true;
        flag = flag && entity.name.indexOf(filter_name) > -1;
        flag = flag && entity.star > filter_star;
        flag = flag && (filter_type === "any" || entity.type === filter_type);
        flag = flag && (filter_item === "any" || entity.items.indexOf(filter_item) > -1);
        flag = flag && (filter_insurance === "any" || entity.insurances.indexOf(filter_insurance) > -1);
        flag = flag && Math.calculateDistance(current_latitude, current_longitude, entity.position.latitude, entity.position.longitude) <= filter_distance;
        return flag;
    }

    function render() {

        var i = 0,
            j = 0,
            tr,
            td,
            span,
            div,
            tbody = document.querySelector("body > table > tbody"),
            star = 0,
            mile,
            a;

        tbody.innerHTML = "";

        for (i = 0; i < dummy_data.length; i += 1) {
            if (filter(dummy_data[i])) {
                tr = document.createElement("tr");
                tr.classList.add("entity");
                tr.classList.add(dummy_data[i].type);
                // Type
                td = document.createElement("td");
                td.classList.add("icon");
                a = document.createElement("a");
                a.href = dummy_data[i].type + ".html";
                td.appendChild(a);
                tr.appendChild(td);
                // Portrait
                td = document.createElement("td");
                td.style.backgroundImage = "url('../img/portrait/" + dummy_data[i].type + "." + dummy_data[i].id + ".jpg')";
                td.classList.add("bg");
                a = document.createElement("a");
                a.href = dummy_data[i].type + ".html";
                td.appendChild(a);
                tr.appendChild(td);
                // Name
                td = document.createElement("td");
                td.setAttribute("colspan", 4);
                a = document.createElement("a");
                a.href = dummy_data[i].type + ".html";
                a.innerHTML = dummy_data[i].name;
                td.appendChild(a);
                tr.appendChild(td);
                // Star
                td = document.createElement("td");
                td.setAttribute("colspan", 2);
                span = document.createElement("span");
                span.innerHTML = dummy_data[i].star.toFixed(1);
                td.appendChild(span);
                star = dummy_data[i].star;
                while (star > 0) {
                    if (star >= 1) {
                        star -= 1;
                        span = document.createElement("span");
                        span.classList.add("full");
                    } else {
                        star -= star;
                        span = document.createElement("span");
                        span.classList.add("half");
                    }
                    td.appendChild(span);
                }
                tr.appendChild(td);
                // Item
                td = document.createElement("td");
                td.setAttribute("colspan", 3);
                for (j = 0; j < dummy_data[i].items.length; j += 1) {
                    span = document.createElement("span");
                    span.classList.add(dummy_data[i].items[j]);
                    if (filter_item === dummy_data[i].items[j]) {
                        span.classList.add("highlight");
                    }
                    span.innerHTML = dummy_data[i].items[j];
                    td.appendChild(span);
                }
                tr.appendChild(td);
                // Insurance
                td = document.createElement("td");
                td.setAttribute("colspan", 3);
                for (j = 0; j < dummy_data[i].insurances.length; j += 1) {
                    span = document.createElement("span");
                    span.classList.add(dummy_data[i].insurances[j]);
                    if (filter_insurance === dummy_data[i].insurances[j]) {
                        span.classList.add("highlight");
                    }
                    span.innerHTML = dummy_data[i].insurances[j];
                    td.appendChild(span);
                }
                tr.appendChild(td);
                // Distance
                td = document.createElement("td");
                td.setAttribute("colspan", 3);
                div = document.createElement("div");
                span = document.createElement("span");
                mile = Math.calculateDistance(current_latitude, current_longitude, dummy_data[i].position.latitude, dummy_data[i].position.longitude).toFixed(0);
                div.style.width = (mile > 500 ? 500 : mile) / 500 * 100 + "%";
                span.innerHTML = mile;
                if ((mile > 500 ? 500 : mile) / 500 * 100 < 50) {
                    span.classList.add("otherside");
                }
                div.appendChild(span);
                td.appendChild(div);
                tr.appendChild(td);
                // Done
                tbody.appendChild(tr);
            }
        }

    }

    function init() {

        var i = 0;

        document.querySelector("#name > input").addEventListener("keyup", function () {
            if (this.value === "") {
                this.parentNode.classList.remove("highlight");
            } else {
                this.parentNode.classList.add("highlight");
            }
            filter_name = this.value;
            render();
        });

        document.querySelector("#type > select").addEventListener("change", function () {
            this.parentNode.classList.remove("any");
            this.parentNode.classList.remove("doctor");
            this.parentNode.classList.remove("hospital");
            this.parentNode.classList.add(this.value);
            filter_type = this.value;
            render();
        });

        document.querySelector("#star > select").addEventListener("change", function () {
            if (this.value === "0") {
                this.parentNode.classList.remove("highlight");
            } else {
                this.parentNode.classList.add("highlight");
            }
            filter_star = parseInt(this.value, 10);
            render();
        });

        document.querySelector("#distance > select").addEventListener("change", function () {
            if (this.value === "99999") {
                this.parentNode.classList.remove("highlight");
            } else {
                this.parentNode.classList.add("highlight");
            }
            filter_distance = parseInt(this.value, 10);
            render();
        });

        document.querySelector("#item > select").addEventListener("change", function () {
            if (this.value === "any") {
                this.parentNode.classList.remove("highlight");
            } else {
                this.parentNode.classList.add("highlight");
            }
            filter_item = this.value;
            render();
        });

        document.querySelector("#insurance > select").addEventListener("change", function () {
            if (this.value === "any") {
                this.parentNode.classList.remove("highlight");
            } else {
                this.parentNode.classList.add("highlight");
            }
            filter_insurance = this.value;
            render();
        });

        navigator.geolocation.getCurrentPosition(function (position) {
            current_latitude = position.coords.latitude;
            current_longitude = position.coords.longitude;
            render();
        });

    }

    init();

}());