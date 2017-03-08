window.customElements.define('page-search', class extends HTMLElement {
    constructor() {
        super();
        window.Lzsoft.Import.ByTagImport(this);
        this.eventize();
    }
    eventize() {
        let self = this;
        self.addEventListener("click", function(e) {
            if (e.target.matches("page-search > main *, page-search > nav *")) {
                self.classList.add("nav");
            } else {
                self.classList.remove("nav");
            };
        });
    }
});
