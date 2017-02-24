'use strict';
window.Lzsoft.Api.targetUrl = "";
if (!document.head.querySelector(':scope > meta[name="lzsoft-api-url"]')) {
    throw new RangeError('You must specify API url in <meta name="lzsoft-api-url" /> tag to use front-end-infrastructure module.');
} else {
    let metaTags = document.head.querySelector(':scope > meta[name="lzsoft-api-url"]').content.split(',');
    for (let m of metaTags) {
        let url = new window.URL(m);
        if (window.location.hostname === url.hostname) {
            window.Lzsoft.Api.targetUrl = m;
        }
    }
    if (!window.Lzsoft.Api.targetUrl) {
        window.Lzsoft.Api.targetUrl = metaTags[0];
    }
}
window.Lzsoft.Api.Core = function(path, requestData, requestContentType) {
    const Auth = window.Lzsoft.Auth;
    let headers = new Headers();
    headers.append('Content-Type', requestContentType);
    headers.append("Authorization", Auth.Get());
    let request = {
        method: "POST",
        mode: "cors",
        body: requestData,
        headers: headers
    };
    if (window.Lzsoft.Api.targetUrl) {
        return fetch(window.Lzsoft.Api.targetUrl + path, request);
    } else {
        throw new RangeError('You must specify API url in <meta name="lzsoft-api-url" /> tag to use front.end.infrastructure module.');
        return new Promise(function(resolve, reject) { resolve(); });
    }
};
window.Lzsoft.Api.CoreClassic = function(path, requestData, requestContentType, callback) {
    const Auth = window.Lzsoft.Auth;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", window.Lzsoft.Api.targetUrl + path);
    xhr.setRequestHeader("Content-Type", requestContentType);
    xhr.setRequestHeader("Authorization", Auth.Get());
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr.response);
        }
    };
    xhr.send(requestData);
};
