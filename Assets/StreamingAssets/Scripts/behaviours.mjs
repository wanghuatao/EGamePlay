/******/ var __webpack_modules__ = ({

/***/ "./TypeScript/Base/base.ts":
/*!*********************************!*\
  !*** ./TypeScript/Base/base.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JsBehaviour": () => (/* binding */ JsBehaviour)
/* harmony export */ });
class JsBehaviour {
    Start() { }
    Update() { }
    OnTriggerEnter(other) { }
    _mb;
    constructor(mb) {
        // mono.Js
        this._mb = mb;
        if (this.Start != JsBehaviour.prototype.Start) {
            mb.JsStart = this.Start.bind(this);
        }
        if (this.Update != JsBehaviour.prototype.Update) {
            mb.JsUpdate = this.Update.bind(this);
        }
        if (this.OnTriggerEnter != JsBehaviour.prototype.OnTriggerEnter) {
            mb.JsOnTriggerEnter = this.OnTriggerEnter.bind(this);
        }
    }
}



/***/ }),

/***/ "./TypeScript/JSBallBehaviour.ts":
/*!***************************************!*\
  !*** ./TypeScript/JSBallBehaviour.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JSBallBehaviour": () => (/* binding */ JSBallBehaviour)
/* harmony export */ });
/* harmony import */ var _Base_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base/base */ "./TypeScript/Base/base.ts");

class JSBallBehaviour extends _Base_base__WEBPACK_IMPORTED_MODULE_0__.JsBehaviour {
    Start() {
        console.log('sstart');
    }
    prescore;
    OnTriggerEnter(trigger) {
        console.log('onTriggerEnter', trigger);
        // if (trigger == JSGameManager.instance._mb.PrescoreTrigger) {
        //     this.prescore = true;
        // }
        // if (trigger == JSGameManager.instance._mb.ScoredTrigger && this.prescore) {
        //     console.log("得分")
        // }
    }
}



/***/ }),

/***/ "./TypeScript/JSGameManager.ts":
/*!*************************************!*\
  !*** ./TypeScript/JSGameManager.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JSGameManager": () => (/* binding */ JSGameManager)
/* harmony export */ });
/* harmony import */ var _Base_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base/base */ "./TypeScript/Base/base.ts");

class JSGameManager extends _Base_base__WEBPACK_IMPORTED_MODULE_0__.JsBehaviour {
    static instance;
    Start() {
        this.spawnBall();
        JSGameManager.instance = this;
    }
    pressed;
    useTouch;
    Update() {
        const expectPressTimeMax = 1000;
        if (!this.pressed && (CS.UnityEngine.Input.GetMouseButtonDown(0) || CS.UnityEngine.Input.touchCount != 0)) {
            this.pressed = Date.now();
            if (CS.UnityEngine.Input.touchCount) {
                this.useTouch = true;
            }
        }
        if (this.pressed && (this.useTouch ? CS.UnityEngine.Input.touchCount == 0 : CS.UnityEngine.Input.GetMouseButtonUp(0))) {
            this.shootBall(Math.min(expectPressTimeMax, Date.now() - this.pressed) / expectPressTimeMax);
            this.pressed = 0;
        }
        //@ts-ignore
        globalThis._puerts_registry && globalThis._puerts_registry.cleanup();
    }
    shootBall(power) {
        const rigidbody = this.currentBall.GetComponent(puer.$typeof(CS.UnityEngine.Rigidbody));
        rigidbody.isKinematic = false;
        rigidbody.velocity = new CS.UnityEngine.Vector3(1 + 2 * power, 3 + 6 * power, 0);
        setTimeout(() => {
            this.spawnBall();
        }, 500);
    }
    currentBall;
    spawnBall() {
        const ball = this.currentBall = CS.UnityEngine.Object.Instantiate(this._mb.BallPrefab);
        ball.transform.position = this._mb.BallSpawnPoint.transform.position;
        const rigidbody = ball.GetComponent(puer.$typeof(CS.UnityEngine.Rigidbody));
        rigidbody.isKinematic = true;
    }
}



/***/ }),

