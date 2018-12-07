"use strict";
exports.__esModule = true;
var fs = require("fs");
var perf_hooks_1 = require("perf_hooks");
var Solver = /** @class */ (function () {
    function Solver() {
    }
    Solver.prototype.run = function () {
        var _this = this;
        var input = this.formatInput(this.readInputAsArray(this.inputFile));
        this.solutions.forEach(function (solution, i) {
            _this.profileFunction(solution, input, "part " + (i + 1));
        });
    };
    Solver.prototype.readInputAsArray = function (filename) {
        return fs.readFileSync(filename)
            .toString()
            .split(/\r?\n/)
            .filter(function (line) { return line.length > 0; });
    };
    Solver.prototype.profileFunction = function (fn, input, name) {
        console.log("\n----------------------");
        console.log("Executing " + name);
        console.log("----------------------\n");
        var now = perf_hooks_1.performance.now();
        var output = fn(input);
        var elapsed = perf_hooks_1.performance.now() - now;
        console.log("Output: " + output);
        console.log("Elapsed time: " + elapsed.toFixed(3) + "ms\n");
    };
    return Solver;
}());
exports.Solver = Solver;
//# sourceMappingURL=solver.js.map