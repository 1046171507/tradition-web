define(["require", "exports", '/_TypeScript/js/a.js', '/_TypeScript/js/b.js', '/_TypeScript/js/c.js'], function (require, exports, a_js_1, b_js_1) {
    "use strict";
    var indexCssFn = function (indexCss) {
        console.log("indexCss: " + indexCss);
    };
    _require(['text!/_TypeScript/css/index.css'], function (indexCss) {
        indexCssFn(indexCss);
    });
    console.log("module name: " + a_js_1.default());
    console.log("module name: " + b_js_1.getModuleName());
});