/***/ "./TypeScript/TestJsBehavior.ts":
/*!**************************************!*\
  !*** ./TypeScript/TestJsBehavior.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TestJsBehavior)
/* harmony export */ });
/* harmony import */ var _Base_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base/base */ "./TypeScript/Base/base.ts");

class TestJsBehavior extends _Base_base__WEBPACK_IMPORTED_MODULE_0__.JsBehaviour {
    Start() {
        console.log(" ddd TestJsB.Start");
    }
    Update() {
        // console.log("sssssssrdddrrjjjjj")
    }
}
// export {TestJsBehavior}


/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./TypeScript/entry.ts ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JSBallBehaviour": () => (/* binding */ JSBallBehaviourFactory),
/* harmony export */   "JSGameManager": () => (/* binding */ JSGameManagerFactory),
/* harmony export */   "TestJsBehavior": () => (/* binding */ TestJsBehaviorFactory)
/* harmony export */ });
/* harmony import */ var _JSGameManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./JSGameManager */ "./TypeScript/JSGameManager.ts");
/* harmony import */ var _JSBallBehaviour__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./JSBallBehaviour */ "./TypeScript/JSBallBehaviour.ts");
/* harmony import */ var _TestJsBehavior__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TestJsBehavior */ "./TypeScript/TestJsBehavior.ts");



function makeFactory(cls) {
    return function (...args) {
        return new cls(...args);
    };
}
console.log("eehello worldeedddd!");
const JSBallBehaviourFactory = makeFactory(_JSBallBehaviour__WEBPACK_IMPORTED_MODULE_1__.JSBallBehaviour);
const JSGameManagerFactory = makeFactory(_JSGameManager__WEBPACK_IMPORTED_MODULE_0__.JSGameManager);
const TestJsBehaviorFactory = makeFactory(_TestJsBehavior__WEBPACK_IMPORTED_MODULE_2__["default"]);


})();

