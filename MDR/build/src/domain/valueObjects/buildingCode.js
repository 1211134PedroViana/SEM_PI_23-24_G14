"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildingCode = void 0;
const ValueObject_1 = require("../../core/domain/ValueObject");
const Result_1 = require("../../core/logic/Result");
const Guard_1 = require("../../core/logic/Guard");
class BuildingCode extends ValueObject_1.ValueObject {
    get value() {
        return this.props.value;
    }
    constructor(props) {
        super(props);
    }
    //Checks if the text has only alphanumerics and a max of 5 characters
    static isValidCode(text) {
        return new RegExp('^[a-zA-Z0-9 ]{1,5}$').test(text);
    }
    static create(code) {
        const guardResult = Guard_1.Guard.againstNullOrUndefined(code, 'code');
        const isCodeValid = BuildingCode.isValidCode(code);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail('Building Code cannot be null or undefined');
        }
        else if (!isCodeValid) {
            return Result_1.Result.fail('Invalid Building Code format');
        }
        else {
            return Result_1.Result.ok(new BuildingCode({ value: code }));
        }
    }
}
exports.BuildingCode = BuildingCode;
//# sourceMappingURL=buildingCode.js.map