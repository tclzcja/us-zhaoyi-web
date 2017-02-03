window.customElements.define('page-index', class extends HTMLElement {
    constructor() {
        super();
        window.Lzsoft.Import.ByTagImport(this);
        this.eventize();
    }
    eventize() {
        let self = this;
        self.querySelector("select").addEventListener("change", function() {
            document.body.setAttribute("data-type", this.value);
        });
        self.querySelectorAll("section").addEventListener("click", function() {
            document.body.setAttribute("data-type", this.getAttribute("class"));
        });
    }
});
