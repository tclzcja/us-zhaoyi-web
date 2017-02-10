window.location.staticAssign = function(val) {
    window.history.pushState(null, null, val);
    window.dispatchEvent(new Event("popstate"));
};
window.location.pathLastSection = function() {
    let path = window.location.path;
    return window.location.pathname.split('/').pop();
};
window.location.GetParam = function(name) {
    let params = {};
    let ps = window.location.search.substr(1).split("&");
    for (let i = 0; i < ps.length; i++) {
        let a = ps[i].split("=");
        params[a[0]] = a[1];
    }
    return params[name];
};
