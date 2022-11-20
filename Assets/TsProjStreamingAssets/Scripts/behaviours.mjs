/******/ var __webpack_modules__ = ({

/***/ "./node_modules/rxjs/dist/esm5/internal/NotificationFactories.js":
/*!***********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/NotificationFactories.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "COMPLETE_NOTIFICATION": () => (/* binding */ COMPLETE_NOTIFICATION),
/* harmony export */   "createNotification": () => (/* binding */ createNotification),
/* harmony export */   "errorNotification": () => (/* binding */ errorNotification),
/* harmony export */   "nextNotification": () => (/* binding */ nextNotification)
/* harmony export */ });
var COMPLETE_NOTIFICATION = (function () { return createNotification('C', undefined, undefined); })();
function errorNotification(error) {
    return createNotification('E', undefined, error);
}
function nextNotification(value) {
    return createNotification('N', value, undefined);
}
function createNotification(kind, value, error) {
    return {
        kind: kind,
        value: value,
        error: error,
    };
}
//# sourceMappingURL=NotificationFactories.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/Observable.js":
/*!************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/Observable.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Observable": () => (/* binding */ Observable)
/* harmony export */ });
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Subscriber */ "./node_modules/rxjs/dist/esm5/internal/Subscriber.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Subscription */ "./node_modules/rxjs/dist/esm5/internal/Subscription.js");
/* harmony import */ var _symbol_observable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./symbol/observable */ "./node_modules/rxjs/dist/esm5/internal/symbol/observable.js");
/* harmony import */ var _util_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/pipe */ "./node_modules/rxjs/dist/esm5/internal/util/pipe.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config */ "./node_modules/rxjs/dist/esm5/internal/config.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util/isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _util_errorContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/errorContext */ "./node_modules/rxjs/dist/esm5/internal/util/errorContext.js");







var Observable = (function () {
    function Observable(subscribe) {
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var _this = this;
        var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new _Subscriber__WEBPACK_IMPORTED_MODULE_0__.SafeSubscriber(observerOrNext, error, complete);
        (0,_util_errorContext__WEBPACK_IMPORTED_MODULE_1__.errorContext)(function () {
            var _a = _this, operator = _a.operator, source = _a.source;
            subscriber.add(operator
                ?
                    operator.call(subscriber, source)
                : source
                    ?
                        _this._subscribe(subscriber)
                    :
                        _this._trySubscribe(subscriber));
        });
        return subscriber;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.error(err);
        }
    };
    Observable.prototype.forEach = function (next, promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var subscriber = new _Subscriber__WEBPACK_IMPORTED_MODULE_0__.SafeSubscriber({
                next: function (value) {
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscriber.unsubscribe();
                    }
                },
                error: reject,
                complete: resolve,
            });
            _this.subscribe(subscriber);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        var _a;
        return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
    };
    Observable.prototype[_symbol_observable__WEBPACK_IMPORTED_MODULE_2__.observable] = function () {
        return this;
    };
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i] = arguments[_i];
        }
        return (0,_util_pipe__WEBPACK_IMPORTED_MODULE_3__.pipeFromArray)(operations)(this);
    };
    Observable.prototype.toPromise = function (promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return (value = x); }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());

function getPromiseCtor(promiseCtor) {
    var _a;
    return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : _config__WEBPACK_IMPORTED_MODULE_4__.config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
    return value && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_5__.isFunction)(value.next) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_5__.isFunction)(value.error) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_5__.isFunction)(value.complete);
}
function isSubscriber(value) {
    return (value && value instanceof _Subscriber__WEBPACK_IMPORTED_MODULE_0__.Subscriber) || (isObserver(value) && (0,_Subscription__WEBPACK_IMPORTED_MODULE_6__.isSubscription)(value));
}
//# sourceMappingURL=Observable.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/Subscriber.js":
/*!************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/Subscriber.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EMPTY_OBSERVER": () => (/* binding */ EMPTY_OBSERVER),
/* harmony export */   "SafeSubscriber": () => (/* binding */ SafeSubscriber),
/* harmony export */   "Subscriber": () => (/* binding */ Subscriber)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Subscription */ "./node_modules/rxjs/dist/esm5/internal/Subscription.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config */ "./node_modules/rxjs/dist/esm5/internal/config.js");
/* harmony import */ var _util_reportUnhandledError__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./util/reportUnhandledError */ "./node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js");
/* harmony import */ var _util_noop__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./util/noop */ "./node_modules/rxjs/dist/esm5/internal/util/noop.js");
/* harmony import */ var _NotificationFactories__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NotificationFactories */ "./node_modules/rxjs/dist/esm5/internal/NotificationFactories.js");
/* harmony import */ var _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./scheduler/timeoutProvider */ "./node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js");
/* harmony import */ var _util_errorContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util/errorContext */ "./node_modules/rxjs/dist/esm5/internal/util/errorContext.js");









var Subscriber = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(Subscriber, _super);
    function Subscriber(destination) {
        var _this = _super.call(this) || this;
        _this.isStopped = false;
        if (destination) {
            _this.destination = destination;
            if ((0,_Subscription__WEBPACK_IMPORTED_MODULE_1__.isSubscription)(destination)) {
                destination.add(_this);
            }
        }
        else {
            _this.destination = EMPTY_OBSERVER;
        }
        return _this;
    }
    Subscriber.create = function (next, error, complete) {
        return new SafeSubscriber(next, error, complete);
    };
    Subscriber.prototype.next = function (value) {
        if (this.isStopped) {
            handleStoppedNotification((0,_NotificationFactories__WEBPACK_IMPORTED_MODULE_2__.nextNotification)(value), this);
        }
        else {
            this._next(value);
        }
    };
    Subscriber.prototype.error = function (err) {
        if (this.isStopped) {
            handleStoppedNotification((0,_NotificationFactories__WEBPACK_IMPORTED_MODULE_2__.errorNotification)(err), this);
        }
        else {
            this.isStopped = true;
            this._error(err);
        }
    };
    Subscriber.prototype.complete = function () {
        if (this.isStopped) {
            handleStoppedNotification(_NotificationFactories__WEBPACK_IMPORTED_MODULE_2__.COMPLETE_NOTIFICATION, this);
        }
        else {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (!this.closed) {
            this.isStopped = true;
            _super.prototype.unsubscribe.call(this);
            this.destination = null;
        }
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        try {
            this.destination.error(err);
        }
        finally {
            this.unsubscribe();
        }
    };
    Subscriber.prototype._complete = function () {
        try {
            this.destination.complete();
        }
        finally {
            this.unsubscribe();
        }
    };
    return Subscriber;
}(_Subscription__WEBPACK_IMPORTED_MODULE_1__.Subscription));

var _bind = Function.prototype.bind;
function bind(fn, thisArg) {
    return _bind.call(fn, thisArg);
}
var ConsumerObserver = (function () {
    function ConsumerObserver(partialObserver) {
        this.partialObserver = partialObserver;
    }
    ConsumerObserver.prototype.next = function (value) {
        var partialObserver = this.partialObserver;
        if (partialObserver.next) {
            try {
                partialObserver.next(value);
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
    };
    ConsumerObserver.prototype.error = function (err) {
        var partialObserver = this.partialObserver;
        if (partialObserver.error) {
            try {
                partialObserver.error(err);
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
        else {
            handleUnhandledError(err);
        }
    };
    ConsumerObserver.prototype.complete = function () {
        var partialObserver = this.partialObserver;
        if (partialObserver.complete) {
            try {
                partialObserver.complete();
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
    };
    return ConsumerObserver;
}());
var SafeSubscriber = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(SafeSubscriber, _super);
    function SafeSubscriber(observerOrNext, error, complete) {
        var _this = _super.call(this) || this;
        var partialObserver;
        if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_3__.isFunction)(observerOrNext) || !observerOrNext) {
            partialObserver = {
                next: (observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : undefined),
                error: error !== null && error !== void 0 ? error : undefined,
                complete: complete !== null && complete !== void 0 ? complete : undefined,
            };
        }
        else {
            var context_1;
            if (_this && _config__WEBPACK_IMPORTED_MODULE_4__.config.useDeprecatedNextContext) {
                context_1 = Object.create(observerOrNext);
                context_1.unsubscribe = function () { return _this.unsubscribe(); };
                partialObserver = {
                    next: observerOrNext.next && bind(observerOrNext.next, context_1),
                    error: observerOrNext.error && bind(observerOrNext.error, context_1),
                    complete: observerOrNext.complete && bind(observerOrNext.complete, context_1),
                };
            }
            else {
                partialObserver = observerOrNext;
            }
        }
        _this.destination = new ConsumerObserver(partialObserver);
        return _this;
    }
    return SafeSubscriber;
}(Subscriber));

function handleUnhandledError(error) {
    if (_config__WEBPACK_IMPORTED_MODULE_4__.config.useDeprecatedSynchronousErrorHandling) {
        (0,_util_errorContext__WEBPACK_IMPORTED_MODULE_5__.captureError)(error);
    }
    else {
        (0,_util_reportUnhandledError__WEBPACK_IMPORTED_MODULE_6__.reportUnhandledError)(error);
    }
}
function defaultErrorHandler(err) {
    throw err;
}
function handleStoppedNotification(notification, subscriber) {
    var onStoppedNotification = _config__WEBPACK_IMPORTED_MODULE_4__.config.onStoppedNotification;
    onStoppedNotification && _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_7__.timeoutProvider.setTimeout(function () { return onStoppedNotification(notification, subscriber); });
}
var EMPTY_OBSERVER = {
    closed: true,
    next: _util_noop__WEBPACK_IMPORTED_MODULE_8__.noop,
    error: defaultErrorHandler,
    complete: _util_noop__WEBPACK_IMPORTED_MODULE_8__.noop,
};
//# sourceMappingURL=Subscriber.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/Subscription.js":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/Subscription.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EMPTY_SUBSCRIPTION": () => (/* binding */ EMPTY_SUBSCRIPTION),
/* harmony export */   "Subscription": () => (/* binding */ Subscription),
/* harmony export */   "isSubscription": () => (/* binding */ isSubscription)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/UnsubscriptionError */ "./node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js");
/* harmony import */ var _util_arrRemove__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/arrRemove */ "./node_modules/rxjs/dist/esm5/internal/util/arrRemove.js");




var Subscription = (function () {
    function Subscription(initialTeardown) {
        this.initialTeardown = initialTeardown;
        this.closed = false;
        this._parentage = null;
        this._finalizers = null;
    }
    Subscription.prototype.unsubscribe = function () {
        var e_1, _a, e_2, _b;
        var errors;
        if (!this.closed) {
            this.closed = true;
            var _parentage = this._parentage;
            if (_parentage) {
                this._parentage = null;
                if (Array.isArray(_parentage)) {
                    try {
                        for (var _parentage_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__values)(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                            var parent_1 = _parentage_1_1.value;
                            parent_1.remove(this);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                else {
                    _parentage.remove(this);
                }
            }
            var initialFinalizer = this.initialTeardown;
            if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(initialFinalizer)) {
                try {
                    initialFinalizer();
                }
                catch (e) {
                    errors = e instanceof _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_2__.UnsubscriptionError ? e.errors : [e];
                }
            }
            var _finalizers = this._finalizers;
            if (_finalizers) {
                this._finalizers = null;
                try {
                    for (var _finalizers_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__values)(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
                        var finalizer = _finalizers_1_1.value;
                        try {
                            execFinalizer(finalizer);
                        }
                        catch (err) {
                            errors = errors !== null && errors !== void 0 ? errors : [];
                            if (err instanceof _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_2__.UnsubscriptionError) {
                                errors = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)([], (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(errors)), (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(err.errors));
                            }
                            else {
                                errors.push(err);
                            }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            if (errors) {
                throw new _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_2__.UnsubscriptionError(errors);
            }
        }
    };
    Subscription.prototype.add = function (teardown) {
        var _a;
        if (teardown && teardown !== this) {
            if (this.closed) {
                execFinalizer(teardown);
            }
            else {
                if (teardown instanceof Subscription) {
                    if (teardown.closed || teardown._hasParent(this)) {
                        return;
                    }
                    teardown._addParent(this);
                }
                (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
            }
        }
    };
    Subscription.prototype._hasParent = function (parent) {
        var _parentage = this._parentage;
        return _parentage === parent || (Array.isArray(_parentage) && _parentage.includes(parent));
    };
    Subscription.prototype._addParent = function (parent) {
        var _parentage = this._parentage;
        this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
    };
    Subscription.prototype._removeParent = function (parent) {
        var _parentage = this._parentage;
        if (_parentage === parent) {
            this._parentage = null;
        }
        else if (Array.isArray(_parentage)) {
            (0,_util_arrRemove__WEBPACK_IMPORTED_MODULE_3__.arrRemove)(_parentage, parent);
        }
    };
    Subscription.prototype.remove = function (teardown) {
        var _finalizers = this._finalizers;
        _finalizers && (0,_util_arrRemove__WEBPACK_IMPORTED_MODULE_3__.arrRemove)(_finalizers, teardown);
        if (teardown instanceof Subscription) {
            teardown._removeParent(this);
        }
    };
    Subscription.EMPTY = (function () {
        var empty = new Subscription();
        empty.closed = true;
        return empty;
    })();
    return Subscription;
}());

var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
function isSubscription(value) {
    return (value instanceof Subscription ||
        (value && 'closed' in value && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(value.remove) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(value.add) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(value.unsubscribe)));
}
function execFinalizer(finalizer) {
    if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(finalizer)) {
        finalizer();
    }
    else {
        finalizer.unsubscribe();
    }
}
//# sourceMappingURL=Subscription.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/config.js":
/*!********************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/config.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => (/* binding */ config)
/* harmony export */ });
var config = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: undefined,
    useDeprecatedSynchronousErrorHandling: false,
    useDeprecatedNextContext: false,
};
//# sourceMappingURL=config.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/observable/from.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/observable/from.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "from": () => (/* binding */ from)
/* harmony export */ });
/* harmony import */ var _scheduled_scheduled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scheduled/scheduled */ "./node_modules/rxjs/dist/esm5/internal/scheduled/scheduled.js");
/* harmony import */ var _innerFrom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./innerFrom */ "./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");


function from(input, scheduler) {
    return scheduler ? (0,_scheduled_scheduled__WEBPACK_IMPORTED_MODULE_0__.scheduled)(input, scheduler) : (0,_innerFrom__WEBPACK_IMPORTED_MODULE_1__.innerFrom)(input);
}
//# sourceMappingURL=from.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js":
/*!**********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fromArrayLike": () => (/* binding */ fromArrayLike),
/* harmony export */   "fromAsyncIterable": () => (/* binding */ fromAsyncIterable),
/* harmony export */   "fromInteropObservable": () => (/* binding */ fromInteropObservable),
/* harmony export */   "fromIterable": () => (/* binding */ fromIterable),
/* harmony export */   "fromPromise": () => (/* binding */ fromPromise),
/* harmony export */   "fromReadableStreamLike": () => (/* binding */ fromReadableStreamLike),
/* harmony export */   "innerFrom": () => (/* binding */ innerFrom)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _util_isArrayLike__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/isArrayLike */ "./node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js");
/* harmony import */ var _util_isPromise__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/isPromise */ "./node_modules/rxjs/dist/esm5/internal/util/isPromise.js");
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var _util_isInteropObservable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/isInteropObservable */ "./node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js");
/* harmony import */ var _util_isAsyncIterable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/isAsyncIterable */ "./node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js");
/* harmony import */ var _util_throwUnobservableError__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../util/throwUnobservableError */ "./node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js");
/* harmony import */ var _util_isIterable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/isIterable */ "./node_modules/rxjs/dist/esm5/internal/util/isIterable.js");
/* harmony import */ var _util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/isReadableStreamLike */ "./node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../util/isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _util_reportUnhandledError__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../util/reportUnhandledError */ "./node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js");
/* harmony import */ var _symbol_observable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../symbol/observable */ "./node_modules/rxjs/dist/esm5/internal/symbol/observable.js");












