{
    const template = document.getCurrentScriptOwnerDocumentTemplateContent();
    window.customElements.define('page-doctor', class extends HTMLElement {
        constructor() {
            super();
            this.innerHTML = template;
            this.eventize();
        }
        eventize() {}
    });
}
