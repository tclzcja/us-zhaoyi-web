{
    const template = document.getCurrentScriptOwnerDocumentTemplateContent();
    window.customElements.define('page-index', class extends HTMLElement {
        constructor() {
            super();
            this.innerHTML = template;
            this.eventize();
        }
        eventize() {
            let self = this;
        }
    });
}
