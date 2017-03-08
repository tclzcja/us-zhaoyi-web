HTMLTemplateElement.prototype.getFirstElementChild = function() {
    let container = document.createElement("div");
    container.innerHTML = this.innerHTML;
    return container.firstElementChild;
};
