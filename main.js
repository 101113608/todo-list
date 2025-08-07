/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 56:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ 72:
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 113:
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ 314:
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ 354:
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ 474:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `// extracted by mini-css-extract-plugin
export {};`, "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"AAAA;QACS,CAAA","sourcesContent":["// extracted by mini-css-extract-plugin\nexport {};"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 540:
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ 659:
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ 825:
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(72);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(825);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(659);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(56);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(540);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(113);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./src/styles.css
var styles = __webpack_require__(474);
;// ./src/styles.css

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());
options.insert = insertBySelector_default().bind(null, "head");
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(styles/* default */.A, options);




       /* harmony default export */ const src_styles = (styles/* default */.A && styles/* default */.A.locals ? styles/* default */.A.locals : undefined);

;// ./src/js/logic/utility.js
class Valid {
    static setterValue({ variableName, currentValue, newValue }) {
        let valid = false;

        if (!newValue) {
            console.warn(`'${variableName}' was not updated: provided value is null/empty.`);
            return valid;
        }

        if (currentValue === newValue) {
            console.warn(`'${variableName}' was not updated: provided value is the same as the current value.`);
            return valid;
        }

        valid = true;
        return valid;
    }

    static indexValue(index) {
        if (index !== -1 && index !== null && index !== undefined && typeof index === "number") {
            return true;
        }

        return false;
    }

    static objectValue(object) {
        if (object !== null && object !== undefined && typeof object === "object") {
            return true;
        }

        return false;
    }
}

class Extract {
    static formValues(form) {
        const formData = new FormData(form);
        const object = {}

        for (let [key, value] of formData.entries()) {
            object[key] = value;
        }

        return object;
    }
}

function capitaliseString(string) {
    if (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}


;// ./src/js/logic/pub-sub.js
// Publisher/Subscriber Component
const PubSub = (function () {
    const events = {
        // e.g., event1: [fnForEvent1, fnForEvent2, etc.]
    };
    const subscribe = ({ eventName, callbackFn }) => {
        // Create new array to store functions if does not exist
        if (!events[eventName]) {
            events[eventName] = [];
        }
        // Subscribe to event
        events[eventName].push(callbackFn);
    }
    const publish = ({ eventName, data = null }) => {
        // Notify that the event has occurred
        if (events[eventName]) {
            events[eventName].forEach(callbackFn => {
                // Perform given action for specific subscriber
                callbackFn(data);
            });
        }
    }
    const unsubscribe = ({ eventName, callbackFn }) => {
        // Remove callback function from being called by specific event
        if (events[eventName]) {
            events[eventName] = events[eventName].filter(fn => {
                fn !== callbackFn;
            });
        }
    }
    return { subscribe, publish, unsubscribe };
})();




;// ./node_modules/date-fns/locale/en-US/_lib/formatDistance.js
const formatDistanceLocale = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds",
  },

  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds",
  },

  halfAMinute: "half a minute",

  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes",
  },

  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes",
  },

  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours",
  },

  xHours: {
    one: "1 hour",
    other: "{{count}} hours",
  },

  xDays: {
    one: "1 day",
    other: "{{count}} days",
  },

  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks",
  },

  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks",
  },

  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months",
  },

  xMonths: {
    one: "1 month",
    other: "{{count}} months",
  },

  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years",
  },

  xYears: {
    one: "1 year",
    other: "{{count}} years",
  },

  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years",
  },

  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years",
  },
};

const formatDistance = (token, count, options) => {
  let result;

  const tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }

  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return result + " ago";
    }
  }

  return result;
};

;// ./node_modules/date-fns/locale/_lib/buildFormatLongFn.js
function buildFormatLongFn(args) {
  return (options = {}) => {
    // TODO: Remove String()
    const width = options.width ? String(options.width) : args.defaultWidth;
    const format = args.formats[width] || args.formats[args.defaultWidth];
    return format;
  };
}

;// ./node_modules/date-fns/locale/en-US/_lib/formatLong.js


const dateFormats = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy",
};

const timeFormats = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a",
};

const dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}",
};

const formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: "full",
  }),

  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: "full",
  }),

  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: "full",
  }),
};

;// ./node_modules/date-fns/locale/en-US/_lib/formatRelative.js
const formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P",
};

const formatRelative = (token, _date, _baseDate, _options) =>
  formatRelativeLocale[token];

;// ./node_modules/date-fns/locale/_lib/buildLocalizeFn.js
/**
 * The localize function argument callback which allows to convert raw value to
 * the actual type.
 *
 * @param value - The value to convert
 *
 * @returns The converted value
 */

/**
 * The map of localized values for each width.
 */

/**
 * The index type of the locale unit value. It types conversion of units of
 * values that don't start at 0 (i.e. quarters).
 */

/**
 * Converts the unit value to the tuple of values.
 */

/**
 * The tuple of localized era values. The first element represents BC,
 * the second element represents AD.
 */

/**
 * The tuple of localized quarter values. The first element represents Q1.
 */

/**
 * The tuple of localized day values. The first element represents Sunday.
 */

/**
 * The tuple of localized month values. The first element represents January.
 */

function buildLocalizeFn(args) {
  return (value, options) => {
    const context = options?.context ? String(options.context) : "standalone";

    let valuesArray;
    if (context === "formatting" && args.formattingValues) {
      const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      const width = options?.width ? String(options.width) : defaultWidth;

      valuesArray =
        args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      const defaultWidth = args.defaultWidth;
      const width = options?.width ? String(options.width) : args.defaultWidth;

      valuesArray = args.values[width] || args.values[defaultWidth];
    }
    const index = args.argumentCallback ? args.argumentCallback(value) : value;

    // @ts-expect-error - For some reason TypeScript just don't want to match it, no matter how hard we try. I challenge you to try to remove it!
    return valuesArray[index];
  };
}

;// ./node_modules/date-fns/locale/en-US/_lib/localize.js


const eraValues = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"],
};

const quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
};

// Note: in English, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.
const monthValues = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],

  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};

const dayValues = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
};

const dayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night",
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night",
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night",
  },
};

const formattingDayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night",
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night",
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night",
  },
};

const ordinalNumber = (dirtyNumber, _options) => {
  const number = Number(dirtyNumber);

  // If ordinal numbers depend on context, for example,
  // if they are different for different grammatical genders,
  // use `options.unit`.
  //
  // `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
  // 'day', 'hour', 'minute', 'second'.

  const rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
    }
  }
  return number + "th";
};

const localize = {
  ordinalNumber,

  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: "wide",
  }),

  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1,
  }),

  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: "wide",
  }),

  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: "wide",
  }),

  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide",
  }),
};

;// ./node_modules/date-fns/locale/_lib/buildMatchFn.js
function buildMatchFn(args) {
  return (string, options = {}) => {
    const width = options.width;

    const matchPattern =
      (width && args.matchPatterns[width]) ||
      args.matchPatterns[args.defaultMatchWidth];
    const matchResult = string.match(matchPattern);

    if (!matchResult) {
      return null;
    }
    const matchedString = matchResult[0];

    const parsePatterns =
      (width && args.parsePatterns[width]) ||
      args.parsePatterns[args.defaultParseWidth];

    const key = Array.isArray(parsePatterns)
      ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString))
      : // [TODO] -- I challenge you to fix the type
        findKey(parsePatterns, (pattern) => pattern.test(matchedString));

    let value;

    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback
      ? // [TODO] -- I challenge you to fix the type
        options.valueCallback(value)
      : value;

    const rest = string.slice(matchedString.length);

    return { value, rest };
  };
}

function findKey(object, predicate) {
  for (const key in object) {
    if (
      Object.prototype.hasOwnProperty.call(object, key) &&
      predicate(object[key])
    ) {
      return key;
    }
  }
  return undefined;
}

function findIndex(array, predicate) {
  for (let key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return undefined;
}

;// ./node_modules/date-fns/locale/_lib/buildMatchPatternFn.js
function buildMatchPatternFn(args) {
  return (string, options = {}) => {
    const matchResult = string.match(args.matchPattern);
    if (!matchResult) return null;
    const matchedString = matchResult[0];

    const parseResult = string.match(args.parsePattern);
    if (!parseResult) return null;
    let value = args.valueCallback
      ? args.valueCallback(parseResult[0])
      : parseResult[0];

    // [TODO] I challenge you to fix the type
    value = options.valueCallback ? options.valueCallback(value) : value;

    const rest = string.slice(matchedString.length);

    return { value, rest };
  };
}

;// ./node_modules/date-fns/locale/en-US/_lib/match.js



const matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
const parseOrdinalNumberPattern = /\d+/i;

const matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i,
};
const parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i],
};

const matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i,
};
const parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i],
};

const matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
};
const parseMonthPatterns = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i,
  ],

  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i,
  ],
};

const matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
};
const parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
};

const matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
};
const parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i,
  },
};

const match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: (value) => parseInt(value, 10),
  }),

  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any",
  }),

  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1,
  }),

  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any",
  }),

  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any",
  }),

  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any",
  }),
};

;// ./node_modules/date-fns/locale/en-US.js






/**
 * @category Locales
 * @summary English locale (United States).
 * @language English
 * @iso-639-2 eng
 * @author Sasha Koss [@kossnocorp](https://github.com/kossnocorp)
 * @author Lesha Koss [@leshakoss](https://github.com/leshakoss)
 */
const enUS = {
  code: "en-US",
  formatDistance: formatDistance,
  formatLong: formatLong,
  formatRelative: formatRelative,
  localize: localize,
  match: match,
  options: {
    weekStartsOn: 0 /* Sunday */,
    firstWeekContainsDate: 1,
  },
};

// Fallback for modularized imports:
/* harmony default export */ const en_US = ((/* unused pure expression or super */ null && (enUS)));

;// ./node_modules/date-fns/_lib/defaultOptions.js
let defaultOptions = {};

function getDefaultOptions() {
  return defaultOptions;
}

function setDefaultOptions(newOptions) {
  defaultOptions = newOptions;
}

;// ./node_modules/date-fns/constants.js
/**
 * @module constants
 * @summary Useful constants
 * @description
 * Collection of useful date constants.
 *
 * The constants could be imported from `date-fns/constants`:
 *
 * ```ts
 * import { maxTime, minTime } from "./constants/date-fns/constants";
 *
 * function isAllowedTime(time) {
 *   return time <= maxTime && time >= minTime;
 * }
 * ```
 */

/**
 * @constant
 * @name daysInWeek
 * @summary Days in 1 week.
 */
const daysInWeek = 7;

/**
 * @constant
 * @name daysInYear
 * @summary Days in 1 year.
 *
 * @description
 * How many days in a year.
 *
 * One years equals 365.2425 days according to the formula:
 *
 * > Leap year occurs every 4 years, except for years that are divisible by 100 and not divisible by 400.
 * > 1 mean year = (365+1/4-1/100+1/400) days = 365.2425 days
 */
const daysInYear = 365.2425;

/**
 * @constant
 * @name maxTime
 * @summary Maximum allowed time.
 *
 * @example
 * import { maxTime } from "./constants/date-fns/constants";
 *
 * const isValid = 8640000000000001 <= maxTime;
 * //=> false
 *
 * new Date(8640000000000001);
 * //=> Invalid Date
 */
const maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1000;

/**
 * @constant
 * @name minTime
 * @summary Minimum allowed time.
 *
 * @example
 * import { minTime } from "./constants/date-fns/constants";
 *
 * const isValid = -8640000000000001 >= minTime;
 * //=> false
 *
 * new Date(-8640000000000001)
 * //=> Invalid Date
 */
const minTime = -maxTime;

/**
 * @constant
 * @name millisecondsInWeek
 * @summary Milliseconds in 1 week.
 */
const millisecondsInWeek = 604800000;

/**
 * @constant
 * @name millisecondsInDay
 * @summary Milliseconds in 1 day.
 */
const millisecondsInDay = 86400000;

/**
 * @constant
 * @name millisecondsInMinute
 * @summary Milliseconds in 1 minute
 */
const millisecondsInMinute = 60000;

/**
 * @constant
 * @name millisecondsInHour
 * @summary Milliseconds in 1 hour
 */
const millisecondsInHour = 3600000;

/**
 * @constant
 * @name millisecondsInSecond
 * @summary Milliseconds in 1 second
 */
const millisecondsInSecond = 1000;

/**
 * @constant
 * @name minutesInYear
 * @summary Minutes in 1 year.
 */
const minutesInYear = 525600;

/**
 * @constant
 * @name minutesInMonth
 * @summary Minutes in 1 month.
 */
const minutesInMonth = 43200;

/**
 * @constant
 * @name minutesInDay
 * @summary Minutes in 1 day.
 */
const minutesInDay = 1440;

/**
 * @constant
 * @name minutesInHour
 * @summary Minutes in 1 hour.
 */
const minutesInHour = 60;

/**
 * @constant
 * @name monthsInQuarter
 * @summary Months in 1 quarter.
 */
const monthsInQuarter = 3;

/**
 * @constant
 * @name monthsInYear
 * @summary Months in 1 year.
 */
const monthsInYear = 12;

/**
 * @constant
 * @name quartersInYear
 * @summary Quarters in 1 year
 */
const quartersInYear = 4;

/**
 * @constant
 * @name secondsInHour
 * @summary Seconds in 1 hour.
 */
const secondsInHour = 3600;

/**
 * @constant
 * @name secondsInMinute
 * @summary Seconds in 1 minute.
 */
const secondsInMinute = 60;

/**
 * @constant
 * @name secondsInDay
 * @summary Seconds in 1 day.
 */
const secondsInDay = secondsInHour * 24;

/**
 * @constant
 * @name secondsInWeek
 * @summary Seconds in 1 week.
 */
const secondsInWeek = secondsInDay * 7;

/**
 * @constant
 * @name secondsInYear
 * @summary Seconds in 1 year.
 */
const secondsInYear = secondsInDay * daysInYear;

/**
 * @constant
 * @name secondsInMonth
 * @summary Seconds in 1 month
 */
const secondsInMonth = secondsInYear / 12;

/**
 * @constant
 * @name secondsInQuarter
 * @summary Seconds in 1 quarter.
 */
const secondsInQuarter = secondsInMonth * 3;

/**
 * @constant
 * @name constructFromSymbol
 * @summary Symbol enabling Date extensions to inherit properties from the reference date.
 *
 * The symbol is used to enable the `constructFrom` function to construct a date
 * using a reference date and a value. It allows to transfer extra properties
 * from the reference date to the new date. It's useful for extensions like
 * [`TZDate`](https://github.com/date-fns/tz) that accept a time zone as
 * a constructor argument.
 */
const constructFromSymbol = Symbol.for("constructDateFrom");

;// ./node_modules/date-fns/constructFrom.js


/**
 * @name constructFrom
 * @category Generic Helpers
 * @summary Constructs a date using the reference date and the value
 *
 * @description
 * The function constructs a new date using the constructor from the reference
 * date and the given value. It helps to build generic functions that accept
 * date extensions.
 *
 * It defaults to `Date` if the passed reference date is a number or a string.
 *
 * Starting from v3.7.0, it allows to construct a date using `[Symbol.for("constructDateFrom")]`
 * enabling to transfer extra properties from the reference date to the new date.
 * It's useful for extensions like [`TZDate`](https://github.com/date-fns/tz)
 * that accept a time zone as a constructor argument.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The reference date to take constructor from
 * @param value - The value to create the date
 *
 * @returns Date initialized using the given date and value
 *
 * @example
 * import { constructFrom } from "./constructFrom/date-fns";
 *
 * // A function that clones a date preserving the original type
 * function cloneDate<DateType extends Date>(date: DateType): DateType {
 *   return constructFrom(
 *     date, // Use constructor from the given date
 *     date.getTime() // Use the date value to create a new date
 *   );
 * }
 */
