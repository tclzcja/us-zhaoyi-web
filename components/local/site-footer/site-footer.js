{
    const template = document.getCurrentScriptOwnerDocumentTemplateContent();
    window.customElements.define('site-footer', class extends HTMLElement {
        constructor() {
            super();
            this.innerHTML = template;
        }
    });
}
