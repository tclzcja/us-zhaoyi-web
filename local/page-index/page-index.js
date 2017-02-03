window.customElements.define('page-index', class extends HTMLElement {
    constructor() {
        super();
        window.Lzsoft.Import.ByTagImport(this);
        this.eventize();
    }
    eventize() {
        let self = this;
        self.querySelector("select").addEventListener("change", function() {
            self.querySelector(":scope > main").classList.remove("doctor", "hospital", "service");
            self.querySelector(":scope > main").classList.add(this.value);
        });
        self.querySelectorAll("section").addEventListener("click", function() {
            self.querySelector(":scope > main").classList.remove("doctor", "hospital", "service");
            self.querySelector(":scope > main").classList.add(this.getAttribute("class"));
        });
    }
});
