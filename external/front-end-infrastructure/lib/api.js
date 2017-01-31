'use strict';
window.Lzsoft.Api.Core = function(path, requestData, requestContentType) {
    let metaTag = document.head.querySelector(':scope > meta[name="lzsoft-api-url"]');
    if (!metaTag) {
        throw new RangeError('You must specify API url in <meta name="lzsoft-api-url" /> tag to use front.end.infrastructure module.');
        return false;
    }
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
    return fetch(metaTag.content + path, request);
};
