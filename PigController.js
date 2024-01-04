System.register([], function (exports_1, context_1) {
    "use strict";
    var PigController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            PigController = class PigController {
                constructor() {
                    this.pigs = [];
                }
                add(pig) {
                    this.pigs.push(pig);
                    this.savePigs();
                }
                showAll() {
                    return this.pigs;
                }
                delete(pigName) {
                    const p = this.pigs.findIndex((pig) => pig.name === pigName);
                    if (p !== -1) {
                        this.pigs.splice(p, 1);
                        this.savePigs();
                    }
                }
                loadPigs() {
                    const allPigs = localStorage.getItem('pigs');
                    if (allPigs) {
                        this.pigs = JSON.parse(allPigs);
                    }
                }
                savePigs() {
                    localStorage.setItem('pigs', JSON.stringify(this.pigs));
                }
            };
            exports_1("default", PigController);
        }
    };
});