function innerFrom(input) {
    if (input instanceof _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable) {
        return input;
    }
    if (input != null) {
        if ((0,_util_isInteropObservable__WEBPACK_IMPORTED_MODULE_1__.isInteropObservable)(input)) {
            return fromInteropObservable(input);
        }
        if ((0,_util_isArrayLike__WEBPACK_IMPORTED_MODULE_2__.isArrayLike)(input)) {
            return fromArrayLike(input);
        }
        if ((0,_util_isPromise__WEBPACK_IMPORTED_MODULE_3__.isPromise)(input)) {
            return fromPromise(input);
        }
        if ((0,_util_isAsyncIterable__WEBPACK_IMPORTED_MODULE_4__.isAsyncIterable)(input)) {
            return fromAsyncIterable(input);
        }
        if ((0,_util_isIterable__WEBPACK_IMPORTED_MODULE_5__.isIterable)(input)) {
            return fromIterable(input);
        }
        if ((0,_util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_6__.isReadableStreamLike)(input)) {
            return fromReadableStreamLike(input);
        }
    }
    throw (0,_util_throwUnobservableError__WEBPACK_IMPORTED_MODULE_7__.createInvalidObservableTypeError)(input);
}
function fromInteropObservable(obj) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        var obs = obj[_symbol_observable__WEBPACK_IMPORTED_MODULE_8__.observable]();
        if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_9__.isFunction)(obs.subscribe)) {
            return obs.subscribe(subscriber);
        }
        throw new TypeError('Provided object does not correctly implement Symbol.observable');
    });
}
function fromArrayLike(array) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        for (var i = 0; i < array.length && !subscriber.closed; i++) {
            subscriber.next(array[i]);
        }
        subscriber.complete();
    });
}
function fromPromise(promise) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        promise
            .then(function (value) {
            if (!subscriber.closed) {
                subscriber.next(value);
                subscriber.complete();
            }
        }, function (err) { return subscriber.error(err); })
            .then(null, _util_reportUnhandledError__WEBPACK_IMPORTED_MODULE_10__.reportUnhandledError);
    });
}
function fromIterable(iterable) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        var e_1, _a;
        try {
            for (var iterable_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__values)(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
                var value = iterable_1_1.value;
                subscriber.next(value);
                if (subscriber.closed) {
                    return;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        subscriber.complete();
    });
}
function fromAsyncIterable(asyncIterable) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        process(asyncIterable, subscriber).catch(function (err) { return subscriber.error(err); });
    });
}
function fromReadableStreamLike(readableStream) {
    return fromAsyncIterable((0,_util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_6__.readableStreamLikeToAsyncGenerator)(readableStream));
}
function process(asyncIterable, subscriber) {
    var asyncIterable_1, asyncIterable_1_1;
    var e_2, _a;
    return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function () {
        var value, e_2_1;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__generator)(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, 6, 11]);
                    asyncIterable_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__asyncValues)(asyncIterable);
                    _b.label = 1;
                case 1: return [4, asyncIterable_1.next()];
                case 2:
                    if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
                    value = asyncIterable_1_1.value;
                    subscriber.next(value);
                    if (subscriber.closed) {
                        return [2];
                    }
                    _b.label = 3;
                case 3: return [3, 1];
                case 4: return [3, 11];
                case 5:
                    e_2_1 = _b.sent();
                    e_2 = { error: e_2_1 };
                    return [3, 11];
                case 6:
                    _b.trys.push([6, , 9, 10]);
                    if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
                    return [4, _a.call(asyncIterable_1)];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8: return [3, 10];
                case 9:
                    if (e_2) throw e_2.error;
                    return [7];
                case 10: return [7];
                case 11:
                    subscriber.complete();
                    return [2];
            }
        });
    });
}
//# sourceMappingURL=innerFrom.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js":
/*!******************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OperatorSubscriber": () => (/* binding */ OperatorSubscriber),
/* harmony export */   "createOperatorSubscriber": () => (/* binding */ createOperatorSubscriber)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/dist/esm5/internal/Subscriber.js");


function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
    return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
}
var OperatorSubscriber = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(OperatorSubscriber, _super);
    function OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
        var _this = _super.call(this, destination) || this;
        _this.onFinalize = onFinalize;
        _this.shouldUnsubscribe = shouldUnsubscribe;
        _this._next = onNext
            ? function (value) {
                try {
                    onNext(value);
                }
                catch (err) {
                    destination.error(err);
                }
            }
            : _super.prototype._next;
        _this._error = onError
            ? function (err) {
                try {
                    onError(err);
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : _super.prototype._error;
        _this._complete = onComplete
            ? function () {
                try {
                    onComplete();
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : _super.prototype._complete;
        return _this;
    }
    OperatorSubscriber.prototype.unsubscribe = function () {
        var _a;
        if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            var closed_1 = this.closed;
            _super.prototype.unsubscribe.call(this);
            !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
        }
    };
    return OperatorSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__.Subscriber));

//# sourceMappingURL=OperatorSubscriber.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/operators/observeOn.js":
/*!*********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/operators/observeOn.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "observeOn": () => (/* binding */ observeOn)
/* harmony export */ });
/* harmony import */ var _util_executeSchedule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/executeSchedule */ "./node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js");
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/lift */ "./node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OperatorSubscriber */ "./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");



function observeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return (0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)(function (source, subscriber) {
        source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(subscriber, function (value) { return (0,_util_executeSchedule__WEBPACK_IMPORTED_MODULE_2__.executeSchedule)(subscriber, scheduler, function () { return subscriber.next(value); }, delay); }, function () { return (0,_util_executeSchedule__WEBPACK_IMPORTED_MODULE_2__.executeSchedule)(subscriber, scheduler, function () { return subscriber.complete(); }, delay); }, function (err) { return (0,_util_executeSchedule__WEBPACK_IMPORTED_MODULE_2__.executeSchedule)(subscriber, scheduler, function () { return subscriber.error(err); }, delay); }));
    });
}
//# sourceMappingURL=observeOn.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/operators/subscribeOn.js":
/*!***********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/operators/subscribeOn.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "subscribeOn": () => (/* binding */ subscribeOn)
/* harmony export */ });
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/lift */ "./node_modules/rxjs/dist/esm5/internal/util/lift.js");

function subscribeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return (0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)(function (source, subscriber) {
        subscriber.add(scheduler.schedule(function () { return source.subscribe(subscriber); }, delay));
    });
}
//# sourceMappingURL=subscribeOn.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleArray.js":
/*!*************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleArray.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "scheduleArray": () => (/* binding */ scheduleArray)
/* harmony export */ });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/dist/esm5/internal/Observable.js");

function scheduleArray(input, scheduler) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        var i = 0;
        return scheduler.schedule(function () {
            if (i === input.length) {
                subscriber.complete();
            }
            else {
                subscriber.next(input[i++]);
                if (!subscriber.closed) {
                    this.schedule();
                }
            }
        });
    });
}
//# sourceMappingURL=scheduleArray.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleAsyncIterable.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleAsyncIterable.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "scheduleAsyncIterable": () => (/* binding */ scheduleAsyncIterable)
/* harmony export */ });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var _util_executeSchedule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/executeSchedule */ "./node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js");


function scheduleAsyncIterable(input, scheduler) {
    if (!input) {
        throw new Error('Iterable cannot be null');
    }
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        (0,_util_executeSchedule__WEBPACK_IMPORTED_MODULE_1__.executeSchedule)(subscriber, scheduler, function () {
            var iterator = input[Symbol.asyncIterator]();
            (0,_util_executeSchedule__WEBPACK_IMPORTED_MODULE_1__.executeSchedule)(subscriber, scheduler, function () {
                iterator.next().then(function (result) {
                    if (result.done) {
                        subscriber.complete();
                    }
                    else {
                        subscriber.next(result.value);
                    }
                });
            }, 0, true);
        });
    });
}
//# sourceMappingURL=scheduleAsyncIterable.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleIterable.js":
/*!****************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleIterable.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "scheduleIterable": () => (/* binding */ scheduleIterable)
/* harmony export */ });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var _symbol_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../symbol/iterator */ "./node_modules/rxjs/dist/esm5/internal/symbol/iterator.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _util_executeSchedule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/executeSchedule */ "./node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js");




function scheduleIterable(input, scheduler) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        var iterator;
        (0,_util_executeSchedule__WEBPACK_IMPORTED_MODULE_1__.executeSchedule)(subscriber, scheduler, function () {
            iterator = input[_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__.iterator]();
            (0,_util_executeSchedule__WEBPACK_IMPORTED_MODULE_1__.executeSchedule)(subscriber, scheduler, function () {
                var _a;
                var value;
                var done;
                try {
                    (_a = iterator.next(), value = _a.value, done = _a.done);
                }
                catch (err) {
                    subscriber.error(err);
                    return;
                }
                if (done) {
                    subscriber.complete();
                }
                else {
                    subscriber.next(value);
                }
            }, 0, true);
        });
        return function () { return (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_3__.isFunction)(iterator === null || iterator === void 0 ? void 0 : iterator.return) && iterator.return(); };
    });
}
//# sourceMappingURL=scheduleIterable.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleObservable.js":
/*!******************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleObservable.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "scheduleObservable": () => (/* binding */ scheduleObservable)
/* harmony export */ });
/* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observable/innerFrom */ "./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");
/* harmony import */ var _operators_observeOn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../operators/observeOn */ "./node_modules/rxjs/dist/esm5/internal/operators/observeOn.js");
/* harmony import */ var _operators_subscribeOn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../operators/subscribeOn */ "./node_modules/rxjs/dist/esm5/internal/operators/subscribeOn.js");



function scheduleObservable(input, scheduler) {
    return (0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_0__.innerFrom)(input).pipe((0,_operators_subscribeOn__WEBPACK_IMPORTED_MODULE_1__.subscribeOn)(scheduler), (0,_operators_observeOn__WEBPACK_IMPORTED_MODULE_2__.observeOn)(scheduler));
}
//# sourceMappingURL=scheduleObservable.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduled/schedulePromise.js":
/*!***************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduled/schedulePromise.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "schedulePromise": () => (/* binding */ schedulePromise)
/* harmony export */ });
/* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observable/innerFrom */ "./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");
/* harmony import */ var _operators_observeOn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../operators/observeOn */ "./node_modules/rxjs/dist/esm5/internal/operators/observeOn.js");
/* harmony import */ var _operators_subscribeOn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../operators/subscribeOn */ "./node_modules/rxjs/dist/esm5/internal/operators/subscribeOn.js");



function schedulePromise(input, scheduler) {
    return (0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_0__.innerFrom)(input).pipe((0,_operators_subscribeOn__WEBPACK_IMPORTED_MODULE_1__.subscribeOn)(scheduler), (0,_operators_observeOn__WEBPACK_IMPORTED_MODULE_2__.observeOn)(scheduler));
}
//# sourceMappingURL=schedulePromise.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleReadableStreamLike.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleReadableStreamLike.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "scheduleReadableStreamLike": () => (/* binding */ scheduleReadableStreamLike)
/* harmony export */ });
/* harmony import */ var _scheduleAsyncIterable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scheduleAsyncIterable */ "./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleAsyncIterable.js");
/* harmony import */ var _util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/isReadableStreamLike */ "./node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js");


function scheduleReadableStreamLike(input, scheduler) {
    return (0,_scheduleAsyncIterable__WEBPACK_IMPORTED_MODULE_0__.scheduleAsyncIterable)((0,_util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_1__.readableStreamLikeToAsyncGenerator)(input), scheduler);
}
//# sourceMappingURL=scheduleReadableStreamLike.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduled/scheduled.js":
/*!*********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduled/scheduled.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "scheduled": () => (/* binding */ scheduled)
/* harmony export */ });
/* harmony import */ var _scheduleObservable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scheduleObservable */ "./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleObservable.js");
/* harmony import */ var _schedulePromise__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./schedulePromise */ "./node_modules/rxjs/dist/esm5/internal/scheduled/schedulePromise.js");
/* harmony import */ var _scheduleArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scheduleArray */ "./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleArray.js");
/* harmony import */ var _scheduleIterable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./scheduleIterable */ "./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleIterable.js");
/* harmony import */ var _scheduleAsyncIterable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./scheduleAsyncIterable */ "./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleAsyncIterable.js");
/* harmony import */ var _util_isInteropObservable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/isInteropObservable */ "./node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js");
/* harmony import */ var _util_isPromise__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/isPromise */ "./node_modules/rxjs/dist/esm5/internal/util/isPromise.js");
/* harmony import */ var _util_isArrayLike__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/isArrayLike */ "./node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js");
/* harmony import */ var _util_isIterable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../util/isIterable */ "./node_modules/rxjs/dist/esm5/internal/util/isIterable.js");
/* harmony import */ var _util_isAsyncIterable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/isAsyncIterable */ "./node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js");
/* harmony import */ var _util_throwUnobservableError__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../util/throwUnobservableError */ "./node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js");
/* harmony import */ var _util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../util/isReadableStreamLike */ "./node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js");
/* harmony import */ var _scheduleReadableStreamLike__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./scheduleReadableStreamLike */ "./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleReadableStreamLike.js");













function scheduled(input, scheduler) {
    if (input != null) {
        if ((0,_util_isInteropObservable__WEBPACK_IMPORTED_MODULE_0__.isInteropObservable)(input)) {
            return (0,_scheduleObservable__WEBPACK_IMPORTED_MODULE_1__.scheduleObservable)(input, scheduler);
        }
        if ((0,_util_isArrayLike__WEBPACK_IMPORTED_MODULE_2__.isArrayLike)(input)) {
            return (0,_scheduleArray__WEBPACK_IMPORTED_MODULE_3__.scheduleArray)(input, scheduler);
        }
        if ((0,_util_isPromise__WEBPACK_IMPORTED_MODULE_4__.isPromise)(input)) {
            return (0,_schedulePromise__WEBPACK_IMPORTED_MODULE_5__.schedulePromise)(input, scheduler);
        }
        if ((0,_util_isAsyncIterable__WEBPACK_IMPORTED_MODULE_6__.isAsyncIterable)(input)) {
            return (0,_scheduleAsyncIterable__WEBPACK_IMPORTED_MODULE_7__.scheduleAsyncIterable)(input, scheduler);
        }
        if ((0,_util_isIterable__WEBPACK_IMPORTED_MODULE_8__.isIterable)(input)) {
            return (0,_scheduleIterable__WEBPACK_IMPORTED_MODULE_9__.scheduleIterable)(input, scheduler);
        }
        if ((0,_util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_10__.isReadableStreamLike)(input)) {
            return (0,_scheduleReadableStreamLike__WEBPACK_IMPORTED_MODULE_11__.scheduleReadableStreamLike)(input, scheduler);
        }
    }
    throw (0,_util_throwUnobservableError__WEBPACK_IMPORTED_MODULE_12__.createInvalidObservableTypeError)(input);
}
//# sourceMappingURL=scheduled.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js":
/*!***************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "timeoutProvider": () => (/* binding */ timeoutProvider)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

var timeoutProvider = {
    setTimeout: function (handler, timeout) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var delegate = timeoutProvider.delegate;
        if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
            return delegate.setTimeout.apply(delegate, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)([handler, timeout], (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(args)));
        }
        return setTimeout.apply(void 0, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)([handler, timeout], (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(args)));
    },
    clearTimeout: function (handle) {
        var delegate = timeoutProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
    },
    delegate: undefined,
};
//# sourceMappingURL=timeoutProvider.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/symbol/iterator.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/symbol/iterator.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getSymbolIterator": () => (/* binding */ getSymbolIterator),
/* harmony export */   "iterator": () => (/* binding */ iterator)
/* harmony export */ });
function getSymbolIterator() {
    if (typeof Symbol !== 'function' || !Symbol.iterator) {
        return '@@iterator';
    }
    return Symbol.iterator;
}
var iterator = getSymbolIterator();
//# sourceMappingURL=iterator.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/symbol/observable.js":
/*!*******************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/symbol/observable.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "observable": () => (/* binding */ observable)
/* harmony export */ });
var observable = (function () { return (typeof Symbol === 'function' && Symbol.observable) || '@@observable'; })();
//# sourceMappingURL=observable.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js":
/*!**************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UnsubscriptionError": () => (/* binding */ UnsubscriptionError)
/* harmony export */ });
/* harmony import */ var _createErrorClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createErrorClass */ "./node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js");

var UnsubscriptionError = (0,_createErrorClass__WEBPACK_IMPORTED_MODULE_0__.createErrorClass)(function (_super) {
    return function UnsubscriptionErrorImpl(errors) {
        _super(this);
        this.message = errors
            ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ')
            : '';
        this.name = 'UnsubscriptionError';
        this.errors = errors;
    };
});
//# sourceMappingURL=UnsubscriptionError.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/arrRemove.js":
/*!****************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/arrRemove.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "arrRemove": () => (/* binding */ arrRemove)
/* harmony export */ });
function arrRemove(arr, item) {
    if (arr) {
        var index = arr.indexOf(item);
        0 <= index && arr.splice(index, 1);
    }
}
//# sourceMappingURL=arrRemove.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js":
/*!***********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createErrorClass": () => (/* binding */ createErrorClass)
/* harmony export */ });
function createErrorClass(createImpl) {
    var _super = function (instance) {
        Error.call(instance);
        instance.stack = new Error().stack;
    };
    var ctorFunc = createImpl(_super);
    ctorFunc.prototype = Object.create(Error.prototype);
    ctorFunc.prototype.constructor = ctorFunc;
    return ctorFunc;
}
//# sourceMappingURL=createErrorClass.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/errorContext.js":
/*!*******************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/errorContext.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "captureError": () => (/* binding */ captureError),
/* harmony export */   "errorContext": () => (/* binding */ errorContext)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./node_modules/rxjs/dist/esm5/internal/config.js");