function constructFrom(date, value) {
  if (typeof date === "function") return date(value);

  if (date && typeof date === "object" && constructFromSymbol in date)
    return date[constructFromSymbol](value);

  if (date instanceof Date) return new date.constructor(value);

  return new Date(value);
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_constructFrom = ((/* unused pure expression or super */ null && (constructFrom)));

;// ./node_modules/date-fns/toDate.js


/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * Starting from v3.7.0, it clones a date using `[Symbol.for("constructDateFrom")]`
 * enabling to transfer extra properties from the reference date to the new date.
 * It's useful for extensions like [`TZDate`](https://github.com/date-fns/tz)
 * that accept a time zone as a constructor argument.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param argument - The value to convert
 *
 * @returns The parsed date in the local time zone
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */
function toDate(argument, context) {
  // [TODO] Get rid of `toDate` or `constructFrom`?
  return constructFrom(context || argument, argument);
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_toDate = ((/* unused pure expression or super */ null && (toDate)));

;// ./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js


/**
 * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
 * They usually appear for dates that denote time before the timezones were introduced
 * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
 * and GMT+01:00:00 after that date)
 *
 * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
 * which would lead to incorrect calculations.
 *
 * This function returns the timezone offset in milliseconds that takes seconds in account.
 */
function getTimezoneOffsetInMilliseconds(date) {
  const _date = toDate(date);
  const utcDate = new Date(
    Date.UTC(
      _date.getFullYear(),
      _date.getMonth(),
      _date.getDate(),
      _date.getHours(),
      _date.getMinutes(),
      _date.getSeconds(),
      _date.getMilliseconds(),
    ),
  );
  utcDate.setUTCFullYear(_date.getFullYear());
  return +date - +utcDate;
}

;// ./node_modules/date-fns/_lib/normalizeDates.js


function normalizeDates(context, ...dates) {
  const normalize = constructFrom.bind(
    null,
    context || dates.find((date) => typeof date === "object"),
  );
  return dates.map(normalize);
}

;// ./node_modules/date-fns/startOfDay.js


/**
 * The {@link startOfDay} function options.
 */

/**
 * @name startOfDay
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - The options
 *
 * @returns The start of a day
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
function startOfDay(date, options) {
  const _date = toDate(date, options?.in);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_startOfDay = ((/* unused pure expression or super */ null && (startOfDay)));

;// ./node_modules/date-fns/differenceInCalendarDays.js





/**
 * The {@link differenceInCalendarDays} function options.
 */

/**
 * @name differenceInCalendarDays
 * @category Day Helpers
 * @summary Get the number of calendar days between the given dates.
 *
 * @description
 * Get the number of calendar days between the given dates. This means that the times are removed
 * from the dates and then the difference in days is calculated.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - The options object
 *
 * @returns The number of calendar days
 *
 * @example
 * // How many calendar days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * const result = differenceInCalendarDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 366
 * // How many calendar days are between
 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
 * const result = differenceInCalendarDays(
 *   new Date(2011, 6, 3, 0, 1),
 *   new Date(2011, 6, 2, 23, 59)
 * )
 * //=> 1
 */
function differenceInCalendarDays(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate,
  );

  const laterStartOfDay = startOfDay(laterDate_);
  const earlierStartOfDay = startOfDay(earlierDate_);

  const laterTimestamp =
    +laterStartOfDay - getTimezoneOffsetInMilliseconds(laterStartOfDay);
  const earlierTimestamp =
    +earlierStartOfDay - getTimezoneOffsetInMilliseconds(earlierStartOfDay);

  // Round the number of days to the nearest integer because the number of
  // milliseconds in a day is not constant (e.g. it's different in the week of
  // the daylight saving time clock shift).
  return Math.round((laterTimestamp - earlierTimestamp) / millisecondsInDay);
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_differenceInCalendarDays = ((/* unused pure expression or super */ null && (differenceInCalendarDays)));

;// ./node_modules/date-fns/startOfYear.js


/**
 * The {@link startOfYear} function options.
 */

/**
 * @name startOfYear
 * @category Year Helpers
 * @summary Return the start of a year for the given date.
 *
 * @description
 * Return the start of a year for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - The options
 *
 * @returns The start of a year
 *
 * @example
 * // The start of a year for 2 September 2014 11:55:00:
 * const result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Jan 01 2014 00:00:00
 */
function startOfYear(date, options) {
  const date_ = toDate(date, options?.in);
  date_.setFullYear(date_.getFullYear(), 0, 1);
  date_.setHours(0, 0, 0, 0);
  return date_;
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_startOfYear = ((/* unused pure expression or super */ null && (startOfYear)));

;// ./node_modules/date-fns/getDayOfYear.js




/**
 * The {@link getDayOfYear} function options.
 */

/**
 * @name getDayOfYear
 * @category Day Helpers
 * @summary Get the day of the year of the given date.
 *
 * @description
 * Get the day of the year of the given date.
 *
 * @param date - The given date
 * @param options - The options
 *
 * @returns The day of year
 *
 * @example
 * // Which day of the year is 2 July 2014?
 * const result = getDayOfYear(new Date(2014, 6, 2))
 * //=> 183
 */
function getDayOfYear(date, options) {
  const _date = toDate(date, options?.in);
  const diff = differenceInCalendarDays(_date, startOfYear(_date));
  const dayOfYear = diff + 1;
  return dayOfYear;
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_getDayOfYear = ((/* unused pure expression or super */ null && (getDayOfYear)));

;// ./node_modules/date-fns/startOfWeek.js



/**
 * The {@link startOfWeek} function options.
 */

/**
 * @name startOfWeek
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a week
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfWeek(date, options) {
  const defaultOptions = getDefaultOptions();
  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const _date = toDate(date, options?.in);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;

  _date.setDate(_date.getDate() - diff);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_startOfWeek = ((/* unused pure expression or super */ null && (startOfWeek)));

;// ./node_modules/date-fns/startOfISOWeek.js


/**
 * The {@link startOfISOWeek} function options.
 */

/**
 * @name startOfISOWeek
 * @category ISO Week Helpers
 * @summary Return the start of an ISO week for the given date.
 *
 * @description
 * Return the start of an ISO week for the given date.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of an ISO week
 *
 * @example
 * // The start of an ISO week for 2 September 2014 11:55:00:
 * const result = startOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfISOWeek(date, options) {
  return startOfWeek(date, { ...options, weekStartsOn: 1 });
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_startOfISOWeek = ((/* unused pure expression or super */ null && (startOfISOWeek)));

;// ./node_modules/date-fns/getISOWeekYear.js




/**
 * The {@link getISOWeekYear} function options.
 */

/**
 * @name getISOWeekYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Get the ISO week-numbering year of the given date.
 *
 * @description
 * Get the ISO week-numbering year of the given date,
 * which always starts 3 days before the year's first Thursday.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The given date
 *
 * @returns The ISO week-numbering year
 *
 * @example
 * // Which ISO-week numbering year is 2 January 2005?
 * const result = getISOWeekYear(new Date(2005, 0, 2))
 * //=> 2004
 */
