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
var UnknownAccountError = /** @class */ (function (_super) {
    __extends(UnknownAccountError, _super);
    function UnknownAccountError(m) {
        if (m === void 0) { m = "NOTIFICATIONS.ERRORS.UNKNOWN_ACCOUNT"; }
        var _this = _super.call(this, m) || this;
        Object.setPrototypeOf(_this, UnknownAccountError.prototype);
        return _this;
    }
    UnknownAccountError.prototype.toString = function () {
        return this.message;
    };
    return UnknownAccountError;
}(Error));
exports.UnknownAccountError = UnknownAccountError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5rbm93bkFjY291bnRFcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVua25vd25BY2NvdW50RXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0E7SUFBeUMsdUNBQUs7SUFDMUMsNkJBQVksQ0FBa0Q7UUFBbEQsa0JBQUEsRUFBQSwwQ0FBa0Q7UUFBOUQsWUFDSSxrQkFBTSxDQUFDLENBQUMsU0FHWDtRQURHLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSSxFQUFFLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxDQUFDOztJQUMvRCxDQUFDO0lBRU0sc0NBQVEsR0FBZjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFDTCwwQkFBQztBQUFELENBQUMsQUFWRCxDQUF5QyxLQUFLLEdBVTdDO0FBVlksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnQgY2xhc3MgVW5rbm93bkFjY291bnRFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtOiBzdHJpbmcgPSBcIk5PVElGSUNBVElPTlMuRVJST1JTLlVOS05PV05fQUNDT1VOVFwiKSB7XG4gICAgICAgIHN1cGVyKG0pO1xuXG4gICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBVbmtub3duQWNjb3VudEVycm9yLnByb3RvdHlwZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlO1xuICAgIH1cbn1cbiJdfQ==