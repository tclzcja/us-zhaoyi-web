(function () {

    'use strict';

    var flag_my_star = false,
        flag_my_comment = false,
        my_submit = document.querySelector("#mysubmit");

    function submit() {
        var td = document.createElement("td"),
            a = 0;
        td.setAttribute("colspan", 9);
        td.setAttribute("rowspan", 3);
        td.innerHTML = "您的评论已提交";
        td.classList.add("submitted");
        document.querySelector("#mystar").parentNode.insertBefore(td, document.querySelector("#mystar"));
        document.querySelector("#mystar").remove();
        document.querySelector("#mycomment").remove();
        document.querySelector("#mysubmit").remove();
        a = td.offsetLeft;
        td.classList.add("highlight");
    }

    function init() {
        document.querySelector("#mystar > select").addEventListener("change", function () {
            if (this.value !== "0") {
                this.parentNode.classList.add("highlight");
                flag_my_star = true;
            } else {
                this.parentNode.classList.remove("highlight");
                flag_my_star = false;
            }
            if (flag_my_comment && flag_my_star) {
                my_submit.classList.add("highlight");
                my_submit.innerHTML = "提交";
            } else {
                my_submit.classList.remove("highlight");
                my_submit.innerHTML = "请完成您的评价";
            }
        });
        document.querySelector("#mycomment > textarea").addEventListener("keyup", function () {
            if (this.value !== "") {
                flag_my_comment = true;
                this.parentNode.classList.add("highlight");
            } else {
                flag_my_comment = false;
                this.parentNode.classList.remove("highlight");
            }
            if (flag_my_comment && flag_my_star) {
                my_submit.classList.add("highlight");
                my_submit.innerHTML = "提交";
            } else {
                my_submit.classList.remove("highlight");
                my_submit.innerHTML = "请完成您的评价";
            }
        });
        document.querySelector("#mysubmit").addEventListener("click", function () {
            if (this.classList.contains("highlight")) {
                submit();
            }
        });
    }

    init();

}());