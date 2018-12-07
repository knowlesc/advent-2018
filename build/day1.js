"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var solver_1 = require("./solver");
var Day1 = /** @class */ (function (_super) {
    __extends(Day1, _super);
    function Day1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputFile = './inputs/day1.txt';
        _this.solutions = [
            function (input) {
                return input.reduce(function (a, b) { return a + b; });
            },
            function (input) {
                var output = null;
                var i = 0;
                var total = 0;
                var seen = { 0: true };
                while (1) {
                    if (i === input.length)
                        i = 0;
                    total += input[i];
                    if (seen[total]) {
                        output = total;
                        break;
                    }
                    seen[total] = true;
                    i++;
                }
                return output;
            }
        ];
        return _this;
    }
    Day1.prototype.formatInput = function (input) {
        return input.map(function (i) { return parseInt(i); });
    };
    return Day1;
}(solver_1.Solver));
exports.Day1 = Day1;
new Day1().run();
//# sourceMappingURL=day1.js.map