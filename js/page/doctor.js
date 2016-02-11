/* jshint browser: true, esnext: true, devel: true, shadow: true */

(function () {

    'use strict';

    const self = document.querySelector("body > #doctor");
    const holder = document.createElement("div");

    const Api = window.Api;
    const Cache = window.Cache;
    const Param = window.Param;

    self.addEventListener("hey", function () {
        Api.Core("doctor", "single", {
            id: Param.Get("id")
        }, render);
    });

    self.querySelector(":scope > main.schedule > aside:nth-of-type(1)").addEventListener("click", function () {
        var on = self.querySelector(":scope > main.schedule > main > section.on");
        if (on.previousElementSibling && on.previousElementSibling.tagName === "SECTION") {
            on.classList.remove("on");
            on.previousElementSibling.classList.add("on");
            var num = self.querySelector(":scope > main.schedule > header > span:nth-of-type(1)");
            num.innerHTML = parseInt(num.innerHTML, 10) - 1;
        }
    });

    self.querySelector(":scope > main.schedule > aside:nth-of-type(2)").addEventListener("click", function () {
        var on = self.querySelector(":scope > main.schedule > main > section.on");
        if (on.nextElementSibling && on.nextElementSibling.tagName === "SECTION") {
            on.classList.remove("on");
            on.nextElementSibling.classList.add("on");
            var num = self.querySelector(":scope > main.schedule > header > span:nth-of-type(1)");
            num.innerHTML = parseInt(num.innerHTML, 10) + 1;
        }
    });

    self.querySelector(":scope > main.comment > footer > main.comment").addEventListener("click", function () {
        if (!this.classList.contains("on")) {
            this.classList.add("on");
            this.classList.add("shadow");
            this.classList.remove("click");
        }
    });

    self.querySelectorAll(":scope > main.comment > footer > main.comment > header > span").addEventListener("mouseenter", function () {
        this.parentNode.querySelectorAll(":scope > span").exec(function () {
            this.classList.add("empty");
        });
        this.classList.remove("empty");
        var node = this;
        while (node.previousElementSibling) {
            node = node.previousElementSibling;
            node.classList.remove("empty");
        }
    });

    self.querySelector(":scope > main.comment > footer > main.comment > div").addEventListener("click", function (e) {
        this.parentNode.classList.remove("on");
        this.parentNode.classList.remove("shadow");
        this.parentNode.classList.add("click");
        e.stopPropagation();
    });

    function render(data) {
        if (data.portrait) {
            self.querySelector(":scope > main.info > main.portrait").style.backgroundImage = "url(" + Api.Storage(data.portrait.id, data.portrait.extension) + ")";
        }
        self.querySelector(":scope > main.info > main.name").innerHTML = data.name;
        for (var i = 0; i < data.items.length; i++) {
            var item = Cache.Hash("item", data.items[i]);
            var div = document.createElement("div");
            div.innerHTML = item.name.chinese;
            self.querySelector(":scope > main.info > main.items").appendChild(div);
        }
        for (var i = 0; i < data.insurances.length; i++) {
            var insurance = Cache.Hash("insurance", data.insurances[i]);
            var div = document.createElement("div");
            div.innerHTML = insurance.provider + " " + insurance.class + " " + insurance.subclass;
            self.querySelector(":scope > main.info > main.insurances").appendChild(div);
        }
        self.querySelector(":scope > main.schedule > header > span.total").innerHTML = data.schedules.length;
        for (var i = 0; i < data.schedules.length; i++) {
            holder.innerHTML = self.querySelector(":scope > main.schedule > main > template").innerHTML;
            var schedule = holder.firstElementChild;
            var hospital = Cache.Hash("hospital", data.schedules[i].hospital_id);
            schedule.querySelector(":scope > main").innerHTML = hospital.name;
            /*
            schedule.querySelector(":scope > main > div.address").innerHTML = hospital.address;
            schedule.querySelector(":scope > main > div.city").innerHTML = hospital.city;
            schedule.querySelector(":scope > main > div.statezipcode").innerHTML = hospital.state + " " + hospital.zipcode;
            */
            schedule.querySelector(":scope > footer").innerHTML = hospital.iframe;
            for (var j = 0; j < data.schedules[i].days.length; j++) {
                schedule.querySelector(":scope > header > table > tbody > tr[data-ap='" + data.schedules[i].days[j].ap + "'] > td[data-day='" + data.schedules[i].days[j].day + "']").classList.add("on");
            }
            if (i === 0) {
                schedule.classList.add("on");
                self.querySelector(":scope > main.schedule > header > span.now").innerHTML = 1;
            }
            self.querySelector(":scope > main.schedule > main").appendChild(schedule);
        }
        var star = ((data.star.one + data.star.two * 2 + data.star.three * 3 + data.star.four * 4 + data.star.five * 5) / (data.star.one + data.star.two + data.star.three + data.star.four + data.star.five)).toFixed(1);
        self.querySelector(":scope > main.comment > header > header > span:first-child").innerHTML = star;
        for (var i = 0; i < Math.floor(star); i++) {
            self.querySelector(":scope > main.comment > header > footer").appendChild(document.createElement("span"));
        }
        if (star > Math.floor(star)) {
            var span = document.createElement("span");
            span.classList.add("empty");
            self.querySelector(":scope > main.comment > header > footer").insertBefore(span, self.querySelector(":scope > main.comment > header > footer > span:first-child"));
        }
    }

}());