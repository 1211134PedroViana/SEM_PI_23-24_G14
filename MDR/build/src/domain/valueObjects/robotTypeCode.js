"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RobotTypeCode = void 0;
const ValueObject_1 = require("../../core/domain/ValueObject");
const Result_1 = require("../../core/logic/Result");
const Guard_1 = require("../../core/logic/Guard");
class RobotTypeCode extends ValueObject_1.ValueObject {
    get value() {
        return this.props.value;
    }
    constructor(props) {
        super(props);
    }
    //Checks if the text has only alphanumerics and a max of 25 characters
    static isValidCode(text) {
        return new RegExp('^[a-zA-Z0-9]{1,25}$').test(text);
    }
    static create(code) {
        const guardResult = Guard_1.Guard.againstNullOrUndefined(code, 'code');
        const isCodeValid = RobotTypeCode.isValidCode(code);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail('RobotType Code cannot be null or undefined');
        }
        else if (!isCodeValid) {
            return Result_1.Result.fail('Invalid RobotType Code format');
        }
        else {
            return Result_1.Result.ok(new RobotTypeCode({ value: code }));
        }
    }
}
exports.RobotTypeCode = RobotTypeCode;
//# sourceMappingURL=robotTypeCode.js.map