var context = null;
function errorContext(cb) {
    if (_config__WEBPACK_IMPORTED_MODULE_0__.config.useDeprecatedSynchronousErrorHandling) {
        var isRoot = !context;
        if (isRoot) {
            context = { errorThrown: false, error: null };
        }
        cb();
        if (isRoot) {
            var _a = context, errorThrown = _a.errorThrown, error = _a.error;
            context = null;
            if (errorThrown) {
                throw error;
            }
        }
    }
    else {
        cb();
    }
}
function captureError(err) {
    if (_config__WEBPACK_IMPORTED_MODULE_0__.config.useDeprecatedSynchronousErrorHandling && context) {
        context.errorThrown = true;
        context.error = err;
    }
}
//# sourceMappingURL=errorContext.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js":
/*!**********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "executeSchedule": () => (/* binding */ executeSchedule)
/* harmony export */ });
function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
    if (delay === void 0) { delay = 0; }
    if (repeat === void 0) { repeat = false; }
    var scheduleSubscription = scheduler.schedule(function () {
        work();
        if (repeat) {
            parentSubscription.add(this.schedule(null, delay));
        }
        else {
            this.unsubscribe();
        }
    }, delay);
    parentSubscription.add(scheduleSubscription);
    if (!repeat) {
        return scheduleSubscription;
    }
}
//# sourceMappingURL=executeSchedule.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/identity.js":
/*!***************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/identity.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "identity": () => (/* binding */ identity)
/* harmony export */ });
function identity(x) {
    return x;
}
//# sourceMappingURL=identity.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js":
/*!******************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isArrayLike": () => (/* binding */ isArrayLike)
/* harmony export */ });
var isArrayLike = (function (x) { return x && typeof x.length === 'number' && typeof x !== 'function'; });
//# sourceMappingURL=isArrayLike.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js":
/*!**********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isAsyncIterable": () => (/* binding */ isAsyncIterable)
/* harmony export */ });
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");

function isAsyncIterable(obj) {
    return Symbol.asyncIterator && (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
}
//# sourceMappingURL=isAsyncIterable.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/isFunction.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isFunction": () => (/* binding */ isFunction)
/* harmony export */ });
function isFunction(value) {
    return typeof value === 'function';
}
//# sourceMappingURL=isFunction.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js":
/*!**************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isInteropObservable": () => (/* binding */ isInteropObservable)
/* harmony export */ });
/* harmony import */ var _symbol_observable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../symbol/observable */ "./node_modules/rxjs/dist/esm5/internal/symbol/observable.js");
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");


function isInteropObservable(input) {
    return (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(input[_symbol_observable__WEBPACK_IMPORTED_MODULE_1__.observable]);
}
//# sourceMappingURL=isInteropObservable.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/isIterable.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/isIterable.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isIterable": () => (/* binding */ isIterable)
/* harmony export */ });
/* harmony import */ var _symbol_iterator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../symbol/iterator */ "./node_modules/rxjs/dist/esm5/internal/symbol/iterator.js");
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");


function isIterable(input) {
    return (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(input === null || input === void 0 ? void 0 : input[_symbol_iterator__WEBPACK_IMPORTED_MODULE_1__.iterator]);
}
//# sourceMappingURL=isIterable.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/isPromise.js":
/*!****************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/isPromise.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isPromise": () => (/* binding */ isPromise)
/* harmony export */ });
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");

function isPromise(value) {
    return (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(value === null || value === void 0 ? void 0 : value.then);
}
//# sourceMappingURL=isPromise.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js":
/*!***************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isReadableStreamLike": () => (/* binding */ isReadableStreamLike),
/* harmony export */   "readableStreamLikeToAsyncGenerator": () => (/* binding */ readableStreamLikeToAsyncGenerator)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");


function readableStreamLikeToAsyncGenerator(readableStream) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__asyncGenerator)(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
        var reader, _a, value, done;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_b) {
            switch (_b.label) {
                case 0:
                    reader = readableStream.getReader();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, , 9, 10]);
                    _b.label = 2;
                case 2:
                    if (false) {}
                    return [4, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__await)(reader.read())];
                case 3:
                    _a = _b.sent(), value = _a.value, done = _a.done;
                    if (!done) return [3, 5];
                    return [4, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__await)(void 0)];
                case 4: return [2, _b.sent()];
                case 5: return [4, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__await)(value)];
                case 6: return [4, _b.sent()];
                case 7:
                    _b.sent();
                    return [3, 2];
                case 8: return [3, 10];
                case 9:
                    reader.releaseLock();
                    return [7];
                case 10: return [2];
            }
        });
    });
}
function isReadableStreamLike(obj) {
    return (0,_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(obj === null || obj === void 0 ? void 0 : obj.getReader);
}
//# sourceMappingURL=isReadableStreamLike.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/lift.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/lift.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hasLift": () => (/* binding */ hasLift),
/* harmony export */   "operate": () => (/* binding */ operate)
/* harmony export */ });
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");

function hasLift(source) {
    return (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(source === null || source === void 0 ? void 0 : source.lift);
}
function operate(init) {
    return function (source) {
        if (hasLift(source)) {
            return source.lift(function (liftedSource) {
                try {
                    return init(liftedSource, this);
                }
                catch (err) {
                    this.error(err);
                }
            });
        }
        throw new TypeError('Unable to lift unknown Observable type');
    };
}
//# sourceMappingURL=lift.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/noop.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/noop.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "noop": () => (/* binding */ noop)
/* harmony export */ });
function noop() { }
//# sourceMappingURL=noop.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/pipe.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/pipe.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pipe": () => (/* binding */ pipe),
/* harmony export */   "pipeFromArray": () => (/* binding */ pipeFromArray)
/* harmony export */ });
/* harmony import */ var _identity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./identity */ "./node_modules/rxjs/dist/esm5/internal/util/identity.js");

function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return pipeFromArray(fns);
}
function pipeFromArray(fns) {
    if (fns.length === 0) {
        return _identity__WEBPACK_IMPORTED_MODULE_0__.identity;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}
//# sourceMappingURL=pipe.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js":
/*!***************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "reportUnhandledError": () => (/* binding */ reportUnhandledError)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config */ "./node_modules/rxjs/dist/esm5/internal/config.js");
/* harmony import */ var _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scheduler/timeoutProvider */ "./node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js");


function reportUnhandledError(err) {
    _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_0__.timeoutProvider.setTimeout(function () {
        var onUnhandledError = _config__WEBPACK_IMPORTED_MODULE_1__.config.onUnhandledError;
        if (onUnhandledError) {
            onUnhandledError(err);
        }
        else {
            throw err;
        }
    });
}
//# sourceMappingURL=reportUnhandledError.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createInvalidObservableTypeError": () => (/* binding */ createInvalidObservableTypeError)
/* harmony export */ });
function createInvalidObservableTypeError(input) {
    return new TypeError("You provided " + (input !== null && typeof input === 'object' ? 'an invalid object' : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
//# sourceMappingURL=throwUnobservableError.js.map

/***/ }),

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
        console.log('mb', mb);
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
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/observable/from.js");
/* harmony import */ var _Base_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base/base */ "./TypeScript/Base/base.ts");


const Vector2 = CS.UnityEngine.Vector2;
class TestJsBehavior extends _Base_base__WEBPACK_IMPORTED_MODULE_0__.JsBehaviour {
    Start() {
        console.log(" ddd TestJsB.Start");
        // this._mb.gameObject.GetComponent(puerts.$typeof(Hero))
        // let hero = this._mb.gameObject.GetComponent(puerts.$typeof(CS.PuertsTest.TestHero)) as CS.PuertsTest.TestHero
        // console.log('hero',hero);
        let hero = this._mb.gameObject.GetComponent(puerts.$typeof(CS.Hero));
        console.log('hero ', hero);
        let xx = (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.from)([1, 2, 3, 4]);
        xx.subscribe((x) => console.log(x));
        // hero.MoveSpeed = 12
        // this._mb.gameObject.AddComponent(puer.$typeof(CS.UnityEngine.ParticleSystem));
    }
    Update() {
        // let go = new CS.UnityEngine.GameObject("go");
        let heroObj = CS.UnityEngine.GameObject.Find("Hero");
        // console.log("hero: " + heroObj)
        // console.log("this", this._mb)
        // console.log("go", this._mb.gameObject, this._mb.name)
        // let hero =  this._mb.gameObject.GetComponent("Hero") as Hero
        // hero.GetComponent(puer.$typeof(Hero))
        // this._mb.gameObject.AddComponent(puer.$typeof(CS.UnityEngine.ParticleSystem));
        // let hero = this._mb.gameObject.GetComponent($typeof(Hero))
        // hero.MoveSpeed = 12
        // console.log("sssssssrdddrrjjjjj")
        // let hero =this._mb.GetComponent(puerts.$typeof(Hero))
        // console.log("MoveSpeed: " +hero)
    }
}


