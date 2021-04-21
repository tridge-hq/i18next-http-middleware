"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var utils = _interopRequireWildcard(require("./utils.js"));

var _cookie = _interopRequireDefault(require("./languageLookups/cookie.js"));

var _querystring = _interopRequireDefault(require("./languageLookups/querystring.js"));

var _path = _interopRequireDefault(require("./languageLookups/path.js"));

var _header = _interopRequireDefault(require("./languageLookups/header.js"));

var _session = _interopRequireDefault(require("./languageLookups/session.js"));

var _httpFunctions = require("./httpFunctions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function getDefaults() {
  return (0, _httpFunctions.extendOptionsWithDefaults)({
    order: ['querystring', 'cookie', 'header'],
    lookupQuerystring: 'lng',
    lookupCookie: 'i18next',
    lookupSession: 'lng',
    lookupFromPathIndex: 0,
    caches: false,
    cookieSameSite: 'strict',
    ignoreCase: true
  });
}

var LanguageDetector = function () {
  function LanguageDetector(services) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var allOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, LanguageDetector);

    this.type = 'languageDetector';
    this.async = true;
    this.detectors = {};
    this.init(services, options, allOptions);
  }

  _createClass(LanguageDetector, [{
    key: "init",
    value: function init(services) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var allOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      this.services = services;
      this.options = utils.defaults(options, this.options || {}, getDefaults());
      this.allOptions = allOptions;
      this.addDetector(_cookie.default);
      this.addDetector(_querystring.default);
      this.addDetector(_path.default);
      this.addDetector(_header.default);
      this.addDetector(_session.default);
    }
  }, {
    key: "addDetector",
    value: function addDetector(detector) {
      this.detectors[detector.name] = detector;
    }
  }, {
    key: "detect",
    value: function () {
      var _detect = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res, detectionOrder) {
        var setLng,
            found,
            _iterator,
            _step,
            detectorName,
            detections,
            fallbacks,
            _args = arguments;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log('i18next-http-middleware/lib/LanguageDetector.js', 'detect');

                if (!(_args.length < 2)) {
                  _context.next = 5;
                  break;
                }

                setLng = req;
                setLng();
                return _context.abrupt("return");

              case 5:
                if (!detectionOrder) detectionOrder = this.options.order;
                _iterator = _createForOfIteratorHelper(detectionOrder);
                _context.prev = 7;

                _iterator.s();

              case 9:
                if ((_step = _iterator.n()).done) {
                  _context.next = 24;
                  break;
                }

                detectorName = _step.value;

                if (!(found || !this.detectors[detectorName])) {
                  _context.next = 13;
                  break;
                }

                return _context.abrupt("break", 24);

              case 13:
                _context.next = 15;
                return this.detectors[detectorName].lookup(req, res, this.options);

              case 15:
                detections = _context.sent;
                console.log('i18next-http-middleware/lib/LanguageDetector.js', 'detections', detections);

                if (detections) {
                  _context.next = 19;
                  break;
                }

                return _context.abrupt("continue", 22);

              case 19:
                if (!Array.isArray(detections)) detections = [detections];
                detections = detections.filter(function (d) {
                  return d !== undefined && d !== null;
                });

                if (this.services.languageUtils.getBestMatchFromCodes) {
                  found = this.services.languageUtils.getBestMatchFromCodes(detections);

                  if (found) {
                    if (this.options.ignoreCase) {
                      if (detections.map(function (d) {
                        return d.toLowerCase();
                      }).indexOf(found.toLowerCase()) < 0) found = undefined;
                    } else {
                      if (detections.indexOf(found) < 0) found = undefined;
                    }
                  }

                  if (found) req.i18nextLookupName = detectorName;
                } else {
                  found = detections.length > 0 ? detections[0] : null;
                }

              case 22:
                _context.next = 9;
                break;

              case 24:
                _context.next = 29;
                break;

              case 26:
                _context.prev = 26;
                _context.t0 = _context["catch"](7);

                _iterator.e(_context.t0);

              case 29:
                _context.prev = 29;

                _iterator.f();

                return _context.finish(29);

              case 32:
                console.log('i18next-http-middleware/lib/LanguageDetector.js', 'found', 1, found);

                if (!found) {
                  fallbacks = this.allOptions.fallbackLng;
                  if (typeof fallbacks === 'string') fallbacks = [fallbacks];
                  if (!fallbacks) fallbacks = [];

                  if (Object.prototype.toString.apply(fallbacks) === '[object Array]') {
                    found = fallbacks[0];
                  } else {
                    found = fallbacks[0] || fallbacks.default && fallbacks.default[0];
                  }
                }

                ;
                console.log('i18next-http-middleware/lib/LanguageDetector.js', 'found', 2, found);
                return _context.abrupt("return", found);

              case 37:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[7, 26, 29, 32]]);
      }));

      function detect(_x, _x2, _x3) {
        return _detect.apply(this, arguments);
      }

      return detect;
    }()
  }, {
    key: "cacheUserLanguage",
    value: function cacheUserLanguage(req, res, lng, caches) {
      var _this = this;

      if (arguments.length < 3) return;
      if (!caches) caches = this.options.caches;
      if (!caches) return;
      caches.forEach(function (cacheName) {
        if (_this.detectors[cacheName] && _this.detectors[cacheName].cacheUserLanguage && res.cachedUserLanguage !== lng) {
          _this.detectors[cacheName].cacheUserLanguage(req, res, lng, _this.options);

          res.cachedUserLanguage = lng;
        }
      });
    }
  }]);

  return LanguageDetector;
}();

LanguageDetector.type = 'languageDetector';
var _default = LanguageDetector;
exports.default = _default;
module.exports = exports.default;