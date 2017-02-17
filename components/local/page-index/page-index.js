window.customElements.define('page-index', class extends HTMLElement {
    constructor() {
        super();
        window.Lzsoft.Import.ByTagImport(this);
        this.eventize();
        this.switchTo(this, "doctor");
    }
    eventize() {
        let self = this;
        self.querySelector("select").addEventListener("change", function() {
            self.switchTo(self, this.value);
        });
        self.querySelectorAll("section").addEventListener("click", function() {
            self.switchTo(self, this.getAttribute("data-type"));
        });
    }
    switchTo(self, type) {
        document.body.setAttribute("data-type", type);
        self.querySelector("select").value = type;
    }
});
