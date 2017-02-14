window.customElements.define('site-footer', class extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = document.querySelector('link[href*="site-footer.html"]').import.querySelector("template").innerHTML;
    }
});
