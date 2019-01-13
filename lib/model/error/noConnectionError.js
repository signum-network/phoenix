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
Object.defineProperty(exports, "__esModule", { value: true });
var NoConnectionError = /** @class */ (function (_super) {
    __extends(NoConnectionError, _super);
    function NoConnectionError(m) {
        if (m === void 0) { m = "NOTIFICATIONS.ERRORS.CONNECTION"; }
        var _this = _super.call(this, m) || this;
        Object.setPrototypeOf(_this, NoConnectionError.prototype);
        return _this;
    }
    NoConnectionError.prototype.toString = function () {
        return this.message;
    };
    return NoConnectionError;
}(Error));
exports.NoConnectionError = NoConnectionError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9Db25uZWN0aW9uRXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJub0Nvbm5lY3Rpb25FcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQTtJQUF1QyxxQ0FBSztJQUN4QywyQkFBWSxDQUE2QztRQUE3QyxrQkFBQSxFQUFBLHFDQUE2QztRQUF6RCxZQUNJLGtCQUFNLENBQUMsQ0FBQyxTQUdYO1FBREcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFJLEVBQUUsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7O0lBQzdELENBQUM7SUFFTSxvQ0FBUSxHQUFmO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0FBQyxBQVZELENBQXVDLEtBQUssR0FVM0M7QUFWWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJcbmV4cG9ydCBjbGFzcyBOb0Nvbm5lY3Rpb25FcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtOiBzdHJpbmcgPSBcIk5PVElGSUNBVElPTlMuRVJST1JTLkNPTk5FQ1RJT05cIikge1xuICAgICAgICBzdXBlcihtKTtcblxuICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgTm9Db25uZWN0aW9uRXJyb3IucHJvdG90eXBlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2U7XG4gICAgfVxufVxuIl19