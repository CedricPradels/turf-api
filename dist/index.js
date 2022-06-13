"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _puppeteer = _interopRequireDefault(require("puppeteer"));

var _course = require("./models/course");

var _programPage = require("./scrapping/programPage");

var _racePage = require("./scrapping/racePage");

var _connectDB = require("./utils/connectDB");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
  var browser, url, dbRace;
  return _regeneratorRuntime().wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _connectDB.connectDB)();

        case 2:
          _context2.next = 4;
          return _puppeteer["default"].launch();

        case 4:
          browser = _context2.sent;
          url = "https://www.turfoo.fr/programmes-courses/190728/reunion1-deauville/course1-prix-du-clos-fleuri/";
          _context2.next = 8;
          return getRaceData(url, browser);

        case 8:
          dbRace = _context2.sent;

          _course.DBRaceSchema.validate(dbRace).then( /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return _course.RaceModel.create(dbRace);

                    case 2:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            }));

            return function (_x) {
              return _ref2.apply(this, arguments);
            };
          }())["catch"](function (e) {
            return console.error(e.message);
          });

          _context2.next = 12;
          return browser.close();

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
}))();

function getRaceData(_x2, _x3) {
  return _getRaceData.apply(this, arguments);
}

function _getRaceData() {
  _getRaceData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(url, browser) {
    var racePage, raceName, meetingName, raceNumber, meetingNumber, date, horsesHandler, dbRace, partants;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return browser.newPage();

          case 2:
            racePage = _context3.sent;
            console.log("start scrapping race: ", url);
            _context3.next = 6;
            return racePage["goto"](url, {
              waitUntil: "networkidle0"
            });

          case 6:
            _context3.next = 8;
            return (0, _racePage.onRacePage)(racePage).getRaceName();

          case 8:
            raceName = _context3.sent;
            _context3.next = 11;
            return (0, _racePage.onRacePage)(racePage).getMeetingName();

          case 11:
            meetingName = _context3.sent;
            _context3.next = 14;
            return (0, _racePage.onRacePage)(racePage).getRaceNumber();

          case 14:
            raceNumber = _context3.sent;
            _context3.next = 17;
            return (0, _racePage.onRacePage)(racePage).getMeetingNumber();

          case 17:
            meetingNumber = _context3.sent;
            _context3.next = 20;
            return (0, _racePage.onRacePage)(racePage).getDate();

          case 20:
            date = _context3.sent;
            _context3.next = 23;
            return racePage.$$(".table-horses > tbody > tr > td:first-child > a");

          case 23:
            horsesHandler = _context3.sent;
            dbRace = {
              date: date,
              race: {
                name: raceName,
                number: raceNumber
              },
              meeting: {
                name: meetingName,
                number: meetingNumber
              },
              partants: []
            };
            _context3.next = 27;
            return Promise.all(horsesHandler.map(function (horseHandler) {
              return getHorseData(horseHandler, racePage, browser);
            }));

          case 27:
            partants = _context3.sent;
            dbRace.partants = partants; // for (let horseHandler of horsesHandler) {
            //   const partant = await getHorseData(horseHandler, racePage, browser);
            //   dbRace.partants.push(partant);
            // }

            _context3.next = 31;
            return racePage.close();

          case 31:
            return _context3.abrupt("return", dbRace);

          case 32:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getRaceData.apply(this, arguments);
}

function getHorseData(_x4, _x5, _x6) {
  return _getHorseData.apply(this, arguments);
}

function _getHorseData() {
  _getHorseData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(horseHandler, racePage, browser) {
    var horsePage, previewRacePage, horseUrl, horseNumber, horseName, partant, hasHistory, _yield$horsePage$$eva, _yield$horsePage$$eva2, _yield$horsePage$$eva3, horseHistoryTotalPages, horseHistoryPage, horsePaginateUrl, previewRacesHandler, _iterator, _step, _loop;

    return _regeneratorRuntime().wrap(function _callee5$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return browser.newPage();

          case 2:
            horsePage = _context6.sent;
            _context6.next = 5;
            return browser.newPage();

          case 5:
            previewRacePage = _context6.sent;
            _context6.next = 8;
            return racePage.evaluate(function (e) {
              return e.href;
            }, horseHandler);

          case 8:
            horseUrl = _context6.sent;
            console.log("go to horse details page", horseUrl);
            _context6.next = 12;
            return horsePage["goto"](horseUrl, {
              waitUntil: "networkidle0"
            });

          case 12:
            _context6.next = 14;
            return racePage.evaluate(function (anchor) {
              return anchor.innerText.split(" - ")[0];
            }, horseHandler);

          case 14:
            horseNumber = _context6.sent;
            _context6.next = 17;
            return horsePage.$eval("h1", function (e) {
              return e.innerText;
            });

          case 17:
            horseName = _context6.sent;
            console.log("get horse name: ", horseName);
            partant = {
              history: [],
              name: horseName,
              number: horseNumber
            };
            _context6.next = 22;
            return horsePage.$("#record > center");

          case 22:
            _context6.t0 = _context6.sent;
            hasHistory = _context6.t0 !== null;

            if (!hasHistory) {
              _context6.next = 76;
              break;
            }

            _context6.t1 = parseInt;
            _context6.next = 28;
            return horsePage.$eval("#record > center", function (e) {
              return e.childNodes[0].textContent;
            });

          case 28:
            _context6.t4 = _yield$horsePage$$eva2 = _context6.sent;
            _context6.t3 = _context6.t4 === null;

            if (_context6.t3) {
              _context6.next = 32;
              break;
            }

            _context6.t3 = _yield$horsePage$$eva2 === void 0;

          case 32:
            if (!_context6.t3) {
              _context6.next = 36;
              break;
            }

            _context6.t5 = void 0;
            _context6.next = 37;
            break;

          case 36:
            _context6.t5 = (_yield$horsePage$$eva3 = _yield$horsePage$$eva2.match(/Page n°\d+\/(\d+)/)) === null || _yield$horsePage$$eva3 === void 0 ? void 0 : _yield$horsePage$$eva3[1];

          case 37:
            _context6.t6 = _yield$horsePage$$eva = _context6.t5;
            _context6.t2 = _context6.t6 !== null;

            if (!_context6.t2) {
              _context6.next = 41;
              break;
            }

            _context6.t2 = _yield$horsePage$$eva !== void 0;

          case 41:
            if (!_context6.t2) {
              _context6.next = 45;
              break;
            }

            _context6.t7 = _yield$horsePage$$eva;
            _context6.next = 46;
            break;

          case 45:
            _context6.t7 = "1";

          case 46:
            _context6.t8 = _context6.t7;
            horseHistoryTotalPages = (0, _context6.t1)(_context6.t8, 10);
            horseHistoryPage = 1;

          case 49:
            if (!(horseHistoryPage <= horseHistoryTotalPages)) {
              _context6.next = 76;
              break;
            }

            horsePaginateUrl = "".concat(horseUrl).concat(horseHistoryPage);
            console.log("process history page:", horsePaginateUrl);
            _context6.next = 54;
            return horsePage["goto"](horsePaginateUrl, {
              waitUntil: "networkidle0"
            });

          case 54:
            _context6.next = 56;
            return horsePage.$$("tr .informationscourse");

          case 56:
            previewRacesHandler = _context6.sent;
            _iterator = _createForOfIteratorHelper(previewRacesHandler);
            _context6.prev = 58;
            _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
              var previewRaceHandler, _raceName, dateString, historyProgramUrl, raceUrl, raceName, raceNumber, meetingName, meetingNumber, date, results;

              return _regeneratorRuntime().wrap(function _loop$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      previewRaceHandler = _step.value;
                      _context5.next = 3;
                      return horsePage.evaluate(function (e) {
                        var _e$childNodes$2$textC;

                        return (_e$childNodes$2$textC = e.childNodes[2].textContent) === null || _e$childNodes$2$textC === void 0 ? void 0 : _e$childNodes$2$textC.split("-")[0];
                      }, previewRaceHandler);

                    case 3:
                      _raceName = _context5.sent;
                      _context5.next = 6;
                      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
                        var _yield$horsePage$eval, _yield$horsePage$eval2, day, month, year, parser;

                        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                          while (1) {
                            switch (_context4.prev = _context4.next) {
                              case 0:
                                _context4.next = 2;
                                return horsePage.evaluate(function (e) {
                                  var _e$childNodes$0$textC, _e$childNodes$0$textC2;

                                  return (_e$childNodes$0$textC = e.childNodes[0].textContent) === null || _e$childNodes$0$textC === void 0 ? void 0 : (_e$childNodes$0$textC2 = _e$childNodes$0$textC.split("-")[0]) === null || _e$childNodes$0$textC2 === void 0 ? void 0 : _e$childNodes$0$textC2.split(" ");
                                }, previewRaceHandler);

                              case 2:
                                _yield$horsePage$eval = _context4.sent;
                                _yield$horsePage$eval2 = _slicedToArray(_yield$horsePage$eval, 3);
                                day = _yield$horsePage$eval2[0];
                                month = _yield$horsePage$eval2[1];
                                year = _yield$horsePage$eval2[2];
                                parser = {
                                  JANVIER: "01",
                                  FEVRIER: "02",
                                  MARS: "03",
                                  AVRIL: "04",
                                  MAI: "05",
                                  JUIN: "06",
                                  JUILLET: "07",
                                  AOUT: "08",
                                  SEPTEMBRE: "09",
                                  OCTOBRE: "10",
                                  NOVEMBRE: "11",
                                  DECEMBRE: "12"
                                };
                                return _context4.abrupt("return", "".concat(year.slice(-2)).concat(parser[month]).concat(day));

                              case 9:
                              case "end":
                                return _context4.stop();
                            }
                          }
                        }, _callee4);
                      }))();

                    case 6:
                      dateString = _context5.sent;
                      historyProgramUrl = "https://www.turfoo.fr/programmes-courses/".concat(dateString, "/");
                      _context5.next = 10;
                      return previewRacePage["goto"](historyProgramUrl, {
                        waitUntil: "networkidle0"
                      });

                    case 10:
                      _context5.next = 12;
                      return (0, _programPage.programPage)(previewRacePage).findRaceUrl(_raceName);

                    case 12:
                      raceUrl = _context5.sent;

                      if (!(raceUrl !== null)) {
                        _context5.next = 36;
                        break;
                      }

                      console.log("found preview race url: ", raceUrl);
                      _context5.next = 17;
                      return previewRacePage["goto"](raceUrl, {
                        waitUntil: "networkidle0"
                      });

                    case 17:
                      _context5.next = 19;
                      return (0, _racePage.onRacePage)(previewRacePage).getRaceName();

                    case 19:
                      raceName = _context5.sent;
                      _context5.next = 22;
                      return (0, _racePage.onRacePage)(previewRacePage).getRaceNumber();

                    case 22:
                      raceNumber = _context5.sent;
                      _context5.next = 25;
                      return (0, _racePage.onRacePage)(previewRacePage).getMeetingName();

                    case 25:
                      meetingName = _context5.sent;
                      _context5.next = 28;
                      return (0, _racePage.onRacePage)(previewRacePage).getMeetingNumber();

                    case 28:
                      meetingNumber = _context5.sent;
                      _context5.next = 31;
                      return (0, _racePage.onRacePage)(previewRacePage).getDate();

                    case 31:
                      date = _context5.sent;
                      _context5.next = 34;
                      return (0, _racePage.onRacePage)(previewRacePage).getResult();

                    case 34:
                      results = _context5.sent;
                      partant.history.push({
                        date: date,
                        meeting: {
                          name: meetingName,
                          number: meetingNumber
                        },
                        race: {
                          name: raceName,
                          number: raceNumber
                        },
                        results: results
                      });

                    case 36:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, _loop);
            });

            _iterator.s();

          case 61:
            if ((_step = _iterator.n()).done) {
              _context6.next = 65;
              break;
            }

            return _context6.delegateYield(_loop(), "t9", 63);

          case 63:
            _context6.next = 61;
            break;

          case 65:
            _context6.next = 70;
            break;

          case 67:
            _context6.prev = 67;
            _context6.t10 = _context6["catch"](58);

            _iterator.e(_context6.t10);

          case 70:
            _context6.prev = 70;

            _iterator.f();

            return _context6.finish(70);

          case 73:
            horseHistoryPage++;
            _context6.next = 49;
            break;

          case 76:
            _context6.next = 78;
            return horsePage.close();

          case 78:
            _context6.next = 80;
            return previewRacePage.close();

          case 80:
            return _context6.abrupt("return", partant);

          case 81:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee5, null, [[58, 67, 70, 73]]);
  }));
  return _getHorseData.apply(this, arguments);
}