/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__assign": () => (/* binding */ __assign),
/* harmony export */   "__asyncDelegator": () => (/* binding */ __asyncDelegator),
/* harmony export */   "__asyncGenerator": () => (/* binding */ __asyncGenerator),
/* harmony export */   "__asyncValues": () => (/* binding */ __asyncValues),
/* harmony export */   "__await": () => (/* binding */ __await),
/* harmony export */   "__awaiter": () => (/* binding */ __awaiter),
/* harmony export */   "__classPrivateFieldGet": () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   "__classPrivateFieldIn": () => (/* binding */ __classPrivateFieldIn),
/* harmony export */   "__classPrivateFieldSet": () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   "__createBinding": () => (/* binding */ __createBinding),
/* harmony export */   "__decorate": () => (/* binding */ __decorate),
/* harmony export */   "__exportStar": () => (/* binding */ __exportStar),
/* harmony export */   "__extends": () => (/* binding */ __extends),
/* harmony export */   "__generator": () => (/* binding */ __generator),
/* harmony export */   "__importDefault": () => (/* binding */ __importDefault),
/* harmony export */   "__importStar": () => (/* binding */ __importStar),
/* harmony export */   "__makeTemplateObject": () => (/* binding */ __makeTemplateObject),
/* harmony export */   "__metadata": () => (/* binding */ __metadata),
/* harmony export */   "__param": () => (/* binding */ __param),
/* harmony export */   "__read": () => (/* binding */ __read),
/* harmony export */   "__rest": () => (/* binding */ __rest),
/* harmony export */   "__spread": () => (/* binding */ __spread),
/* harmony export */   "__spreadArray": () => (/* binding */ __spreadArray),
/* harmony export */   "__spreadArrays": () => (/* binding */ __spreadArrays),
/* harmony export */   "__values": () => (/* binding */ __values)
/* harmony export */ });
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}


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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUdwQyxNQUFNLHNCQUFzQixHQUFHLFdBQVcsQ0FBQyw2REFBZSxDQUFDO0FBQzNELE1BQU0sb0JBQW9CLEdBQUcsV0FBVyxDQUFDLHlEQUFhLENBQUM7QUFDdkQsTUFBTSxxQkFBcUIsR0FBRyxXQUFXLENBQUMsdURBQWMsQ0FBQztBQUt4RCIsInNvdXJjZXMiOlsid2VicGFjazovL0BwdWVydHMvd2ViZ2wvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvTm90aWZpY2F0aW9uRmFjdG9yaWVzLmpzIiwid2VicGFjazovL0BwdWVydHMvd2ViZ2wvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvT2JzZXJ2YWJsZS5qcyIsIndlYnBhY2s6Ly9AcHVlcnRzL3dlYmdsLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL1N1YnNjcmliZXIuanMiLCJ3ZWJwYWNrOi8vQHB1ZXJ0cy93ZWJnbC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9TdWJzY3JpcHRpb24uanMiLCJ3ZWJwYWNrOi8vQHB1ZXJ0cy93ZWJnbC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9jb25maWcuanMiLCJ3ZWJwYWNrOi8vQHB1ZXJ0cy93ZWJnbC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9vYnNlcnZhYmxlL2Zyb20uanMiLCJ3ZWJwYWNrOi8vQHB1ZXJ0cy93ZWJnbC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9vYnNlcnZhYmxlL2lubmVyRnJvbS5qcyIsIndlYnBhY2s6Ly9AcHVlcnRzL3dlYmdsLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL29wZXJhdG9ycy9PcGVyYXRvclN1YnNjcmliZXIuanMiLCJ3ZWJwYWNrOi8vQHB1ZXJ0cy93ZWJnbC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9vcGVyYXRvcnMvb2JzZXJ2ZU9uLmpzIiwid2VicGFjazovL0BwdWVydHMvd2ViZ2wvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvb3BlcmF0b3JzL3N1YnNjcmliZU9uLmpzIiwid2VicGFjazovL0BwdWVydHMvd2ViZ2wvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvc2NoZWR1bGVkL3NjaGVkdWxlQXJyYXkuanMiLCJ3ZWJwYWNrOi8vQHB1ZXJ0cy93ZWJnbC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9zY2hlZHVsZWQvc2NoZWR1bGVBc3luY0l0ZXJhYmxlLmpzIiwid2VicGFjazovL0BwdWVydHMvd2ViZ2wvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvc2NoZWR1bGVkL3NjaGVkdWxlSXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vQHB1ZXJ0cy93ZWJnbC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9zY2hlZHVsZWQvc2NoZWR1bGVPYnNlcnZhYmxlLmpzIiwid2VicGFjazovL0BwdWVydHMvd2ViZ2wvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvc2NoZWR1bGVkL3NjaGVkdWxlUHJvbWlzZS5qcyIsIndlYnBhY2s6Ly9AcHVlcnRzL3dlYmdsLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3NjaGVkdWxlZC9zY2hlZHVsZVJlYWRhYmxlU3RyZWFtTGlrZS5qcyIsIndlYnBhY2s6Ly9AcHVlcnRzL3dlYmdsLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3NjaGVkdWxlZC9zY2hlZHVsZWQuanMiLCJ3ZWJwYWNrOi8vQHB1ZXJ0cy93ZWJnbC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9zY2hlZHVsZXIvdGltZW91dFByb3ZpZGVyLmpzIiwid2VicGFjazovL0BwdWVydHMvd2ViZ2wvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvc3ltYm9sL2l0ZXJhdG9yLmpzIiwid2VicGFjazovL0BwdWVydHMvd2ViZ2wvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvc3ltYm9sL29ic2VydmFibGUuanMiLCJ3ZWJwYWNrOi8vQHB1ZXJ0cy93ZWJnbC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL1Vuc3Vic2NyaXB0aW9uRXJyb3IuanMiLCJ3ZWJwYWNrOi8vQHB1ZXJ0cy93ZWJnbC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL2FyclJlbW92ZS5qcyIsIndlYnBhY2s6Ly9AcHVlcnRzL3dlYmdsLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvY3JlYXRlRXJyb3JDbGFzcy5qcyIsIndlYnBhY2s6Ly9AcHVlcnRzL3dlYmdsLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvZXJyb3JDb250ZXh0LmpzIiwid2VicGFjazovL0BwdWVydHMvd2ViZ2wvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9leGVjdXRlU2NoZWR1bGUuanMiLCJ3ZWJwYWNrOi8vQHB1ZXJ0cy93ZWJnbC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL2lkZW50aXR5LmpzIiwid2VicGFjazovL0BwdWVydHMvd2ViZ2wvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9pc0FycmF5TGlrZS5qcyIsIndlYnBhY2s6Ly9AcHVlcnRzL3dlYmdsLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvaXNBc3luY0l0ZXJhYmxlLmpzIiwid2VicGFjazovL0BwdWVydHMvd2ViZ2wvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9pc0Z1bmN0aW9uLmpzIiwid2VicGFjazovL0BwdWVydHMvd2ViZ2wvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9pc0ludGVyb3BPYnNlcnZhYmxlLmpzIiwid2VicGFjazovL0BwdWVydHMvd2ViZ2wvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9pc0l0ZXJhYmxlLmpzIiwid2VicGFjazovL0BwdWVydHMvd2ViZ2wvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9pc1Byb21pc2UuanMiLCJ3ZWJwYWNrOi8vQHB1ZXJ0cy93ZWJnbC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL2lzUmVhZGFibGVTdHJlYW1MaWtlLmpzIiwid2VicGFjazovL0BwdWVydHMvd2ViZ2wvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9saWZ0LmpzIiwid2VicGFjazovL0BwdWVydHMvd2ViZ2wvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9ub29wLmpzIiwid2VicGFjazovL0BwdWVydHMvd2ViZ2wvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9waXBlLmpzIiwid2VicGFjazovL0BwdWVydHMvd2ViZ2wvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9yZXBvcnRVbmhhbmRsZWRFcnJvci5qcyIsIndlYnBhY2s6Ly9AcHVlcnRzL3dlYmdsLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvdGhyb3dVbm9ic2VydmFibGVFcnJvci5qcyIsIndlYnBhY2s6Ly9AcHVlcnRzL3dlYmdsLy4vVHlwZVNjcmlwdC9CYXNlL2Jhc2UudHMiLCJ3ZWJwYWNrOi8vQHB1ZXJ0cy93ZWJnbC8uL1R5cGVTY3JpcHQvSlNCYWxsQmVoYXZpb3VyLnRzIiwid2VicGFjazovL0BwdWVydHMvd2ViZ2wvLi9UeXBlU2NyaXB0L0pTR2FtZU1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vQHB1ZXJ0cy93ZWJnbC8uL1R5cGVTY3JpcHQvVGVzdEpzQmVoYXZpb3IudHMiLCJ3ZWJwYWNrOi8vQHB1ZXJ0cy93ZWJnbC8uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJ3ZWJwYWNrOi8vQHB1ZXJ0cy93ZWJnbC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9AcHVlcnRzL3dlYmdsL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9AcHVlcnRzL3dlYmdsL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vQHB1ZXJ0cy93ZWJnbC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0BwdWVydHMvd2ViZ2wvLi9UeXBlU2NyaXB0L2VudHJ5LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB2YXIgQ09NUExFVEVfTk9USUZJQ0FUSU9OID0gKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNyZWF0ZU5vdGlmaWNhdGlvbignQycsIHVuZGVmaW5lZCwgdW5kZWZpbmVkKTsgfSkoKTtcbmV4cG9ydCBmdW5jdGlvbiBlcnJvck5vdGlmaWNhdGlvbihlcnJvcikge1xuICAgIHJldHVybiBjcmVhdGVOb3RpZmljYXRpb24oJ0UnLCB1bmRlZmluZWQsIGVycm9yKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBuZXh0Tm90aWZpY2F0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGNyZWF0ZU5vdGlmaWNhdGlvbignTicsIHZhbHVlLCB1bmRlZmluZWQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU5vdGlmaWNhdGlvbihraW5kLCB2YWx1ZSwgZXJyb3IpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBraW5kOiBraW5kLFxuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIGVycm9yOiBlcnJvcixcbiAgICB9O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Tm90aWZpY2F0aW9uRmFjdG9yaWVzLmpzLm1hcCIsImltcG9ydCB7IFNhZmVTdWJzY3JpYmVyLCBTdWJzY3JpYmVyIH0gZnJvbSAnLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IGlzU3Vic2NyaXB0aW9uIH0gZnJvbSAnLi9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgb2JzZXJ2YWJsZSBhcyBTeW1ib2xfb2JzZXJ2YWJsZSB9IGZyb20gJy4vc3ltYm9sL29ic2VydmFibGUnO1xuaW1wb3J0IHsgcGlwZUZyb21BcnJheSB9IGZyb20gJy4vdXRpbC9waXBlJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuL3V0aWwvaXNGdW5jdGlvbic7XG5pbXBvcnQgeyBlcnJvckNvbnRleHQgfSBmcm9tICcuL3V0aWwvZXJyb3JDb250ZXh0JztcbnZhciBPYnNlcnZhYmxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPYnNlcnZhYmxlKHN1YnNjcmliZSkge1xuICAgICAgICBpZiAoc3Vic2NyaWJlKSB7XG4gICAgICAgICAgICB0aGlzLl9zdWJzY3JpYmUgPSBzdWJzY3JpYmU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUubGlmdCA9IGZ1bmN0aW9uIChvcGVyYXRvcikge1xuICAgICAgICB2YXIgb2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlKCk7XG4gICAgICAgIG9ic2VydmFibGUuc291cmNlID0gdGhpcztcbiAgICAgICAgb2JzZXJ2YWJsZS5vcGVyYXRvciA9IG9wZXJhdG9yO1xuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZTtcbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uIChvYnNlcnZlck9yTmV4dCwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBzdWJzY3JpYmVyID0gaXNTdWJzY3JpYmVyKG9ic2VydmVyT3JOZXh0KSA/IG9ic2VydmVyT3JOZXh0IDogbmV3IFNhZmVTdWJzY3JpYmVyKG9ic2VydmVyT3JOZXh0LCBlcnJvciwgY29tcGxldGUpO1xuICAgICAgICBlcnJvckNvbnRleHQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF9hID0gX3RoaXMsIG9wZXJhdG9yID0gX2Eub3BlcmF0b3IsIHNvdXJjZSA9IF9hLnNvdXJjZTtcbiAgICAgICAgICAgIHN1YnNjcmliZXIuYWRkKG9wZXJhdG9yXG4gICAgICAgICAgICAgICAgP1xuICAgICAgICAgICAgICAgICAgICBvcGVyYXRvci5jYWxsKHN1YnNjcmliZXIsIHNvdXJjZSlcbiAgICAgICAgICAgICAgICA6IHNvdXJjZVxuICAgICAgICAgICAgICAgICAgICA/XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fc3Vic2NyaWJlKHN1YnNjcmliZXIpXG4gICAgICAgICAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl90cnlTdWJzY3JpYmUoc3Vic2NyaWJlcikpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHN1YnNjcmliZXI7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5fdHJ5U3Vic2NyaWJlID0gZnVuY3Rpb24gKHNpbmspIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdWJzY3JpYmUoc2luayk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgc2luay5lcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKG5leHQsIHByb21pc2VDdG9yKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHByb21pc2VDdG9yID0gZ2V0UHJvbWlzZUN0b3IocHJvbWlzZUN0b3IpO1xuICAgICAgICByZXR1cm4gbmV3IHByb21pc2VDdG9yKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHZhciBzdWJzY3JpYmVyID0gbmV3IFNhZmVTdWJzY3JpYmVyKHtcbiAgICAgICAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogcmVqZWN0LFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlOiByZXNvbHZlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBfdGhpcy5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuX3N1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuIChfYSA9IHRoaXMuc291cmNlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGVbU3ltYm9sX29ic2VydmFibGVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnBpcGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvcGVyYXRpb25zID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBvcGVyYXRpb25zW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBpcGVGcm9tQXJyYXkob3BlcmF0aW9ucykodGhpcyk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS50b1Byb21pc2UgPSBmdW5jdGlvbiAocHJvbWlzZUN0b3IpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcHJvbWlzZUN0b3IgPSBnZXRQcm9taXNlQ3Rvcihwcm9taXNlQ3Rvcik7XG4gICAgICAgIHJldHVybiBuZXcgcHJvbWlzZUN0b3IoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICAgICAgX3RoaXMuc3Vic2NyaWJlKGZ1bmN0aW9uICh4KSB7IHJldHVybiAodmFsdWUgPSB4KTsgfSwgZnVuY3Rpb24gKGVycikgeyByZXR1cm4gcmVqZWN0KGVycik7IH0sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlc29sdmUodmFsdWUpOyB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLmNyZWF0ZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKHN1YnNjcmliZSk7XG4gICAgfTtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZTtcbn0oKSk7XG5leHBvcnQgeyBPYnNlcnZhYmxlIH07XG5mdW5jdGlvbiBnZXRQcm9taXNlQ3Rvcihwcm9taXNlQ3Rvcikge1xuICAgIHZhciBfYTtcbiAgICByZXR1cm4gKF9hID0gcHJvbWlzZUN0b3IgIT09IG51bGwgJiYgcHJvbWlzZUN0b3IgIT09IHZvaWQgMCA/IHByb21pc2VDdG9yIDogY29uZmlnLlByb21pc2UpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IFByb21pc2U7XG59XG5mdW5jdGlvbiBpc09ic2VydmVyKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICYmIGlzRnVuY3Rpb24odmFsdWUubmV4dCkgJiYgaXNGdW5jdGlvbih2YWx1ZS5lcnJvcikgJiYgaXNGdW5jdGlvbih2YWx1ZS5jb21wbGV0ZSk7XG59XG5mdW5jdGlvbiBpc1N1YnNjcmliZXIodmFsdWUpIHtcbiAgICByZXR1cm4gKHZhbHVlICYmIHZhbHVlIGluc3RhbmNlb2YgU3Vic2NyaWJlcikgfHwgKGlzT2JzZXJ2ZXIodmFsdWUpICYmIGlzU3Vic2NyaXB0aW9uKHZhbHVlKSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1PYnNlcnZhYmxlLmpzLm1hcCIsImltcG9ydCB7IF9fZXh0ZW5kcyB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4vdXRpbC9pc0Z1bmN0aW9uJztcbmltcG9ydCB7IGlzU3Vic2NyaXB0aW9uLCBTdWJzY3JpcHRpb24gfSBmcm9tICcuL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyByZXBvcnRVbmhhbmRsZWRFcnJvciB9IGZyb20gJy4vdXRpbC9yZXBvcnRVbmhhbmRsZWRFcnJvcic7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAnLi91dGlsL25vb3AnO1xuaW1wb3J0IHsgbmV4dE5vdGlmaWNhdGlvbiwgZXJyb3JOb3RpZmljYXRpb24sIENPTVBMRVRFX05PVElGSUNBVElPTiB9IGZyb20gJy4vTm90aWZpY2F0aW9uRmFjdG9yaWVzJztcbmltcG9ydCB7IHRpbWVvdXRQcm92aWRlciB9IGZyb20gJy4vc2NoZWR1bGVyL3RpbWVvdXRQcm92aWRlcic7XG5pbXBvcnQgeyBjYXB0dXJlRXJyb3IgfSBmcm9tICcuL3V0aWwvZXJyb3JDb250ZXh0JztcbnZhciBTdWJzY3JpYmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU3Vic2NyaWJlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTdWJzY3JpYmVyKGRlc3RpbmF0aW9uKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmlzU3RvcHBlZCA9IGZhbHNlO1xuICAgICAgICBpZiAoZGVzdGluYXRpb24pIHtcbiAgICAgICAgICAgIF90aGlzLmRlc3RpbmF0aW9uID0gZGVzdGluYXRpb247XG4gICAgICAgICAgICBpZiAoaXNTdWJzY3JpcHRpb24oZGVzdGluYXRpb24pKSB7XG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb24uYWRkKF90aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLmRlc3RpbmF0aW9uID0gRU1QVFlfT0JTRVJWRVI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBTdWJzY3JpYmVyLmNyZWF0ZSA9IGZ1bmN0aW9uIChuZXh0LCBlcnJvciwgY29tcGxldGUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTYWZlU3Vic2NyaWJlcihuZXh0LCBlcnJvciwgY29tcGxldGUpO1xuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIGhhbmRsZVN0b3BwZWROb3RpZmljYXRpb24obmV4dE5vdGlmaWNhdGlvbih2YWx1ZSksIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbmV4dCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICBpZiAodGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIGhhbmRsZVN0b3BwZWROb3RpZmljYXRpb24oZXJyb3JOb3RpZmljYXRpb24oZXJyKSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9lcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICBoYW5kbGVTdG9wcGVkTm90aWZpY2F0aW9uKENPTVBMRVRFX05PVElGSUNBVElPTiwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSB0cnVlO1xuICAgICAgICAgICAgX3N1cGVyLnByb3RvdHlwZS51bnN1YnNjcmliZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbiA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLl9uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dCh2YWx1ZSk7XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5fZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLl9jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFN1YnNjcmliZXI7XG59KFN1YnNjcmlwdGlvbikpO1xuZXhwb3J0IHsgU3Vic2NyaWJlciB9O1xudmFyIF9iaW5kID0gRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQ7XG5mdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gICAgcmV0dXJuIF9iaW5kLmNhbGwoZm4sIHRoaXNBcmcpO1xufVxudmFyIENvbnN1bWVyT2JzZXJ2ZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnN1bWVyT2JzZXJ2ZXIocGFydGlhbE9ic2VydmVyKSB7XG4gICAgICAgIHRoaXMucGFydGlhbE9ic2VydmVyID0gcGFydGlhbE9ic2VydmVyO1xuICAgIH1cbiAgICBDb25zdW1lck9ic2VydmVyLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciBwYXJ0aWFsT2JzZXJ2ZXIgPSB0aGlzLnBhcnRpYWxPYnNlcnZlcjtcbiAgICAgICAgaWYgKHBhcnRpYWxPYnNlcnZlci5uZXh0KSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHBhcnRpYWxPYnNlcnZlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGhhbmRsZVVuaGFuZGxlZEVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29uc3VtZXJPYnNlcnZlci5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIHZhciBwYXJ0aWFsT2JzZXJ2ZXIgPSB0aGlzLnBhcnRpYWxPYnNlcnZlcjtcbiAgICAgICAgaWYgKHBhcnRpYWxPYnNlcnZlci5lcnJvcikge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBwYXJ0aWFsT2JzZXJ2ZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGhhbmRsZVVuaGFuZGxlZEVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGhhbmRsZVVuaGFuZGxlZEVycm9yKGVycik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbnN1bWVyT2JzZXJ2ZXIucHJvdG90eXBlLmNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcGFydGlhbE9ic2VydmVyID0gdGhpcy5wYXJ0aWFsT2JzZXJ2ZXI7XG4gICAgICAgIGlmIChwYXJ0aWFsT2JzZXJ2ZXIuY29tcGxldGUpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcGFydGlhbE9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVVbmhhbmRsZWRFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBDb25zdW1lck9ic2VydmVyO1xufSgpKTtcbnZhciBTYWZlU3Vic2NyaWJlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNhZmVTdWJzY3JpYmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFNhZmVTdWJzY3JpYmVyKG9ic2VydmVyT3JOZXh0LCBlcnJvciwgY29tcGxldGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgdmFyIHBhcnRpYWxPYnNlcnZlcjtcbiAgICAgICAgaWYgKGlzRnVuY3Rpb24ob2JzZXJ2ZXJPck5leHQpIHx8ICFvYnNlcnZlck9yTmV4dCkge1xuICAgICAgICAgICAgcGFydGlhbE9ic2VydmVyID0ge1xuICAgICAgICAgICAgICAgIG5leHQ6IChvYnNlcnZlck9yTmV4dCAhPT0gbnVsbCAmJiBvYnNlcnZlck9yTmV4dCAhPT0gdm9pZCAwID8gb2JzZXJ2ZXJPck5leHQgOiB1bmRlZmluZWQpLFxuICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvciAhPT0gbnVsbCAmJiBlcnJvciAhPT0gdm9pZCAwID8gZXJyb3IgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgY29tcGxldGU6IGNvbXBsZXRlICE9PSBudWxsICYmIGNvbXBsZXRlICE9PSB2b2lkIDAgPyBjb21wbGV0ZSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgY29udGV4dF8xO1xuICAgICAgICAgICAgaWYgKF90aGlzICYmIGNvbmZpZy51c2VEZXByZWNhdGVkTmV4dENvbnRleHQpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0XzEgPSBPYmplY3QuY3JlYXRlKG9ic2VydmVyT3JOZXh0KTtcbiAgICAgICAgICAgICAgICBjb250ZXh0XzEudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy51bnN1YnNjcmliZSgpOyB9O1xuICAgICAgICAgICAgICAgIHBhcnRpYWxPYnNlcnZlciA9IHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dDogb2JzZXJ2ZXJPck5leHQubmV4dCAmJiBiaW5kKG9ic2VydmVyT3JOZXh0Lm5leHQsIGNvbnRleHRfMSksXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBvYnNlcnZlck9yTmV4dC5lcnJvciAmJiBiaW5kKG9ic2VydmVyT3JOZXh0LmVycm9yLCBjb250ZXh0XzEpLFxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogb2JzZXJ2ZXJPck5leHQuY29tcGxldGUgJiYgYmluZChvYnNlcnZlck9yTmV4dC5jb21wbGV0ZSwgY29udGV4dF8xKSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcGFydGlhbE9ic2VydmVyID0gb2JzZXJ2ZXJPck5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuZGVzdGluYXRpb24gPSBuZXcgQ29uc3VtZXJPYnNlcnZlcihwYXJ0aWFsT2JzZXJ2ZXIpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBTYWZlU3Vic2NyaWJlcjtcbn0oU3Vic2NyaWJlcikpO1xuZXhwb3J0IHsgU2FmZVN1YnNjcmliZXIgfTtcbmZ1bmN0aW9uIGhhbmRsZVVuaGFuZGxlZEVycm9yKGVycm9yKSB7XG4gICAgaWYgKGNvbmZpZy51c2VEZXByZWNhdGVkU3luY2hyb25vdXNFcnJvckhhbmRsaW5nKSB7XG4gICAgICAgIGNhcHR1cmVFcnJvcihlcnJvcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXBvcnRVbmhhbmRsZWRFcnJvcihlcnJvcik7XG4gICAgfVxufVxuZnVuY3Rpb24gZGVmYXVsdEVycm9ySGFuZGxlcihlcnIpIHtcbiAgICB0aHJvdyBlcnI7XG59XG5mdW5jdGlvbiBoYW5kbGVTdG9wcGVkTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbiwgc3Vic2NyaWJlcikge1xuICAgIHZhciBvblN0b3BwZWROb3RpZmljYXRpb24gPSBjb25maWcub25TdG9wcGVkTm90aWZpY2F0aW9uO1xuICAgIG9uU3RvcHBlZE5vdGlmaWNhdGlvbiAmJiB0aW1lb3V0UHJvdmlkZXIuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHJldHVybiBvblN0b3BwZWROb3RpZmljYXRpb24obm90aWZpY2F0aW9uLCBzdWJzY3JpYmVyKTsgfSk7XG59XG5leHBvcnQgdmFyIEVNUFRZX09CU0VSVkVSID0ge1xuICAgIGNsb3NlZDogdHJ1ZSxcbiAgICBuZXh0OiBub29wLFxuICAgIGVycm9yOiBkZWZhdWx0RXJyb3JIYW5kbGVyLFxuICAgIGNvbXBsZXRlOiBub29wLFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN1YnNjcmliZXIuanMubWFwIiwiaW1wb3J0IHsgX19yZWFkLCBfX3NwcmVhZEFycmF5LCBfX3ZhbHVlcyB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4vdXRpbC9pc0Z1bmN0aW9uJztcbmltcG9ydCB7IFVuc3Vic2NyaXB0aW9uRXJyb3IgfSBmcm9tICcuL3V0aWwvVW5zdWJzY3JpcHRpb25FcnJvcic7XG5pbXBvcnQgeyBhcnJSZW1vdmUgfSBmcm9tICcuL3V0aWwvYXJyUmVtb3ZlJztcbnZhciBTdWJzY3JpcHRpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFN1YnNjcmlwdGlvbihpbml0aWFsVGVhcmRvd24pIHtcbiAgICAgICAgdGhpcy5pbml0aWFsVGVhcmRvd24gPSBpbml0aWFsVGVhcmRvd247XG4gICAgICAgIHRoaXMuY2xvc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3BhcmVudGFnZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2ZpbmFsaXplcnMgPSBudWxsO1xuICAgIH1cbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZV8xLCBfYSwgZV8yLCBfYjtcbiAgICAgICAgdmFyIGVycm9ycztcbiAgICAgICAgaWYgKCF0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgdGhpcy5jbG9zZWQgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIF9wYXJlbnRhZ2UgPSB0aGlzLl9wYXJlbnRhZ2U7XG4gICAgICAgICAgICBpZiAoX3BhcmVudGFnZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3BhcmVudGFnZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoX3BhcmVudGFnZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9wYXJlbnRhZ2VfMSA9IF9fdmFsdWVzKF9wYXJlbnRhZ2UpLCBfcGFyZW50YWdlXzFfMSA9IF9wYXJlbnRhZ2VfMS5uZXh0KCk7ICFfcGFyZW50YWdlXzFfMS5kb25lOyBfcGFyZW50YWdlXzFfMSA9IF9wYXJlbnRhZ2VfMS5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFyZW50XzEgPSBfcGFyZW50YWdlXzFfMS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRfMS5yZW1vdmUodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cbiAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfcGFyZW50YWdlXzFfMSAmJiAhX3BhcmVudGFnZV8xXzEuZG9uZSAmJiAoX2EgPSBfcGFyZW50YWdlXzEucmV0dXJuKSkgX2EuY2FsbChfcGFyZW50YWdlXzEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzEpIHRocm93IGVfMS5lcnJvcjsgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBfcGFyZW50YWdlLnJlbW92ZSh0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgaW5pdGlhbEZpbmFsaXplciA9IHRoaXMuaW5pdGlhbFRlYXJkb3duO1xuICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24oaW5pdGlhbEZpbmFsaXplcikpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpbml0aWFsRmluYWxpemVyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9ycyA9IGUgaW5zdGFuY2VvZiBVbnN1YnNjcmlwdGlvbkVycm9yID8gZS5lcnJvcnMgOiBbZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIF9maW5hbGl6ZXJzID0gdGhpcy5fZmluYWxpemVycztcbiAgICAgICAgICAgIGlmIChfZmluYWxpemVycykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZpbmFsaXplcnMgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9maW5hbGl6ZXJzXzEgPSBfX3ZhbHVlcyhfZmluYWxpemVycyksIF9maW5hbGl6ZXJzXzFfMSA9IF9maW5hbGl6ZXJzXzEubmV4dCgpOyAhX2ZpbmFsaXplcnNfMV8xLmRvbmU7IF9maW5hbGl6ZXJzXzFfMSA9IF9maW5hbGl6ZXJzXzEubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmluYWxpemVyID0gX2ZpbmFsaXplcnNfMV8xLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleGVjRmluYWxpemVyKGZpbmFsaXplcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzID0gZXJyb3JzICE9PSBudWxsICYmIGVycm9ycyAhPT0gdm9pZCAwID8gZXJyb3JzIDogW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIFVuc3Vic2NyaXB0aW9uRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzID0gX19zcHJlYWRBcnJheShfX3NwcmVhZEFycmF5KFtdLCBfX3JlYWQoZXJyb3JzKSksIF9fcmVhZChlcnIuZXJyb3JzKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcnMucHVzaChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZV8yXzEpIHsgZV8yID0geyBlcnJvcjogZV8yXzEgfTsgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9maW5hbGl6ZXJzXzFfMSAmJiAhX2ZpbmFsaXplcnNfMV8xLmRvbmUgJiYgKF9iID0gX2ZpbmFsaXplcnNfMS5yZXR1cm4pKSBfYi5jYWxsKF9maW5hbGl6ZXJzXzEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8yKSB0aHJvdyBlXzIuZXJyb3I7IH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZXJyb3JzKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFVuc3Vic2NyaXB0aW9uRXJyb3IoZXJyb3JzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAodGVhcmRvd24pIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAodGVhcmRvd24gJiYgdGVhcmRvd24gIT09IHRoaXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgICAgIGV4ZWNGaW5hbGl6ZXIodGVhcmRvd24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRlYXJkb3duIGluc3RhbmNlb2YgU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZWFyZG93bi5jbG9zZWQgfHwgdGVhcmRvd24uX2hhc1BhcmVudCh0aGlzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRlYXJkb3duLl9hZGRQYXJlbnQodGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICh0aGlzLl9maW5hbGl6ZXJzID0gKF9hID0gdGhpcy5fZmluYWxpemVycykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogW10pLnB1c2godGVhcmRvd24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLl9oYXNQYXJlbnQgPSBmdW5jdGlvbiAocGFyZW50KSB7XG4gICAgICAgIHZhciBfcGFyZW50YWdlID0gdGhpcy5fcGFyZW50YWdlO1xuICAgICAgICByZXR1cm4gX3BhcmVudGFnZSA9PT0gcGFyZW50IHx8IChBcnJheS5pc0FycmF5KF9wYXJlbnRhZ2UpICYmIF9wYXJlbnRhZ2UuaW5jbHVkZXMocGFyZW50KSk7XG4gICAgfTtcbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLl9hZGRQYXJlbnQgPSBmdW5jdGlvbiAocGFyZW50KSB7XG4gICAgICAgIHZhciBfcGFyZW50YWdlID0gdGhpcy5fcGFyZW50YWdlO1xuICAgICAgICB0aGlzLl9wYXJlbnRhZ2UgPSBBcnJheS5pc0FycmF5KF9wYXJlbnRhZ2UpID8gKF9wYXJlbnRhZ2UucHVzaChwYXJlbnQpLCBfcGFyZW50YWdlKSA6IF9wYXJlbnRhZ2UgPyBbX3BhcmVudGFnZSwgcGFyZW50XSA6IHBhcmVudDtcbiAgICB9O1xuICAgIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUuX3JlbW92ZVBhcmVudCA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgdmFyIF9wYXJlbnRhZ2UgPSB0aGlzLl9wYXJlbnRhZ2U7XG4gICAgICAgIGlmIChfcGFyZW50YWdlID09PSBwYXJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3BhcmVudGFnZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShfcGFyZW50YWdlKSkge1xuICAgICAgICAgICAgYXJyUmVtb3ZlKF9wYXJlbnRhZ2UsIHBhcmVudCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKHRlYXJkb3duKSB7XG4gICAgICAgIHZhciBfZmluYWxpemVycyA9IHRoaXMuX2ZpbmFsaXplcnM7XG4gICAgICAgIF9maW5hbGl6ZXJzICYmIGFyclJlbW92ZShfZmluYWxpemVycywgdGVhcmRvd24pO1xuICAgICAgICBpZiAodGVhcmRvd24gaW5zdGFuY2VvZiBTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRlYXJkb3duLl9yZW1vdmVQYXJlbnQodGhpcyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmlwdGlvbi5FTVBUWSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlbXB0eSA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICAgICAgZW1wdHkuY2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGVtcHR5O1xuICAgIH0pKCk7XG4gICAgcmV0dXJuIFN1YnNjcmlwdGlvbjtcbn0oKSk7XG5leHBvcnQgeyBTdWJzY3JpcHRpb24gfTtcbmV4cG9ydCB2YXIgRU1QVFlfU1VCU0NSSVBUSU9OID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3Vic2NyaXB0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuICh2YWx1ZSBpbnN0YW5jZW9mIFN1YnNjcmlwdGlvbiB8fFxuICAgICAgICAodmFsdWUgJiYgJ2Nsb3NlZCcgaW4gdmFsdWUgJiYgaXNGdW5jdGlvbih2YWx1ZS5yZW1vdmUpICYmIGlzRnVuY3Rpb24odmFsdWUuYWRkKSAmJiBpc0Z1bmN0aW9uKHZhbHVlLnVuc3Vic2NyaWJlKSkpO1xufVxuZnVuY3Rpb24gZXhlY0ZpbmFsaXplcihmaW5hbGl6ZXIpIHtcbiAgICBpZiAoaXNGdW5jdGlvbihmaW5hbGl6ZXIpKSB7XG4gICAgICAgIGZpbmFsaXplcigpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZmluYWxpemVyLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U3Vic2NyaXB0aW9uLmpzLm1hcCIsImV4cG9ydCB2YXIgY29uZmlnID0ge1xuICAgIG9uVW5oYW5kbGVkRXJyb3I6IG51bGwsXG4gICAgb25TdG9wcGVkTm90aWZpY2F0aW9uOiBudWxsLFxuICAgIFByb21pc2U6IHVuZGVmaW5lZCxcbiAgICB1c2VEZXByZWNhdGVkU3luY2hyb25vdXNFcnJvckhhbmRsaW5nOiBmYWxzZSxcbiAgICB1c2VEZXByZWNhdGVkTmV4dENvbnRleHQ6IGZhbHNlLFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbmZpZy5qcy5tYXAiLCJpbXBvcnQgeyBzY2hlZHVsZWQgfSBmcm9tICcuLi9zY2hlZHVsZWQvc2NoZWR1bGVkJztcbmltcG9ydCB7IGlubmVyRnJvbSB9IGZyb20gJy4vaW5uZXJGcm9tJztcbmV4cG9ydCBmdW5jdGlvbiBmcm9tKGlucHV0LCBzY2hlZHVsZXIpIHtcbiAgICByZXR1cm4gc2NoZWR1bGVyID8gc2NoZWR1bGVkKGlucHV0LCBzY2hlZHVsZXIpIDogaW5uZXJGcm9tKGlucHV0KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZyb20uanMubWFwIiwiaW1wb3J0IHsgX19hc3luY1ZhbHVlcywgX19hd2FpdGVyLCBfX2dlbmVyYXRvciwgX192YWx1ZXMgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IGlzQXJyYXlMaWtlIH0gZnJvbSAnLi4vdXRpbC9pc0FycmF5TGlrZSc7XG5pbXBvcnQgeyBpc1Byb21pc2UgfSBmcm9tICcuLi91dGlsL2lzUHJvbWlzZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBpc0ludGVyb3BPYnNlcnZhYmxlIH0gZnJvbSAnLi4vdXRpbC9pc0ludGVyb3BPYnNlcnZhYmxlJztcbmltcG9ydCB7IGlzQXN5bmNJdGVyYWJsZSB9IGZyb20gJy4uL3V0aWwvaXNBc3luY0l0ZXJhYmxlJztcbmltcG9ydCB7IGNyZWF0ZUludmFsaWRPYnNlcnZhYmxlVHlwZUVycm9yIH0gZnJvbSAnLi4vdXRpbC90aHJvd1Vub2JzZXJ2YWJsZUVycm9yJztcbmltcG9ydCB7IGlzSXRlcmFibGUgfSBmcm9tICcuLi91dGlsL2lzSXRlcmFibGUnO1xuaW1wb3J0IHsgaXNSZWFkYWJsZVN0cmVhbUxpa2UsIHJlYWRhYmxlU3RyZWFtTGlrZVRvQXN5bmNHZW5lcmF0b3IgfSBmcm9tICcuLi91dGlsL2lzUmVhZGFibGVTdHJlYW1MaWtlJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuLi91dGlsL2lzRnVuY3Rpb24nO1xuaW1wb3J0IHsgcmVwb3J0VW5oYW5kbGVkRXJyb3IgfSBmcm9tICcuLi91dGlsL3JlcG9ydFVuaGFuZGxlZEVycm9yJztcbmltcG9ydCB7IG9ic2VydmFibGUgYXMgU3ltYm9sX29ic2VydmFibGUgfSBmcm9tICcuLi9zeW1ib2wvb2JzZXJ2YWJsZSc7XG5leHBvcnQgZnVuY3Rpb24gaW5uZXJGcm9tKGlucHV0KSB7XG4gICAgaWYgKGlucHV0IGluc3RhbmNlb2YgT2JzZXJ2YWJsZSkge1xuICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgfVxuICAgIGlmIChpbnB1dCAhPSBudWxsKSB7XG4gICAgICAgIGlmIChpc0ludGVyb3BPYnNlcnZhYmxlKGlucHV0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZyb21JbnRlcm9wT2JzZXJ2YWJsZShpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQXJyYXlMaWtlKGlucHV0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZyb21BcnJheUxpa2UoaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1Byb21pc2UoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZnJvbVByb21pc2UoaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0FzeW5jSXRlcmFibGUoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZnJvbUFzeW5jSXRlcmFibGUoaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0l0ZXJhYmxlKGlucHV0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZyb21JdGVyYWJsZShpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzUmVhZGFibGVTdHJlYW1MaWtlKGlucHV0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZyb21SZWFkYWJsZVN0cmVhbUxpa2UoaW5wdXQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRocm93IGNyZWF0ZUludmFsaWRPYnNlcnZhYmxlVHlwZUVycm9yKGlucHV0KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmcm9tSW50ZXJvcE9ic2VydmFibGUob2JqKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBvYnMgPSBvYmpbU3ltYm9sX29ic2VydmFibGVdKCk7XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKG9icy5zdWJzY3JpYmUpKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JzLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQcm92aWRlZCBvYmplY3QgZG9lcyBub3QgY29ycmVjdGx5IGltcGxlbWVudCBTeW1ib2wub2JzZXJ2YWJsZScpO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZyb21BcnJheUxpa2UoYXJyYXkpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGggJiYgIXN1YnNjcmliZXIuY2xvc2VkOyBpKyspIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChhcnJheVtpXSk7XG4gICAgICAgIH1cbiAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZyb21Qcm9taXNlKHByb21pc2UpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgcHJvbWlzZVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoIXN1YnNjcmliZXIuY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHsgcmV0dXJuIHN1YnNjcmliZXIuZXJyb3IoZXJyKTsgfSlcbiAgICAgICAgICAgIC50aGVuKG51bGwsIHJlcG9ydFVuaGFuZGxlZEVycm9yKTtcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmcm9tSXRlcmFibGUoaXRlcmFibGUpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGVfMSwgX2E7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpdGVyYWJsZV8xID0gX192YWx1ZXMoaXRlcmFibGUpLCBpdGVyYWJsZV8xXzEgPSBpdGVyYWJsZV8xLm5leHQoKTsgIWl0ZXJhYmxlXzFfMS5kb25lOyBpdGVyYWJsZV8xXzEgPSBpdGVyYWJsZV8xLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGl0ZXJhYmxlXzFfMS52YWx1ZTtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmIChzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlXzFfMSkgeyBlXzEgPSB7IGVycm9yOiBlXzFfMSB9OyB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlcmFibGVfMV8xICYmICFpdGVyYWJsZV8xXzEuZG9uZSAmJiAoX2EgPSBpdGVyYWJsZV8xLnJldHVybikpIF9hLmNhbGwoaXRlcmFibGVfMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yOyB9XG4gICAgICAgIH1cbiAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZyb21Bc3luY0l0ZXJhYmxlKGFzeW5jSXRlcmFibGUpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgcHJvY2Vzcyhhc3luY0l0ZXJhYmxlLCBzdWJzY3JpYmVyKS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7IHJldHVybiBzdWJzY3JpYmVyLmVycm9yKGVycik7IH0pO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZyb21SZWFkYWJsZVN0cmVhbUxpa2UocmVhZGFibGVTdHJlYW0pIHtcbiAgICByZXR1cm4gZnJvbUFzeW5jSXRlcmFibGUocmVhZGFibGVTdHJlYW1MaWtlVG9Bc3luY0dlbmVyYXRvcihyZWFkYWJsZVN0cmVhbSkpO1xufVxuZnVuY3Rpb24gcHJvY2Vzcyhhc3luY0l0ZXJhYmxlLCBzdWJzY3JpYmVyKSB7XG4gICAgdmFyIGFzeW5jSXRlcmFibGVfMSwgYXN5bmNJdGVyYWJsZV8xXzE7XG4gICAgdmFyIGVfMiwgX2E7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdmFsdWUsIGVfMl8xO1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICBfYi50cnlzLnB1c2goWzAsIDUsIDYsIDExXSk7XG4gICAgICAgICAgICAgICAgICAgIGFzeW5jSXRlcmFibGVfMSA9IF9fYXN5bmNWYWx1ZXMoYXN5bmNJdGVyYWJsZSk7XG4gICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbNCwgYXN5bmNJdGVyYWJsZV8xLm5leHQoKV07XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICBpZiAoIShhc3luY0l0ZXJhYmxlXzFfMSA9IF9iLnNlbnQoKSwgIWFzeW5jSXRlcmFibGVfMV8xLmRvbmUpKSByZXR1cm4gWzMsIDRdO1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGFzeW5jSXRlcmFibGVfMV8xLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3Vic2NyaWJlci5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMl07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAzO1xuICAgICAgICAgICAgICAgIGNhc2UgMzogcmV0dXJuIFszLCAxXTtcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbMywgMTFdO1xuICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgZV8yXzEgPSBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIGVfMiA9IHsgZXJyb3I6IGVfMl8xIH07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMywgMTFdO1xuICAgICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICAgICAgX2IudHJ5cy5wdXNoKFs2LCAsIDksIDEwXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghKGFzeW5jSXRlcmFibGVfMV8xICYmICFhc3luY0l0ZXJhYmxlXzFfMS5kb25lICYmIChfYSA9IGFzeW5jSXRlcmFibGVfMS5yZXR1cm4pKSkgcmV0dXJuIFszLCA4XTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCBfYS5jYWxsKGFzeW5jSXRlcmFibGVfMSldO1xuICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDg7XG4gICAgICAgICAgICAgICAgY2FzZSA4OiByZXR1cm4gWzMsIDEwXTtcbiAgICAgICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICAgICAgIGlmIChlXzIpIHRocm93IGVfMi5lcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs3XTtcbiAgICAgICAgICAgICAgICBjYXNlIDEwOiByZXR1cm4gWzddO1xuICAgICAgICAgICAgICAgIGNhc2UgMTE6XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbm5lckZyb20uanMubWFwIiwiaW1wb3J0IHsgX19leHRlbmRzIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKGRlc3RpbmF0aW9uLCBvbk5leHQsIG9uQ29tcGxldGUsIG9uRXJyb3IsIG9uRmluYWxpemUpIHtcbiAgICByZXR1cm4gbmV3IE9wZXJhdG9yU3Vic2NyaWJlcihkZXN0aW5hdGlvbiwgb25OZXh0LCBvbkNvbXBsZXRlLCBvbkVycm9yLCBvbkZpbmFsaXplKTtcbn1cbnZhciBPcGVyYXRvclN1YnNjcmliZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhPcGVyYXRvclN1YnNjcmliZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gT3BlcmF0b3JTdWJzY3JpYmVyKGRlc3RpbmF0aW9uLCBvbk5leHQsIG9uQ29tcGxldGUsIG9uRXJyb3IsIG9uRmluYWxpemUsIHNob3VsZFVuc3Vic2NyaWJlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGRlc3RpbmF0aW9uKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5vbkZpbmFsaXplID0gb25GaW5hbGl6ZTtcbiAgICAgICAgX3RoaXMuc2hvdWxkVW5zdWJzY3JpYmUgPSBzaG91bGRVbnN1YnNjcmliZTtcbiAgICAgICAgX3RoaXMuX25leHQgPSBvbk5leHRcbiAgICAgICAgICAgID8gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgb25OZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDogX3N1cGVyLnByb3RvdHlwZS5fbmV4dDtcbiAgICAgICAgX3RoaXMuX2Vycm9yID0gb25FcnJvclxuICAgICAgICAgICAgPyBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgb25FcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiBfc3VwZXIucHJvdG90eXBlLl9lcnJvcjtcbiAgICAgICAgX3RoaXMuX2NvbXBsZXRlID0gb25Db21wbGV0ZVxuICAgICAgICAgICAgPyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiBfc3VwZXIucHJvdG90eXBlLl9jb21wbGV0ZTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBPcGVyYXRvclN1YnNjcmliZXIucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICghdGhpcy5zaG91bGRVbnN1YnNjcmliZSB8fCB0aGlzLnNob3VsZFVuc3Vic2NyaWJlKCkpIHtcbiAgICAgICAgICAgIHZhciBjbG9zZWRfMSA9IHRoaXMuY2xvc2VkO1xuICAgICAgICAgICAgX3N1cGVyLnByb3RvdHlwZS51bnN1YnNjcmliZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgIWNsb3NlZF8xICYmICgoX2EgPSB0aGlzLm9uRmluYWxpemUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jYWxsKHRoaXMpKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIE9wZXJhdG9yU3Vic2NyaWJlcjtcbn0oU3Vic2NyaWJlcikpO1xuZXhwb3J0IHsgT3BlcmF0b3JTdWJzY3JpYmVyIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1PcGVyYXRvclN1YnNjcmliZXIuanMubWFwIiwiaW1wb3J0IHsgZXhlY3V0ZVNjaGVkdWxlIH0gZnJvbSAnLi4vdXRpbC9leGVjdXRlU2NoZWR1bGUnO1xuaW1wb3J0IHsgb3BlcmF0ZSB9IGZyb20gJy4uL3V0aWwvbGlmdCc7XG5pbXBvcnQgeyBjcmVhdGVPcGVyYXRvclN1YnNjcmliZXIgfSBmcm9tICcuL09wZXJhdG9yU3Vic2NyaWJlcic7XG5leHBvcnQgZnVuY3Rpb24gb2JzZXJ2ZU9uKHNjaGVkdWxlciwgZGVsYXkpIHtcbiAgICBpZiAoZGVsYXkgPT09IHZvaWQgMCkgeyBkZWxheSA9IDA7IH1cbiAgICByZXR1cm4gb3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gZXhlY3V0ZVNjaGVkdWxlKHN1YnNjcmliZXIsIHNjaGVkdWxlciwgZnVuY3Rpb24gKCkgeyByZXR1cm4gc3Vic2NyaWJlci5uZXh0KHZhbHVlKTsgfSwgZGVsYXkpOyB9LCBmdW5jdGlvbiAoKSB7IHJldHVybiBleGVjdXRlU2NoZWR1bGUoc3Vic2NyaWJlciwgc2NoZWR1bGVyLCBmdW5jdGlvbiAoKSB7IHJldHVybiBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7IH0sIGRlbGF5KTsgfSwgZnVuY3Rpb24gKGVycikgeyByZXR1cm4gZXhlY3V0ZVNjaGVkdWxlKHN1YnNjcmliZXIsIHNjaGVkdWxlciwgZnVuY3Rpb24gKCkgeyByZXR1cm4gc3Vic2NyaWJlci5lcnJvcihlcnIpOyB9LCBkZWxheSk7IH0pKTtcbiAgICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9ic2VydmVPbi5qcy5tYXAiLCJpbXBvcnQgeyBvcGVyYXRlIH0gZnJvbSAnLi4vdXRpbC9saWZ0JztcbmV4cG9ydCBmdW5jdGlvbiBzdWJzY3JpYmVPbihzY2hlZHVsZXIsIGRlbGF5KSB7XG4gICAgaWYgKGRlbGF5ID09PSB2b2lkIDApIHsgZGVsYXkgPSAwOyB9XG4gICAgcmV0dXJuIG9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICBzdWJzY3JpYmVyLmFkZChzY2hlZHVsZXIuc2NoZWR1bGUoZnVuY3Rpb24gKCkgeyByZXR1cm4gc291cmNlLnN1YnNjcmliZShzdWJzY3JpYmVyKTsgfSwgZGVsYXkpKTtcbiAgICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN1YnNjcmliZU9uLmpzLm1hcCIsImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmV4cG9ydCBmdW5jdGlvbiBzY2hlZHVsZUFycmF5KGlucHV0LCBzY2hlZHVsZXIpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICByZXR1cm4gc2NoZWR1bGVyLnNjaGVkdWxlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChpID09PSBpbnB1dC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoaW5wdXRbaSsrXSk7XG4gICAgICAgICAgICAgICAgaWYgKCFzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNjaGVkdWxlQXJyYXkuanMubWFwIiwiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgZXhlY3V0ZVNjaGVkdWxlIH0gZnJvbSAnLi4vdXRpbC9leGVjdXRlU2NoZWR1bGUnO1xuZXhwb3J0IGZ1bmN0aW9uIHNjaGVkdWxlQXN5bmNJdGVyYWJsZShpbnB1dCwgc2NoZWR1bGVyKSB7XG4gICAgaWYgKCFpbnB1dCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0l0ZXJhYmxlIGNhbm5vdCBiZSBudWxsJyk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICBleGVjdXRlU2NoZWR1bGUoc3Vic2NyaWJlciwgc2NoZWR1bGVyLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaXRlcmF0b3IgPSBpbnB1dFtTeW1ib2wuYXN5bmNJdGVyYXRvcl0oKTtcbiAgICAgICAgICAgIGV4ZWN1dGVTY2hlZHVsZShzdWJzY3JpYmVyLCBzY2hlZHVsZXIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpdGVyYXRvci5uZXh0KCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZG9uZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHJlc3VsdC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIDAsIHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNjaGVkdWxlQXN5bmNJdGVyYWJsZS5qcy5tYXAiLCJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBpdGVyYXRvciBhcyBTeW1ib2xfaXRlcmF0b3IgfSBmcm9tICcuLi9zeW1ib2wvaXRlcmF0b3InO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4uL3V0aWwvaXNGdW5jdGlvbic7XG5pbXBvcnQgeyBleGVjdXRlU2NoZWR1bGUgfSBmcm9tICcuLi91dGlsL2V4ZWN1dGVTY2hlZHVsZSc7XG5leHBvcnQgZnVuY3Rpb24gc2NoZWR1bGVJdGVyYWJsZShpbnB1dCwgc2NoZWR1bGVyKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBpdGVyYXRvcjtcbiAgICAgICAgZXhlY3V0ZVNjaGVkdWxlKHN1YnNjcmliZXIsIHNjaGVkdWxlciwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaXRlcmF0b3IgPSBpbnB1dFtTeW1ib2xfaXRlcmF0b3JdKCk7XG4gICAgICAgICAgICBleGVjdXRlU2NoZWR1bGUoc3Vic2NyaWJlciwgc2NoZWR1bGVyLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgICAgICAgICB2YXIgZG9uZTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAoX2EgPSBpdGVyYXRvci5uZXh0KCksIHZhbHVlID0gX2EudmFsdWUsIGRvbmUgPSBfYS5kb25lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAwLCB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7IHJldHVybiBpc0Z1bmN0aW9uKGl0ZXJhdG9yID09PSBudWxsIHx8IGl0ZXJhdG9yID09PSB2b2lkIDAgPyB2b2lkIDAgOiBpdGVyYXRvci5yZXR1cm4pICYmIGl0ZXJhdG9yLnJldHVybigpOyB9O1xuICAgIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2NoZWR1bGVJdGVyYWJsZS5qcy5tYXAiLCJpbXBvcnQgeyBpbm5lckZyb20gfSBmcm9tICcuLi9vYnNlcnZhYmxlL2lubmVyRnJvbSc7XG5pbXBvcnQgeyBvYnNlcnZlT24gfSBmcm9tICcuLi9vcGVyYXRvcnMvb2JzZXJ2ZU9uJztcbmltcG9ydCB7IHN1YnNjcmliZU9uIH0gZnJvbSAnLi4vb3BlcmF0b3JzL3N1YnNjcmliZU9uJztcbmV4cG9ydCBmdW5jdGlvbiBzY2hlZHVsZU9ic2VydmFibGUoaW5wdXQsIHNjaGVkdWxlcikge1xuICAgIHJldHVybiBpbm5lckZyb20oaW5wdXQpLnBpcGUoc3Vic2NyaWJlT24oc2NoZWR1bGVyKSwgb2JzZXJ2ZU9uKHNjaGVkdWxlcikpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2NoZWR1bGVPYnNlcnZhYmxlLmpzLm1hcCIsImltcG9ydCB7IGlubmVyRnJvbSB9IGZyb20gJy4uL29ic2VydmFibGUvaW5uZXJGcm9tJztcbmltcG9ydCB7IG9ic2VydmVPbiB9IGZyb20gJy4uL29wZXJhdG9ycy9vYnNlcnZlT24nO1xuaW1wb3J0IHsgc3Vic2NyaWJlT24gfSBmcm9tICcuLi9vcGVyYXRvcnMvc3Vic2NyaWJlT24nO1xuZXhwb3J0IGZ1bmN0aW9uIHNjaGVkdWxlUHJvbWlzZShpbnB1dCwgc2NoZWR1bGVyKSB7XG4gICAgcmV0dXJuIGlubmVyRnJvbShpbnB1dCkucGlwZShzdWJzY3JpYmVPbihzY2hlZHVsZXIpLCBvYnNlcnZlT24oc2NoZWR1bGVyKSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zY2hlZHVsZVByb21pc2UuanMubWFwIiwiaW1wb3J0IHsgc2NoZWR1bGVBc3luY0l0ZXJhYmxlIH0gZnJvbSAnLi9zY2hlZHVsZUFzeW5jSXRlcmFibGUnO1xuaW1wb3J0IHsgcmVhZGFibGVTdHJlYW1MaWtlVG9Bc3luY0dlbmVyYXRvciB9IGZyb20gJy4uL3V0aWwvaXNSZWFkYWJsZVN0cmVhbUxpa2UnO1xuZXhwb3J0IGZ1bmN0aW9uIHNjaGVkdWxlUmVhZGFibGVTdHJlYW1MaWtlKGlucHV0LCBzY2hlZHVsZXIpIHtcbiAgICByZXR1cm4gc2NoZWR1bGVBc3luY0l0ZXJhYmxlKHJlYWRhYmxlU3RyZWFtTGlrZVRvQXN5bmNHZW5lcmF0b3IoaW5wdXQpLCBzY2hlZHVsZXIpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2NoZWR1bGVSZWFkYWJsZVN0cmVhbUxpa2UuanMubWFwIiwiaW1wb3J0IHsgc2NoZWR1bGVPYnNlcnZhYmxlIH0gZnJvbSAnLi9zY2hlZHVsZU9ic2VydmFibGUnO1xuaW1wb3J0IHsgc2NoZWR1bGVQcm9taXNlIH0gZnJvbSAnLi9zY2hlZHVsZVByb21pc2UnO1xuaW1wb3J0IHsgc2NoZWR1bGVBcnJheSB9IGZyb20gJy4vc2NoZWR1bGVBcnJheSc7XG5pbXBvcnQgeyBzY2hlZHVsZUl0ZXJhYmxlIH0gZnJvbSAnLi9zY2hlZHVsZUl0ZXJhYmxlJztcbmltcG9ydCB7IHNjaGVkdWxlQXN5bmNJdGVyYWJsZSB9IGZyb20gJy4vc2NoZWR1bGVBc3luY0l0ZXJhYmxlJztcbmltcG9ydCB7IGlzSW50ZXJvcE9ic2VydmFibGUgfSBmcm9tICcuLi91dGlsL2lzSW50ZXJvcE9ic2VydmFibGUnO1xuaW1wb3J0IHsgaXNQcm9taXNlIH0gZnJvbSAnLi4vdXRpbC9pc1Byb21pc2UnO1xuaW1wb3J0IHsgaXNBcnJheUxpa2UgfSBmcm9tICcuLi91dGlsL2lzQXJyYXlMaWtlJztcbmltcG9ydCB7IGlzSXRlcmFibGUgfSBmcm9tICcuLi91dGlsL2lzSXRlcmFibGUnO1xuaW1wb3J0IHsgaXNBc3luY0l0ZXJhYmxlIH0gZnJvbSAnLi4vdXRpbC9pc0FzeW5jSXRlcmFibGUnO1xuaW1wb3J0IHsgY3JlYXRlSW52YWxpZE9ic2VydmFibGVUeXBlRXJyb3IgfSBmcm9tICcuLi91dGlsL3Rocm93VW5vYnNlcnZhYmxlRXJyb3InO1xuaW1wb3J0IHsgaXNSZWFkYWJsZVN0cmVhbUxpa2UgfSBmcm9tICcuLi91dGlsL2lzUmVhZGFibGVTdHJlYW1MaWtlJztcbmltcG9ydCB7IHNjaGVkdWxlUmVhZGFibGVTdHJlYW1MaWtlIH0gZnJvbSAnLi9zY2hlZHVsZVJlYWRhYmxlU3RyZWFtTGlrZSc7XG5leHBvcnQgZnVuY3Rpb24gc2NoZWR1bGVkKGlucHV0LCBzY2hlZHVsZXIpIHtcbiAgICBpZiAoaW5wdXQgIT0gbnVsbCkge1xuICAgICAgICBpZiAoaXNJbnRlcm9wT2JzZXJ2YWJsZShpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBzY2hlZHVsZU9ic2VydmFibGUoaW5wdXQsIHNjaGVkdWxlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQXJyYXlMaWtlKGlucHV0KSkge1xuICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlQXJyYXkoaW5wdXQsIHNjaGVkdWxlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzUHJvbWlzZShpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBzY2hlZHVsZVByb21pc2UoaW5wdXQsIHNjaGVkdWxlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQXN5bmNJdGVyYWJsZShpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBzY2hlZHVsZUFzeW5jSXRlcmFibGUoaW5wdXQsIHNjaGVkdWxlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzSXRlcmFibGUoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gc2NoZWR1bGVJdGVyYWJsZShpbnB1dCwgc2NoZWR1bGVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNSZWFkYWJsZVN0cmVhbUxpa2UoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gc2NoZWR1bGVSZWFkYWJsZVN0cmVhbUxpa2UoaW5wdXQsIHNjaGVkdWxlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgY3JlYXRlSW52YWxpZE9ic2VydmFibGVUeXBlRXJyb3IoaW5wdXQpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2NoZWR1bGVkLmpzLm1hcCIsImltcG9ydCB7IF9fcmVhZCwgX19zcHJlYWRBcnJheSB9IGZyb20gXCJ0c2xpYlwiO1xuZXhwb3J0IHZhciB0aW1lb3V0UHJvdmlkZXIgPSB7XG4gICAgc2V0VGltZW91dDogZnVuY3Rpb24gKGhhbmRsZXIsIHRpbWVvdXQpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAyOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIGFyZ3NbX2kgLSAyXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRlbGVnYXRlID0gdGltZW91dFByb3ZpZGVyLmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUgPT09IG51bGwgfHwgZGVsZWdhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRlbGVnYXRlLnNldFRpbWVvdXQpIHtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZS5zZXRUaW1lb3V0LmFwcGx5KGRlbGVnYXRlLCBfX3NwcmVhZEFycmF5KFtoYW5kbGVyLCB0aW1lb3V0XSwgX19yZWFkKGFyZ3MpKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQuYXBwbHkodm9pZCAwLCBfX3NwcmVhZEFycmF5KFtoYW5kbGVyLCB0aW1lb3V0XSwgX19yZWFkKGFyZ3MpKSk7XG4gICAgfSxcbiAgICBjbGVhclRpbWVvdXQ6IGZ1bmN0aW9uIChoYW5kbGUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gdGltZW91dFByb3ZpZGVyLmRlbGVnYXRlO1xuICAgICAgICByZXR1cm4gKChkZWxlZ2F0ZSA9PT0gbnVsbCB8fCBkZWxlZ2F0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGVsZWdhdGUuY2xlYXJUaW1lb3V0KSB8fCBjbGVhclRpbWVvdXQpKGhhbmRsZSk7XG4gICAgfSxcbiAgICBkZWxlZ2F0ZTogdW5kZWZpbmVkLFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRpbWVvdXRQcm92aWRlci5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gZ2V0U3ltYm9sSXRlcmF0b3IoKSB7XG4gICAgaWYgKHR5cGVvZiBTeW1ib2wgIT09ICdmdW5jdGlvbicgfHwgIVN5bWJvbC5pdGVyYXRvcikge1xuICAgICAgICByZXR1cm4gJ0BAaXRlcmF0b3InO1xuICAgIH1cbiAgICByZXR1cm4gU3ltYm9sLml0ZXJhdG9yO1xufVxuZXhwb3J0IHZhciBpdGVyYXRvciA9IGdldFN5bWJvbEl0ZXJhdG9yKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pdGVyYXRvci5qcy5tYXAiLCJleHBvcnQgdmFyIG9ic2VydmFibGUgPSAoZnVuY3Rpb24gKCkgeyByZXR1cm4gKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLm9ic2VydmFibGUpIHx8ICdAQG9ic2VydmFibGUnOyB9KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2JzZXJ2YWJsZS5qcy5tYXAiLCJpbXBvcnQgeyBjcmVhdGVFcnJvckNsYXNzIH0gZnJvbSAnLi9jcmVhdGVFcnJvckNsYXNzJztcbmV4cG9ydCB2YXIgVW5zdWJzY3JpcHRpb25FcnJvciA9IGNyZWF0ZUVycm9yQ2xhc3MoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIHJldHVybiBmdW5jdGlvbiBVbnN1YnNjcmlwdGlvbkVycm9ySW1wbChlcnJvcnMpIHtcbiAgICAgICAgX3N1cGVyKHRoaXMpO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBlcnJvcnNcbiAgICAgICAgICAgID8gZXJyb3JzLmxlbmd0aCArIFwiIGVycm9ycyBvY2N1cnJlZCBkdXJpbmcgdW5zdWJzY3JpcHRpb246XFxuXCIgKyBlcnJvcnMubWFwKGZ1bmN0aW9uIChlcnIsIGkpIHsgcmV0dXJuIGkgKyAxICsgXCIpIFwiICsgZXJyLnRvU3RyaW5nKCk7IH0pLmpvaW4oJ1xcbiAgJylcbiAgICAgICAgICAgIDogJyc7XG4gICAgICAgIHRoaXMubmFtZSA9ICdVbnN1YnNjcmlwdGlvbkVycm9yJztcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XG4gICAgfTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VW5zdWJzY3JpcHRpb25FcnJvci5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gYXJyUmVtb3ZlKGFyciwgaXRlbSkge1xuICAgIGlmIChhcnIpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gYXJyLmluZGV4T2YoaXRlbSk7XG4gICAgICAgIDAgPD0gaW5kZXggJiYgYXJyLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXJyUmVtb3ZlLmpzLm1hcCIsImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFcnJvckNsYXNzKGNyZWF0ZUltcGwpIHtcbiAgICB2YXIgX3N1cGVyID0gZnVuY3Rpb24gKGluc3RhbmNlKSB7XG4gICAgICAgIEVycm9yLmNhbGwoaW5zdGFuY2UpO1xuICAgICAgICBpbnN0YW5jZS5zdGFjayA9IG5ldyBFcnJvcigpLnN0YWNrO1xuICAgIH07XG4gICAgdmFyIGN0b3JGdW5jID0gY3JlYXRlSW1wbChfc3VwZXIpO1xuICAgIGN0b3JGdW5jLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRXJyb3IucHJvdG90eXBlKTtcbiAgICBjdG9yRnVuYy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjdG9yRnVuYztcbiAgICByZXR1cm4gY3RvckZ1bmM7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jcmVhdGVFcnJvckNsYXNzLmpzLm1hcCIsImltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4uL2NvbmZpZyc7XG52YXIgY29udGV4dCA9IG51bGw7XG5leHBvcnQgZnVuY3Rpb24gZXJyb3JDb250ZXh0KGNiKSB7XG4gICAgaWYgKGNvbmZpZy51c2VEZXByZWNhdGVkU3luY2hyb25vdXNFcnJvckhhbmRsaW5nKSB7XG4gICAgICAgIHZhciBpc1Jvb3QgPSAhY29udGV4dDtcbiAgICAgICAgaWYgKGlzUm9vdCkge1xuICAgICAgICAgICAgY29udGV4dCA9IHsgZXJyb3JUaHJvd246IGZhbHNlLCBlcnJvcjogbnVsbCB9O1xuICAgICAgICB9XG4gICAgICAgIGNiKCk7XG4gICAgICAgIGlmIChpc1Jvb3QpIHtcbiAgICAgICAgICAgIHZhciBfYSA9IGNvbnRleHQsIGVycm9yVGhyb3duID0gX2EuZXJyb3JUaHJvd24sIGVycm9yID0gX2EuZXJyb3I7XG4gICAgICAgICAgICBjb250ZXh0ID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChlcnJvclRocm93bikge1xuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjYigpO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBjYXB0dXJlRXJyb3IoZXJyKSB7XG4gICAgaWYgKGNvbmZpZy51c2VEZXByZWNhdGVkU3luY2hyb25vdXNFcnJvckhhbmRsaW5nICYmIGNvbnRleHQpIHtcbiAgICAgICAgY29udGV4dC5lcnJvclRocm93biA9IHRydWU7XG4gICAgICAgIGNvbnRleHQuZXJyb3IgPSBlcnI7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXJyb3JDb250ZXh0LmpzLm1hcCIsImV4cG9ydCBmdW5jdGlvbiBleGVjdXRlU2NoZWR1bGUocGFyZW50U3Vic2NyaXB0aW9uLCBzY2hlZHVsZXIsIHdvcmssIGRlbGF5LCByZXBlYXQpIHtcbiAgICBpZiAoZGVsYXkgPT09IHZvaWQgMCkgeyBkZWxheSA9IDA7IH1cbiAgICBpZiAocmVwZWF0ID09PSB2b2lkIDApIHsgcmVwZWF0ID0gZmFsc2U7IH1cbiAgICB2YXIgc2NoZWR1bGVTdWJzY3JpcHRpb24gPSBzY2hlZHVsZXIuc2NoZWR1bGUoZnVuY3Rpb24gKCkge1xuICAgICAgICB3b3JrKCk7XG4gICAgICAgIGlmIChyZXBlYXQpIHtcbiAgICAgICAgICAgIHBhcmVudFN1YnNjcmlwdGlvbi5hZGQodGhpcy5zY2hlZHVsZShudWxsLCBkZWxheSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfSwgZGVsYXkpO1xuICAgIHBhcmVudFN1YnNjcmlwdGlvbi5hZGQoc2NoZWR1bGVTdWJzY3JpcHRpb24pO1xuICAgIGlmICghcmVwZWF0KSB7XG4gICAgICAgIHJldHVybiBzY2hlZHVsZVN1YnNjcmlwdGlvbjtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1leGVjdXRlU2NoZWR1bGUuanMubWFwIiwiZXhwb3J0IGZ1bmN0aW9uIGlkZW50aXR5KHgpIHtcbiAgICByZXR1cm4geDtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlkZW50aXR5LmpzLm1hcCIsImV4cG9ydCB2YXIgaXNBcnJheUxpa2UgPSAoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHggJiYgdHlwZW9mIHgubGVuZ3RoID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgeCAhPT0gJ2Z1bmN0aW9uJzsgfSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc0FycmF5TGlrZS5qcy5tYXAiLCJpbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi9pc0Z1bmN0aW9uJztcbmV4cG9ydCBmdW5jdGlvbiBpc0FzeW5jSXRlcmFibGUob2JqKSB7XG4gICAgcmV0dXJuIFN5bWJvbC5hc3luY0l0ZXJhdG9yICYmIGlzRnVuY3Rpb24ob2JqID09PSBudWxsIHx8IG9iaiA9PT0gdm9pZCAwID8gdm9pZCAwIDogb2JqW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc0FzeW5jSXRlcmFibGUuanMubWFwIiwiZXhwb3J0IGZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNGdW5jdGlvbi5qcy5tYXAiLCJpbXBvcnQgeyBvYnNlcnZhYmxlIGFzIFN5bWJvbF9vYnNlcnZhYmxlIH0gZnJvbSAnLi4vc3ltYm9sL29ic2VydmFibGUnO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4vaXNGdW5jdGlvbic7XG5leHBvcnQgZnVuY3Rpb24gaXNJbnRlcm9wT2JzZXJ2YWJsZShpbnB1dCkge1xuICAgIHJldHVybiBpc0Z1bmN0aW9uKGlucHV0W1N5bWJvbF9vYnNlcnZhYmxlXSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc0ludGVyb3BPYnNlcnZhYmxlLmpzLm1hcCIsImltcG9ydCB7IGl0ZXJhdG9yIGFzIFN5bWJvbF9pdGVyYXRvciB9IGZyb20gJy4uL3N5bWJvbC9pdGVyYXRvcic7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi9pc0Z1bmN0aW9uJztcbmV4cG9ydCBmdW5jdGlvbiBpc0l0ZXJhYmxlKGlucHV0KSB7XG4gICAgcmV0dXJuIGlzRnVuY3Rpb24oaW5wdXQgPT09IG51bGwgfHwgaW5wdXQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGlucHV0W1N5bWJvbF9pdGVyYXRvcl0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNJdGVyYWJsZS5qcy5tYXAiLCJpbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSBcIi4vaXNGdW5jdGlvblwiO1xuZXhwb3J0IGZ1bmN0aW9uIGlzUHJvbWlzZSh2YWx1ZSkge1xuICAgIHJldHVybiBpc0Z1bmN0aW9uKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB2b2lkIDAgPyB2b2lkIDAgOiB2YWx1ZS50aGVuKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzUHJvbWlzZS5qcy5tYXAiLCJpbXBvcnQgeyBfX2FzeW5jR2VuZXJhdG9yLCBfX2F3YWl0LCBfX2dlbmVyYXRvciB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4vaXNGdW5jdGlvbic7XG5leHBvcnQgZnVuY3Rpb24gcmVhZGFibGVTdHJlYW1MaWtlVG9Bc3luY0dlbmVyYXRvcihyZWFkYWJsZVN0cmVhbSkge1xuICAgIHJldHVybiBfX2FzeW5jR2VuZXJhdG9yKHRoaXMsIGFyZ3VtZW50cywgZnVuY3Rpb24gcmVhZGFibGVTdHJlYW1MaWtlVG9Bc3luY0dlbmVyYXRvcl8xKCkge1xuICAgICAgICB2YXIgcmVhZGVyLCBfYSwgdmFsdWUsIGRvbmU7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIHJlYWRlciA9IHJlYWRhYmxlU3RyZWFtLmdldFJlYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBfYi50cnlzLnB1c2goWzEsICwgOSwgMTBdKTtcbiAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAyO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0cnVlKSByZXR1cm4gWzMsIDhdO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIF9fYXdhaXQocmVhZGVyLnJlYWQoKSldO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgX2EgPSBfYi5zZW50KCksIHZhbHVlID0gX2EudmFsdWUsIGRvbmUgPSBfYS5kb25lO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWRvbmUpIHJldHVybiBbMywgNV07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgX19hd2FpdCh2b2lkIDApXTtcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbMiwgX2Iuc2VudCgpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IHJldHVybiBbNCwgX19hd2FpdCh2YWx1ZSldO1xuICAgICAgICAgICAgICAgIGNhc2UgNjogcmV0dXJuIFs0LCBfYi5zZW50KCldO1xuICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMsIDJdO1xuICAgICAgICAgICAgICAgIGNhc2UgODogcmV0dXJuIFszLCAxMF07XG4gICAgICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAgICAgICByZWFkZXIucmVsZWFzZUxvY2soKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs3XTtcbiAgICAgICAgICAgICAgICBjYXNlIDEwOiByZXR1cm4gWzJdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc1JlYWRhYmxlU3RyZWFtTGlrZShvYmopIHtcbiAgICByZXR1cm4gaXNGdW5jdGlvbihvYmogPT09IG51bGwgfHwgb2JqID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvYmouZ2V0UmVhZGVyKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzUmVhZGFibGVTdHJlYW1MaWtlLmpzLm1hcCIsImltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuL2lzRnVuY3Rpb24nO1xuZXhwb3J0IGZ1bmN0aW9uIGhhc0xpZnQoc291cmNlKSB7XG4gICAgcmV0dXJuIGlzRnVuY3Rpb24oc291cmNlID09PSBudWxsIHx8IHNvdXJjZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc291cmNlLmxpZnQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIG9wZXJhdGUoaW5pdCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICAgIGlmIChoYXNMaWZ0KHNvdXJjZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2UubGlmdChmdW5jdGlvbiAobGlmdGVkU291cmNlKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluaXQobGlmdGVkU291cmNlLCB0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5hYmxlIHRvIGxpZnQgdW5rbm93biBPYnNlcnZhYmxlIHR5cGUnKTtcbiAgICB9O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGlmdC5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gbm9vcCgpIHsgfVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bm9vcC5qcy5tYXAiLCJpbXBvcnQgeyBpZGVudGl0eSB9IGZyb20gJy4vaWRlbnRpdHknO1xuZXhwb3J0IGZ1bmN0aW9uIHBpcGUoKSB7XG4gICAgdmFyIGZucyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIGZuc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICByZXR1cm4gcGlwZUZyb21BcnJheShmbnMpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHBpcGVGcm9tQXJyYXkoZm5zKSB7XG4gICAgaWYgKGZucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGlkZW50aXR5O1xuICAgIH1cbiAgICBpZiAoZm5zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gZm5zWzBdO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gcGlwZWQoaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIGZucy5yZWR1Y2UoZnVuY3Rpb24gKHByZXYsIGZuKSB7IHJldHVybiBmbihwcmV2KTsgfSwgaW5wdXQpO1xuICAgIH07XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1waXBlLmpzLm1hcCIsImltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQgeyB0aW1lb3V0UHJvdmlkZXIgfSBmcm9tICcuLi9zY2hlZHVsZXIvdGltZW91dFByb3ZpZGVyJztcbmV4cG9ydCBmdW5jdGlvbiByZXBvcnRVbmhhbmRsZWRFcnJvcihlcnIpIHtcbiAgICB0aW1lb3V0UHJvdmlkZXIuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvblVuaGFuZGxlZEVycm9yID0gY29uZmlnLm9uVW5oYW5kbGVkRXJyb3I7XG4gICAgICAgIGlmIChvblVuaGFuZGxlZEVycm9yKSB7XG4gICAgICAgICAgICBvblVuaGFuZGxlZEVycm9yKGVycik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlcG9ydFVuaGFuZGxlZEVycm9yLmpzLm1hcCIsImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVJbnZhbGlkT2JzZXJ2YWJsZVR5cGVFcnJvcihpbnB1dCkge1xuICAgIHJldHVybiBuZXcgVHlwZUVycm9yKFwiWW91IHByb3ZpZGVkIFwiICsgKGlucHV0ICE9PSBudWxsICYmIHR5cGVvZiBpbnB1dCA9PT0gJ29iamVjdCcgPyAnYW4gaW52YWxpZCBvYmplY3QnIDogXCInXCIgKyBpbnB1dCArIFwiJ1wiKSArIFwiIHdoZXJlIGEgc3RyZWFtIHdhcyBleHBlY3RlZC4gWW91IGNhbiBwcm92aWRlIGFuIE9ic2VydmFibGUsIFByb21pc2UsIFJlYWRhYmxlU3RyZWFtLCBBcnJheSwgQXN5bmNJdGVyYWJsZSwgb3IgSXRlcmFibGUuXCIpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGhyb3dVbm9ic2VydmFibGVFcnJvci5qcy5tYXAiLCJpbXBvcnQgeyBKc01vbm9CZWhhdmlvdXIgfSBmcm9tIFwiY3NoYXJwXCI7XHJcbmltcG9ydCB7IFVuaXR5RW5naW5lIH0gZnJvbSAnY3NoYXJwJ1xyXG5cclxuY2xhc3MgSnNCZWhhdmlvdXI8VCBleHRlbmRzIEpzTW9ub0JlaGF2aW91cj4ge1xyXG5cclxuICAgIFN0YXJ0KCk6IHZvaWQgeyB9XHJcbiAgICBVcGRhdGUoKTogdm9pZCB7IH1cclxuICAgIE9uVHJpZ2dlckVudGVyKG90aGVyOiBVbml0eUVuZ2luZS5Db2xsaWRlcik6IHZvaWQgeyB9XHJcblxyXG4gICAgcHVibGljIF9tYjogVFxyXG5cclxuICAgIGNvbnN0cnVjdG9yKG1iOiBUKSB7XHJcbiAgICAgICAgLy8gbW9uby5Kc1xyXG4gICAgICAgIHRoaXMuX21iID0gbWI7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ21iJyxtYilcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5TdGFydCAhPSBKc0JlaGF2aW91ci5wcm90b3R5cGUuU3RhcnQpIHtcclxuICAgICAgICAgICAgbWIuSnNTdGFydCA9IHRoaXMuU3RhcnQuYmluZCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuVXBkYXRlICE9IEpzQmVoYXZpb3VyLnByb3RvdHlwZS5VcGRhdGUpIHtcclxuICAgICAgICAgICAgbWIuSnNVcGRhdGUgPSB0aGlzLlVwZGF0ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5PblRyaWdnZXJFbnRlciAhPSBKc0JlaGF2aW91ci5wcm90b3R5cGUuT25UcmlnZ2VyRW50ZXIpIHtcclxuICAgICAgICAgICAgbWIuSnNPblRyaWdnZXJFbnRlciA9IHRoaXMuT25UcmlnZ2VyRW50ZXIuYmluZCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIFxyXG59XHJcblxyXG5leHBvcnQgeyBKc0JlaGF2aW91ciB9IiwiaW1wb3J0IHsgSnNNb25vQmVoYXZpb3VyLCBVbml0eUVuZ2luZSB9IGZyb20gJ2NzaGFycCdcclxuaW1wb3J0IHsgSnNCZWhhdmlvdXIgfSBmcm9tICcuL0Jhc2UvYmFzZSdcclxuaW1wb3J0IHsgSlNHYW1lTWFuYWdlciB9IGZyb20gJy4vSlNHYW1lTWFuYWdlcic7XHJcblxyXG5jbGFzcyBKU0JhbGxCZWhhdmlvdXIgZXh0ZW5kcyBKc0JlaGF2aW91cjxKc01vbm9CZWhhdmlvdXI+e1xyXG5cclxuICAgIFN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdzc3RhcnQnKVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBwcmVzY29yZTogYm9vbGVhblxyXG4gICAgT25UcmlnZ2VyRW50ZXIodHJpZ2dlcjogVW5pdHlFbmdpbmUuQ29sbGlkZXIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnb25UcmlnZ2VyRW50ZXInLHRyaWdnZXIpXHJcblxyXG4gICAgICAgIC8vIGlmICh0cmlnZ2VyID09IEpTR2FtZU1hbmFnZXIuaW5zdGFuY2UuX21iLlByZXNjb3JlVHJpZ2dlcikge1xyXG4gICAgICAgIC8vICAgICB0aGlzLnByZXNjb3JlID0gdHJ1ZTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gaWYgKHRyaWdnZXIgPT0gSlNHYW1lTWFuYWdlci5pbnN0YW5jZS5fbWIuU2NvcmVkVHJpZ2dlciAmJiB0aGlzLnByZXNjb3JlKSB7XHJcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwi5b6X5YiGXCIpXHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBKU0JhbGxCZWhhdmlvdXIgfSIsImltcG9ydCB7IEpzQmVoYXZpb3VyIH0gZnJvbSAnLi9CYXNlL2Jhc2UnXHJcblxyXG5jbGFzcyBKU0dhbWVNYW5hZ2VyIGV4dGVuZHMgSnNCZWhhdmlvdXI8Q1MuR2FtZU1hbmFnZXI+e1xyXG4gICAgcHVibGljIHN0YXRpYyBpbnN0YW5jZTogSlNHYW1lTWFuYWdlcjtcclxuXHJcbiAgICBTdGFydCgpIHtcclxuICAgICAgICB0aGlzLnNwYXduQmFsbCgpO1xyXG4gICAgICAgIEpTR2FtZU1hbmFnZXIuaW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBwcmVzc2VkOiBudW1iZXI7XHJcbiAgICBwcm90ZWN0ZWQgdXNlVG91Y2g6IGJvb2xlYW47XHJcbiAgICBVcGRhdGUoKSB7XHJcbiAgICAgICAgY29uc3QgZXhwZWN0UHJlc3NUaW1lTWF4ID0gMTAwMDtcclxuICAgICAgICBpZiAoIXRoaXMucHJlc3NlZCAmJiAoQ1MuVW5pdHlFbmdpbmUuSW5wdXQuR2V0TW91c2VCdXR0b25Eb3duKDApIHx8IENTLlVuaXR5RW5naW5lLklucHV0LnRvdWNoQ291bnQgIT0gMCkpIHtcclxuICAgICAgICAgICAgdGhpcy5wcmVzc2VkID0gRGF0ZS5ub3coKTtcclxuICAgICAgICAgICAgaWYgKENTLlVuaXR5RW5naW5lLklucHV0LnRvdWNoQ291bnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlVG91Y2ggPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgdGhpcy5wcmVzc2VkICYmIChcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlVG91Y2ggPyBDUy5Vbml0eUVuZ2luZS5JbnB1dC50b3VjaENvdW50ID09IDAgOiBDUy5Vbml0eUVuZ2luZS5JbnB1dC5HZXRNb3VzZUJ1dHRvblVwKDApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgdGhpcy5zaG9vdEJhbGwoTWF0aC5taW4oZXhwZWN0UHJlc3NUaW1lTWF4LCBEYXRlLm5vdygpIC0gdGhpcy5wcmVzc2VkKSAvIGV4cGVjdFByZXNzVGltZU1heCk7XHJcbiAgICAgICAgICAgIHRoaXMucHJlc3NlZCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgIGdsb2JhbFRoaXMuX3B1ZXJ0c19yZWdpc3RyeSAmJiBnbG9iYWxUaGlzLl9wdWVydHNfcmVnaXN0cnkuY2xlYW51cCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob290QmFsbChwb3dlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgcmlnaWRib2R5ID0gdGhpcy5jdXJyZW50QmFsbC5HZXRDb21wb25lbnQocHVlci4kdHlwZW9mKENTLlVuaXR5RW5naW5lLlJpZ2lkYm9keSkpIGFzIENTLlVuaXR5RW5naW5lLlJpZ2lkYm9keTtcclxuICAgICAgICByaWdpZGJvZHkuaXNLaW5lbWF0aWMgPSBmYWxzZTtcclxuICAgICAgICByaWdpZGJvZHkudmVsb2NpdHkgPSBuZXcgQ1MuVW5pdHlFbmdpbmUuVmVjdG9yMygxICsgMiAqIHBvd2VyLCAzICsgNiAqIHBvd2VyLCAwKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNwYXduQmFsbCgpO1xyXG4gICAgICAgIH0sIDUwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGN1cnJlbnRCYWxsOiBDUy5Vbml0eUVuZ2luZS5HYW1lT2JqZWN0O1xyXG4gICAgc3Bhd25CYWxsKCkge1xyXG4gICAgICAgIGNvbnN0IGJhbGwgPSB0aGlzLmN1cnJlbnRCYWxsID0gQ1MuVW5pdHlFbmdpbmUuT2JqZWN0Lkluc3RhbnRpYXRlKHRoaXMuX21iLkJhbGxQcmVmYWIpIGFzIENTLlVuaXR5RW5naW5lLkdhbWVPYmplY3Q7XHJcbiAgICAgICAgYmFsbC50cmFuc2Zvcm0ucG9zaXRpb24gPSB0aGlzLl9tYi5CYWxsU3Bhd25Qb2ludC50cmFuc2Zvcm0ucG9zaXRpb247XHJcblxyXG4gICAgICAgIGNvbnN0IHJpZ2lkYm9keSA9IGJhbGwuR2V0Q29tcG9uZW50KHB1ZXIuJHR5cGVvZihDUy5Vbml0eUVuZ2luZS5SaWdpZGJvZHkpKSBhcyBDUy5Vbml0eUVuZ2luZS5SaWdpZGJvZHk7XHJcbiAgICAgICAgcmlnaWRib2R5LmlzS2luZW1hdGljID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5leHBvcnQgeyBKU0dhbWVNYW5hZ2VyIH0iLCJpbXBvcnQgeyBIZXJvLCBKc01vbm9CZWhhdmlvdXIsIFVuaXR5RW5naW5lIH0gZnJvbSBcImNzaGFycFwiO1xyXG5pbXBvcnQgeyBmcm9tIH0gZnJvbSBcInJ4anNcIlxyXG5pbXBvcnQgeyBKc0JlaGF2aW91ciB9IGZyb20gXCIuL0Jhc2UvYmFzZVwiO1xyXG5jb25zdCBWZWN0b3IyID0gQ1MuVW5pdHlFbmdpbmUuVmVjdG9yMjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlc3RKc0JlaGF2aW9yIGV4dGVuZHMgSnNCZWhhdmlvdXI8SnNNb25vQmVoYXZpb3VyPiB7XHJcblxyXG5cclxuICAgIFN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiIGRkZCBUZXN0SnNCLlN0YXJ0XCIpO1xyXG4gICAgICAgIC8vIHRoaXMuX21iLmdhbWVPYmplY3QuR2V0Q29tcG9uZW50KHB1ZXJ0cy4kdHlwZW9mKEhlcm8pKVxyXG4gICAgICAgIC8vIGxldCBoZXJvID0gdGhpcy5fbWIuZ2FtZU9iamVjdC5HZXRDb21wb25lbnQocHVlcnRzLiR0eXBlb2YoQ1MuUHVlcnRzVGVzdC5UZXN0SGVybykpIGFzIENTLlB1ZXJ0c1Rlc3QuVGVzdEhlcm9cclxuXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2hlcm8nLGhlcm8pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgbGV0IGhlcm8gPSB0aGlzLl9tYi5nYW1lT2JqZWN0LkdldENvbXBvbmVudChwdWVydHMuJHR5cGVvZihDUy5IZXJvKSkgYXMgQ1MuSGVyb1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZygnaGVybyAnLGhlcm8pO1xyXG4gICAgICAgIGxldCB4eCA9IGZyb20oWzEsIDIsIDMsIDRdKVxyXG4gICAgICAgIHh4LnN1YnNjcmliZSgoeDogYW55KSA9PiBjb25zb2xlLmxvZyh4KSlcclxuXHJcblxyXG4gICAgICAgIC8vIGhlcm8uTW92ZVNwZWVkID0gMTJcclxuICAgICAgICAvLyB0aGlzLl9tYi5nYW1lT2JqZWN0LkFkZENvbXBvbmVudChwdWVyLiR0eXBlb2YoQ1MuVW5pdHlFbmdpbmUuUGFydGljbGVTeXN0ZW0pKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIFVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICAvLyBsZXQgZ28gPSBuZXcgQ1MuVW5pdHlFbmdpbmUuR2FtZU9iamVjdChcImdvXCIpO1xyXG4gICAgICAgIGxldCBoZXJvT2JqID0gQ1MuVW5pdHlFbmdpbmUuR2FtZU9iamVjdC5GaW5kKFwiSGVyb1wiKVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaGVybzogXCIgKyBoZXJvT2JqKVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwidGhpc1wiLCB0aGlzLl9tYilcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImdvXCIsIHRoaXMuX21iLmdhbWVPYmplY3QsIHRoaXMuX21iLm5hbWUpXHJcblxyXG5cclxuICAgICAgICAvLyBsZXQgaGVybyA9ICB0aGlzLl9tYi5nYW1lT2JqZWN0LkdldENvbXBvbmVudChcIkhlcm9cIikgYXMgSGVyb1xyXG5cclxuICAgICAgICAvLyBoZXJvLkdldENvbXBvbmVudChwdWVyLiR0eXBlb2YoSGVybykpXHJcbiAgICAgICAgLy8gdGhpcy5fbWIuZ2FtZU9iamVjdC5BZGRDb21wb25lbnQocHVlci4kdHlwZW9mKENTLlVuaXR5RW5naW5lLlBhcnRpY2xlU3lzdGVtKSk7XHJcblxyXG4gICAgICAgIC8vIGxldCBoZXJvID0gdGhpcy5fbWIuZ2FtZU9iamVjdC5HZXRDb21wb25lbnQoJHR5cGVvZihIZXJvKSlcclxuICAgICAgICAvLyBoZXJvLk1vdmVTcGVlZCA9IDEyXHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwic3Nzc3Nzc3JkZGRycmpqampqXCIpXHJcbiAgICAgICAgLy8gbGV0IGhlcm8gPXRoaXMuX21iLkdldENvbXBvbmVudChwdWVydHMuJHR5cGVvZihIZXJvKSlcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIk1vdmVTcGVlZDogXCIgK2hlcm8pXHJcbiAgICB9XHJcbn1cclxuIiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoZyAmJiAoZyA9IDAsIG9wWzBdICYmIChfID0gMCkpLCBfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcclxuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XHJcbiAgICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tLCBwYWNrKSB7XHJcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcclxuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcclxuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XHJcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4oc3RhdGUsIHJlY2VpdmVyKSB7XHJcbiAgICBpZiAocmVjZWl2ZXIgPT09IG51bGwgfHwgKHR5cGVvZiByZWNlaXZlciAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgcmVjZWl2ZXIgIT09IFwiZnVuY3Rpb25cIikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgdXNlICdpbicgb3BlcmF0b3Igb24gbm9uLW9iamVjdFwiKTtcclxuICAgIHJldHVybiB0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyID09PSBzdGF0ZSA6IHN0YXRlLmhhcyhyZWNlaXZlcik7XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBKU0dhbWVNYW5hZ2VyIH0gZnJvbSBcIi4vSlNHYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBKU0JhbGxCZWhhdmlvdXIgfSBmcm9tIFwiLi9KU0JhbGxCZWhhdmlvdXJcIjtcclxuaW1wb3J0IFRlc3RKc0JlaGF2aW9yIGZyb20gXCIuL1Rlc3RKc0JlaGF2aW9yXCI7XHJcblxyXG5mdW5jdGlvbiBtYWtlRmFjdG9yeShjbHM6IGFueSkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzOiBhbnlbXSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgY2xzKC4uLmFyZ3MpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zb2xlLmxvZyhcImVlaGVsbG8gd29ybGRlZWRkZGQhXCIpO1xyXG5cclxuXHJcbmNvbnN0IEpTQmFsbEJlaGF2aW91ckZhY3RvcnkgPSBtYWtlRmFjdG9yeShKU0JhbGxCZWhhdmlvdXIpXHJcbmNvbnN0IEpTR2FtZU1hbmFnZXJGYWN0b3J5ID0gbWFrZUZhY3RvcnkoSlNHYW1lTWFuYWdlcilcclxuY29uc3QgVGVzdEpzQmVoYXZpb3JGYWN0b3J5ID0gbWFrZUZhY3RvcnkoVGVzdEpzQmVoYXZpb3IpXHJcbmV4cG9ydCB7XHJcbiAgICBKU0JhbGxCZWhhdmlvdXJGYWN0b3J5IGFzIEpTQmFsbEJlaGF2aW91cixcclxuICAgIEpTR2FtZU1hbmFnZXJGYWN0b3J5IGFzIEpTR2FtZU1hbmFnZXIsXHJcbiAgICBUZXN0SnNCZWhhdmlvckZhY3RvcnkgYXMgVGVzdEpzQmVoYXZpb3JcclxufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==