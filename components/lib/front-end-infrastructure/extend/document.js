document.getCurrentScriptOwnerDocumentTemplateContent = function() {
    return (document.currentScript || document._currentScript).ownerDocument.querySelector("template").innerHTML;
};
