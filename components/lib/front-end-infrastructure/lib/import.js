(function() {
    'use strict';
    window.Lzsoft.Import.ByTagImport = function(self) {
        self.innerHTML = document.querySelector('link[href*="' + self.tagName.toLowerCase() + '.html"]').import.querySelector("template").innerHTML;
    };
}());
