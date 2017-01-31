window.customElements.define('site-header', class extends HTMLElement {
    constructor() {
        super();
        let self = this;
        fetch('/local/site-header/site-header.html').then(function(response) {
            response.text().then(function(result) {
                self.innerHTML = result;
            });
        }).catch(function(e) {
            console.log(e);
        });
        //this.innerHTML = document.querySelector('link[href*="site-header.html"]').import.querySelector("template").innerHTML;
    }
});