var __webpack_exports__JSBallBehaviour = __webpack_exports__.JSBallBehaviour;
var __webpack_exports__JSGameManager = __webpack_exports__.JSGameManager;
var __webpack_exports__TestJsBehavior = __webpack_exports__.TestJsBehavior;
export { __webpack_exports__JSBallBehaviour as JSBallBehaviour, __webpack_exports__JSGameManager as JSGameManager, __webpack_exports__TestJsBehavior as TestJsBehavior };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQztDQUdKO0FBRXVCOzs7Ozs7Ozs7Ozs7Ozs7O0FDcERrQjtBQUUzQixNQUFNLGNBQWUsU0FBUSxtREFBNEI7SUFFcEUsS0FBSztRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsTUFBTTtRQUVGLG9DQUFvQztJQUN4QyxDQUFDO0NBQ0o7QUFFRCwwQkFBMEI7Ozs7Ozs7U0NmMUI7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOZ0Q7QUFDSTtBQUNOO0FBRTlDLFNBQVMsV0FBVyxDQUFDLEdBQVE7SUFDekIsT0FBTyxVQUFVLEdBQUcsSUFBVztRQUMzQixPQUFPLElBQUksR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztBQUNMLENBQUM7QUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFHcEMsTUFBTSxzQkFBc0IsR0FBRyxXQUFXLENBQUMsNkRBQWUsQ0FBQztBQUMzRCxNQUFNLG9CQUFvQixHQUFHLFdBQVcsQ0FBQyx5REFBYSxDQUFDO0FBQ3ZELE1BQU0scUJBQXFCLEdBQUcsV0FBVyxDQUFDLHVEQUFjLENBQUM7QUFLeEQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AcHVlcnRzL3dlYmdsLy4vVHlwZVNjcmlwdC9CYXNlL2Jhc2UudHMiLCJ3ZWJwYWNrOi8vQHB1ZXJ0cy93ZWJnbC8uL1R5cGVTY3JpcHQvSlNCYWxsQmVoYXZpb3VyLnRzIiwid2VicGFjazovL0BwdWVydHMvd2ViZ2wvLi9UeXBlU2NyaXB0L0pTR2FtZU1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vQHB1ZXJ0cy93ZWJnbC8uL1R5cGVTY3JpcHQvVGVzdEpzQmVoYXZpb3IudHMiLCJ3ZWJwYWNrOi8vQHB1ZXJ0cy93ZWJnbC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9AcHVlcnRzL3dlYmdsL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9AcHVlcnRzL3dlYmdsL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vQHB1ZXJ0cy93ZWJnbC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0BwdWVydHMvd2ViZ2wvLi9UeXBlU2NyaXB0L2VudHJ5LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEpzTW9ub0JlaGF2aW91ciB9IGZyb20gXCJjc2hhcnBcIjtcclxuaW1wb3J0IHsgVW5pdHlFbmdpbmUgfSBmcm9tICdjc2hhcnAnXHJcblxyXG5jbGFzcyBKc0JlaGF2aW91cjxUIGV4dGVuZHMgSnNNb25vQmVoYXZpb3VyPiB7XHJcblxyXG4gICAgU3RhcnQoKTogdm9pZCB7IH1cclxuICAgIFVwZGF0ZSgpOiB2b2lkIHsgfVxyXG4gICAgT25UcmlnZ2VyRW50ZXIob3RoZXI6IFVuaXR5RW5naW5lLkNvbGxpZGVyKTogdm9pZCB7IH1cclxuXHJcbiAgICBwdWJsaWMgX21iOiBUXHJcblxyXG4gICAgY29uc3RydWN0b3IobWI6IFQpIHtcclxuICAgICAgICAvLyBtb25vLkpzXHJcbiAgICAgICAgdGhpcy5fbWIgPSBtYjtcclxuICAgICAgICBpZiAodGhpcy5TdGFydCAhPSBKc0JlaGF2aW91ci5wcm90b3R5cGUuU3RhcnQpIHtcclxuICAgICAgICAgICAgbWIuSnNTdGFydCA9IHRoaXMuU3RhcnQuYmluZCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuVXBkYXRlICE9IEpzQmVoYXZpb3VyLnByb3RvdHlwZS5VcGRhdGUpIHtcclxuICAgICAgICAgICAgbWIuSnNVcGRhdGUgPSB0aGlzLlVwZGF0ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5PblRyaWdnZXJFbnRlciAhPSBKc0JlaGF2aW91ci5wcm90b3R5cGUuT25UcmlnZ2VyRW50ZXIpIHtcclxuICAgICAgICAgICAgbWIuSnNPblRyaWdnZXJFbnRlciA9IHRoaXMuT25UcmlnZ2VyRW50ZXIuYmluZCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIFxyXG59XHJcblxyXG5leHBvcnQgeyBKc0JlaGF2aW91ciB9IiwiaW1wb3J0IHsgSnNNb25vQmVoYXZpb3VyLCBVbml0eUVuZ2luZSB9IGZyb20gJ2NzaGFycCdcclxuaW1wb3J0IHsgSnNCZWhhdmlvdXIgfSBmcm9tICcuL0Jhc2UvYmFzZSdcclxuaW1wb3J0IHsgSlNHYW1lTWFuYWdlciB9IGZyb20gJy4vSlNHYW1lTWFuYWdlcic7XHJcblxyXG5jbGFzcyBKU0JhbGxCZWhhdmlvdXIgZXh0ZW5kcyBKc0JlaGF2aW91cjxKc01vbm9CZWhhdmlvdXI+e1xyXG5cclxuICAgIFN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdzc3RhcnQnKVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBwcmVzY29yZTogYm9vbGVhblxyXG4gICAgT25UcmlnZ2VyRW50ZXIodHJpZ2dlcjogVW5pdHlFbmdpbmUuQ29sbGlkZXIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnb25UcmlnZ2VyRW50ZXInLHRyaWdnZXIpXHJcblxyXG4gICAgICAgIC8vIGlmICh0cmlnZ2VyID09IEpTR2FtZU1hbmFnZXIuaW5zdGFuY2UuX21iLlByZXNjb3JlVHJpZ2dlcikge1xyXG4gICAgICAgIC8vICAgICB0aGlzLnByZXNjb3JlID0gdHJ1ZTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gaWYgKHRyaWdnZXIgPT0gSlNHYW1lTWFuYWdlci5pbnN0YW5jZS5fbWIuU2NvcmVkVHJpZ2dlciAmJiB0aGlzLnByZXNjb3JlKSB7XHJcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwi5b6X5YiGXCIpXHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBKU0JhbGxCZWhhdmlvdXIgfSIsImltcG9ydCB7IEpzQmVoYXZpb3VyIH0gZnJvbSAnLi9CYXNlL2Jhc2UnXHJcblxyXG5jbGFzcyBKU0dhbWVNYW5hZ2VyIGV4dGVuZHMgSnNCZWhhdmlvdXI8Q1MuR2FtZU1hbmFnZXI+e1xyXG4gICAgcHVibGljIHN0YXRpYyBpbnN0YW5jZTogSlNHYW1lTWFuYWdlcjtcclxuXHJcbiAgICBTdGFydCgpIHtcclxuICAgICAgICB0aGlzLnNwYXduQmFsbCgpO1xyXG4gICAgICAgIEpTR2FtZU1hbmFnZXIuaW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBwcmVzc2VkOiBudW1iZXI7XHJcbiAgICBwcm90ZWN0ZWQgdXNlVG91Y2g6IGJvb2xlYW47XHJcbiAgICBVcGRhdGUoKSB7XHJcbiAgICAgICAgY29uc3QgZXhwZWN0UHJlc3NUaW1lTWF4ID0gMTAwMDtcclxuICAgICAgICBpZiAoIXRoaXMucHJlc3NlZCAmJiAoQ1MuVW5pdHlFbmdpbmUuSW5wdXQuR2V0TW91c2VCdXR0b25Eb3duKDApIHx8IENTLlVuaXR5RW5naW5lLklucHV0LnRvdWNoQ291bnQgIT0gMCkpIHtcclxuICAgICAgICAgICAgdGhpcy5wcmVzc2VkID0gRGF0ZS5ub3coKTtcclxuICAgICAgICAgICAgaWYgKENTLlVuaXR5RW5naW5lLklucHV0LnRvdWNoQ291bnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlVG91Y2ggPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgdGhpcy5wcmVzc2VkICYmIChcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlVG91Y2ggPyBDUy5Vbml0eUVuZ2luZS5JbnB1dC50b3VjaENvdW50ID09IDAgOiBDUy5Vbml0eUVuZ2luZS5JbnB1dC5HZXRNb3VzZUJ1dHRvblVwKDApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgdGhpcy5zaG9vdEJhbGwoTWF0aC5taW4oZXhwZWN0UHJlc3NUaW1lTWF4LCBEYXRlLm5vdygpIC0gdGhpcy5wcmVzc2VkKSAvIGV4cGVjdFByZXNzVGltZU1heCk7XHJcbiAgICAgICAgICAgIHRoaXMucHJlc3NlZCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgIGdsb2JhbFRoaXMuX3B1ZXJ0c19yZWdpc3RyeSAmJiBnbG9iYWxUaGlzLl9wdWVydHNfcmVnaXN0cnkuY2xlYW51cCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob290QmFsbChwb3dlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgcmlnaWRib2R5ID0gdGhpcy5jdXJyZW50QmFsbC5HZXRDb21wb25lbnQocHVlci4kdHlwZW9mKENTLlVuaXR5RW5naW5lLlJpZ2lkYm9keSkpIGFzIENTLlVuaXR5RW5naW5lLlJpZ2lkYm9keTtcclxuICAgICAgICByaWdpZGJvZHkuaXNLaW5lbWF0aWMgPSBmYWxzZTtcclxuICAgICAgICByaWdpZGJvZHkudmVsb2NpdHkgPSBuZXcgQ1MuVW5pdHlFbmdpbmUuVmVjdG9yMygxICsgMiAqIHBvd2VyLCAzICsgNiAqIHBvd2VyLCAwKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNwYXduQmFsbCgpO1xyXG4gICAgICAgIH0sIDUwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGN1cnJlbnRCYWxsOiBDUy5Vbml0eUVuZ2luZS5HYW1lT2JqZWN0O1xyXG4gICAgc3Bhd25CYWxsKCkge1xyXG4gICAgICAgIGNvbnN0IGJhbGwgPSB0aGlzLmN1cnJlbnRCYWxsID0gQ1MuVW5pdHlFbmdpbmUuT2JqZWN0Lkluc3RhbnRpYXRlKHRoaXMuX21iLkJhbGxQcmVmYWIpIGFzIENTLlVuaXR5RW5naW5lLkdhbWVPYmplY3Q7XHJcbiAgICAgICAgYmFsbC50cmFuc2Zvcm0ucG9zaXRpb24gPSB0aGlzLl9tYi5CYWxsU3Bhd25Qb2ludC50cmFuc2Zvcm0ucG9zaXRpb247XHJcblxyXG4gICAgICAgIGNvbnN0IHJpZ2lkYm9keSA9IGJhbGwuR2V0Q29tcG9uZW50KHB1ZXIuJHR5cGVvZihDUy5Vbml0eUVuZ2luZS5SaWdpZGJvZHkpKSBhcyBDUy5Vbml0eUVuZ2luZS5SaWdpZGJvZHk7XHJcbiAgICAgICAgcmlnaWRib2R5LmlzS2luZW1hdGljID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5leHBvcnQgeyBKU0dhbWVNYW5hZ2VyIH0iLCJpbXBvcnQgeyBKc01vbm9CZWhhdmlvdXIgfSBmcm9tIFwiY3NoYXJwXCI7XHJcbmltcG9ydCB7IEpzQmVoYXZpb3VyIH0gZnJvbSBcIi4vQmFzZS9iYXNlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXN0SnNCZWhhdmlvciBleHRlbmRzIEpzQmVoYXZpb3VyPEpzTW9ub0JlaGF2aW91cj57XHJcblxyXG4gICAgU3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCIgZGRkIFRlc3RKc0IuU3RhcnRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgVXBkYXRlKCk6IHZvaWQge1xyXG4gICAgXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJzc3Nzc3NzcmRkZHJyampqampcIilcclxuICAgIH1cclxufVxyXG5cclxuLy8gZXhwb3J0IHtUZXN0SnNCZWhhdmlvcn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEpTR2FtZU1hbmFnZXIgfSBmcm9tIFwiLi9KU0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEpTQmFsbEJlaGF2aW91ciB9IGZyb20gXCIuL0pTQmFsbEJlaGF2aW91clwiO1xyXG5pbXBvcnQgVGVzdEpzQmVoYXZpb3IgZnJvbSBcIi4vVGVzdEpzQmVoYXZpb3JcIjtcclxuXHJcbmZ1bmN0aW9uIG1ha2VGYWN0b3J5KGNsczogYW55KSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3M6IGFueVtdKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBjbHMoLi4uYXJncyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnNvbGUubG9nKFwiZWVoZWxsbyB3b3JsZGVlZGRkZCFcIik7XHJcblxyXG5cclxuY29uc3QgSlNCYWxsQmVoYXZpb3VyRmFjdG9yeSA9IG1ha2VGYWN0b3J5KEpTQmFsbEJlaGF2aW91cilcclxuY29uc3QgSlNHYW1lTWFuYWdlckZhY3RvcnkgPSBtYWtlRmFjdG9yeShKU0dhbWVNYW5hZ2VyKVxyXG5jb25zdCBUZXN0SnNCZWhhdmlvckZhY3RvcnkgPSBtYWtlRmFjdG9yeShUZXN0SnNCZWhhdmlvcilcclxuZXhwb3J0IHtcclxuICAgIEpTQmFsbEJlaGF2aW91ckZhY3RvcnkgYXMgSlNCYWxsQmVoYXZpb3VyLFxyXG4gICAgSlNHYW1lTWFuYWdlckZhY3RvcnkgYXMgSlNHYW1lTWFuYWdlcixcclxuICAgIFRlc3RKc0JlaGF2aW9yRmFjdG9yeSBhcyBUZXN0SnNCZWhhdmlvclxyXG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9