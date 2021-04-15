/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		(function (module) {
/******/ 		  if (module.exports
/******/ 		    && !module.exports.__esModule
/******/ 		    && module.exports.default === undefined
/******/ 		  ) {
/******/ 		    if (module.exports.headers
/******/ 		      && module.exports.headers.common
/******/ 		      && module.exports.headers.common.Accept
/******/ 		      && module.exports.adapter
/******/ 		      && module.exports.transformRequest
/******/ 		      && module.exports.transformResponse
/******/ 		    ) {
/******/ 		      return;
/******/ 		    }
/******/ 		    module.exports.default = module.exports;
/******/ 		  }
/******/ 		})(module);
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("5i39");


/***/ }),

/***/ "5i39":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
var JupyterIPyWidgetNotebookRenderer = 'jupyter-ipywidget-renderer';
/* eslint-disable @typescript-eslint/no-explicit-any, no-console */
function renderOutput(e) {
    var _a, _b;
    var renderOutputFunc = ((_a = window.ipywidgetsKernel) === null || _a === void 0 ? void 0 : _a.renderOutput) || ((_b = global.ipywidgetsKernel) === null || _b === void 0 ? void 0 : _b.renderOutput);
    if (renderOutputFunc) {
        return renderOutputFunc(e);
    }
    console.error('Rendering widgets on notebook open is not supported.');
}
function disposeOutput(e) {
    var _a, _b;
    var disposeOutputFunc = ((_a = window.ipywidgetsKernel) === null || _a === void 0 ? void 0 : _a.disposeOutput) || ((_b = global.ipywidgetsKernel) === null || _b === void 0 ? void 0 : _b.disposeOutput);
    if (disposeOutputFunc) {
        return disposeOutputFunc(e);
    }
}
/* eslint-disable @typescript-eslint/no-explicit-any */
function initialize(api) {
    api.onDidCreateOutput(renderOutput);
    api.onWillDestroyOutput(disposeOutput);
}
initialize(acquireNotebookRendererApi(JupyterIPyWidgetNotebookRenderer));


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("yLpj")))

/***/ }),

