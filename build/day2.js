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
var Day2 = /** @class */ (function (_super) {
    __extends(Day2, _super);
    function Day2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputFile = './inputs/day2.txt';
        _this.solutions = [
            function part1(input) {
                var lettersAppearingTwoTimes = 0;
                var lettersAppearingThreeTimes = 0;
                input.forEach(function (id) {
                    var sorted = id.split('').sort().join('');
                    var currentStreak = sorted[0];
                    var prev = sorted[0];
                    var hasTwo = false;
                    var hasThree = false;
                    for (var i = 1; i < sorted.length; i++) {
                        if (sorted[i] === prev) {
                            currentStreak += prev;
                        }
                        else {
                            if (!hasTwo && currentStreak.length === 2) {
                                hasTwo = true;
                                lettersAppearingTwoTimes++;
                            }
                            else if (!hasThree && currentStreak.length === 3) {
                                hasThree = true;
                                lettersAppearingThreeTimes++;
                            }
                            if (hasTwo && hasThree) {
                                break;
                            }
                            currentStreak = sorted[i];
                            prev = sorted[i];
                        }
                    }
                });
                return lettersAppearingThreeTimes * lettersAppearingTwoTimes;
            },
            function part2(input) {
                var answer = null;
                input.some(function (id, i) {
                    var candidates = input.slice(i + 1);
                    var oneDifference = [];
                    var _loop_1 = function (cur) {
                        var differentAtPosition = function (i) { return i[cur] !== id[cur]; };
                        var sameAtPosition = function (i) { return i[cur] === id[cur]; };
                        oneDifference = oneDifference.filter(sameAtPosition);
                        oneDifference = oneDifference.concat(candidates.filter(differentAtPosition));
                        candidates = candidates.filter(sameAtPosition);
                    };
                    for (var cur = 0; oneDifference.length + candidates.length > 0 && cur < id.length; cur++) {
                        _loop_1(cur);
                    }
                    if (oneDifference.length === 1) {
                        var id1 = id.split('');
                        var id2_1 = oneDifference[0].split('');
                        answer = id1.filter(function (char, i) { return char === id2_1[i]; }).join('');
                    }
                    return oneDifference.length === 1;
                });
                return answer;
            }
        ];
        return _this;
    }
    Day2.prototype.formatInput = function (input) {
        return input;
    };
    return Day2;
}(solver_1.Solver));
exports.Day2 = Day2;
new Day2().run();
//# sourceMappingURL=day2.js.map