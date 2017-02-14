(function() {
    window.Lzsoft.Auth.el = null;
    window.Lzsoft.Auth.source = null;
    window.Lzsoft.Auth.FromElement = function(el, source) {
        if (source !== "value" && source !== "content" && source.indexOf("data-") < 0) {
            throw new RangeError('The second parameter must be "value", "content" or an attribute name like "data-*".');
            return;
        }
        window.Lzsoft.Auth.el = el;
        window.Lzsoft.Auth.source = source;
    };
    window.Lzsoft.Auth.Get = function() {
        let result = null;
        switch (window.Lzsoft.Auth.source) {
            case 'value':
                result = window.Lzsoft.Auth.el.value;
                break;
            case 'content':
                result = window.Lzsoft.Auth.el.innerHTML;
                break;
            case null:
                result = null;
                break;
            default:
                result = window.Lzsoft.Auth.el.getAttribute(window.Lzsoft.Auth.source);
                break;
        }
        return result;
    };
}());
