window.customElements.define('site-header', class extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = document.querySelector('link[href*="site-header.html"]').import.querySelector("template").innerHTML;
        window.Lzsoft.Auth.FromElement(document.querySelector("site-header > footer > input"), "value");
    }
});