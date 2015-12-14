(function () {

    'use strict';

    function init() {

        document.querySelector("#type > select").addEventListener("change", function () {
            this.parentNode.setAttribute("data-selected", this.value);
        });

    }

    init();

}());