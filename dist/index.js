"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _puppeteer = _interopRequireDefault(require("puppeteer"));

var _racePage = require("./models/scrapping/racePage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
  var browser, page, url, horsesUrl, horsesNames, _iterator, _step, horseUrl, name, oldRacesData, isLastPage, pageNumber, horsePaginateUrl, lines, tmpOldRacesData, history, _iterator2, _step2, _loop;

  return _regeneratorRuntime().wrap(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _puppeteer["default"].launch();

        case 2:
          browser = _context2.sent;
          _context2.next = 5;
          return browser.newPage();

        case 5:
          page = _context2.sent;
          url = "https://www.turfoo.fr/programmes-courses/190728/reunion1-deauville/course1-prix-du-clos-fleuri/";
          console.log("start scrapping from ", url);
          _context2.next = 10;
          return page["goto"](url, {
            waitUntil: "networkidle0"
          });

        case 10:
          _context2.next = 12;
          return page.evaluate(function () {
            var horsesDetailsUrl = Array.from(document.querySelectorAll(".table-horses > tbody > tr > td:first-child > a"), function (e) {
              return e.href;
            });
            return horsesDetailsUrl;
          });

        case 12:
          horsesUrl = _context2.sent;
          console.log("get horses urls", horsesUrl); // GET HORSE NAME

          horsesNames = [];
          _iterator = _createForOfIteratorHelper(horsesUrl);
          _context2.prev = 16;

          _iterator.s();

        case 18:
          if ((_step = _iterator.n()).done) {
            _context2.next = 67;
            break;
          }

          horseUrl = _step.value;
          console.log("go to horse details page", horseUrl);
          _context2.next = 23;
          return page["goto"](horseUrl, {
            waitUntil: "networkidle0"
          });

        case 23:
          _context2.next = 25;
          return page.evaluate(function () {
            var horseName = Array.from(document.querySelectorAll("h1"), function (e) {
              return e.innerText;
            })[0];
            return horseName;
          });

        case 25:
          name = _context2.sent;
          console.log("scrap data for horse ", name);
          oldRacesData = [];
          isLastPage = false;
          pageNumber = 1;

        case 30:
          if (isLastPage) {
            _context2.next = 47;
            break;
          }

          console.log("scrap data for horse ", name);
          horsePaginateUrl = "".concat(horseUrl).concat(pageNumber);
          console.log(horsePaginateUrl);
          _context2.next = 36;
          return page["goto"](horsePaginateUrl, {
            waitUntil: "networkidle0"
          });

        case 36:
          _context2.next = 38;
          return page.evaluate(function () {
            var lines = Array.from(document.querySelectorAll(".informationscourse"), function (e) {
              return [e.childNodes[0].textContent, e.childNodes[2].textContent];
            });
            return lines;
          });

        case 38:
          lines = _context2.sent;
          tmpOldRacesData = lines.map(function (_ref2) {
            var _ref3 = _slicedToArray(_ref2, 2),
                first = _ref3[0],
                second = _ref3[1];

            var _first$split = first.split("-"),
                _first$split2 = _slicedToArray(_first$split, 2),
                date = _first$split2[0],
                reunionName = _first$split2[1];

            var _date$split = date.split(" "),
                _date$split2 = _slicedToArray(_date$split, 3),
                day = _date$split2[0],
                month = _date$split2[1],
                year = _date$split2[2];

            var parser = {
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
            var courseName = second.split("-")[0];
            return {
              dateString: "".concat(year.slice(-2)).concat(parser[month]).concat(day),
              reunionName: reunionName,
              courseName: courseName
            };
          });
          oldRacesData = oldRacesData.concat(tmpOldRacesData);
          _context2.next = 43;
          return page.evaluate(function () {
            return Array.from(document.querySelectorAll("a"), function (e) {
              return e.innerText;
            }).every(function (x) {
              return x !== "Page suivante";
            });
          });

        case 43:
          isLastPage = _context2.sent;
          pageNumber++;
          _context2.next = 30;
          break;

        case 47:
          // Get real races data
          history = [];
          _iterator2 = _createForOfIteratorHelper(oldRacesData);
          _context2.prev = 49;
          _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
            var oldRaceData, realOldRacesUrl, programHrefs, raceUrl, raceName, raceNumber, meetingName, meetingNumber, date, results;
            return _regeneratorRuntime().wrap(function _loop$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    oldRaceData = _step2.value;
                    // Search real race page
                    realOldRacesUrl = "https://www.turfoo.fr/programmes-courses/".concat(oldRaceData.dateString, "/");
                    _context.next = 4;
                    return page["goto"](realOldRacesUrl, {
                      waitUntil: "networkidle0"
                    });

                  case 4:
                    _context.next = 6;
                    return page.evaluate(function () {
                      return Array.from(document.querySelectorAll("a"), function (e) {
                        return e.href;
                      });
                    });

                  case 6:
                    programHrefs = _context.sent;
                    raceUrl = programHrefs.find(function (href) {
                      return href.match(new RegExp(oldRaceData.courseName.replace(/\(.+/, "").replace(/[ ']/g, "-"), "i"));
                    });

                    if (!(typeof raceUrl !== "undefined")) {
                      _context.next = 34;
                      break;
                    }

                    _context.next = 11;
                    return page["goto"](raceUrl, {
                      waitUntil: "networkidle0"
                    });

                  case 11:
                    console.group("HISTORY");
                    console.log("scrap history");
                    console.log(raceUrl); // GET RACE NAME

                    _context.next = 16;
                    return (0, _racePage.racePage)(page).getRaceName();

                  case 16:
                    raceName = _context.sent;
                    _context.next = 19;
                    return (0, _racePage.racePage)(page).getRaceNumber();

                  case 19:
                    raceNumber = _context.sent;
                    _context.next = 22;
                    return (0, _racePage.racePage)(page).getMeetingName();

                  case 22:
                    meetingName = _context.sent;
                    _context.next = 25;
                    return (0, _racePage.racePage)(page).getMeetingNumber();

                  case 25:
                    meetingNumber = _context.sent;
                    _context.next = 28;
                    return (0, _racePage.racePage)(page).getDate();

                  case 28:
                    date = _context.sent;
                    _context.next = 31;
                    return (0, _racePage.racePage)(page).getResult();

                  case 31:
                    results = _context.sent;
                    // ADD HISTORY
                    history.push({
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
                    console.groupEnd();

                  case 34:
                    console.log("history", history);

                  case 35:
                  case "end":
                    return _context.stop();
                }
              }
            }, _loop);
          });

          _iterator2.s();

        case 52:
          if ((_step2 = _iterator2.n()).done) {
            _context2.next = 56;
            break;
          }

          return _context2.delegateYield(_loop(), "t0", 54);

        case 54:
          _context2.next = 52;
          break;

        case 56:
          _context2.next = 61;
          break;

        case 58:
          _context2.prev = 58;
          _context2.t1 = _context2["catch"](49);

          _iterator2.e(_context2.t1);

        case 61:
          _context2.prev = 61;

          _iterator2.f();

          return _context2.finish(61);

        case 64:
          horsesNames.push({
            name: name
          });

        case 65:
          _context2.next = 18;
          break;

        case 67:
          _context2.next = 72;
          break;

        case 69:
          _context2.prev = 69;
          _context2.t2 = _context2["catch"](16);

          _iterator.e(_context2.t2);

        case 72:
          _context2.prev = 72;

          _iterator.f();

          return _context2.finish(72);

        case 75:
          _context2.next = 77;
          return browser.close();

        case 77:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee, null, [[16, 69, 72, 75], [49, 58, 61, 64]]);
}))();