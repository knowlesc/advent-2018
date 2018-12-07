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
var Day3 = /** @class */ (function (_super) {
    __extends(Day3, _super);
    function Day3() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputFile = './inputs/day3.txt';
        _this.solutions = [
            function (input) {
                return _this.generateFabricArray(input)
                    .map(function (row) { return row.reduce(function (sum, i) { return sum + (i >= 2 ? 1 : 0); }); })
                    .reduce(function (sum, i) { return sum + i; });
            },
            function (input) {
                var fabric = _this.generateFabricArray(input);
                var answer = null;
                input.some(function (claim) {
                    for (var i = claim.top; i < claim.top + claim.height; i++) {
                        for (var j = claim.left; j < claim.left + claim.width; j++) {
                            if (fabric[i][j] > 1) {
                                return false;
                            }
                        }
                    }
                    answer = claim.id;
                    return true;
                });
                return answer;
            }
        ];
        return _this;
    }
    Day3.prototype.formatInput = function (input) {
        return input.map(function (i) {
            var groups = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/.exec(i);
            return {
                id: parseInt(groups[1]),
                left: parseInt(groups[2]),
                top: parseInt(groups[3]),
                width: parseInt(groups[4]),
                height: parseInt(groups[5])
            };
        });
    };
    Day3.prototype.generateFabricArray = function (input) {
        var fabricSize = 1000;
        var fabric = [];
        for (var y = 0; y < fabricSize; y++) {
            fabric.push([]);
            for (var x = 0; x < fabricSize; x++) {
                fabric[y].push(0);
            }
        }
        input.forEach(function (claim) {
            for (var i = claim.top; i < claim.top + claim.height; i++) {
                for (var j = claim.left; j < claim.left + claim.width; j++) {
                    fabric[i][j]++;
                }
            }
        });
        return fabric;
    };
    return Day3;
}(solver_1.Solver));
exports.Day3 = Day3;
new Day3().run();
//# sourceMappingURL=day3.js.map