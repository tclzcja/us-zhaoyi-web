(function () {
    'use strict';
    //
    const EVENT_LEFT = "LEFT";
    const EVENT_RIGHT = "RIGHT";
    let currentPage = 0;
    let maxPage = 0;
    //
    window.customElements.define('horizontal-accordion', class extends HTMLElement {
        constructor() {
            super();
            this.eventize();
        }
        eventize() {
            let self = this;
            maxPage = self.children.length - 1;
            self.addEventListener(EVENT_LEFT, function () {
                if (currentPage > 0) {
                    currentPage--;
                    self.style.marginLeft = (0 - currentPage * 100) + "vw";
                }
            });
            self.addEventListener(EVENT_RIGHT, function () {
                if (currentPage < maxPage) {
                    currentPage++;
                    self.style.marginLeft = (0 - currentPage * 100) + "vw";
                }
            });
            window.addEventListener("popstate", function () {
                currentPage = 0;
                maxPage = self.children.length - 1;
            });
        }
    });
    //
    window.customElements.define('horizontal-accordion-left', class extends HTMLElement {
        constructor() {
            super();
            this.addEventListener("click", function () {
                document.querySelector("horizontal-accordion").dispatchEvent(new Event(EVENT_LEFT));
            });
        }
    });
    //
    window.customElements.define('horizontal-accordion-right', class extends HTMLElement {
        constructor() {
            super();
            this.addEventListener("click", function () {
                document.querySelector("horizontal-accordion").dispatchEvent(new Event(EVENT_RIGHT));
            });
        }
    });
}());
