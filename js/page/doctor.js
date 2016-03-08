/* jshint browser: true, esnext: true, devel: true, shadow: true */

(function () {

    'use strict';

    const self = document.querySelector("body > #doctor");
    const holder = document.createElement("div");

    const Api = window.Api;
    const Auth = window.Auth;
    const Cache = window.Cache;
    const Param = window.Param;

    self.addEventListener("hey", function () {
        reset();
        Api.Core("doctor", "single", {
            id: Param.Get("id")
        }, function (data) {
            render(data);
            Api.Core("comment", "filter", {
                doctor_id: Param.Get("id")
            }, function (data) {
                self.querySelector(":scope > footer > main > footer > span").innerHTML = data.length;
                for (var i = 0; i < data.length; i++) {
                    add_comment(data[i]);
                }
            });
        });
    });

    self.querySelector(":scope > footer > main > nav").addEventListener("click", function () {
        document.querySelector("body > #comment").classList.add("on");
    });

    function reset() {
        self.scrollTop = 0;
        self.querySelector(":scope > header > main > header > main").removeAttribute("style");
        self.querySelector(":scope > header > main > section.gender").innerHTML = "";
        self.querySelector(":scope > header > main > section.name").innerHTML = "";
        self.querySelector(":scope > header > main > section.code").innerHTML = "";
        self.querySelector(":scope > header > main > section.startyear").innerHTML = "";
        self.querySelectorAll(":scope > header > section.items > span").remove();
        self.querySelectorAll(":scope > header > section.insurances > span").remove();
        /*
        self.querySelectorAll(":scope > header > section.languages > span").remove();
        self.querySelector(":scope > header > main > section.telephone").innerHTML = "";
        self.querySelector(":scope > header > main > section.email").innerHTML = "";

        self.querySelectorAll(":scope > footer > main.insurance > main > div").remove();
        */
        self.querySelectorAll(":scope > main > main").remove();
        self.querySelectorAll(":scope > footer > main > main > section").remove();
        self.querySelectorAll(":scope > footer > main > header > footer > span").remove();
    }

    function add_comment(comment) {
        holder.innerHTML = self.querySelector(":scope > footer > main > main > template[data-star='" + comment.star + "']").innerHTML;
        var c = holder.firstElementChild;
        c.innerHTML = comment.content;
        self.querySelector(":scope > footer > main > main").appendChild(c);
    }

    function render(data) {

        if (data.portrait.id) {
            self.querySelector(":scope > header > main > header > main").style.backgroundImage = "url(" + Api.Storage(data.portrait.id, data.portrait.extension) + ")";
        }
        self.querySelector(":scope > header > main > section.name").innerHTML = "Dr. " + data.name.en;
        self.querySelector(":scope > header > main > section.gender").innerHTML = data.gender ? "男性" : "女性";
        self.querySelector(":scope > header > main > section.code").innerHTML = data.code;
        self.querySelector(":scope > header > main > section.startyear").innerHTML = (new Date().getFullYear() - data.startyear) + "年";

        for (var i = 0; i < data.items.length; i++) {
            var item = Cache.Hash("item", data.items[i]);
            if (item) {
                var span = document.createElement("span");
                span.innerHTML = item.name["zh-Hans"];
                self.querySelector(":scope > header > main > section.items").appendChild(span);
            }
        }

        for (var i = 0; i < data.insurances.length; i++) {
            var insurance = Cache.Hash("insurance", data.insurances[i]);
            if (insurance) {
                var span = document.createElement("span");
                span.innerHTML = insurance.provider + "/" + insurance.class + "/" + insurance.subclass;
                self.querySelector(":scope > header > main > section.insurances").appendChild(span);
            }
        }

        for (var i = 0; i < data.schedules.length; i++) {
            holder.innerHTML = self.querySelector(":scope > main > template").innerHTML;
            var schedule = holder.firstElementChild;
            var hospital = Cache.Hash("hospital", data.schedules[i].hospital_id);
            schedule.querySelector(":scope > header > span").innerHTML = (i + 1);
            schedule.querySelector(":scope > main > header").innerHTML = hospital.name.en;
            schedule.querySelector(":scope > main > div.address").innerHTML = hospital.address;
            schedule.querySelector(":scope > main > div.address2").innerHTML = hospital.address2;
            schedule.querySelector(":scope > main > div.city").innerHTML = hospital.city;
            schedule.querySelector(":scope > main > div.state-zipcode").innerHTML = hospital.state + " " + hospital.zipcode;
            schedule.querySelector(":scope > footer").innerHTML = hospital.iframe;
            for (var j = 0; j < data.schedules[i].days.length; j++) {
                schedule.querySelector(":scope > table > tbody > tr[data-ap='" + data.schedules[i].days[j].ap + "'] > td[data-day='" + data.schedules[i].days[j].day + "']").classList.add("on");
            }
            self.querySelector(":scope > main").insertBefore(schedule, self.querySelector(":scope > main > template"));
        }

        var star = ((data.star[1] + data.star[2] * 2 + data.star[3] * 3 + data.star[4] * 4 + data.star[5] * 5) / (data.star[1] + data.star[2] + data.star[3] + data.star[4] + data.star[5]) || 0).toFixed(1);
        self.querySelector(":scope > footer > main > header > header > span").innerHTML = star;
        for (var i = 0; i < Math.floor(star); i++) {
            self.querySelector(":scope > footer > main > header > footer").appendChild(document.createElement("span"));
        }
        if (star > Math.floor(star)) {
            var span = document.createElement("span");
            span.classList.add("empty");
            self.querySelector(":scope > footer > main > header > footer").insertBefore(span, self.querySelector(":scope > footer > main > header > footer > span:first-child"));
        }

    }

}());