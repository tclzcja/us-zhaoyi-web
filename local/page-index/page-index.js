window.customElements.define('page-index', class extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = document.querySelector('link[href*="page-index.html"]').import.querySelector("template").innerHTML;
        setTimeout(function() {
            document.body.classList.add("bg");
        }, 1000);
    }
});