function getISOWeekYear(date, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();

  const fourthOfJanuaryOfNextYear = constructFrom(_date, 0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);

  const fourthOfJanuaryOfThisYear = constructFrom(_date, 0);
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);

  if (_date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (_date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_getISOWeekYear = ((/* unused pure expression or super */ null && (getISOWeekYear)));

;// ./node_modules/date-fns/startOfISOWeekYear.js




/**
 * The {@link startOfISOWeekYear} function options.
 */

/**
 * @name startOfISOWeekYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Return the start of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the start of an ISO week-numbering year,
 * which always starts 3 days before the year's first Thursday.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of an ISO week-numbering year
 *
 * @example
 * // The start of an ISO week-numbering year for 2 July 2005:
 * const result = startOfISOWeekYear(new Date(2005, 6, 2))
 * //=> Mon Jan 03 2005 00:00:00
 */
function startOfISOWeekYear(date, options) {
  const year = getISOWeekYear(date, options);
  const fourthOfJanuary = constructFrom(options?.in || date, 0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  return startOfISOWeek(fourthOfJanuary);
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_startOfISOWeekYear = ((/* unused pure expression or super */ null && (startOfISOWeekYear)));

;// ./node_modules/date-fns/getISOWeek.js





/**
 * The {@link getISOWeek} function options.
 */

/**
 * @name getISOWeek
 * @category ISO Week Helpers
 * @summary Get the ISO week of the given date.
 *
 * @description
 * Get the ISO week of the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The given date
 * @param options - The options
 *
 * @returns The ISO week
 *
 * @example
 * // Which week of the ISO-week numbering year is 2 January 2005?
 * const result = getISOWeek(new Date(2005, 0, 2))
 * //=> 53
 */
function getISOWeek(date, options) {
  const _date = toDate(date, options?.in);
  const diff = +startOfISOWeek(_date) - +startOfISOWeekYear(_date);

  // Round the number of weeks to the nearest integer because the number of
  // milliseconds in a week is not constant (e.g. it's different in the week of
  // the daylight saving time clock shift).
  return Math.round(diff / millisecondsInWeek) + 1;
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_getISOWeek = ((/* unused pure expression or super */ null && (getISOWeek)));

;// ./node_modules/date-fns/getWeekYear.js





/**
 * The {@link getWeekYear} function options.
 */

/**
 * @name getWeekYear
 * @category Week-Numbering Year Helpers
 * @summary Get the local week-numbering year of the given date.
 *
 * @description
 * Get the local week-numbering year of the given date.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @param date - The given date
 * @param options - An object with options.
 *
 * @returns The local week-numbering year
 *
 * @example
 * // Which week numbering year is 26 December 2004 with the default settings?
 * const result = getWeekYear(new Date(2004, 11, 26))
 * //=> 2005
 *
 * @example
 * // Which week numbering year is 26 December 2004 if week starts on Saturday?
 * const result = getWeekYear(new Date(2004, 11, 26), { weekStartsOn: 6 })
 * //=> 2004
 *
 * @example
 * // Which week numbering year is 26 December 2004 if the first week contains 4 January?
 * const result = getWeekYear(new Date(2004, 11, 26), { firstWeekContainsDate: 4 })
 * //=> 2004
 */
function getWeekYear(date, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();

  const defaultOptions = getDefaultOptions();
  const firstWeekContainsDate =
    options?.firstWeekContainsDate ??
    options?.locale?.options?.firstWeekContainsDate ??
    defaultOptions.firstWeekContainsDate ??
    defaultOptions.locale?.options?.firstWeekContainsDate ??
    1;

  const firstWeekOfNextYear = constructFrom(options?.in || date, 0);
  firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfWeek(firstWeekOfNextYear, options);

  const firstWeekOfThisYear = constructFrom(options?.in || date, 0);
  firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfWeek(firstWeekOfThisYear, options);

  if (+_date >= +startOfNextYear) {
    return year + 1;
  } else if (+_date >= +startOfThisYear) {
    return year;
  } else {
    return year - 1;
  }
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_getWeekYear = ((/* unused pure expression or super */ null && (getWeekYear)));

;// ./node_modules/date-fns/startOfWeekYear.js





/**
 * The {@link startOfWeekYear} function options.
 */

/**
 * @name startOfWeekYear
 * @category Week-Numbering Year Helpers
 * @summary Return the start of a local week-numbering year for the given date.
 *
 * @description
 * Return the start of a local week-numbering year.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a week-numbering year
 *
 * @example
 * // The start of an a week-numbering year for 2 July 2005 with default settings:
 * const result = startOfWeekYear(new Date(2005, 6, 2))
 * //=> Sun Dec 26 2004 00:00:00
 *
 * @example
 * // The start of a week-numbering year for 2 July 2005
 * // if Monday is the first day of week
 * // and 4 January is always in the first week of the year:
 * const result = startOfWeekYear(new Date(2005, 6, 2), {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> Mon Jan 03 2005 00:00:00
 */
function startOfWeekYear(date, options) {
  const defaultOptions = getDefaultOptions();
  const firstWeekContainsDate =
    options?.firstWeekContainsDate ??
    options?.locale?.options?.firstWeekContainsDate ??
    defaultOptions.firstWeekContainsDate ??
    defaultOptions.locale?.options?.firstWeekContainsDate ??
    1;

  const year = getWeekYear(date, options);
  const firstWeek = constructFrom(options?.in || date, 0);
  firstWeek.setFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setHours(0, 0, 0, 0);
  const _date = startOfWeek(firstWeek, options);
  return _date;
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_startOfWeekYear = ((/* unused pure expression or super */ null && (startOfWeekYear)));

;// ./node_modules/date-fns/getWeek.js





/**
 * The {@link getWeek} function options.
 */

/**
 * @name getWeek
 * @category Week Helpers
 * @summary Get the local week index of the given date.
 *
 * @description
 * Get the local week index of the given date.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The week
 *
 * @example
 * // Which week of the local week numbering year is 2 January 2005 with default options?
 * const result = getWeek(new Date(2005, 0, 2))
 * //=> 2
 *
 * @example
 * // Which week of the local week numbering year is 2 January 2005,
 * // if Monday is the first day of the week,
 * // and the first week of the year always contains 4 January?
 * const result = getWeek(new Date(2005, 0, 2), {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> 53
 */
function getWeek(date, options) {
  const _date = toDate(date, options?.in);
  const diff = +startOfWeek(_date, options) - +startOfWeekYear(_date, options);

  // Round the number of weeks to the nearest integer because the number of
  // milliseconds in a week is not constant (e.g. it's different in the week of
  // the daylight saving time clock shift).
  return Math.round(diff / millisecondsInWeek) + 1;
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_getWeek = ((/* unused pure expression or super */ null && (getWeek)));

;// ./node_modules/date-fns/_lib/addLeadingZeros.js
function addLeadingZeros(number, targetLength) {
  const sign = number < 0 ? "-" : "";
  const output = Math.abs(number).toString().padStart(targetLength, "0");
  return sign + output;
}

;// ./node_modules/date-fns/_lib/format/lightFormatters.js


/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* |                                |
 * |  d  | Day of month                   |  D  |                                |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  m  | Minute                         |  M  | Month                          |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  y  | Year (abs)                     |  Y  |                                |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 */

const lightFormatters = {
  // Year
  y(date, token) {
    // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_tokens
    // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
    // |----------|-------|----|-------|-------|-------|
    // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
    // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
    // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
    // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
    // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |

    const signedYear = date.getFullYear();
    // Returns 1 for 1 BC (which is year 0 in JavaScript)
    const year = signedYear > 0 ? signedYear : 1 - signedYear;
    return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
  },

  // Month
  M(date, token) {
    const month = date.getMonth();
    return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
  },

  // Day of the month
  d(date, token) {
    return addLeadingZeros(date.getDate(), token.length);
  },

  // AM or PM
  a(date, token) {
    const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";

    switch (token) {
      case "a":
      case "aa":
        return dayPeriodEnumValue.toUpperCase();
      case "aaa":
        return dayPeriodEnumValue;
      case "aaaaa":
        return dayPeriodEnumValue[0];
      case "aaaa":
      default:
        return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
    }
  },

  // Hour [1-12]
  h(date, token) {
    return addLeadingZeros(date.getHours() % 12 || 12, token.length);
  },

  // Hour [0-23]
  H(date, token) {
    return addLeadingZeros(date.getHours(), token.length);
  },

  // Minute
  m(date, token) {
    return addLeadingZeros(date.getMinutes(), token.length);
  },

  // Second
  s(date, token) {
    return addLeadingZeros(date.getSeconds(), token.length);
  },

  // Fraction of second
  S(date, token) {
    const numberOfDigits = token.length;
    const milliseconds = date.getMilliseconds();
    const fractionalSeconds = Math.trunc(
      milliseconds * Math.pow(10, numberOfDigits - 3),
    );
    return addLeadingZeros(fractionalSeconds, token.length);
  },
};

;// ./node_modules/date-fns/_lib/format/formatters.js









const dayPeriodEnum = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night",
};

/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* | Milliseconds in day            |
 * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
 * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
 * |  d  | Day of month                   |  D  | Day of year                    |
 * |  e  | Local day of week              |  E  | Day of week                    |
 * |  f  |                                |  F* | Day of week in month           |
 * |  g* | Modified Julian day            |  G  | Era                            |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  i! | ISO day of week                |  I! | ISO week of year               |
 * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
 * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
 * |  l* | (deprecated)                   |  L  | Stand-alone month              |
 * |  m  | Minute                         |  M  | Month                          |
 * |  n  |                                |  N  |                                |
 * |  o! | Ordinal number modifier        |  O  | Timezone (GMT)                 |
 * |  p! | Long localized time            |  P! | Long localized date            |
 * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
 * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
 * |  u  | Extended year                  |  U* | Cyclic year                    |
 * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
 * |  w  | Local week of year             |  W* | Week of month                  |
 * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
 * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
 * |  z  | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 *
 * Letters marked by ! are non-standard, but implemented by date-fns:
 * - `o` modifies the previous token to turn it into an ordinal (see `format` docs)
 * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
 *   i.e. 7 for Sunday, 1 for Monday, etc.
 * - `I` is ISO week of year, as opposed to `w` which is local week of year.
 * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
 *   `R` is supposed to be used in conjunction with `I` and `i`
 *   for universal ISO week-numbering date, whereas
 *   `Y` is supposed to be used in conjunction with `w` and `e`
 *   for week-numbering date specific to the locale.
 * - `P` is long localized date format
 * - `p` is long localized time format
 */

const formatters = {
  // Era
  G: function (date, token, localize) {
    const era = date.getFullYear() > 0 ? 1 : 0;
    switch (token) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return localize.era(era, { width: "abbreviated" });
      // A, B
      case "GGGGG":
        return localize.era(era, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return localize.era(era, { width: "wide" });
    }
  },

  // Year
  y: function (date, token, localize) {
    // Ordinal number
    if (token === "yo") {
      const signedYear = date.getFullYear();
      // Returns 1 for 1 BC (which is year 0 in JavaScript)
      const year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize.ordinalNumber(year, { unit: "year" });
    }

    return lightFormatters.y(date, token);
  },

  // Local week-numbering year
  Y: function (date, token, localize, options) {
    const signedWeekYear = getWeekYear(date, options);
    // Returns 1 for 1 BC (which is year 0 in JavaScript)
    const weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;

    // Two digit year
    if (token === "YY") {
      const twoDigitYear = weekYear % 100;
      return addLeadingZeros(twoDigitYear, 2);
    }

    // Ordinal number
    if (token === "Yo") {
      return localize.ordinalNumber(weekYear, { unit: "year" });
    }

    // Padding
    return addLeadingZeros(weekYear, token.length);
  },

  // ISO week-numbering year
  R: function (date, token) {
    const isoWeekYear = getISOWeekYear(date);

    // Padding
    return addLeadingZeros(isoWeekYear, token.length);
  },

  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function (date, token) {
    const year = date.getFullYear();
    return addLeadingZeros(year, token.length);
  },

  // Quarter
  Q: function (date, token, localize) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case "Q":
        return String(quarter);
      // 01, 02, 03, 04
      case "QQ":
        return addLeadingZeros(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return localize.ordinalNumber(quarter, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return localize.quarter(quarter, {
          width: "abbreviated",
          context: "formatting",
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return localize.quarter(quarter, {
          width: "narrow",
          context: "formatting",
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return localize.quarter(quarter, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // Stand-alone quarter
  q: function (date, token, localize) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case "q":
        return String(quarter);
      // 01, 02, 03, 04
      case "qq":
        return addLeadingZeros(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return localize.ordinalNumber(quarter, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return localize.quarter(quarter, {
          width: "abbreviated",
          context: "standalone",
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return localize.quarter(quarter, {
          width: "narrow",
          context: "standalone",
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return localize.quarter(quarter, {
          width: "wide",
          context: "standalone",
        });
    }
  },

  // Month
  M: function (date, token, localize) {
    const month = date.getMonth();
    switch (token) {
      case "M":
      case "MM":
        return lightFormatters.M(date, token);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return localize.ordinalNumber(month + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "MMM":
        return localize.month(month, {
          width: "abbreviated",
          context: "formatting",
        });
      // J, F, ..., D
      case "MMMMM":
        return localize.month(month, {
          width: "narrow",
          context: "formatting",
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return localize.month(month, { width: "wide", context: "formatting" });
    }
  },

  // Stand-alone month
  L: function (date, token, localize) {
    const month = date.getMonth();
    switch (token) {
      // 1, 2, ..., 12
      case "L":
        return String(month + 1);
      // 01, 02, ..., 12
      case "LL":
        return addLeadingZeros(month + 1, 2);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return localize.ordinalNumber(month + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "LLL":
        return localize.month(month, {
          width: "abbreviated",
          context: "standalone",
        });
      // J, F, ..., D
      case "LLLLL":
        return localize.month(month, {
          width: "narrow",
          context: "standalone",
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return localize.month(month, { width: "wide", context: "standalone" });
    }
  },

  // Local week of year
  w: function (date, token, localize, options) {
    const week = getWeek(date, options);

    if (token === "wo") {
      return localize.ordinalNumber(week, { unit: "week" });
    }

    return addLeadingZeros(week, token.length);
  },

  // ISO week of year
  I: function (date, token, localize) {
    const isoWeek = getISOWeek(date);

    if (token === "Io") {
      return localize.ordinalNumber(isoWeek, { unit: "week" });
    }

    return addLeadingZeros(isoWeek, token.length);
  },

  // Day of the month
  d: function (date, token, localize) {
    if (token === "do") {
      return localize.ordinalNumber(date.getDate(), { unit: "date" });
    }

    return lightFormatters.d(date, token);
  },

  // Day of year
  D: function (date, token, localize) {
    const dayOfYear = getDayOfYear(date);

    if (token === "Do") {
      return localize.ordinalNumber(dayOfYear, { unit: "dayOfYear" });
    }

    return addLeadingZeros(dayOfYear, token.length);
  },

  // Day of week
  E: function (date, token, localize) {
    const dayOfWeek = date.getDay();
    switch (token) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting",
        });
      // T
      case "EEEEE":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "formatting",
        });
      // Tu
      case "EEEEEE":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "formatting",
        });
      // Tuesday
      case "EEEE":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // Local day of week
  e: function (date, token, localize, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case "e":
        return String(localDayOfWeek);
      // Padded numerical value
      case "ee":
        return addLeadingZeros(localDayOfWeek, 2);
      // 1st, 2nd, ..., 7th
      case "eo":
        return localize.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "eee":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting",
        });
      // T
      case "eeeee":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "formatting",
        });
      // Tu
      case "eeeeee":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "formatting",
        });
      // Tuesday
      case "eeee":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // Stand-alone local day of week
  c: function (date, token, localize, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (same as in `e`)
      case "c":
        return String(localDayOfWeek);
      // Padded numerical value
      case "cc":
        return addLeadingZeros(localDayOfWeek, token.length);
      // 1st, 2nd, ..., 7th
      case "co":
        return localize.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "ccc":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "standalone",
        });
      // T
      case "ccccc":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "standalone",
        });
      // Tu
      case "cccccc":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "standalone",
        });
      // Tuesday
      case "cccc":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "standalone",
        });
    }
  },

  // ISO day of week
  i: function (date, token, localize) {
    const dayOfWeek = date.getDay();
    const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    switch (token) {
      // 2
      case "i":
        return String(isoDayOfWeek);
      // 02
      case "ii":
        return addLeadingZeros(isoDayOfWeek, token.length);
      // 2nd
      case "io":
        return localize.ordinalNumber(isoDayOfWeek, { unit: "day" });
      // Tue
      case "iii":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting",
        });
      // T
      case "iiiii":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "formatting",
        });
      // Tu
      case "iiiiii":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "formatting",
        });
      // Tuesday
      case "iiii":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // AM or PM
  a: function (date, token, localize) {
    const hours = date.getHours();
    const dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";

    switch (token) {
      case "a":
      case "aa":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting",
        });
      case "aaa":
        return localize
          .dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting",
          })
          .toLowerCase();
      case "aaaaa":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting",
        });
      case "aaaa":
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // AM, PM, midnight, noon
  b: function (date, token, localize) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    }

    switch (token) {
      case "b":
      case "bb":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting",
        });
      case "bbb":
        return localize
          .dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting",
          })
          .toLowerCase();
      case "bbbbb":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting",
        });
      case "bbbb":
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // in the morning, in the afternoon, in the evening, at night
  B: function (date, token, localize) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }

    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting",
        });
      case "BBBBB":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting",
        });
      case "BBBB":
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // Hour [1-12]
  h: function (date, token, localize) {
    if (token === "ho") {
      let hours = date.getHours() % 12;
      if (hours === 0) hours = 12;
      return localize.ordinalNumber(hours, { unit: "hour" });
    }

    return lightFormatters.h(date, token);
  },

  // Hour [0-23]
  H: function (date, token, localize) {
    if (token === "Ho") {
      return localize.ordinalNumber(date.getHours(), { unit: "hour" });
    }

    return lightFormatters.H(date, token);
  },

  // Hour [0-11]
  K: function (date, token, localize) {
    const hours = date.getHours() % 12;

    if (token === "Ko") {
      return localize.ordinalNumber(hours, { unit: "hour" });
    }

    return addLeadingZeros(hours, token.length);
  },

  // Hour [1-24]
  k: function (date, token, localize) {
    let hours = date.getHours();
    if (hours === 0) hours = 24;

    if (token === "ko") {
      return localize.ordinalNumber(hours, { unit: "hour" });
    }

    return addLeadingZeros(hours, token.length);
  },

  // Minute
  m: function (date, token, localize) {
    if (token === "mo") {
      return localize.ordinalNumber(date.getMinutes(), { unit: "minute" });
    }

    return lightFormatters.m(date, token);
  },

  // Second
  s: function (date, token, localize) {
    if (token === "so") {
      return localize.ordinalNumber(date.getSeconds(), { unit: "second" });
    }

    return lightFormatters.s(date, token);
  },

  // Fraction of second
  S: function (date, token) {
    return lightFormatters.S(date, token);
  },

  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function (date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();

    if (timezoneOffset === 0) {
      return "Z";
    }

    switch (token) {
      // Hours and optional minutes
      case "X":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);

      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX": // Hours and minutes without `:` delimiter
        return formatTimezone(timezoneOffset);

      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX": // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },

  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function (date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();

    switch (token) {
      // Hours and optional minutes
      case "x":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);

      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx": // Hours and minutes without `:` delimiter
        return formatTimezone(timezoneOffset);

      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx": // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },

  // Timezone (GMT)
  O: function (date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();

    switch (token) {
      // Short
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },

  // Timezone (specific non-location)
  z: function (date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();

    switch (token) {
      // Short
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },

  // Seconds timestamp
  t: function (date, token, _localize) {
    const timestamp = Math.trunc(+date / 1000);
    return addLeadingZeros(timestamp, token.length);
  },

  // Milliseconds timestamp
  T: function (date, token, _localize) {
    return addLeadingZeros(+date, token.length);
  },
};

function formatTimezoneShort(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = Math.trunc(absOffset / 60);
  const minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
}

function formatTimezoneWithOptionalMinutes(offset, delimiter) {
  if (offset % 60 === 0) {
    const sign = offset > 0 ? "-" : "+";
    return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
  }
  return formatTimezone(offset, delimiter);
}

function formatTimezone(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = addLeadingZeros(Math.trunc(absOffset / 60), 2);
  const minutes = addLeadingZeros(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}

;// ./node_modules/date-fns/_lib/format/longFormatters.js
const dateLongFormatter = (pattern, formatLong) => {
  switch (pattern) {
    case "P":
      return formatLong.date({ width: "short" });
    case "PP":
      return formatLong.date({ width: "medium" });
    case "PPP":
      return formatLong.date({ width: "long" });
    case "PPPP":
    default:
      return formatLong.date({ width: "full" });
  }
};

const timeLongFormatter = (pattern, formatLong) => {
  switch (pattern) {
    case "p":
      return formatLong.time({ width: "short" });
    case "pp":
      return formatLong.time({ width: "medium" });
    case "ppp":
      return formatLong.time({ width: "long" });
    case "pppp":
    default:
      return formatLong.time({ width: "full" });
  }
};

const dateTimeLongFormatter = (pattern, formatLong) => {
  const matchResult = pattern.match(/(P+)(p+)?/) || [];
  const datePattern = matchResult[1];
  const timePattern = matchResult[2];

  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong);
  }

  let dateTimeFormat;

  switch (datePattern) {
    case "P":
      dateTimeFormat = formatLong.dateTime({ width: "short" });
      break;
    case "PP":
      dateTimeFormat = formatLong.dateTime({ width: "medium" });
      break;
    case "PPP":
      dateTimeFormat = formatLong.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      dateTimeFormat = formatLong.dateTime({ width: "full" });
      break;
  }

  return dateTimeFormat
    .replace("{{date}}", dateLongFormatter(datePattern, formatLong))
    .replace("{{time}}", timeLongFormatter(timePattern, formatLong));
};

const longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter,
};

;// ./node_modules/date-fns/_lib/protectedTokens.js
const dayOfYearTokenRE = /^D+$/;
const weekYearTokenRE = /^Y+$/;

const throwTokens = ["D", "DD", "YY", "YYYY"];

function isProtectedDayOfYearToken(token) {
  return dayOfYearTokenRE.test(token);
}

function isProtectedWeekYearToken(token) {
  return weekYearTokenRE.test(token);
}

function warnOrThrowProtectedError(token, format, input) {
  const _message = message(token, format, input);
  console.warn(_message);
  if (throwTokens.includes(token)) throw new RangeError(_message);
}

function message(token, format, input) {
  const subject = token[0] === "Y" ? "years" : "days of the month";
  return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format}\`) for formatting ${subject} to the input \`${input}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}

;// ./node_modules/date-fns/isDate.js
/**
 * @name isDate
 * @category Common Helpers
 * @summary Is the given value a date?
 *
 * @description
 * Returns true if the given value is an instance of Date. The function works for dates transferred across iframes.
 *
 * @param value - The value to check
 *
 * @returns True if the given value is a date
 *
 * @example
 * // For a valid date:
 * const result = isDate(new Date())
 * //=> true
 *
 * @example
 * // For an invalid date:
 * const result = isDate(new Date(NaN))
 * //=> true
 *
 * @example
 * // For some value:
 * const result = isDate('2014-02-31')
 * //=> false
 *
 * @example
 * // For an object:
 * const result = isDate({})
 * //=> false
 */
function isDate(value) {
  return (
    value instanceof Date ||
    (typeof value === "object" &&
      Object.prototype.toString.call(value) === "[object Date]")
  );
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_isDate = ((/* unused pure expression or super */ null && (isDate)));

;// ./node_modules/date-fns/isValid.js



/**
 * @name isValid
 * @category Common Helpers
 * @summary Is the given date valid?
 *
 * @description
 * Returns false if argument is Invalid Date and true otherwise.
 * Argument is converted to Date using `toDate`. See [toDate](https://date-fns.org/docs/toDate)
 * Invalid Date is a Date, whose time value is NaN.
 *
 * Time value of Date: http://es5.github.io/#x15.9.1.1
 *
 * @param date - The date to check
 *
 * @returns The date is valid
 *
 * @example
 * // For the valid date:
 * const result = isValid(new Date(2014, 1, 31))
 * //=> true
 *
 * @example
 * // For the value, convertible into a date:
 * const result = isValid(1393804800000)
 * //=> true
 *
 * @example
 * // For the invalid date:
 * const result = isValid(new Date(''))
 * //=> false
 */
function isValid(date) {
  return !((!isDate(date) && typeof date !== "number") || isNaN(+toDate(date)));
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_isValid = ((/* unused pure expression or super */ null && (isValid)));

;// ./node_modules/date-fns/format.js








// Rexports of internal for libraries to use.
// See: https://github.com/date-fns/date-fns/issues/3638#issuecomment-1877082874


// This RegExp consists of three parts separated by `|`:
// - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
//   (one of the certain letters followed by `o`)
// - (\w)\1* matches any sequences of the same letter
// - '' matches two quote characters in a row
// - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
//   except a single quote symbol, which ends the sequence.
//   Two quote characters do not end the sequence.
//   If there is no matching single quote
//   then the sequence will continue until the end of the string.
// - . matches any single character unmatched by previous parts of the RegExps
const formattingTokensRegExp =
  /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;

// This RegExp catches symbols escaped by quotes, and also
// sequences of symbols P, p, and the combinations like `PPPPPPPppppp`
const longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;

const escapedStringRegExp = /^'([^]*?)'?$/;
const doubleQuoteRegExp = /''/g;
const unescapedLatinCharacterRegExp = /[a-zA-Z]/;



/**
 * The {@link format} function options.
 */

/**
 * @name format
 * @alias formatDate
 * @category Common Helpers
 * @summary Format the date.
 *
 * @description
 * Return the formatted date string in the given format. The result may vary by locale.
 *
 * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
 * > See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * The characters wrapped between two single quotes characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
 * (see the last example)
 *
 * Format of the string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * with a few additions (see note 7 below the table).
 *
 * Accepted patterns:
 * | Unit                            | Pattern | Result examples                   | Notes |
 * |---------------------------------|---------|-----------------------------------|-------|
 * | Era                             | G..GGG  | AD, BC                            |       |
 * |                                 | GGGG    | Anno Domini, Before Christ        | 2     |
 * |                                 | GGGGG   | A, B                              |       |
 * | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
 * |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
 * |                                 | yy      | 44, 01, 00, 17                    | 5     |
 * |                                 | yyy     | 044, 001, 1900, 2017              | 5     |
 * |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
 * |                                 | yyyyy   | ...                               | 3,5   |
 * | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
 * |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
 * |                                 | YY      | 44, 01, 00, 17                    | 5,8   |
 * |                                 | YYY     | 044, 001, 1900, 2017              | 5     |
 * |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |
 * |                                 | YYYYY   | ...                               | 3,5   |
 * | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
 * |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
 * |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
 * |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
 * |                                 | RRRRR   | ...                               | 3,5,7 |
 * | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
 * |                                 | uu      | -43, 01, 1900, 2017               | 5     |
 * |                                 | uuu     | -043, 001, 1900, 2017             | 5     |
 * |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
 * |                                 | uuuuu   | ...                               | 3,5   |
 * | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
 * |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
 * |                                 | QQ      | 01, 02, 03, 04                    |       |
 * |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
 * |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
 * | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
 * |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
 * |                                 | qq      | 01, 02, 03, 04                    |       |
 * |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
 * |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
 * | Month (formatting)              | M       | 1, 2, ..., 12                     |       |
 * |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
 * |                                 | MM      | 01, 02, ..., 12                   |       |
 * |                                 | MMM     | Jan, Feb, ..., Dec                |       |
 * |                                 | MMMM    | January, February, ..., December  | 2     |
 * |                                 | MMMMM   | J, F, ..., D                      |       |
 * | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
 * |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
 * |                                 | LL      | 01, 02, ..., 12                   |       |
 * |                                 | LLL     | Jan, Feb, ..., Dec                |       |
 * |                                 | LLLL    | January, February, ..., December  | 2     |
 * |                                 | LLLLL   | J, F, ..., D                      |       |
 * | Local week of year              | w       | 1, 2, ..., 53                     |       |
 * |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
 * |                                 | ww      | 01, 02, ..., 53                   |       |
 * | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
 * |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
 * |                                 | II      | 01, 02, ..., 53                   | 7     |
 * | Day of month                    | d       | 1, 2, ..., 31                     |       |
 * |                                 | do      | 1st, 2nd, ..., 31st               | 7     |
 * |                                 | dd      | 01, 02, ..., 31                   |       |
 * | Day of year                     | D       | 1, 2, ..., 365, 366               | 9     |
 * |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
 * |                                 | DD      | 01, 02, ..., 365, 366             | 9     |
 * |                                 | DDD     | 001, 002, ..., 365, 366           |       |
 * |                                 | DDDD    | ...                               | 3     |
 * | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | EEEEE   | M, T, W, T, F, S, S               |       |
 * |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
 * |                                 | io      | 1st, 2nd, ..., 7th                | 7     |
 * |                                 | ii      | 01, 02, ..., 07                   | 7     |
 * |                                 | iii     | Mon, Tue, Wed, ..., Sun           | 7     |
 * |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
 * |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
 * |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 7     |
 * | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
 * |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
 * |                                 | ee      | 02, 03, ..., 01                   |       |
 * |                                 | eee     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | eeeee   | M, T, W, T, F, S, S               |       |
 * |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
 * |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
 * |                                 | cc      | 02, 03, ..., 01                   |       |
 * |                                 | ccc     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | ccccc   | M, T, W, T, F, S, S               |       |
 * |                                 | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | AM, PM                          | a..aa   | AM, PM                            |       |
 * |                                 | aaa     | am, pm                            |       |
 * |                                 | aaaa    | a.m., p.m.                        | 2     |
 * |                                 | aaaaa   | a, p                              |       |
 * | AM, PM, noon, midnight          | b..bb   | AM, PM, noon, midnight            |       |
 * |                                 | bbb     | am, pm, noon, midnight            |       |
 * |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
 * |                                 | bbbbb   | a, p, n, mi                       |       |
 * | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
 * |                                 | BBBB    | at night, in the morning, ...     | 2     |
 * |                                 | BBBBB   | at night, in the morning, ...     |       |
 * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
 * |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
 * |                                 | hh      | 01, 02, ..., 11, 12               |       |
 * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
 * |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
 * |                                 | HH      | 00, 01, 02, ..., 23               |       |
 * | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
 * |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
 * |                                 | KK      | 01, 02, ..., 11, 00               |       |
 * | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
 * |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
 * |                                 | kk      | 24, 01, 02, ..., 23               |       |
 * | Minute                          | m       | 0, 1, ..., 59                     |       |
 * |                                 | mo      | 0th, 1st, ..., 59th               | 7     |
 * |                                 | mm      | 00, 01, ..., 59                   |       |
 * | Second                          | s       | 0, 1, ..., 59                     |       |
 * |                                 | so      | 0th, 1st, ..., 59th               | 7     |
 * |                                 | ss      | 00, 01, ..., 59                   |       |
 * | Fraction of second              | S       | 0, 1, ..., 9                      |       |
 * |                                 | SS      | 00, 01, ..., 99                   |       |
 * |                                 | SSS     | 000, 001, ..., 999                |       |
 * |                                 | SSSS    | ...                               | 3     |
 * | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
 * |                                 | XX      | -0800, +0530, Z                   |       |
 * |                                 | XXX     | -08:00, +05:30, Z                 |       |
 * |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
 * |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
 * | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
 * |                                 | xx      | -0800, +0530, +0000               |       |
 * |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
 * |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
 * |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
 * | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
 * |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
 * | Timezone (specific non-locat.)  | z...zzz | GMT-8, GMT+5:30, GMT+0            | 6     |
 * |                                 | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   | 2,6   |
 * | Seconds timestamp               | t       | 512969520                         | 7     |
 * |                                 | tt      | ...                               | 3,7   |
 * | Milliseconds timestamp          | T       | 512969520900                      | 7     |
 * |                                 | TT      | ...                               | 3,7   |
 * | Long localized date             | P       | 04/29/1453                        | 7     |
 * |                                 | PP      | Apr 29, 1453                      | 7     |
 * |                                 | PPP     | April 29th, 1453                  | 7     |
 * |                                 | PPPP    | Friday, April 29th, 1453          | 2,7   |
 * | Long localized time             | p       | 12:00 AM                          | 7     |
 * |                                 | pp      | 12:00:00 AM                       | 7     |
 * |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
 * |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
 * | Combination of date and time    | Pp      | 04/29/1453, 12:00 AM              | 7     |
 * |                                 | PPpp    | Apr 29, 1453, 12:00:00 AM         | 7     |
 * |                                 | PPPppp  | April 29th, 1453 at ...           | 7     |
 * |                                 | PPPPpppp| Friday, April 29th, 1453 at ...   | 2,7   |
 * Notes:
 * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
 *    are the same as "stand-alone" units, but are different in some languages.
 *    "Formatting" units are declined according to the rules of the language
 *    in the context of a date. "Stand-alone" units are always nominative singular:
 *
 *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
 *
 *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
 *
 * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
 *    the single quote characters (see below).
 *    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)
 *    the output will be the same as default pattern for this unit, usually
 *    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units
 *    are marked with "2" in the last column of the table.
 *
 *    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`
 *
 * 3. Some patterns could be unlimited length (such as `yyyyyyyy`).
 *    The output will be padded with zeros to match the length of the pattern.
 *
 *    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`
 *
 * 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
 *    These tokens represent the shortest form of the quarter.
 *
 * 5. The main difference between `y` and `u` patterns are B.C. years:
 *
 *    | Year | `y` | `u` |
 *    |------|-----|-----|
 *    | AC 1 |   1 |   1 |
 *    | BC 1 |   1 |   0 |
 *    | BC 2 |   2 |  -1 |
 *
 *    Also `yy` always returns the last two digits of a year,
 *    while `uu` pads single digit years to 2 characters and returns other years unchanged:
 *
 *    | Year | `yy` | `uu` |
 *    |------|------|------|
 *    | 1    |   01 |   01 |
 *    | 14   |   14 |   14 |
 *    | 376  |   76 |  376 |
 *    | 1453 |   53 | 1453 |
 *
 *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
 *    except local week-numbering years are dependent on `options.weekStartsOn`
 *    and `options.firstWeekContainsDate` (compare [getISOWeekYear](https://date-fns.org/docs/getISOWeekYear)
 *    and [getWeekYear](https://date-fns.org/docs/getWeekYear)).
 *
 * 6. Specific non-location timezones are currently unavailable in `date-fns`,
 *    so right now these tokens fall back to GMT timezones.
 *
 * 7. These patterns are not in the Unicode Technical Standard #35:
 *    - `i`: ISO day of week
 *    - `I`: ISO week of year
 *    - `R`: ISO week-numbering year
 *    - `t`: seconds timestamp
 *    - `T`: milliseconds timestamp
 *    - `o`: ordinal number modifier
 *    - `P`: long localized date
 *    - `p`: long localized time
 *
 * 8. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
 *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * 9. `D` and `DD` tokens represent days of the year but they are often confused with days of the month.
 *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * @param date - The original date
 * @param format - The string of tokens
 * @param options - An object with options
 *
 * @returns The formatted date string
 *
 * @throws `date` must not be Invalid Date
 * @throws `options.locale` must contain `localize` property
 * @throws `options.locale` must contain `formatLong` property
 * @throws use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws format string contains an unescaped latin alphabet character
 *
 * @example
 * // Represent 11 February 2014 in middle-endian format:
 * const result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
 * //=> '02/11/2014'
 *
 * @example
 * // Represent 2 July 2014 in Esperanto:
 * import { eoLocale } from 'date-fns/locale/eo'
 * const result = format(new Date(2014, 6, 2), "do 'de' MMMM yyyy", {
 *   locale: eoLocale
 * })
 * //=> '2-a de julio 2014'
 *
 * @example
 * // Escape string by single quote characters:
 * const result = format(new Date(2014, 6, 2, 15), "h 'o''clock'")
 * //=> "3 o'clock"
 */
function format(date, formatStr, options) {
  const defaultOptions = getDefaultOptions();
  const locale = options?.locale ?? defaultOptions.locale ?? enUS;

  const firstWeekContainsDate =
    options?.firstWeekContainsDate ??
    options?.locale?.options?.firstWeekContainsDate ??
    defaultOptions.firstWeekContainsDate ??
    defaultOptions.locale?.options?.firstWeekContainsDate ??
    1;

  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const originalDate = toDate(date, options?.in);

  if (!isValid(originalDate)) {
    throw new RangeError("Invalid time value");
  }

  let parts = formatStr
    .match(longFormattingTokensRegExp)
    .map((substring) => {
      const firstCharacter = substring[0];
      if (firstCharacter === "p" || firstCharacter === "P") {
        const longFormatter = longFormatters[firstCharacter];
        return longFormatter(substring, locale.formatLong);
      }
      return substring;
    })
    .join("")
    .match(formattingTokensRegExp)
    .map((substring) => {
      // Replace two single quote characters with one single quote character
      if (substring === "''") {
        return { isToken: false, value: "'" };
      }

      const firstCharacter = substring[0];
      if (firstCharacter === "'") {
        return { isToken: false, value: cleanEscapedString(substring) };
      }

      if (formatters[firstCharacter]) {
        return { isToken: true, value: substring };
      }

      if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" +
            firstCharacter +
            "`",
        );
      }

      return { isToken: false, value: substring };
    });

  // invoke localize preprocessor (only for french locales at the moment)
  if (locale.localize.preprocessor) {
    parts = locale.localize.preprocessor(originalDate, parts);
  }

  const formatterOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale,
  };

  return parts
    .map((part) => {
      if (!part.isToken) return part.value;

      const token = part.value;

      if (
        (!options?.useAdditionalWeekYearTokens &&
          isProtectedWeekYearToken(token)) ||
        (!options?.useAdditionalDayOfYearTokens &&
          isProtectedDayOfYearToken(token))
      ) {
        warnOrThrowProtectedError(token, formatStr, String(date));
      }

      const formatter = formatters[token[0]];
      return formatter(originalDate, token, locale.localize, formatterOptions);
    })
    .join("");
}

