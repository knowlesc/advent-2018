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
var Day6 = /** @class */ (function (_super) {
    __extends(Day6, _super);
    function Day6() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputFile = './inputs/day6.txt';
        _this.solutions = [
            function (input) {
                var minX = Math.min.apply(Math, input.map(function (i) { return i[0]; }));
                var minY = Math.min.apply(Math, input.map(function (i) { return i[1]; }));
                var maxX = Math.max.apply(Math, input.map(function (i) { return i[0]; }));
                var maxY = Math.max.apply(Math, input.map(function (i) { return i[1]; }));
                var counts = input.map(function () { return 0; });
                for (var y = minY - 1; y <= maxY + 1; y++) {
                    var _loop_1 = function (x) {
                        var p = [x, y];
                        var closestPoint = 0;
                        var minDist = Infinity;
                        var multiple = false;
                        input.some(function (i, index) {
                            var dist = _this.dist(p, i);
                            if (dist < minDist) {
                                multiple = false;
                                minDist = dist;
                                closestPoint = index;
                            }
                            else if (dist === minDist) {
                                multiple = true;
                            }
                            return dist === 0;
                        });
                        if (multiple)
                            return "continue";
                        counts[closestPoint]++;
                        //  Any point closest to a coordinate outside the edge points will be closest to every adjacent
                        // coordinate as you approach infinity in that direction, therefore the count will be infinity.
                        if (y === minY - 1 || y === maxY + 1 || x === minX - 1 || x === maxX + 1) {
                            counts[closestPoint] = Infinity;
                        }
                    };
                    for (var x = minX - 1; x <= maxX + 1; x++) {
                        _loop_1(x);
                    }
                }
                return Math.max.apply(Math, counts.filter(function (c) { return c < Infinity; }));
            },
            function (input) {
                var minX = Math.min.apply(Math, input.map(function (i) { return i[0]; }));
                var minY = Math.min.apply(Math, input.map(function (i) { return i[1]; }));
                var maxX = Math.max.apply(Math, input.map(function (i) { return i[0]; }));
                var maxY = Math.max.apply(Math, input.map(function (i) { return i[1]; }));
                var max = 9999;
                var countPoint = function (p) {
                    var sum = 0;
                    for (var i = 0; i < input.length; i++) {
                        sum += _this.dist(p, input[i]);
                        if (sum > max)
                            break;
                    }
                    return sum <= max;
                };
                var countRange = function (x1, x2, y1, y2) {
                    var count = 0;
                    for (var y = y1; y <= y2; y++) {
                        for (var x = x1; x <= x2; x++) {
                            if (countPoint([x, y]))
                                count++;
                        }
                    }
                    return count;
                };
                var count = countRange(minX, maxX, minY, maxY);
                // Check outside the detected boundaries in case the points are grouped around a boundary
                var left = Infinity, right = Infinity, top = Infinity, bottom = Infinity;
                while (left + right + top + bottom > 0) {
                    minX--;
                    maxX++;
                    minY--;
                    maxY++;
                    if (left > 0)
                        count += left = countRange(minX, minX, minY + 1, maxY - 1);
                    if (right > 0)
                        count += right = countRange(maxX, maxX, minY + 1, maxY - 1);
                    if (top > 0)
                        count += top = countRange(minX, maxX, minY, minY);
                    if (bottom > 0)
                        count += bottom = countRange(minX, maxX, maxY, maxY);
                }
                return count;
            }
        ];
        return _this;
    }
    Day6.prototype.formatInput = function (input) {
        return input.map(function (i) {
            var split = i.split(', ');
            var coord = [parseInt(split[0]), parseInt(split[1])];
            return coord;
        });
    };
    Day6.prototype.dist = function (a, b) {
        var distX = Math.abs(a[0] - b[0]);
        var distY = Math.abs(a[1] - b[1]);
        return distX + distY;
    };
    return Day6;
}(solver_1.Solver));
exports.Day6 = Day6;
new Day6().run();
//# sourceMappingURL=day6.js.map