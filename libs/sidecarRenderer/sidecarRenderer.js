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

module.exports = __webpack_require__("6LN/");


/***/ }),

/***/ "6LN/":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
// /* eslint-disable @typescript-eslint/no-explicit-any, no-console */
// function renderOutput(e: NotebookOutputEventParams) {
//     const renderOutputFunc =
//         (window as any).ipywidgetsKernel?.renderOutput || (global as any).ipywidgetsKernel?.renderOutput;
//     if (renderOutputFunc) {
//         return renderOutputFunc(e);
//     }
//     console.error('Rendering widgets on notebook open is not supported.');
// }
// function disposeOutput(e: { outputId: string } | undefined) {
//     const disposeOutputFunc =
//         (window as any).ipywidgetsKernel?.disposeOutput || (global as any).ipywidgetsKernel?.disposeOutput;
//     if (disposeOutputFunc) {
//         return disposeOutputFunc(e);
//     }
// }
/* eslint-disable @typescript-eslint/no-explicit-any */
function initialize() {
    console.log('acquireVsCodeApi');
    console.log(acquireVsCodeApi);
    // vscApi.postMessage('Initialized');
    console.log('Initialized sidecar');
    console.log('(window as any)._jupyter_postOffice');
    console.log(window._jupyter_postOffice);
    var postOffice = window._jupyter_postOffice;
    console.log('(window as any).ipywidgetsKernel');
    console.log(window.ipywidgetsKernel);
    console.log('(window as any).getKernel');
    console.log(window.ipywidgetsKernel.getKernel);
    if (window.onmessage) {
        window.onmessage(messageHandler);
    }
    if (postOffice) {
        console.error('Post Office exists & sending message');
        postOffice.sendMessage('CUSTOM_VIEW', { h: 'helloFromUI' });
        postOffice.addHandler({
            handleMessage: function (type, payload) {
                var _a, _b;
                console.log("type = " + type + ", payload = " + payload);
                if (type === 'HelloWordFromExt') {
                    console.error('Received message from Exteension');
                }
                if (type === 'RENDER_WIDGET') {
                    console.error('Received message to reender Widget', payload);
                    var renderOutputFunc = ((_a = window.ipywidgetsKernel) === null || _a === void 0 ? void 0 : _a.renderOutput) || ((_b = global.ipywidgetsKernel) === null || _b === void 0 ? void 0 : _b.renderOutput);
                    if (renderOutputFunc) {
                        console.error('Rendering');
                        renderOutputFunc({
                            element: document.getElementById('variableWidgetContainer'),
                            outputId: 'variableWidgetContainer',
                            value: payload.data['application/vnd.jupyter.widget-view+json'],
                            mime: 'application/vnd.jupyter.widget-view+json',
                            metadata: payload.metadata
                        });
                    }
                }
                return true;
            }
        });
    }
    else {
        console.error('Post Office does not exist');
    }
}
function messageHandler(msg) {
    console.log("In Side car");
    console.log(msg);
}
initialize();


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RhdGFzY2llbmNlLXVpL2lweXdpZGdldHMvcmVuZGVyZXIvc2lkZWNhci50cyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxJQUFJO1FBQ0o7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkdBO0FBQUEsMEdBQTREO0FBQzVELGtDQUFrQztBQUlsQyxzRUFBc0U7QUFDdEUsd0RBQXdEO0FBQ3hELCtCQUErQjtBQUMvQiw0R0FBNEc7QUFDNUcsOEJBQThCO0FBQzlCLHNDQUFzQztBQUN0QyxRQUFRO0FBQ1IsNkVBQTZF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QTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDOztBQUU1QyIsImZpbGUiOiJzaWRlY2FyUmVuZGVyZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHQoZnVuY3Rpb24gKG1vZHVsZSkge1xuIFx0XHQgIGlmIChtb2R1bGUuZXhwb3J0c1xuIFx0XHQgICAgJiYgIW1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGVcbiBcdFx0ICAgICYmIG1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPT09IHVuZGVmaW5lZFxuIFx0XHQgICkge1xuIFx0XHQgICAgaWYgKG1vZHVsZS5leHBvcnRzLmhlYWRlcnNcbiBcdFx0ICAgICAgJiYgbW9kdWxlLmV4cG9ydHMuaGVhZGVycy5jb21tb25cbiBcdFx0ICAgICAgJiYgbW9kdWxlLmV4cG9ydHMuaGVhZGVycy5jb21tb24uQWNjZXB0XG4gXHRcdCAgICAgICYmIG1vZHVsZS5leHBvcnRzLmFkYXB0ZXJcbiBcdFx0ICAgICAgJiYgbW9kdWxlLmV4cG9ydHMudHJhbnNmb3JtUmVxdWVzdFxuIFx0XHQgICAgICAmJiBtb2R1bGUuZXhwb3J0cy50cmFuc2Zvcm1SZXNwb25zZVxuIFx0XHQgICAgKSB7XG4gXHRcdCAgICAgIHJldHVybjtcbiBcdFx0ICAgIH1cbiBcdFx0ICAgIG1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBtb2R1bGUuZXhwb3J0cztcbiBcdFx0ICB9XG4gXHRcdH0pKG1vZHVsZSk7XG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5leHBvcnQgZGVjbGFyZSBmdW5jdGlvbiBhY3F1aXJlVnNDb2RlQXBpKCk6IElWc0NvZGVBcGk7XG5cbi8vIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnksIG5vLWNvbnNvbGUgKi9cbi8vIGZ1bmN0aW9uIHJlbmRlck91dHB1dChlOiBOb3RlYm9va091dHB1dEV2ZW50UGFyYW1zKSB7XG4vLyAgICAgY29uc3QgcmVuZGVyT3V0cHV0RnVuYyA9XG4vLyAgICAgICAgICh3aW5kb3cgYXMgYW55KS5pcHl3aWRnZXRzS2VybmVsPy5yZW5kZXJPdXRwdXQgfHwgKGdsb2JhbCBhcyBhbnkpLmlweXdpZGdldHNLZXJuZWw/LnJlbmRlck91dHB1dDtcbi8vICAgICBpZiAocmVuZGVyT3V0cHV0RnVuYykge1xuLy8gICAgICAgICByZXR1cm4gcmVuZGVyT3V0cHV0RnVuYyhlKTtcbi8vICAgICB9XG4vLyAgICAgY29uc29sZS5lcnJvcignUmVuZGVyaW5nIHdpZGdldHMgb24gbm90ZWJvb2sgb3BlbiBpcyBub3Qgc3VwcG9ydGVkLicpO1xuLy8gfVxuXG4vLyBmdW5jdGlvbiBkaXNwb3NlT3V0cHV0KGU6IHsgb3V0cHV0SWQ6IHN0cmluZyB9IHwgdW5kZWZpbmVkKSB7XG4vLyAgICAgY29uc3QgZGlzcG9zZU91dHB1dEZ1bmMgPVxuLy8gICAgICAgICAod2luZG93IGFzIGFueSkuaXB5d2lkZ2V0c0tlcm5lbD8uZGlzcG9zZU91dHB1dCB8fCAoZ2xvYmFsIGFzIGFueSkuaXB5d2lkZ2V0c0tlcm5lbD8uZGlzcG9zZU91dHB1dDtcbi8vICAgICBpZiAoZGlzcG9zZU91dHB1dEZ1bmMpIHtcbi8vICAgICAgICAgcmV0dXJuIGRpc3Bvc2VPdXRwdXRGdW5jKGUpO1xuLy8gICAgIH1cbi8vIH1cblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICBjb25zb2xlLmxvZygnYWNxdWlyZVZzQ29kZUFwaScpO1xuICAgIGNvbnNvbGUubG9nKGFjcXVpcmVWc0NvZGVBcGkpO1xuICAgIC8vIHZzY0FwaS5wb3N0TWVzc2FnZSgnSW5pdGlhbGl6ZWQnKTtcbiAgICBjb25zb2xlLmxvZygnSW5pdGlhbGl6ZWQgc2lkZWNhcicpO1xuICAgIGNvbnNvbGUubG9nKCcod2luZG93IGFzIGFueSkuX2p1cHl0ZXJfcG9zdE9mZmljZScpO1xuICAgIGNvbnNvbGUubG9nKCh3aW5kb3cgYXMgYW55KS5fanVweXRlcl9wb3N0T2ZmaWNlKTtcbiAgICBjb25zdCBwb3N0T2ZmaWNlID0gKHdpbmRvdyBhcyBhbnkpLl9qdXB5dGVyX3Bvc3RPZmZpY2U7XG4gICAgY29uc29sZS5sb2coJyh3aW5kb3cgYXMgYW55KS5pcHl3aWRnZXRzS2VybmVsJyk7XG4gICAgY29uc29sZS5sb2coKHdpbmRvdyBhcyBhbnkpLmlweXdpZGdldHNLZXJuZWwpO1xuICAgIGNvbnNvbGUubG9nKCcod2luZG93IGFzIGFueSkuZ2V0S2VybmVsJyk7XG4gICAgY29uc29sZS5sb2coKHdpbmRvdyBhcyBhbnkpLmlweXdpZGdldHNLZXJuZWwuZ2V0S2VybmVsKTtcbiAgICBpZiAod2luZG93Lm9ubWVzc2FnZSkge1xuICAgICAgICAod2luZG93Lm9ubWVzc2FnZSBhcyBhbnkpKG1lc3NhZ2VIYW5kbGVyKTtcbiAgICB9XG4gICAgaWYgKHBvc3RPZmZpY2UpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignUG9zdCBPZmZpY2UgZXhpc3RzICYgc2VuZGluZyBtZXNzYWdlJyk7XG4gICAgICAgIHBvc3RPZmZpY2Uuc2VuZE1lc3NhZ2UoJ0NVU1RPTV9WSUVXJywgeyBoOiAnaGVsbG9Gcm9tVUknIH0pO1xuICAgICAgICBwb3N0T2ZmaWNlLmFkZEhhbmRsZXIoe1xuICAgICAgICAgICAgaGFuZGxlTWVzc2FnZTogKHR5cGU6IHN0cmluZywgcGF5bG9hZD86IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGB0eXBlID0gJHt0eXBlfSwgcGF5bG9hZCA9ICR7cGF5bG9hZH1gKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ0hlbGxvV29yZEZyb21FeHQnKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignUmVjZWl2ZWQgbWVzc2FnZSBmcm9tIEV4dGVlbnNpb24nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdSRU5ERVJfV0lER0VUJyl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1JlY2VpdmVkIG1lc3NhZ2UgdG8gcmVlbmRlciBXaWRnZXQnLCBwYXlsb2FkKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVuZGVyT3V0cHV0RnVuYyA9XG4gICAgICAgICAgICAgICAgICAgICh3aW5kb3cgYXMgYW55KS5pcHl3aWRnZXRzS2VybmVsPy5yZW5kZXJPdXRwdXQgfHwgKGdsb2JhbCBhcyBhbnkpLmlweXdpZGdldHNLZXJuZWw/LnJlbmRlck91dHB1dDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlbmRlck91dHB1dEZ1bmMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1JlbmRlcmluZycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyT3V0cHV0RnVuYyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZhcmlhYmxlV2lkZ2V0Q29udGFpbmVyJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0SWQ6ICd2YXJpYWJsZVdpZGdldENvbnRhaW5lcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHBheWxvYWQuZGF0YVsnYXBwbGljYXRpb24vdm5kLmp1cHl0ZXIud2lkZ2V0LXZpZXcranNvbiddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbWU6ICdhcHBsaWNhdGlvbi92bmQuanVweXRlci53aWRnZXQtdmlldytqc29uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhZGF0YTogcGF5bG9hZC5tZXRhZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignUG9zdCBPZmZpY2UgZG9lcyBub3QgZXhpc3QnKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG1lc3NhZ2VIYW5kbGVyKG1zZzogYW55KSB7XG4gICAgY29uc29sZS5sb2coYEluIFNpZGUgY2FyYCk7XG4gICAgY29uc29sZS5sb2cobXNnKTtcbn1cblxuaW5pdGlhbGl6ZSgpO1xuIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==