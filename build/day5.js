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
var Day5 = /** @class */ (function (_super) {
    __extends(Day5, _super);
    function Day5() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputFile = './inputs/day5.txt';
        _this.solutions = [
            function (input) {
                return _this.react(input[0].trim());
            },
            function (input) {
                var min = 50000;
                'abcdefghijklmnopqrstuvwxyz'.split('')
                    .forEach(function (char) {
                    var poly = input[0].replace(new RegExp("[" + char + char.toUpperCase() + "]", 'g'), '');
                    var length = _this.react(poly);
                    min = Math.min(min, length);
                });
                return min;
            }
        ];
        return _this;
    }
    Day5.prototype.formatInput = function (input) {
        return input;
    };
    Day5.prototype.isLower = function (char) {
        return char === char.toLowerCase();
    };
    Day5.prototype.annihilate = function (c1, c2) {
        return c2
            && this.isLower(c1) !== this.isLower(c2)
            && c1.toLowerCase() === c2.toLowerCase();
    };
    Day5.prototype.react = function (polymer) {
        var poly = polymer.split('')
            .map(function (unit) { return ({ value: unit, prev: null, next: null }); });
        poly.forEach(function (unit, i, arr) {
            unit.next = arr[i + 1] || null;
            unit.prev = arr[i - 1] || null;
        });
        var unit = poly[0];
        var length = poly.length;
        while (unit && unit.next) {
            if (this.annihilate(unit.value, unit.next.value)) {
                var before = unit.prev;
                var after = unit.next ? unit.next.next : null;
                if (before)
                    before.next = after;
                if (after)
                    after.prev = before;
                unit = before || after;
                length -= 2;
            }
            else if (unit.next) {
                unit = unit.next;
            }
        }
        return length;
    };
    return Day5;
}(solver_1.Solver));
exports.Day5 = Day5;
new Day5().run();
//# sourceMappingURL=day5.js.map