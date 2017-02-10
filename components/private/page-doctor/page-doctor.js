window.customElements.define('page-doctor', class extends HTMLElement {
    constructor() {
        super();
        window.Lzsoft.Import.ByTagImport(this);
        this.eventize();
    }
    eventize() {}
    switchTo(self, type) {}
});
