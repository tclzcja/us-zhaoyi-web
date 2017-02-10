window.customElements.define('page-search', class extends HTMLElement {
    constructor() {
        super();
        window.Lzsoft.Import.ByTagImport(this);
        this.eventize();
        this.init();
    }
    init() {
        let self = this;
        let t = window.location.GetParam("t");
        let k = window.location.GetParam("k");
    }
    eventize() {
        let self = this;
    }
});
