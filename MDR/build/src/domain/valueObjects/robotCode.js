"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RobotCode = void 0;
const ValueObject_1 = require("../../core/domain/ValueObject");
const Result_1 = require("../../core/logic/Result");
const Guard_1 = require("../../core/logic/Guard");
class RobotCode extends ValueObject_1.ValueObject {
    get value() {
        return this.props.value;
    }
    constructor(props) {
        super(props);
    }
    //checks if the code has 30 characters maximum and if it is alfanumeric
    static isValidCode(code) {
        return new RegExp('^[a-zA-Z0-9]{1,30}$').test(code);
    }
    static create(code) {
        const guardResult = Guard_1.Guard.againstNullOrUndefined(code, 'code');
        const isCodeValid = RobotCode.isValidCode(code);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail('Robot code cannot be null of undefined');
        }
        else if (!isCodeValid) {
            return Result_1.Result.fail('Invalid robot code format');
        }
        else {
            return Result_1.Result.ok(new RobotCode({ value: code }));
        }
    }
}
exports.RobotCode = RobotCode;
//# sourceMappingURL=robotCode.js.map