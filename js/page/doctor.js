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
                for (var i = 0; i < data.length; i++) {
                    add_comment(data[i]);
                }
            });
        });

    });

    // Expand the comment panel
    self.querySelector(":scope > main.comment > footer > main.comment").addEventListener("click", function () {
        if (!this.classList.contains("on")) {
            this.classList.add("on");
            this.classList.add("shadow");
            this.classList.remove("click");
        }
    });

    // Ranking the star
    self.querySelectorAll(":scope > main.comment > footer > main.comment > header > span").addEventListener("mouseenter", function () {
        var count = 1;
        this.parentNode.querySelectorAll(":scope > span").exec(function () {
            this.classList.add("empty");
        });
        this.classList.remove("empty");
        var node = this;
        while (node.previousElementSibling) {
            node = node.previousElementSibling;
            node.classList.remove("empty");
            count++;
        }
        this.parentNode.querySelector(":scope > footer").innerHTML = "我给 " + count + " 颗星";
    });

    // Contract the comment panel
    self.querySelector(":scope > main.comment > footer > main.comment > div").addEventListener("click", function (e) {
        this.parentNode.classList.remove("on");
        this.parentNode.classList.remove("shadow");
        this.parentNode.classList.add("click");
        e.stopPropagation();
    });

    // Add and Send the comment
    self.querySelector(":scope > main.comment > footer > main.comment > img").addEventListener("click", function () {
        var data = {
            content: self.querySelector(":scope > main.comment > footer > main.comment > main > input").value,
            star: self.querySelectorAll(":scope > main.comment > footer > main.comment > header > span:not(.empty)").length,
            user_id: Auth.Current.User().id,
            doctor_id: Param.Get("id")
        };
        Api.Core("comment", "create", data, function (comment) {
            add_comment(data);
        });
    });

    function reset() {
        self.querySelector(":scope > main.info > main.portrait").style.backgroundImage = "";
        self.querySelector(":scope > main.info > main.name").innerHTML = "";
        self.querySelector(":scope > main.info > main.code").innerHTML = "";
        self.querySelector(":scope > main.info > main.startyear").innerHTML = "";
        self.querySelectorAll(":scope > main.item > main > div").remove();
        self.querySelectorAll(":scope > main.insurance > main > div").remove();
        self.querySelectorAll(":scope > main.schedule").remove();
        self.querySelectorAll(":scope > main.comment > header > footer > span").remove();
        self.querySelectorAll(":scope > main.comment > main > :not(template)").remove();
    }

    function add_comment(comment) {
        holder.innerHTML = self.querySelector(":scope > main.comment > main > template").innerHTML;
        var c = holder.firstElementChild;
        c.innerHTML = comment.content;
        self.querySelector(":scope > main.comment > main").insertBefore(c, self.querySelector(":scope > main.comment > main > :first-child"));
    }

    function render(data) {

        if (data.portrait) {
            self.querySelector(":scope > main.info > main.portrait").style.backgroundImage = "url(" + Api.Storage(data.portrait.id, data.portrait.extension) + ")";
        }

        self.querySelector(":scope > main.info > main.name").innerHTML = data.name.en;
        self.querySelector(":scope > main.info > main.code").innerHTML = data.code;
        self.querySelector(":scope > main.info > main.startyear").innerHTML = (new Date().getFullYear() - data.startyear) + "年";

        for (var i = 0; i < data.items.length; i++) {
            var item = Cache.Hash("item", data.items[i]);
            if (item) {
                var div = document.createElement("div");
                div.innerHTML = item.name["zh-Hans"];
                self.querySelector(":scope > main.item > main").appendChild(div);
            }
        }

        for (var i = 0; i < data.insurances.length; i++) {
            var insurance = Cache.Hash("insurance", data.insurances[i]);
            if (insurance) {
                var div = document.createElement("div");
                div.innerHTML = insurance.provider + " " + insurance.class + " " + insurance.subclass;
                self.querySelector(":scope > main.insurance > main").appendChild(div);
            }
        }

        for (var i = 0; i < data.schedules.length; i++) {
            holder.innerHTML = self.querySelector(":scope > template").innerHTML;
            var schedule = holder.firstElementChild;
            var hospital = Cache.Hash("hospital", data.schedules[i].hospital_id);
            schedule.querySelector(":scope > main").innerHTML = hospital.name.en;
            /*
            schedule.querySelector(":scope > main > div.address").innerHTML = hospital.address;
            schedule.querySelector(":scope > main > div.city").innerHTML = hospital.city;
            schedule.querySelector(":scope > main > div.statezipcode").innerHTML = hospital.state + " " + hospital.zipcode;
            */
            schedule.querySelector(":scope > footer").innerHTML = hospital.iframe;
            for (var j = 0; j < data.schedules[i].days.length; j++) {
                schedule.querySelector(":scope > header > table > tbody > tr[data-ap='" + data.schedules[i].days[j].ap + "'] > td[data-day='" + data.schedules[i].days[j].day + "']").classList.add("on");
            }
            self.insertBefore(schedule, self.querySelector(":scope > template"));
        }

        var star = ((data.star[1] + data.star[2] * 2 + data.star[3] * 3 + data.star[4] * 4 + data.star[5] * 5) / (data.star[1] + data.star[2] + data.star[3] + data.star[4] + data.star[5]) || 0).toFixed(1);
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