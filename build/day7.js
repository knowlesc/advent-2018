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
var Day7 = /** @class */ (function (_super) {
    __extends(Day7, _super);
    function Day7() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputFile = './inputs/day7.txt';
        _this.solutions = [
            function (input) {
                var order = '';
                var available = _this.availableSteps(input);
                while (available.length > 0) {
                    _this.removeStep(input, available[0]);
                    order += available[0];
                    available = Object.keys(input)
                        .filter(function (s) { return !input[s].after.length; })
                        .sort();
                }
                return order;
            },
            function (input) {
                var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                var workers = [
                    { available: 0, executing: null },
                    { available: 0, executing: null },
                    { available: 0, executing: null },
                    { available: 0, executing: null },
                    { available: 0, executing: null }
                ];
                var currentTime = 0;
                var start = function (step, worker) {
                    worker.available = currentTime + 60 + alphabet.indexOf(step) + 1;
                    worker.executing = step;
                    input[step].executing = true;
                };
                var finish = function (worker) {
                    _this.removeStep(input, worker.executing);
                    worker.executing = null;
                };
                while (Object.keys(input).length > 0) {
                    var nextAvailableStep = _this.availableSteps(input)[0];
                    var nextAvailableWorker = workers.filter(function (w) { return w.available <= currentTime; })[0];
                    if (nextAvailableStep && nextAvailableWorker) {
                        start(nextAvailableStep, nextAvailableWorker);
                    }
                    else {
                        currentTime = workers
                            .map(function (w) { return w.available; })
                            .filter(function (t) { return t > currentTime; })
                            .sort(function (a, b) { return a - b; })[0];
                        workers
                            .filter(function (w) { return w.available === currentTime && w.executing; })
                            .forEach(function (w) { return finish(w); });
                    }
                }
                return currentTime;
            }
        ];
        return _this;
    }
    Day7.prototype.formatInput = function (input) {
        var steps = {};
        input.forEach(function (i) {
            var groups = /(\w) must be finished before step (\w)/.exec(i);
            var step = groups[1];
            var before = groups[2];
            if (!steps[step]) {
                steps[step] = { before: [], after: [] };
            }
            if (!steps[before]) {
                steps[before] = { before: [], after: [] };
            }
            steps[step].before.push(before);
            steps[before].after.push(step);
        });
        return steps;
    };
    Day7.prototype.availableSteps = function (steps) {
        return Object.keys(steps)
            .filter(function (s) { return !steps[s].after.length && !steps[s].executing; })
            .sort();
    };
    Day7.prototype.removeStep = function (steps, remove) {
        steps[remove].before
            .forEach(function (s) {
            return steps[s].after = steps[s].after
                .filter(function (s) { return s !== remove; });
        });
        steps[remove].after
            .forEach(function (s) {
            return steps[s].before = steps[s].before
                .filter(function (s) { return s !== remove; });
        });
        delete steps[remove];
    };
    return Day7;
}(solver_1.Solver));
exports.Day7 = Day7;
new Day7().run();
//# sourceMappingURL=day7.js.map