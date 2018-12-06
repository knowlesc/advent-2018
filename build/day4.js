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
var wakingUp = 'wakes up';
var startsShift = 'begins shift';
var getHighestValueKey = function (obj) { return Object.keys(obj)
    .reduce(function (a, b) { return obj[a] > obj[b] ? a : b; }); };
var Day4 = /** @class */ (function (_super) {
    __extends(Day4, _super);
    function Day4() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputFile = './inputs/day4.txt';
        _this.solutions = [
            function part1(input) {
                var guardTotals = {};
                input.forEach(function (nap) {
                    guardTotals[nap.guard] = (guardTotals[nap.guard] || 0) + (nap.end - nap.start);
                });
                var mostAsleepGuard = getHighestValueKey(guardTotals);
                var guardNaps = input.filter(function (nap) { return nap.guard === mostAsleepGuard; });
                var frequency = {};
                guardNaps.forEach(function (nap) {
                    for (var time = nap.start; time < nap.end; time++) {
                        frequency[time] = (frequency[time] || 0) + 1;
                    }
                });
                var mostAsleepMinute = getHighestValueKey(frequency);
                return Number(mostAsleepMinute) * Number(mostAsleepGuard);
            },
            function part2(input) {
                var guardFrequencies = {};
                input.forEach(function (nap) {
                    for (var time = nap.start; time < nap.end; time++) {
                        guardFrequencies[nap.guard + "_" + time] = (guardFrequencies[nap.guard + "_" + time] || 0) + 1;
                    }
                });
                var mostAsleepGuardMinute = getHighestValueKey(guardFrequencies).split('_');
                return Number(mostAsleepGuardMinute[0]) * Number(mostAsleepGuardMinute[1]);
            }
        ];
        return _this;
    }
    Day4.prototype.formatInput = function (input) {
        var sorted = input.map(function (i) {
            var groups = /\[(.+)\] (Guard #(\d+) )?(.+)/.exec(i);
            return {
                time: new Date(groups[1]),
                guard: groups[4] ? groups[3] : groups[1],
                action: groups[4] ? groups[4] : groups[2]
            };
        }).sort(function (a, b) { return a.time.getTime() - b.time.getTime(); });
        var formattedInput = [];
        var currentGuard = '';
        sorted.forEach(function (a) {
            if (a.action === startsShift) {
                currentGuard = a.guard;
            }
            else if (a.action === wakingUp) {
                formattedInput[formattedInput.length - 1].end = a.time.getMinutes();
            }
            else {
                formattedInput.push({ guard: currentGuard, start: a.time.getMinutes(), end: null });
            }
        });
        return formattedInput;
    };
    return Day4;
}(solver_1.Solver));
exports.Day4 = Day4;
new Day4().run();
//# sourceMappingURL=day4.js.map