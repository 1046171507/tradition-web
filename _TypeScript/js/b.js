define(["require", "exports"], function (require, exports) {
    "use strict";
    console.log('b.js');
    var moduleName = "B-Module";
    function getModuleName() {
        return moduleName;
    }
    exports.getModuleName = getModuleName;
});
