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
var node = /** @class */ (function () {
    function node() {
        this.metadata = [];
        this.children = [];
    }
    return node;
}());
var Day8 = /** @class */ (function (_super) {
    __extends(Day8, _super);
    function Day8() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputFile = './inputs/day8.txt';
        _this.solutions = [
            function (input) {
                var sumMetadata = function (n) {
                    var sum = n.metadata.reduce(function (a, b) { return a + b; });
                    if (n.children.length > 0) {
                        sum += n.children
                            .map(function (c) { return sumMetadata(c); })
                            .reduce(function (a, b) { return a + b; });
                    }
                    return sum;
                };
                return sumMetadata(input);
            },
            function (input) {
                var valueOfNode = function (n) {
                    if (!n) {
                        return 0;
                    }
                    else if (n.children.length === 0) {
                        return n.metadata.reduce(function (a, b) { return a + b; });
                    }
                    return n.metadata
                        .map(function (m) { return valueOfNode(n.children[m - 1]); })
                        .reduce(function (a, b) { return a + b; });
                };
                return valueOfNode(input);
            }
        ];
        return _this;
    }
    Day8.prototype.formatInput = function (input) {
        var inputAsNumberArray = input[0].split(' ').map(function (i) { return parseInt(i); });
        var root = new node();
        var getChildrenLength = function (header, numChildren, parent) {
            var length = 0;
            for (var i = 0; i < numChildren; i++) {
                var numChildren_1 = header[0];
                var numMetadata = header[1];
                var currentNode = new node();
                if (numChildren_1 > 0) {
                    var remainder = header.slice(2);
                    var childrenLength = getChildrenLength(remainder, numChildren_1, currentNode);
                    length += childrenLength;
                    header.splice(2, childrenLength);
                }
                length += 2 + numMetadata;
                currentNode.metadata = (header.splice(0, 2 + numMetadata).slice(2));
                if (parent) {
                    parent.children.push(currentNode);
                }
                else {
                    root = currentNode;
                }
            }
            return length;
        };
        getChildrenLength(inputAsNumberArray, 1, null);
        return root;
    };
    return Day8;
}(solver_1.Solver));
exports.Day8 = Day8;
new Day8().run();
//# sourceMappingURL=day8.js.map