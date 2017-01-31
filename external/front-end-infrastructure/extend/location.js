window.location.staticAssign = function (val) {
    window.history.pushState(null, null, val);
    window.dispatchEvent(new Event("popstate"));
};
window.location.pathLastSection = function () {
    let path = window.location.path;
    return window.location.pathname.split('/').pop();
};
