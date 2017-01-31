(function() {
    'use strict';
    let targetUrl = "";
    if (!document.head.querySelector(':scope > meta[name="lzsoft-api-url"]')) {
        throw new RangeError('You must specify API url in <meta name="lzsoft-api-url" /> tag to use front.end.infrastructure module.');
    } else {
        let metaTags = document.head.querySelector(':scope > meta[name="lzsoft-api-url"]').content.split(',');
        for (let m of metaTags) {
            let url = new window.URL(m);
            if (window.location.hostname === url.hostname) {
                targetUrl = m;
            }
        }
        if (!targetUrl) {
            targetUrl = metaTags[0];
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
        if (targetUrl) {
            return fetch(targetUrl + path, request);
        } else {
            throw new RangeError('You must specify API url in <meta name="lzsoft-api-url" /> tag to use front.end.infrastructure module.');
            return new Promise(function(resolve, reject) { resolve(); });
        }
    };
}());
