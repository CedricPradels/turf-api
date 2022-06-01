"use strict";

var _combine = require("./combine");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

describe("Combine", function () {
  it("should be a function", function () {
    expect(_typeof(_combine.combine)).toBe("function");
  });
  it("should combine all values", function () {
    expect((0, _combine.combine)([])).toEqual([]);
    expect((0, _combine.combine)([1])).toEqual([[1]]);
    expect((0, _combine.combine)([1, 2, 3])).toEqual([[1, 2], [1, 3], [2, 3]]);
    console.log((0, _combine.combine)([1, 2, 3, 4]));
    expect((0, _combine.combine)([1, 2, 3, 4])).toEqual([[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]]);
  });
});