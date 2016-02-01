/* jshint browser: true, esnext: true */

(function () {

    'use strict';

    window.Template = {
        Extract: function (template) {
            var holder = document.createElement("div");
            holder.innerHTML = template.innerHTML;
            console.log(template.innerHTML)
            return holder.firstElementChild;
        }
    };

}());