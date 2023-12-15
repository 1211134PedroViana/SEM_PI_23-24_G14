"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RobotTypeModel = void 0;
const ValueObject_1 = require("../../core/domain/ValueObject");
const Result_1 = require("../../core/logic/Result");
const Guard_1 = require("../../core/logic/Guard");
class RobotTypeModel extends ValueObject_1.ValueObject {
    get value() {
        return this.props.value;
    }
    constructor(props) {
        super(props);
    }
    //Checks if the text has only alphanumerics and a max of 25 characters
    static isValidModel(text) {
        return new RegExp('^[a-zA-Z0-9 ]{1,100}$').test(text);
    }
    static create(model) {
        const guardResult = Guard_1.Guard.againstNullOrUndefined(model, 'model');
        const isCodeValid = RobotTypeModel.isValidModel(model);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail('RobotType Model cannot be null or undefined');
        }
        else if (!isCodeValid) {
            return Result_1.Result.fail('Invalid RobotType Model format');
        }
        else {
            return Result_1.Result.ok(new RobotTypeModel({ value: model }));
        }
    }
}
exports.RobotTypeModel = RobotTypeModel;
//# sourceMappingURL=robotTypeModel.js.map