function cleanEscapedString(input) {
  const matched = input.match(escapedStringRegExp);

  if (!matched) {
    return input;
  }

  return matched[1].replace(doubleQuoteRegExp, "'");
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_format = ((/* unused pure expression or super */ null && (format)));

;// ./src/js/logic/projects.js




function createTodo(title, description, dueDate, priority, notes = "", checked = "false") {
    let state = {
        title,
        description,
        dueDate: new Date(dueDate),
        priority,
        notes,
        checked
    }

    let success = null;

    const titleGetter = (stateArg) => ({ getTitle: () => stateArg.title });
    const titleSetter = (stateArg) => ({
        setTitle: (newTitle) => {
            const titleValues = {
                variableName: "Title",
                currentValue: stateArg.title,
                newValue: newTitle
            }

            if (!Valid.setterValue(titleValues)) {
                console.info(`Unable to rename todo '${newTitle}': current and new value are the same.`);
                success = false;
                return success;
            }

            stateArg.title = newTitle;
            success = true;
            return success;
        }
    });

    const descriptionGetter = (stateArg) => ({ getDescription: () => stateArg.description });
    const descriptionSetter = (stateArg) => ({
        setDescription: (newDescription) => {
            const descriptionValues = {
                variableName: "Description",
                currentValue: stateArg.description,
                newValue: newDescription
            }

            if (!Valid.setterValue(descriptionValues)) {
                console.info(`Unable to set the description of todo '${titleGetter(stateArg).getTitle()}': current and new values are the same.`);
                success = false;
                return success;
            }

            stateArg.description = newDescription;
            success = true;
            return success;
        }
    });

    const dueDateGetter = (stateArg) => ({ getDueDate: () => stateArg.dueDate });
    const dueDateSetter = (stateArg) => ({
        setDueDate: (newDueDate) => {
            const dueDateValues = {
                variableName: "Due Date",
                currentValue: format(stateArg.dueDate.getTime(), "yyyy-MM-dd"),
                newValue: newDueDate
            }

            if (!Valid.setterValue(dueDateValues)) {
                console.info(`Unable to set the due date of todo '${titleGetter(stateArg).getTitle()}': current and new values are the same.`);
                success = false;
                return success;
            }

            stateArg.dueDate = new Date(newDueDate);
            success = true;
            return success;
        }
    });

    const priorityGetter = (stateArg) => ({ getPriority: () => stateArg.priority });
    const prioritySetter = (stateArg) => ({
        setPriority: (newPriority) => {
            const priorityValues = {
                variableName: "Priority",
                currentValue: stateArg.priority,
                newValue: newPriority
            }

            if (!Valid.setterValue(priorityValues)) {
                console.info(`Unable to set the priority of todo '${titleGetter(stateArg).getTitle()}': current and new values are the same.`);
                success = false;
                return success;
            }

            stateArg.priority = newPriority;
            success = true;
            return success;
        }
    });

    const notesGetter = (stateArg) => ({ getNotes: () => stateArg.notes });
    const notesSetter = (stateArg) => ({
        setNotes: (newNotes) => {
            if (stateArg.notes === newNotes) {
                console.info(`Unable to set the notes of  todo '${titleGetter(stateArg).getTitle()}': current and new values are the same.`);
                success = false;
                return success;
            }

            stateArg.notes = newNotes;
            success = true;
            return success;
        }
    });

    const checkedGetter = (stateArg) => ({ getChecked: () => stateArg.checked });
    const checkedSetter = (stateArg) => ({
        setChecked: (newChecked) => {
            if (!(newChecked === "true" || newChecked === "false")) {
                console.error(`Unable to set the checked state of todo '${titleGetter(stateArg).getTitle()}': provided value isn't valid.`);
                success = false;
                return success;
            }

            stateArg.checked = newChecked;
            success = true;
            return success;
        }
    });

    return Object.assign(
        {},
        titleGetter(state),
        titleSetter(state),
        descriptionGetter(state),
        descriptionSetter(state),
        dueDateGetter(state),
        dueDateSetter(state),
        priorityGetter(state),
        prioritySetter(state),
        notesGetter(state),
        notesSetter(state),
        checkedGetter(state),
        checkedSetter(state)
    )
}

function createProject(title, todoList = []) {
    let state = {
        title,
        todoList,
    }

    let success = null;

    const titleGetter = (stateArg) => ({ getTitle: () => stateArg.title });

    const titleSetter = (stateArg) => ({
        setTitle: (newTitle) => {
            const titleValues = {
                variableName: "Title",
                currentValue: stateArg.title,
                newValue: newTitle
            }

            if (!Valid.setterValue(titleValues)) {
                console.info(`Unable to rename project '${newTitle}': current and new values are the same.`);
                success = false;
                return;
            }

            stateArg.title = newTitle;
            success = true;
            return success;
        }
    });

    const todoListGetter = (stateArg) => ({
        getTodoList: () => {
            return stateArg.todoList.map(todo => {
                return todo;
            });
        }
    });

    const todoGetter = (stateArg) => ({
        getTodo: (todoTitleToGet) => {
            const todo = stateArg.todoList.find(todo => todo.getTitle() === todoTitleToGet);

            if (!Valid.objectValue(todo)) {
                console.warn(`Todo was not retrieved: '${todoTitleToGet}' was not found.`);
                return null;
            }

            return todo;
        }
    });

    const todoGetterViaIndex = (stateArg) => ({
        getTodoViaIndex: (indexOfTodo) => {
            const todo = stateArg.todoList[indexOfTodo];

            if (!Valid.objectValue(todo)) {
                console.warn(`Todo was not retrieved: index '${indexOfTodo}' was not found.`);
                return null;
            }

            return todo;
        }
    });

    const indexGetterOfTodo = (stateArg) => ({
        getIndexOfTodo: (todoTitle) => {
            const index = todoListGetter(stateArg).getTodoList().findIndex(todo => {
                return todo.getTitle() === todoTitle;
            });

            if (!Valid.indexValue(index)) {
                console.warn(`Todo list index was not retrieved: '${todoTitle}' was not found.`);
                return null;
            }

            return index;
        }
    });

    const todoAdder = (stateArg) => ({
        addTodo: (newTodo) => {
            success = false;

            if (!newTodo.getTitle) {
                console.error(`Todo was not added: Object passed was not a todo.`);
                return success;
            }

            const newTodoTitle = newTodo.getTitle();
            const todoExists = todoListGetter(stateArg).getTodoList().some(todo => {
                return todo.getTitle() === newTodoTitle;
            });

            if (todoExists) {
                console.info(`Todo was not added: Todo '${newTodoTitle}' already exists.`);
                return success;
            }

            stateArg.todoList.push(newTodo);
            success = true;
            return success;
        }
    });

    const todoRemover = (stateArg) => ({
        removeTodo: (todoTitleToRemove) => {
            const indexToRemove = indexGetterOfTodo(stateArg).getIndexOfTodo(todoTitleToRemove);

            if (!Valid.indexValue(indexToRemove)) {
                console.warn(`Todo was not removed: Todo '${todoTitleToRemove}' was not found.`);
                success = false;
                return success;
            }

            stateArg.todoList.splice(indexToRemove, 1);
            success = true;
            return success;
        }
    });

    return Object.assign(
        {},
        titleGetter(state),
        titleSetter(state),
        todoListGetter(state),
        todoGetter(state),
        todoGetterViaIndex(state),
        indexGetterOfTodo(state),
        todoAdder(state),
        todoRemover(state),
    )
}

class Projects {
    #projectsList;
    static #instantiated = false;
    constructor() {
        if (Projects.#instantiated) {
            console.warn("Unable to instantiate: Cannot have more than one instance of Projects.");
            return;
        }

        Projects.#instantiated = true;
        this.#projectsList = [createProject("Default")];
        this.#subscribeEvents();

        PubSub.publish({ eventName: "projectsInstantiated" });
    };

    getProjectsList() {
        return this.#projectsList.map(project => { return project });
    }

    getProject(projectTitle) {
        const project = this.getProjectsList().find(project => project.getTitle() === projectTitle);

        if (!Valid.objectValue(project)) {
            console.warn(`Project was not retrieved: '${projectTitle}' was not found.`);
            return null;
        }

        return project;
    }

    getProjectViaIndex(index) {
        const project = this.getProjectsList()[index];

        if (!Valid.objectValue(project)) {
            console.warn(`Project was not retrieved: index '${index}' was not found.`);
            return null;
        }

        return project;
    }

    getIndexOfProject(projectTitle) {
        const index = this.getProjectsList().findIndex(project => project.getTitle() === projectTitle);

        if (!Valid.indexValue(index)) {
            console.warn(`Projects index was not retrieved: '${projectTitle}' was not found.`);
            return null;
        }

        return index;
    }

    addProject(newProject) {
        const projectPropertyExists = newProject.getTitle;

        if (!projectPropertyExists) {
            console.error(`Project was not added: Object passed was not a project.`);
            return;
        }

        const newProjectTitle = newProject.getTitle();
        const projectExists = this.getProjectsList().some(project => {
            return project.getTitle() === newProjectTitle;
        });

        if (projectExists) {
            console.info(`Project was not added: '${newProjectTitle}' already exists.`);
            return;
        }

        let emptyProjectTracker = false;

        if (this.#projectsList.length === 0) {
            emptyProjectTracker = true;
        }

        this.#projectsList.push(newProject);
        PubSub.publish({ eventName: "projectsListUpdated", data: this.getProjectsList() });

        if (emptyProjectTracker) {
            const indexStart = 0;
            PubSub.publish({ eventName: "projectIndexUpdated", data: indexStart });
        }

        return;
    }

    removeProject(projectTitle) {
        const indexToRemove = this.getIndexOfProject(projectTitle);

        if (!Valid.indexValue(indexToRemove)) {
            console.warn(`Project '${projectTitle}' was not removed: Project was not found.`);
            return;
        }

        const removedProject = this.#projectsList.splice(indexToRemove, 1);

        PubSub.publish({ eventName: "projectDeleted", data: removedProject });
        PubSub.publish({ eventName: "projectsListUpdated", data: this.getProjectsList() });

        return;
    }

    #loadProjects(projectsList) {
        if (projectsList) {
            this.#projectsList = projectsList;
            return projectsList;
        }
    }

    #editProject(data) {
        const currentProject = this.getProject(data.currentProject.title);
        const isSet = currentProject.setTitle(data.newTitle);

        if (isSet) {
            PubSub.publish({ eventName: "currentProjectUpdated", data: currentProject });
            PubSub.publish({ eventName: "projectsListUpdated", data: this.getProjectsList() });
        }
    }

    #addTodo(data) {
        const currentProject = this.getProject(data.currentProject.getTitle());
        const isAdded = currentProject.addTodo(data.newTodo);

        if (isAdded) {
            PubSub.publish({ eventName: "todoListUpdated", data: currentProject.getTodoList() });
            PubSub.publish({ eventName: "projectsListUpdated", data: this.getProjectsList() });
        }
    }

    #removeTodo(data) {
        const currentProject = this.getProject(data.currentProject.getTitle());
        const isRemoved = currentProject.removeTodo(data.formData.deleteTodoTitle);

        if (isRemoved) {
            PubSub.publish({ eventName: "todoListUpdated", data: currentProject.getTodoList() });
            PubSub.publish({ eventName: "projectsListUpdated", data: this.getProjectsList() });
        }
    }

    #editTodo(data) {
        const currentProject = this.getProject(data.currentProject.getTitle());
        const currentTodo = currentProject.getTodo(data.formData.currentTodoTitle);

        currentTodo.setTitle(data.formData.todoTitle);
        currentTodo.setDescription(data.formData.todoDescription);
        currentTodo.setDueDate(data.formData.todoDueDate);
        currentTodo.setPriority(data.formData.todoPriority);

        PubSub.publish({ eventName: "todoListUpdated", data: currentProject.getTodoList() });
        PubSub.publish({ eventName: "projectsListUpdated", data: this.getProjectsList() });
    }

    #editTodoNotes(data) {
        const currentTodo = data.currentTodo;

        currentTodo.setNotes(data.todoNotes);
        PubSub.publish({ eventName: "projectsListUpdated", data: this.getProjectsList() });
    }

    #editTodoChecked(data) {
        const currentTodo = data.currentTodo;

        currentTodo.setChecked(data.todoChecked);
        PubSub.publish({ eventName: "projectsListUpdated", data: this.getProjectsList() });
    }

    #clearCheckedTodos(projectTitle) {
        const currentProject = this.getProject(projectTitle);
        const emptyTodoList = currentProject.getTodoList().length === 0 ? true : false;

        if (!emptyTodoList) {

            currentProject.getTodoList().forEach(todo => {
                if (todo.getChecked() === "true") {
                    const todoTitle = todo.getTitle();
                    currentProject.removeTodo(todoTitle);
                }
            });

            PubSub.publish({ eventName: "todoListUpdated", data: currentProject.getTodoList() });
            PubSub.publish({ eventName: "projectsListUpdated", data: this.getProjectsList() });
        }
    }

    #subscribeEvents() {
        PubSub.subscribe({ eventName: "projectsLoaded", callbackFn: this.#loadProjects.bind(this) })
        PubSub.subscribe({ eventName: "newProjectCreated", callbackFn: this.addProject.bind(this) });
        PubSub.subscribe({ eventName: "projectEdited", callbackFn: this.#editProject.bind(this) });
        PubSub.subscribe({ eventName: "deleteProjectRequested", callbackFn: this.removeProject.bind(this) });
        PubSub.subscribe({ eventName: "newTodoCreated", callbackFn: this.#addTodo.bind(this) });
        PubSub.subscribe({ eventName: "todoEdited", callbackFn: this.#editTodo.bind(this) });
        PubSub.subscribe({ eventName: "deleteTodoRequested", callbackFn: this.#removeTodo.bind(this) });
        PubSub.subscribe({ eventName: "todoNotesUpdated", callbackFn: this.#editTodoNotes.bind(this) });
        PubSub.subscribe({ eventName: "todoCheckedUpdated", callbackFn: this.#editTodoChecked.bind(this) });
        PubSub.subscribe({ eventName: "clearCheckedBtnClicked", callbackFn: this.#clearCheckedTodos.bind(this) });
    }
}


;// ./src/js/interface/sidebar/projects-list-dom.js
function createSidebarProjectsList(projectsList) {
    const ul = document.createElement("ul");

    for (let [index, project] of projectsList.entries()) {
        const li = createProjectListItem({ project, index });
        ul.append(li);
    }
    ul.setAttribute("data-sidebar-projects-list", "");

    return ul;
}

function createProjectListItem({ project, index }) {
    const li = document.createElement("li");
    const button = document.createElement("button");

    if (index === 0) {
        button.classList.add("selected-project");
    }

    button.setAttribute("data-project-index", index);
    button.classList.add("project-list-item");
    button.append(
        createProjectTitle(project.getTitle()),
        createTodoCount(project.getTodoList().length)
    );

    li.append(button);

    return li;
}

function createProjectTitle(projectTitle) {
    const span = document.createElement("span");

    span.setAttribute("data-project-title", "");
    span.classList.add("project-title");
    span.textContent = projectTitle;

    return span;
}

function createTodoCount(todoLength) {
    const span = document.createElement("span");

    span.setAttribute("data-todo-count", "");
    span.classList.add("todo-count");
    span.textContent = todoLength;

    return span;
}


;// ./src/js/interface/sidebar/projects-list-component.js



const ProjectsListComponent = (({ projectsListArg, projectIndexArg = 0, containerArg }) => {
    const container = containerArg;
    let projectsList = projectsListArg;
    let projectIndex = projectIndexArg;
    let sidebarProjectsList = null;

    const render = (projectsList) => {
        sidebarProjectsList = createSidebarProjectsList(projectsList);
        container.append(sidebarProjectsList);
        highlightProjectElement(sidebarProjectsList, projectIndex);
        bindEvents();
    }

    const bindEvents = () => {
        sidebarProjectsList.addEventListener('click', e => {
            if (e.target.closest("[data-project-index]")) {
                projectIndex = e.target.closest("[data-project-index]").getAttribute("data-project-index");
                highlightProjectElement(sidebarProjectsList, projectIndex);
                PubSub.publish({ eventName: "projectIndexUpdated", data: projectIndex });
            }
        });
    }

    const remove = () => {
        if (sidebarProjectsList && container.contains(container.querySelector("[data-sidebar-projects-list]"))) {
            container.removeChild(sidebarProjectsList);
        }
    }

    const update = (projectsListArg) => {
        projectsList = projectsListArg;
        remove();
        render(projectsList);
    }

    const projectDeleted = (projectsListArg) => {
        if ((projectIndex > 0)) {
            projectIndex -= 1;
        }
        update(projectsListArg);
    }

    const subscribeEvents = () => {
        PubSub.subscribe({ eventName: "projectsListUpdated", callbackFn: update });
        PubSub.subscribe({ eventName: "projectDeleted", callbackFn: projectDeleted });
    }

    render(projectsList);
    subscribeEvents();

    return {
        render
    }
});

// Event-related functions

function highlightProjectElement(sidebarElement, projectIndex) {
    const ul = Array
        .from(sidebarElement.childNodes)
        .filter(element => element.nodeName.toLowerCase() === "li");

    const selectedProject = sidebarElement.querySelector(`[data-project-index="${projectIndex}"]`);

    for (let li of ul) {
        const button = li.querySelector("[data-project-index]");
        button.classList.remove("selected-project");
    }

    if (!selectedProject) {
        console.info(`Unable to select a project with the given index.`);
        return;
    }

    selectedProject.classList.add("selected-project");
    return;
}

;// ./src/images/icons/delete.svg
const delete_namespaceObject = __webpack_require__.p + "a292e17d32ea73e1f7f4.svg";
;// ./src/images/icons/edit-square.svg
const edit_square_namespaceObject = __webpack_require__.p + "6c4bd9aef45bd99c3309.svg";
;// ./src/images/icons/calendar-clock.svg
const calendar_clock_namespaceObject = __webpack_require__.p + "1935ac422a6f2374bbe8.svg";
;// ./src/images/icons/chevron-right.svg
const chevron_right_namespaceObject = __webpack_require__.p + "5aeb37db4acd7f2701a6.svg";
;// ./src/js/interface/main/main-content-dom.js







const ICON_SIZE = 24;
const ARROW_SIZE = 30;

function createMainContent(todoList) {
    const div = document.createElement("div");
    const ul = document.createElement("ul");

    todoList.forEach((todo, index) => {
        const todoElement = createTodoContainer(todo, index);
        ul.append(todoElement);
    });

    ul.classList.add("todo-list-container");
    div.classList.add("main-content");
    div.setAttribute("data-main-content", "");
    div.append(ul);

    return div;
}

function createTodoContainer(todo, index) {
    const li = document.createElement("li");
    const todoItem = createTodoItem(
        todo.getTitle(),
        todo.getDueDate(),
        todo.getPriority(),
        todo.getChecked()
    );
    const todoItemExpanded = createTodoItemExpanded(
        todo.getDescription(),
        todo.getPriority(),
        todo.getNotes(),
        todo.getChecked(),
    );

    li.classList.add("todo-container");
    li.setAttribute("data-todo-index", index);
    li.append(todoItem, todoItemExpanded);

    return li;
}

function createTodoItem(title, dueDate, priority, checked) {
    const div = document.createElement("div");
    const checkbox = createTodoCheckbox(checked);
    const todoSimpleInformation = createTodoSimpleInformation(title, dueDate, priority);
    const expandArrow = createExpandArrow();

    if (checked === "true") {
        div.classList.add("checked", "crossed-out");
    }

    div.classList.add("todo-item");
    div.setAttribute("data-todo-shown-container", "");
    div.setAttribute("role", "group");
    div.ariaExpanded = "false";
    div.append(
        checkbox,
        todoSimpleInformation,
        expandArrow
    );

    return div;
}

function createTodoSimpleInformation(title, dueDate, priority) {
    const div = document.createElement("div");
    const todoTitle = createTodoTitle(title, priority);
    const todoDueDate = createTodoDueDate(dueDate);

    div.classList.add("todo-simple-information");
    div.append(todoTitle, todoDueDate);

    return div;
}

function createTodoCheckbox(checked) {
    const div = document.createElement("div");
    const input = document.createElement("input");

    input.type = "checkbox";
    input.setAttribute("data-todo-checked", "");

    if (checked === "true") {
        input.setAttribute("checked", "");
    }

    div.classList.add("checkbox-container");
    div.append(input);

    return div;
}

function createExpandArrow() {
    const img = document.createElement("img");

    img.src = chevron_right_namespaceObject;
    img.alt = "Expand Todo Arrow";

    img.width = ARROW_SIZE;
    img.height = ARROW_SIZE;

    img.classList.add("expand-arrow");

    return img;
}

function createTodoTitle(title, priority) {
    const div = document.createElement("div");
    const priorityCircle = document.createElement("div");
    const p = document.createElement("p");

    switch (priority) {
        case "low":
            priorityCircle.classList.add("green");
            break;
        case "medium":
            priorityCircle.classList.add("amber");
            break;
        case "high":
            priorityCircle.classList.add("red");
            break;
        default:
            console.error("Unable to add priority circle: Priority passed in was not valid");
    }

    priorityCircle.classList.add("priority-circle");

    p.classList.add("title-text");
    p.textContent = title;
    p.setAttribute("data-todo-title", "");

    div.classList.add("todo-title");
    div.append(priorityCircle, p);

    return div;
}

function createTodoDueDate(dueDate) {
    const div = document.createElement("div");
    const img = document.createElement("img");
    const p = document.createElement("p");

    img.src = calendar_clock_namespaceObject;
    img.alt = "Due Date Icon";
    img.classList.add("due-date-icon");

    p.classList.add("due-date-text");
    p.textContent = format(dueDate, "EEEE do MMMM, yyyy (dd/MM/yy)");
    p.setAttribute("data-todo-due-date", "");

    div.classList.add("todo-due-date");
    div.append(img, p);

    return div;
}

function createTodoItemExpanded(description, priority, notes, checked) {
    const todoHiddenContainer = document.createElement("div");
    const todoExpandedContainer = document.createElement("div");
    const todoDescription = createTodoDescription(description);
    const todoPriority = createTodoPriority(priority);
    const todoNotes = createTodoNotes(notes);
    const todoActions = createTodoActions();

    todoExpandedContainer.classList.add("todo-expanded-information");
    todoExpandedContainer.append(
        todoDescription,
        todoPriority,
        todoNotes,
        todoActions
    );

    if (checked === "true") {
        todoHiddenContainer.classList.add("checked");
    }

    todoHiddenContainer.classList.add("todo-hidden-container");
    todoHiddenContainer.setAttribute("data-todo-hidden-container", "");
    todoHiddenContainer.append(todoExpandedContainer);

    return todoHiddenContainer;
}

function createTodoDescription(description) {
    const div = document.createElement("div");
    const h4 = document.createElement("h4");
    const p = document.createElement("p");

    h4.classList.add("description-heading");
    h4.textContent = "Description";

    p.classList.add("description-text");
    p.textContent = description;
    p.setAttribute("data-todo-description", "");

    div.classList.add("todo-description");
    div.append(h4, p);

    return div;
}

function createTodoPriority(priority) {
    const div = document.createElement("div");
    const h4 = document.createElement("h4");
    const p = document.createElement("p");

    h4.textContent = "Priority";
    h4.classList.add("priority-heading");

    p.textContent = priority;
    p.classList.add("priority-text");
    p.setAttribute("data-todo-priority", "");

    switch (priority) {
        case "low":
            p.classList.add("green");
            break;
        case "medium":
            p.classList.add("amber");
            break;
        case "high":
            p.classList.add("red");
            break;
        default:
            console.error("Priority provided was not valid.");
    }

    div.classList.add("todo-priority");
    div.append(h4, p);

    return div;
}

function createTodoNotes(notes) {
    const div = document.createElement("div");
    const h4 = document.createElement("h4");
    const textarea = document.createElement("textarea");

    h4.textContent = "Notes";
    h4.classList.add("notes-heading");

    textarea.setAttribute("data-todo-notes", "");
    textarea.value = notes;

    div.classList.add("todo-notes");
    div.append(h4, textarea);

    return div;
}

function createTodoActions() {
    const editButton = createTodoEditButton();
    const deleteButton = createTodoDeleteButton();

    const div = document.createElement("div");
    div.classList.add("todo-actions");
    div.setAttribute("data-todo-actions", "");
    div.append(editButton, deleteButton);

    return div;
}

function createTodoEditButton() {
    const button = document.createElement("button");
    const img = document.createElement("img");

    img.src = edit_square_namespaceObject;
    img.alt = "Edit Todo Icon";
    img.width = ICON_SIZE;
    img.height = ICON_SIZE;

    button.setAttribute("data-edit-todo-btn", "");
    button.append(img);

    return button;
}

function createTodoDeleteButton() {
    const button = document.createElement("button");
    const img = document.createElement("img");

    img.src = delete_namespaceObject;
    img.alt = "Delete Todo Icon";
    img.width = ICON_SIZE;
    img.height = ICON_SIZE;

    button.setAttribute("data-delete-todo-btn", "");
    button.append(img);

    return button;
}


;// ./src/images/illustrations/empty-illustration.svg
const empty_illustration_namespaceObject = __webpack_require__.p + "5ecb2e896c6dd8ab1ffd.svg";
;// ./src/images/illustrations/no-data-illustration.svg
const no_data_illustration_namespaceObject = __webpack_require__.p + "29d354ee5406ef0d1c86.svg";
;// ./src/js/interface/main/main-content-empty-dom.js



const ILLUST_SIZE = 200;

function createMainContentEmpty({ emptyType, projectName = null }) {
    if (!emptyType && typeof emptyType !== "string") {
        console.error("Unable to create main-content: Provided type was invalid.");
        return;
    }

    const div = document.createElement("div");
    let divClassEmptyType = null;

    switch (emptyType) {
        case "project":
            divClassEmptyType = "empty-projects-list";
            break;
        case "todo":
            divClassEmptyType = "empty-todo-list";
            break;
        default:
            console.error("Unable to create main-content: Provided type was invalid.");
            return;
    }

    div.classList.add(
        "main-content",
        divClassEmptyType,
    );
    div.setAttribute("data-main-content", "");
    div.append(
        createMainEmptyImg(emptyType),
        createMainEmptyHeading(projectName),
    );

    return div;
}

function createMainEmptyHeading(projectName = null) {
    const h2 = document.createElement("h2");
    h2.textContent = projectName ? `Your '${projectName}' list is empty...` : "Your projects list is empty...";

    return h2;
}

function createMainEmptyImg(emptyType) {
    if (!emptyType && typeof emptyType !== "string") {
        console.error("Unable to create main-content: Provided type was invalid.");
        return;
    }

    const img = document.createElement("img");
    const imgType = emptyType === "project" ? "Projects" : "Todo List";

    img.src = emptyType === "project" ? empty_illustration_namespaceObject : no_data_illustration_namespaceObject;
    img.alt = `Empty ${imgType} Illustration`;

    img.width = ILLUST_SIZE;
    img.height = ILLUST_SIZE;

    return img;
}


;// ./src/js/interface/main/main-content-component.js




function MainContentComponent({ projectArg, containerArg }) {
    const container = containerArg;
    let project = projectArg;
    let mainContent = null;

    const render = (todoList = null) => {
        const oldMainContent = container.querySelector("[data-main-content]");

        if (todoList) {
            mainContent = todoList.length !== 0
                ? createMainContent(todoList)
                : createMainContentEmpty({ emptyType: "todo", projectName: project.getTitle() });
            bindEvents();
        } else {
            mainContent = createMainContentEmpty({ emptyType: "project" });
        }

        if (container.contains(oldMainContent)) {
            container.replaceChild(mainContent, oldMainContent);
            return;
        }

        container.append(mainContent);
        return;
    }

    const bindEvents = () => {
        mainContent.addEventListener("click", e => {
            if (e.target.closest("[data-todo-shown-container]") && e.target.nodeName.toLowerCase() !== "input") {
                expandTodoItem(e);
                return;
            }

            if (e.target.closest("[data-todo-actions]") && e.target.closest("button")) {
                if (e.target.closest("button").hasAttribute("data-edit-todo-btn")) {
                    const currentTodoIndex = e.target.closest("[data-todo-index]").getAttribute("data-todo-index");
                    const currentTodo = project.getTodoViaIndex(currentTodoIndex);

                    PubSub.publish({ eventName: "editTodoBtnClicked", data: { todo: currentTodo, project } });
                    return;
                }

                if (e.target.closest("button").hasAttribute("data-delete-todo-btn")) {
                    const currentTodoIndex = e.target.closest("[data-todo-index]").getAttribute("data-todo-index");
                    const currentTodo = project.getTodoViaIndex(currentTodoIndex);

                    PubSub.publish({ eventName: "deleteTodoBtnClicked", data: { todo: currentTodo, project } });

                    return;
                }
            }

            if (e.target.hasAttribute("data-todo-checked")) {
                const currentTodoIndex = e.target.closest("[data-todo-index]").getAttribute("data-todo-index");
                const currentTodo = project.getTodoViaIndex(currentTodoIndex);
                const todoChecked = e.target.hasAttribute("checked") ? "false" : "true";

                setTodoCheckAppearance(e);
                PubSub.publish({ eventName: "todoCheckedUpdated", data: { currentTodo, todoChecked } });

                return;
            }
        });

        mainContent.addEventListener("change", e => {
            if (e.target.hasAttribute("data-todo-notes")) {
                const currentTodoIndex = e.target.closest("[data-todo-index]").getAttribute("data-todo-index");
                const currentTodo = project.getTodoViaIndex(currentTodoIndex);
                const newNotes = e.target.value;

                PubSub.publish({ eventName: "todoNotesUpdated", data: { currentTodo, todoNotes: newNotes } });

                return;
            }
        });
    }

    const updateTodoList = (projectArg) => {
        project = projectArg;
        render(project ? project.getTodoList() : null);
        return;
    }

    const subscribeEvents = () => {
        PubSub.subscribe({ eventName: "projectTrackerUpdated", callbackFn: updateTodoList });
        PubSub.subscribe({ eventName: "todoListUpdated", callbackFn: render });
    }

    render(project ? project.getTodoList() : null);
    subscribeEvents();

    return {
        render,
    }
}

// Event-related functions

function expandTodoItem(event) {
    const todo = event.target.closest(".todo-item");

    if (todo) {
        const todoHiddenContainer = todo.closest(".todo-container").querySelector(".todo-hidden-container");
        const ariaExpanded = setAriaExpanded(todo);

        showTodoExpanded(ariaExpanded, todoHiddenContainer);

        return;
    }
}

function showTodoExpanded(ariaExpanded, todoHiddenContainer) {
    if (ariaExpanded) {
        todoHiddenContainer.classList.add("show");
        return;
    }

    todoHiddenContainer.classList.remove("show");
    return;
}

function setAriaExpanded(todo) {
    let ariaExpanded = todo.getAttribute("aria-expanded");

    // Convert string to bool
    ariaExpanded = ariaExpanded === "true";
    ariaExpanded = !ariaExpanded;

    todo.setAttribute("aria-expanded", ariaExpanded);

    return ariaExpanded;
}

function setTodoCheckAppearance(event) {
    const todoElement = event.target.closest("[data-todo-index]");
    const selectedTodo = {
        domElement: todoElement,
        shownContainer: todoElement.querySelector("[data-todo-shown-container]"),
        hiddenContainer: todoElement.querySelector("[data-todo-hidden-container]"),
        checkbox: event.target,
    }

    if (event.target.hasAttribute("checked")) {
        removeCheckedAppearance(selectedTodo);
        return;
    }

    addCheckedAppearance(selectedTodo);
}

function removeCheckedAppearance(selectedTodo) {
    selectedTodo.shownContainer.classList.remove("checked", "crossed-out");
    selectedTodo.hiddenContainer.classList.remove("checked");
    selectedTodo.checkbox.removeAttribute("checked");
}

function addCheckedAppearance(selectedTodo) {
    selectedTodo.shownContainer.classList.add("checked", "crossed-out");
    selectedTodo.hiddenContainer.classList.add("checked");
    selectedTodo.checkbox.setAttribute("checked", "");
}
;// ./src/images/icons/add-task.svg
const add_task_namespaceObject = __webpack_require__.p + "05be10cdd202c1fed6d8.svg";
;// ./src/images/icons/remove-done.svg
const remove_done_namespaceObject = __webpack_require__.p + "a97cd793a6ccf2008fe9.svg";
;// ./src/js/interface/main/main-heading-dom.js





const main_heading_dom_ICON_SIZE = 24;

function createMainHeading(projectTitle = null) {
    const div = document.createElement("div");
    const h1 = document.createElement("h1");

    h1.classList.add("main-project-title");
    h1.setAttribute("data-main-project-title", "");
    h1.textContent = projectTitle;

    div.classList.add("main-heading");
    div.setAttribute("data-main-heading", "");

    if (projectTitle) {
        div.append(
            h1,
            createProjectActions(),
            createTodoListActions(),
        );
    } else {
        div.append(h1);
    }

    return div;
}

function createProjectActions() {
    const div = document.createElement("div");
    const editProjectButton = createEditProjectButton();
    const deleteProjectButton = createDeleteProjectButton();

    div.classList.add("project-actions");
    div.setAttribute("data-project-actions", "");
    div.append(
        editProjectButton,
        deleteProjectButton,
    );

    return div;
}

function createEditProjectButton() {
    const button = document.createElement("button");
    const img = document.createElement("img");

    img.src = edit_square_namespaceObject;
    img.alt = "Edit Project Icon";

    img.width = main_heading_dom_ICON_SIZE;
    img.height = main_heading_dom_ICON_SIZE;

    button.setAttribute("data-edit-project-btn", "");
    button.append(img);

    return button;
}

function createDeleteProjectButton() {
    const button = document.createElement("button");
    const img = document.createElement("img");

    img.src = delete_namespaceObject;
    img.alt = "Delete Project Icon";

    img.width = main_heading_dom_ICON_SIZE;
    img.height = main_heading_dom_ICON_SIZE;

    button.setAttribute("data-delete-project-btn", "");
    button.append(img);

    return button;
}

function createTodoListActions() {
    const div = document.createElement("div");

    div.classList.add("todo-list-actions");
    div.setAttribute("data-todo-list-actions", "");
    div.append(
        createAddTodoButton(),
        createClearCheckedButton(),
    );

    return div;
}

function createAddTodoButton() {
    const button = document.createElement("button");
    const img = document.createElement("img");

    img.src = add_task_namespaceObject;
    img.alt = "Add Todo Icon";

    button.classList.add("add-todo");
    button.setAttribute("data-add-todo-button", "");

    button.append(
        img,
        "New Todo",
    );

    return button;
}

function createClearCheckedButton() {
    const button = document.createElement("button");
    const img = document.createElement("img");

    img.src = remove_done_namespaceObject;
    img.alt = "Remove Checked Icon";

    button.classList.add("clear-checked");
    button.setAttribute("data-clear-checked-button", "");
    button.append(
        img,
        "Clear Checked",
    );

    return button;
}


;// ./src/js/interface/main/main-heading-component.js



function MainHeadingComponent({ projectArg, containerArg }) {
    const container = containerArg;
    let project = projectArg;
    let mainHeading = null;

    const render = (projectArg = null) => {
        project = projectArg;
        let oldMainHeading = container.querySelector("[data-main-heading]");

        if (project) {
            mainHeading = createMainHeading(project.getTitle());
            bindEvents();

            if (container.contains(oldMainHeading)) {
                container.replaceChild(mainHeading, oldMainHeading);
                return;
            }

            container.append(mainHeading);
            return;
        }

        if (!oldMainHeading) {
            mainHeading = createMainHeading();
            container.append(mainHeading);
            return;
        }

        oldMainHeading.textContent = "";
        return;
    }

    const bindEvents = () => {
        mainHeading.addEventListener('click', e => {
            if (e.target.closest("[data-project-actions]") && e.target.closest("button")) {
                if (e.target.closest("button").hasAttribute("data-edit-project-btn")) {
                    PubSub.publish({ eventName: "editProjBtnClicked", data: project });
                    return;
                }

                if (e.target.closest("button").hasAttribute("data-delete-project-btn")) {
                    PubSub.publish({ eventName: "deleteProjBtnClicked", data: project });
                    return;
                }
            }

            if (e.target.closest("[data-todo-list-actions]") && e.target.closest("button")) {
                if (e.target.closest("button").hasAttribute("data-add-todo-button")) {
                    PubSub.publish({ eventName: "newTodoBtnClicked", data: project });
                    return;
                }

                if (e.target.closest("button").hasAttribute("data-clear-checked-button")) {
                    PubSub.publish({ eventName: "clearCheckedBtnClicked", data: project.getTitle() });
                    return;
                }
            }
        });
    }

    const subscribeEvents = () => {
        PubSub.subscribe({ eventName: "projectTrackerUpdated", callbackFn: render });
        PubSub.subscribe({ eventName: "currentProjectUpdated", callbackFn: render });
    }

    render(project ? project : null);
    subscribeEvents();

    return {
        render
    }
}
;// ./src/js/logic/project-tracker.js


function ProjectTracker(projectsArg) {
    const projects = projectsArg;
    let index = 0;
    const setIndex = (newIndex) => {
        if (newIndex < 0 || newIndex > projects.getProjectsList().length) {
            throw new Error("Unable to set index: value given is not valid.")
        }

        index = newIndex;
        PubSub.publish({ eventName: "projectTrackerUpdated", data: getProject() });
    }

    const getProject = () => {
        if (projects.getProjectsList().length !== 0) {
            return projects.getProjectViaIndex(index);
        }

        console.info("Project's list is currently empty.");
        return null;
    }

    const getIndex = () => {
        return index;
    }

    const reindexTracker = () => {
        index = index > 0 ? index - 1 : 0;
        PubSub.publish({ eventName: "projectTrackerUpdated", data: getProject() });
    }

    const subscribeEvents = () => {
        PubSub.subscribe({ eventName: "projectIndexUpdated", callbackFn: setIndex });
        PubSub.subscribe({ eventName: "projectDeleted", callbackFn: reindexTracker })
    }

    subscribeEvents();

    return {
        setIndex,
        getIndex,
        getProject,
    }
}
;// ./src/js/interface/modal/confirm-modal-dom.js


function createConfirmModal({ itemType, itemName }) {
    const modal = document.createElement("dialog");
    const div = document.createElement("div");

    if (!(itemType && itemName)) {
        throw new Error("Unable to create confirm modal: missing arguments.");
    }

    div.classList.add("confirm-modal-content");
    div.append(createConfirmForm({ itemType, itemName }));

    modal.classList.add("confirm-modal");
    modal.append(div);

    return modal;
}

function createHiddenInput({ itemType, itemName }) {
    const input = document.createElement("input");
    const capitalisedItemType = capitaliseString(itemType);

    input.type = "hidden";
    input.name = `delete${capitalisedItemType}Title`;
    input.value = itemName;

    return input;
}

function createConfirmForm({ itemType, itemName }) {
    const form = document.createElement("form");
    form.action = "/";
    form.setAttribute("onsubmit", "event.preventDefault()");

    form.append(
        createConfirmHeading(itemName),
        createConfirmText({ itemType, itemName }),
        createDivActionButtons(),
        createHiddenInput({ itemType, itemName })
    );

    return form;
}

function createConfirmHeading(itemName) {
    const h2 = document.createElement("h2");
    h2.textContent = `Delete '${itemName}'`;

    return h2;
}

function createConfirmText({ itemType, itemName }) {
    const p = document.createElement("p");
    const capitalisedItemType = capitaliseString(itemType);

    p.textContent = `Are you sure you want to delete ${capitalisedItemType} '${itemName}'?`;

    return p;
}

function createDivActionButtons() {
    const div = document.createElement("div");
    const cancelBtn = document.createElement("button");
    const submitBtn = document.createElement("button");

    cancelBtn.textContent = "Cancel";
    cancelBtn.setAttribute("type", "reset");

    submitBtn.setAttribute("type", "submit");
    submitBtn.textContent = "Confirm";

    div.classList.add("action-buttons");
    div.append(cancelBtn, submitBtn);

    return div;
}


;// ./src/js/interface/modal/project-modal-dom.js
function createProjectModal({ actionType, currentProject = null }) {
    const modal = document.createElement("dialog");
    const div = document.createElement("div");
    let project = currentProject ? currentProject : {};

    if (!actionType) {
        throw new Error("Unable to create project modal: missing action type.");
    }

    div.classList.add("project-modal-content");
    modal.classList.add("project-modal");

    div.append(createProjectForm({ actionType, currentProject: project }));
    modal.append(div);

    return modal;
}

function createProjectForm({ actionType, currentProject }) {
    const form = document.createElement("form");

    form.action = "/";
    form.setAttribute("onsubmit", "event.preventDefault()");
    form.append(
        createAddProjectHeading(actionType),
        createAddProjectInput(currentProject.title),
        project_modal_dom_createDivActionButtons(actionType),
        project_modal_dom_createHiddenInput(currentProject.title),
    );

    return form;
}

function project_modal_dom_createHiddenInput(currentProjectTitle = null) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.id = "currentProjectTitle";
    input.name = "currentProjectTitle";

    if (currentProjectTitle) {
        input.value = currentProjectTitle;
    }

    return input;
}

function createAddProjectHeading(actionType) {
    const h2 = document.createElement("h2");
    let headingTextContent;

    switch (actionType) {
        case "add":
            headingTextContent = "Add a";
            break;
        case "edit":
            headingTextContent = "Edit";
            break;
        default:
            console.error("The provided action for the modal was not valid.");
            headingTextContent = "Error";
    }

    h2.textContent = headingTextContent + " Project";

    return h2;
}

function createAddProjectInput(currentProjectTitle = null) {
    const input = document.createElement("input");

    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Name of Project");
    input.setAttribute("required", "");
    input.setAttribute("id", "projectTitle");
    input.setAttribute("name", "projectTitle");

    if (currentProjectTitle) {
        input.value = currentProjectTitle;
    }

    return input;
}

function project_modal_dom_createDivActionButtons(actionType) {
    const div = document.createElement("div");
    const cancelBtn = document.createElement("button");
    const submitBtn = document.createElement("button");
    let submitBtnTextContent;

    cancelBtn.textContent = "Cancel";
    cancelBtn.setAttribute("type", "reset");

    switch (actionType) {
        case "add":
            submitBtnTextContent = "Add";
            break;
        case "edit":
            submitBtnTextContent = "Save";
            break;
        default:
            console.error("The provided action for the modal was not valid.");
            submitBtnTextContent = "Error";
    }

    submitBtn.setAttribute("type", "submit");
    submitBtn.textContent = submitBtnTextContent;

    div.classList.add("action-buttons");
    div.append(cancelBtn, submitBtn);

    return div;
}


;// ./src/js/interface/modal/todo-modal-dom.js
function createTodoModal({ actionType, currentTodo = null }) {
    const modal = document.createElement("dialog");
    const div = document.createElement("div");
    let todo = currentTodo ? currentTodo : {};

    if (!actionType) {
        throw new Error("Unable to create todo modal: missing action type.");
    }

    div.classList.add("todo-modal-content");
    div.append(
        createTodoForm({ actionType, currentTodo: todo })
    );

    modal.classList.add("todo-modal");
    modal.append(div);

    return modal;
}

function createTodoForm({ actionType, currentTodo }) {
    const form = document.createElement("form");

    form.action = "/";
    form.setAttribute("onsubmit", "event.preventDefault()");
    form.append(
        todo_modal_dom_createAddProjectHeading(actionType),
        createTodoTitleInput(currentTodo.title),
        createTodoDueDateInput(currentTodo.dueDate),
        createTodoPriorityInput(currentTodo.priority),
        createTodoDescriptionInput(currentTodo.description),
        todo_modal_dom_createDivActionButtons(actionType),
        todo_modal_dom_createHiddenInput(currentTodo.title),
    );

    return form;
}

function todo_modal_dom_createHiddenInput(currentTodoTitle = null) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.id = "currentTodoTitle";
    input.name = "currentTodoTitle";

    if (currentTodoTitle) {
        input.value = currentTodoTitle;
    }

    return input;
}

function todo_modal_dom_createAddProjectHeading(actionType) {
    const h2 = document.createElement("h2");
    let headingTextContent;

    switch (actionType) {
        case "add":
            headingTextContent = "Add a"
            break;
        case "edit":
            headingTextContent = "Edit";
            break;
        default:
            console.error("The provided action for the modal was not valid.");
            headingTextContent = "Error";
    }

    h2.textContent = headingTextContent + " Todo";

    return h2;
}

function createFormInputDiv() {
    const div = document.createElement("div");
    div.classList.add("form-input");

    return div;
}

function createTodoTitleInput(currentTodoTitle = null) {
    const div = createFormInputDiv();
    const label = document.createElement("label");
    const input = document.createElement("input");

    label.setAttribute("for", "todoTitle");
    label.textContent = "Title";

    input.type = "text";
    input.id = "todoTitle";
    input.name = "todoTitle";
    input.setAttribute("required", "");

    if (currentTodoTitle) {
        input.value = currentTodoTitle;
    }

    div.classList.add("form-todo-title");
    div.append(label, input);

    return div;
}

function createTodoDueDateInput(currentTodoDate = null) {
    const div = createFormInputDiv();
    const label = document.createElement("label");
    const input = document.createElement("input");

    label.setAttribute("for", "todoDueDate");
    label.textContent = "Due Date";

    input.type = "date";
    input.id = "todoDueDate";
    input.name = "todoDueDate";
    input.setAttribute("required", "");

    if (currentTodoDate) {
        input.value = currentTodoDate;
    }

    div.classList.add("form-todo-due-date");
    div.append(label, input);

    return div;
}

function createOptionValue({ value, label }) {
    const option = document.createElement("option");

    option.value = value;
    option.textContent = label;

    return option;
}

function createTodoPriorityInput(currentTodoPriority = null) {
    const div = createFormInputDiv();
    const select = document.createElement("select");
    const label = document.createElement("label");
    const selectOption = createOptionValue({ value: "", label: "-- Select a priority --" });
    const lowOption = createOptionValue({ value: "low", label: "Low" });
    const mediumOption = createOptionValue({ value: "medium", label: "Medium" });
    const highOption = createOptionValue({ value: "high", label: "High" });

    label.setAttribute("for", "todoPriority");
    label.textContent = "Priority";

    selectOption.setAttribute("selected", "");
    selectOption.setAttribute("disabled", "");

    select.name = "todoPriority";
    select.id = "todoPriority";
    select.append(selectOption, lowOption, mediumOption, highOption);
    select.setAttribute("required", "");

    if (currentTodoPriority) {
        select.value = currentTodoPriority;
    }

    div.classList.add("form-todo-priority");
    div.append(label, select);

    return div;
}

function createTodoDescriptionInput(currentTodoDesc = null) {
    const div = createFormInputDiv();
    const label = document.createElement("label");
    const textarea = document.createElement("textarea");

    label.setAttribute("for", "todoDescription");
    label.textContent = "Description";

    textarea.id = "todoDescription";
    textarea.name = "todoDescription";
    textarea.setAttribute("required", "");

    if (currentTodoDesc) {
        textarea.value = currentTodoDesc;
    }

    div.classList.add("form-todo-description");
    div.append(label, textarea);

    return div;
}

function todo_modal_dom_createDivActionButtons(actionType) {
    const div = document.createElement("div");
    const cancelBtn = document.createElement("button");
    const submitBtn = document.createElement("button");
    let submitBtnTextContent;

    cancelBtn.textContent = "Cancel";
    cancelBtn.setAttribute("type", "reset");

    switch (actionType) {
        case "add":
            submitBtnTextContent = "Add";
            break;
        case "edit":
            submitBtnTextContent = "Save";
            break;
        default:
            console.error("The provided action for the modal was not valid.");
            submitBtnTextContent = "Error";
    }

    submitBtn.textContent = submitBtnTextContent;
    submitBtn.setAttribute("type", "submit");

    div.classList.add("action-buttons");
    div.append(cancelBtn, submitBtn);

    return div;
}


;// ./src/js/interface/modal/modal-component.js






function ModalComponent(container = document.querySelector("body")) {
    let currentProject = null;
    let currentTodo = null;

    let modal = {
        type: "",
        element: null,
        set({ type, element }) {
            if (modal.element) {
                container.removeChild(modal.element);
            }
            this.type = type;
            this.element = element;
        },
        reset() {
            this.type = "";
            this.element = null;
        },
        isEmpty() {
            return (this.type === "" && this.element === null);
        }
    };

    const render = ({ modalType, project = null, todo = null }) => {
        currentProject = project;
        currentTodo = todo;

        switch (modalType) {
            case "addProject":
                modal.set(
                    {
                        type: modalType,
                        element: createProjectModal({ actionType: "add" })
                    }
                );
                break;
            case "editProject":
                modal.set(
                    {
                        type: modalType,
                        element: createProjectModal({ actionType: "edit", currentProject })
                    }
                );
                break;
            case "deleteProject":
                modal.set(
                    {
                        type: modalType,
                        element: createConfirmModal({ itemType: "project", itemName: currentProject.getTitle() })
                    }
                );
                break;
            case "addTodo":
                modal.set(
                    {
                        type: modalType,
                        element: createTodoModal({ actionType: "add" })
                    });
                break;
            case "editTodo":
                modal.set(
                    {
                        type: modalType,
                        element: createTodoModal({ actionType: "edit", currentTodo })
                    });
                break;
            case "deleteTodo":
                modal.set(
                    {
                        type: modalType,
                        element: createConfirmModal({ itemType: "todo", itemName: currentTodo.getTitle() })
                    });
                break;
        }

        bindEvents();
        container.append(modal.element);
        modal.element.showModal();
    }

    const addProject = () => {
        render({ modalType: "addProject" });
    }

    const editProject = (project) => {
        render({ modalType: "editProject", project });
    }

    const deleteProject = (project) => {
        render({ modalType: "deleteProject", project });
    }

    const addTodo = (project) => {
        render({ modalType: "addTodo", project });
    }

    const editTodo = ({ todo, project }) => {
        render({ modalType: "editTodo", todo, project })
    }

    const deleteTodo = ({ todo, project }) => {
        render({ modalType: "deleteTodo", todo, project })
    }

    const bindEvents = () => {
        ["reset", "cancel"].forEach(eventListener => {
            modal.element.addEventListener(eventListener, e => remove());
        });

        modal.element.addEventListener("keydown", e => {
            if (e.key === "Escape" && modal.element !== null) {
                remove();
                return;
            }
        });

        modal.element.addEventListener("submit", e => {
            if (!modal.isEmpty()) {
                const formData = Extract.formValues(e.target);

                switch (modal.type) {
                    case "addProject":
                        PubSub.publish({ eventName: "newProjectSubmitted", data: formData });
                        break;
                    case "addTodo":
                        PubSub.publish({ eventName: "newTodoSubmitted", data: { currentProject, formData } });
                        break;
                    case "editProject":
                        PubSub.publish({ eventName: "editedProjectSubmitted", data: { currentProject, formData } })
                        break;
                    case "editTodo":
                        PubSub.publish({ eventName: "editedTodoSubmitted", data: { currentProject, formData } });
                        break;
                    case "deleteProject":
                        PubSub.publish({ eventName: "deleteProjectSubmitted", data: formData });
                        break;
                    case "deleteTodo":
                        PubSub.publish({ eventName: "deleteTodoSubmitted", data: { currentProject, formData } });
                        break;
                    default:
                        console.error("Provided modal type does not exist");
                }

                remove(modal);
                resetCurrentItems();
                return;
            }
        });
    }

    const subscribeEvents = () => {
        PubSub.subscribe({ eventName: "newProjBtnClicked", callbackFn: addProject });
        PubSub.subscribe({ eventName: "projectFormValuesSetup", callbackFn: editProject });
        PubSub.subscribe({ eventName: "deleteProjBtnClicked", callbackFn: deleteProject });
        PubSub.subscribe({ eventName: "newTodoBtnClicked", callbackFn: addTodo });
        PubSub.subscribe({ eventName: "todoFormValuesSetup", callbackFn: editTodo });
        PubSub.subscribe({ eventName: "deleteTodoBtnClicked", callbackFn: deleteTodo });
    }

    const resetCurrentItems = () => {
        currentProject = null;
        currentTodo = null;
    }

    const remove = () => {
        resetCurrentItems();

        if (container.contains(modal.element)) {
            container.removeChild(modal.element);
            modal.reset();
        }
    }

    subscribeEvents();

    return {
        render,
        remove
    }
}
;// ./src/js/logic/form-data-processor.js



const FormDataProcessor = (() => {
    const submitNewProject = (formData) => {
        const newProject = createProject(formData.projectTitle);

        PubSub.publish({ eventName: "newProjectCreated", data: newProject });
    }

    const submitNewTodo = ({ formData, currentProject }) => {
        const newTodo = createTodo(
            formData.todoTitle,
            formData.todoDescription,
            formData.todoDueDate,
            formData.todoPriority
        );

        PubSub.publish({ eventName: "newTodoCreated", data: { newTodo, currentProject } });
    }

    const submitEditedProject = ({ formData, currentProject }) => {
        PubSub.publish({ eventName: "projectEdited", data: { currentProject, newTitle: formData.projectTitle } });
    }

    const submitEditedTodo = ({ formData, currentProject }) => {
        PubSub.publish({ eventName: "todoEdited", data: { formData, currentProject } });
    }

    const submitTodoDeletion = ({ formData, currentProject }) => {
        PubSub.publish({ eventName: "deleteTodoRequested", data: { formData, currentProject } });
    }

    const submitProjectDeletion = (formData) => {
        PubSub.publish({ eventName: "deleteProjectRequested", data: formData.deleteProjectTitle });
    }

    const setupProjectFormValues = (project) => {
        const formFriendlyProjectValues = {
            title: project.getTitle(),
        }

        PubSub.publish({ eventName: "projectFormValuesSetup", data: formFriendlyProjectValues });

        return formFriendlyProjectValues;
    }

    const setupTodoFormValues = ({ todo, project }) => {
        let formFriendlyTodoValues = {
            title: todo.getTitle(),
            dueDate: todo.getDueDate().toISOString().split("T")[0],
            priority: todo.getPriority(),
            description: todo.getDescription()
        };

        PubSub.publish({ eventName: "todoFormValuesSetup", data: { todo: formFriendlyTodoValues, project } });

        return formFriendlyTodoValues;
    }

    function subscribeEvents() {
        PubSub.subscribe({ eventName: "newProjectSubmitted", callbackFn: submitNewProject });
        PubSub.subscribe({ eventName: "editedProjectSubmitted", callbackFn: submitEditedProject });
        PubSub.subscribe({ eventName: "deleteProjectSubmitted", callbackFn: submitProjectDeletion });
        PubSub.subscribe({ eventName: "newTodoSubmitted", callbackFn: submitNewTodo });
        PubSub.subscribe({ eventName: "editedTodoSubmitted", callbackFn: submitEditedTodo });
        PubSub.subscribe({ eventName: "deleteTodoSubmitted", callbackFn: submitTodoDeletion });
        PubSub.subscribe({ eventName: "editProjBtnClicked", callbackFn: setupProjectFormValues });
        PubSub.subscribe({ eventName: "editTodoBtnClicked", callbackFn: setupTodoFormValues });
    }

    subscribeEvents();

    return {
        submitNewProject,
        submitNewTodo,
        submitEditedProject,
        submitEditedTodo,
        submitTodoDeletion,
        submitProjectDeletion
    }
})()
;// ./src/js/logic/parse-json.js


class FromParse {
    static convertToProjectsList(projectsParsed) {
        return projectsParsed.map(FromParse.convertToProject);
    }

    static convertToProject(projectParsed) {
        if (!(projectParsed.title && projectParsed.todoList)) {
            throw new Error("Project was not converted to its original form: value passed was not a property of the Project object.");
        }

        const todoList = projectParsed.todoList.map(FromParse.convertToTodo);
        return createProject(projectParsed.title, todoList);
    }

    static convertToTodo(todoParsed) {
        const todoParsedProperties = ['title', 'description', 'dueDate', 'priority'];
        const isTodoParsed = todoParsedProperties.every(property => property in todoParsed);

        if (!isTodoParsed) {
            throw new Error("Todo was not converted to its original form: value passed was not a property of the Todo object.");
        }

        return createTodo(
            todoParsed.title,
            todoParsed.description,
            todoParsed.dueDate,
            todoParsed.priority,
            todoParsed.notes,
            todoParsed.checked
        );
    }
}

class ToJSONFriendlyString {
    static convertFromProjectsList(projectsList) {
        if (!Array.isArray(projectsList)) {
            throw new Error("ProjectsList was not converted to JSON format: value passed was not an Array.");
        }

        return projectsList.map(ToJSONFriendlyString.convertFromProject);
    }

    static convertFromProject(project) {
        if (!(project.getTitle && project.getTodoList)) {
            throw new Error("Project was not converted to JSON format: object passed was not a Project object.");
        }

        return {
            title: project.getTitle(),
            todoList: project.getTodoList().map(ToJSONFriendlyString.convertFromTodo),
        }
    }

    static convertFromTodo(todo) {
        const todoMethods = ['getTitle', 'getDescription', 'getDueDate', 'getPriority'];
        const isTodo = todoMethods.every(property => property in todo);

        if (!isTodo) {
            throw new Error("Todo was not converted to JSON format: object passed was not a Todo object.");
        }

        return ({
            title: todo.getTitle(),
            description: todo.getDescription(),
            dueDate: new Date(todo.getDueDate()).toUTCString(),
            priority: todo.getPriority(),
            notes: todo.getNotes(),
            checked: todo.getChecked()
        });
    }
}


;// ./src/js/logic/local-storage.js



class ProjectsStorage {
    static {
        PubSub.subscribe({ eventName: "projectsInstantiated", callbackFn: this.load.bind(this) });
        PubSub.subscribe({ eventName: "projectsListUpdated", callbackFn: this.save.bind(this) });
    }

    static load() {
        const projectsAsJSON = localStorage.getItem("projects");
        let saveState = null;

        if (projectsAsJSON) {
            console.log("Projects found. Loading from storage.")
            const projectsAsParse = JSON.parse(projectsAsJSON);
            saveState = FromParse.convertToProjectsList(projectsAsParse);
        } else {
            console.log("No projects were found. Creating a new one.");
        }

        PubSub.publish({ eventName: "projectsLoaded", data: saveState });
        return saveState;
    }

    static save(projectsList) {
        if (!Array.isArray(projectsList)) {
            console.error(`Projects was not saved: Value passed was not an array.`);
            return;
        }

        const projectsAsString = ToJSONFriendlyString.convertFromProjectsList(projectsList);
        const projectsAsJSON = JSON.stringify(projectsAsString);

        localStorage.setItem("projects", projectsAsJSON);
    }
}


;// ./src/js/index.js










// Not explicitly read in index.js but used in other components



(function () {
    const body = document.querySelector("body");
    const main = document.querySelector("main");
    const sidebarMain = document.querySelector("[data-projects-list]");

    const projects = new Projects();
    const projectTracker = ProjectTracker(projects);
    let currentProject = projectTracker.getProject();

    const projectsListComponent = ProjectsListComponent(
        {
            projectsListArg: projects.getProjectsList(),
            containerArg: sidebarMain,
            projectIndexArg: projectTracker.getIndex(),
        }
    );

    const mainHeadingComponent = MainHeadingComponent(
        {
            projectArg: currentProject,
            containerArg: main
        }
    );

    const mainContentComponent = MainContentComponent(
        {
            projectArg: currentProject,
            containerArg: main
        }
    );

    const modalComponent = ModalComponent(body);

    body.addEventListener("click", e => {
        if (e.target.hasAttribute("data-add-project-btn")) {
            PubSub.publish({ eventName: "newProjBtnClicked" });
            return;
        }
    });
})();
/******/ })()
;
//# sourceMappingURL=main.js.map