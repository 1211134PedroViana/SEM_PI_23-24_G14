"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RobotTypeBrand = void 0;
const ValueObject_1 = require("../../core/domain/ValueObject");
const Result_1 = require("../../core/logic/Result");
const Guard_1 = require("../../core/logic/Guard");
class RobotTypeBrand extends ValueObject_1.ValueObject {
    get value() {
        return this.props.value;
    }
    constructor(props) {
        super(props);
    }
    //Checks if the text has only alphanumerics and a max of 25 characters
    static isValidBrand(text) {
        return new RegExp('^[a-zA-Z0-9 ]{1,50}$').test(text);
    }
    static create(brand) {
        const guardResult = Guard_1.Guard.againstNullOrUndefined(brand, 'brand');
        const isCodeValid = RobotTypeBrand.isValidBrand(brand);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail('RobotType Brand cannot be null or undefined');
        }
        else if (!isCodeValid) {
            return Result_1.Result.fail('Invalid RobotType Brand format');
        }
        else {
            return Result_1.Result.ok(new RobotTypeBrand({ value: brand }));
        }
    }
}
exports.RobotTypeBrand = RobotTypeBrand;
//# sourceMappingURL=robotTypebrand.js.map