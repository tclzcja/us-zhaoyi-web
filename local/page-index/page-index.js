window.customElements.define('page-index', class extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = document.querySelector('link[href*="page-index.html"]').import.querySelector("template").innerHTML;
        window.customElements.whenDefined('single-page-application-data').then(() => {
            this.load();
        });
    }
    load() {
        let self = this;
        self.querySelector("single-page-application-data").dispatchEvent(new Event("IN"));
    }
});
