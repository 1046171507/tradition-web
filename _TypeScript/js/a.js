define(["require", "exports", '/_TypeScript/js/b.js'], function (require, exports, b_js_1) {
    "use strict";
    console.log('a.js');
    function getName() {
        var moduleName = "A-Module" + "; base on " + b_js_1.getModuleName();
        return moduleName;
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = getName;
    ;
});
