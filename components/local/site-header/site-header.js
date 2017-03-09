{
    const template = document.getCurrentScriptOwnerDocumentTemplateContent();
    window.customElements.define('site-header', class extends HTMLElement {
        constructor() {
            super();
            this.innerHTML = template;
        }
    });
}