/***/ "yLpj":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RhdGFzY2llbmNlLXVpL2lweXdpZGdldHMvcmVuZGVyZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ25HQTtBQUFBLDBHQUE0RDtBQUM1RCxrQ0FBa0M7QUFHbEMsSUFBTSxnQ0FBZ0MsR0FBRyw0QkFBNEIsQ0FBQztBQUV0RSxtRUFBbUU7QUFDbkUsU0FBUyxZQUFZLENBQUMsQ0FBNEI7O0lBQzlDLElBQU0sZ0JBQWdCLEdBQ2xCLE9BQUMsTUFBYyxDQUFDLGdCQUFnQiwwQ0FBRSxZQUFZLFlBQUssTUFBYyxDQUFDLGdCQUFnQiwwQ0FBRSxZQUFZLEVBQUM7SUFDckcsSUFBSSxnQkFBZ0IsRUFBRTtRQUNsQixPQUFPLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzlCO0lBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxzREFBc0QsQ0FBQyxDQUFDO0FBQzFFLENBQUM7QUFFRCxTQUFTLGFBQWEsQ0FBQyxDQUFtQzs7SUFDdEQsSUFBTSxpQkFBaUIsR0FDbkIsT0FBQyxNQUFjLENBQUMsZ0JBQWdCLDBDQUFFLGFBQWEsWUFBSyxNQUFjLENBQUMsZ0JBQWdCLDBDQUFFLGFBQWEsRUFBQztJQUN2RyxJQUFJLGlCQUFpQixFQUFFO1FBQ25CLE9BQU8saUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDL0I7QUFDTCxDQUFDO0FBRUQsdURBQXVEO0FBQ3ZELFNBQVMsVUFBVSxDQUFDLEdBQTZCO0lBQzdDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNwQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDM0MsQ0FBQztBQUVELFVBQVUsQ0FBQywwQkFBMEIsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7QUM5QnpFOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDOztBQUU1QyIsImZpbGUiOiJpcHl3aWRnZXRzUmVuZGVyZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHQoZnVuY3Rpb24gKG1vZHVsZSkge1xuIFx0XHQgIGlmIChtb2R1bGUuZXhwb3J0c1xuIFx0XHQgICAgJiYgIW1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGVcbiBcdFx0ICAgICYmIG1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPT09IHVuZGVmaW5lZFxuIFx0XHQgICkge1xuIFx0XHQgICAgaWYgKG1vZHVsZS5leHBvcnRzLmhlYWRlcnNcbiBcdFx0ICAgICAgJiYgbW9kdWxlLmV4cG9ydHMuaGVhZGVycy5jb21tb25cbiBcdFx0ICAgICAgJiYgbW9kdWxlLmV4cG9ydHMuaGVhZGVycy5jb21tb24uQWNjZXB0XG4gXHRcdCAgICAgICYmIG1vZHVsZS5leHBvcnRzLmFkYXB0ZXJcbiBcdFx0ICAgICAgJiYgbW9kdWxlLmV4cG9ydHMudHJhbnNmb3JtUmVxdWVzdFxuIFx0XHQgICAgICAmJiBtb2R1bGUuZXhwb3J0cy50cmFuc2Zvcm1SZXNwb25zZVxuIFx0XHQgICAgKSB7XG4gXHRcdCAgICAgIHJldHVybjtcbiBcdFx0ICAgIH1cbiBcdFx0ICAgIG1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBtb2R1bGUuZXhwb3J0cztcbiBcdFx0ICB9XG4gXHRcdH0pKG1vZHVsZSk7XG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBOb3RlYm9va091dHB1dEV2ZW50UGFyYW1zLCBOb3RlYm9va1JlbmRlcmVyQXBpIH0gZnJvbSAndnNjb2RlLW5vdGVib29rLXJlbmRlcmVyJztcbmNvbnN0IEp1cHl0ZXJJUHlXaWRnZXROb3RlYm9va1JlbmRlcmVyID0gJ2p1cHl0ZXItaXB5d2lkZ2V0LXJlbmRlcmVyJztcblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSwgbm8tY29uc29sZSAqL1xuZnVuY3Rpb24gcmVuZGVyT3V0cHV0KGU6IE5vdGVib29rT3V0cHV0RXZlbnRQYXJhbXMpIHtcbiAgICBjb25zdCByZW5kZXJPdXRwdXRGdW5jID1cbiAgICAgICAgKHdpbmRvdyBhcyBhbnkpLmlweXdpZGdldHNLZXJuZWw/LnJlbmRlck91dHB1dCB8fCAoZ2xvYmFsIGFzIGFueSkuaXB5d2lkZ2V0c0tlcm5lbD8ucmVuZGVyT3V0cHV0O1xuICAgIGlmIChyZW5kZXJPdXRwdXRGdW5jKSB7XG4gICAgICAgIHJldHVybiByZW5kZXJPdXRwdXRGdW5jKGUpO1xuICAgIH1cbiAgICBjb25zb2xlLmVycm9yKCdSZW5kZXJpbmcgd2lkZ2V0cyBvbiBub3RlYm9vayBvcGVuIGlzIG5vdCBzdXBwb3J0ZWQuJyk7XG59XG5cbmZ1bmN0aW9uIGRpc3Bvc2VPdXRwdXQoZTogeyBvdXRwdXRJZDogc3RyaW5nIH0gfCB1bmRlZmluZWQpIHtcbiAgICBjb25zdCBkaXNwb3NlT3V0cHV0RnVuYyA9XG4gICAgICAgICh3aW5kb3cgYXMgYW55KS5pcHl3aWRnZXRzS2VybmVsPy5kaXNwb3NlT3V0cHV0IHx8IChnbG9iYWwgYXMgYW55KS5pcHl3aWRnZXRzS2VybmVsPy5kaXNwb3NlT3V0cHV0O1xuICAgIGlmIChkaXNwb3NlT3V0cHV0RnVuYykge1xuICAgICAgICByZXR1cm4gZGlzcG9zZU91dHB1dEZ1bmMoZSk7XG4gICAgfVxufVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG5mdW5jdGlvbiBpbml0aWFsaXplKGFwaTogTm90ZWJvb2tSZW5kZXJlckFwaTxhbnk+KSB7XG4gICAgYXBpLm9uRGlkQ3JlYXRlT3V0cHV0KHJlbmRlck91dHB1dCk7XG4gICAgYXBpLm9uV2lsbERlc3Ryb3lPdXRwdXQoZGlzcG9zZU91dHB1dCk7XG59XG5cbmluaXRpYWxpemUoYWNxdWlyZU5vdGVib29rUmVuZGVyZXJBcGkoSnVweXRlcklQeVdpZGdldE5vdGVib29rUmVuZGVyZXIpKTtcbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiJdLCJzb3VyY2VSb290IjoiIn0=