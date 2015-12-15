(function () {

    'use strict';

    var filter_star = 0,
        dummy_data = [
            {
                id: 1,
                name: "Jebb Bush",
                star: 0.9
            },
            {
                id: 2,
                name: "Janiffer Aniston",
                star: 1.2
            },
            {
                id: 3,
                name: "Lucy Chen",
                star: 3.9
            },
            {
                id: 4,
                name: "Lawrance Tao",
                star: 4.1
            },
            {
                id: 5,
                name: "John Brown",
                star: 1.2
            },
            {
                id: 6,
                name: "Maple Xu",
                star: 3.2
            },
            {
                id: 7,
                name: "Arianna Sefron",
                star: 4.2
            },
            {
                id: 8,
                name: "Lia Tong",
                star: 4.8
            },
            {
                id: 9,
                name: "Faye Wong",
                star: 1.7
            },
            {
                id: 10,
                name: "Mai Nagaoka",
                star: 2.2
            },
            {
                id: 11,
                name: "",
                star: 5
            },
            {
                id: 12,
                name: "",
                star: 3.9
            },
            {
                id: 13,
                name: "",
                star: 2.9
            },
            {
                id: 14,
                name: "",
                star: 4.2
            },
            {
                id: 15,
                name: "",
                star: 4.1
            }
        ];

    function filter(entity) {
        if (entity.star > filter_star) {
            return true;
        } else {
            return false;
        }
    }

    function render() {

        var trl = document.querySelectorAll("tr.entity"),
            i = 0,
            counter = 1,
            tr,
            td,
            tr2,
            tr3,
            footer;

        for (i = 0; i < trl.length; i += 1) {
            trl[i].parentNode.removeChild(trl[i]);
        }

        for (i = 0; i < dummy_data.length; i += 1) {
            if (filter(dummy_data[i])) {
                if (counter % 5 === 1) {
                    tr = document.createElement("tr");
                    tr.classList.add("entity");
                    tr.appendChild(document.createElement("td"));
                    document.querySelector("body > table > tbody").appendChild(tr);
                    tr2 = document.createElement("tr");
                    tr2.appendChild(document.createElement("td"));
                    tr2.appendChild(document.createElement("td"));
                    tr2.classList.add("entity");
                    tr3 = document.createElement("tr");
                    tr3.appendChild(document.createElement("td"));
                    tr3.appendChild(document.createElement("td"));
                    tr3.classList.add("entity");
                    document.querySelector("body > table > tbody").appendChild(tr2);
                    document.querySelector("body > table > tbody").appendChild(tr3);
                }
                td = document.createElement("td");
                td.setAttribute("colspan", 3);
                td.setAttribute("rowspan", 3);
                td.classList.add("doctor");
                td.style.backgroundImage = "url('../img/portrait/" + dummy_data[i].id + ".jpg')";
                footer = document.createElement("footer");
                footer.innerHTML = dummy_data[i].name;
                td.appendChild(footer);
                tr.appendChild(td);
                if (counter % 5 === 0) {
                    tr.appendChild(document.createElement("td"));
                }
                counter += 1;
            }
        }

        if ((counter - 1) % 5 !== 0) {
            tr.appendChild(document.createElement("td"));

            for (i = 0; i < 5 - (counter - 1) % 5; i += 1) {
                document.querySelector("body > table > tbody > tr.entity:nth-last-of-type(1)").appendChild(document.createElement("td"));
                document.querySelector("body > table > tbody > tr.entity:nth-last-of-type(1)").appendChild(document.createElement("td"));
                document.querySelector("body > table > tbody > tr.entity:nth-last-of-type(1)").appendChild(document.createElement("td"));
                document.querySelector("body > table > tbody > tr.entity:nth-last-of-type(2)").appendChild(document.createElement("td"));
                document.querySelector("body > table > tbody > tr.entity:nth-last-of-type(2)").appendChild(document.createElement("td"));
                document.querySelector("body > table > tbody > tr.entity:nth-last-of-type(2)").appendChild(document.createElement("td"));
                document.querySelector("body > table > tbody > tr.entity:nth-last-of-type(3)").appendChild(document.createElement("td"));
                document.querySelector("body > table > tbody > tr.entity:nth-last-of-type(3)").appendChild(document.createElement("td"));
                document.querySelector("body > table > tbody > tr.entity:nth-last-of-type(3)").appendChild(document.createElement("td"));
            }
        }

    }

    function init() {

        var i = 0;

        document.querySelector("#type > select").addEventListener("change", function () {
            this.parentNode.setAttribute("data-selected", this.value);
            render();
        });

        document.querySelector("#star > select").addEventListener("change", function () {
            this.parentNode.setAttribute("data-selected", this.value);
            filter_star = parseInt(this.value, 10);
            render();
        });

    }

    init();
    render();

}());