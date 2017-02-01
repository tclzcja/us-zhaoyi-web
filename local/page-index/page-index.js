window.customElements.define('page-index', class extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = document.querySelector('link[href*="page-index.html"]').import.querySelector("template").innerHTML;
        this.eventize();
    }
    eventize() {
        let self = this;
        self.querySelector("select").addEventListener("change", function() {
            self.querySelector(":scope > main").classList.remove("doctor", "hospital", "service");
            self.querySelector(":scope > main").classList.add(this.value);
        });
    }
});
