"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RobotType = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const Result_1 = require("../core/logic/Result");
const Guard_1 = require("../core/logic/Guard");
const robotTypeCode_1 = require("./valueObjects/robotTypeCode");
const robotTypebrand_1 = require("./valueObjects/robotTypebrand");
const robotTypeModel_1 = require("./valueObjects/robotTypeModel");
const robotTypeId_1 = require("./valueObjects/robotTypeId");
class RobotType extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get robotTypeId() {
        return new robotTypeId_1.RobotTypeId(this.robotTypeId.toValue());
    }
    get code() {
        return this.props.code;
    }
    get brand() {
        return this.props.brand;
    }
    set brand(value) {
        this.props.brand = value;
    }
    get model() {
        return this.props.model;
    }
    set model(value) {
        this.props.model = value;
    }
    get taskTypes() {
        return this.props.taskTypes;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(robotTypeDTO, id) {
        const code = robotTypeCode_1.RobotTypeCode.create(robotTypeDTO.code);
        const brand = robotTypebrand_1.RobotTypeBrand.create(robotTypeDTO.brand);
        const model = robotTypeModel_1.RobotTypeModel.create(robotTypeDTO.model);
        const guardedProps = [
            { argument: robotTypeDTO.code, argumentName: 'code' },
            { argument: robotTypeDTO.brand, argumentName: 'brand' },
            { argument: robotTypeDTO.model, argumentName: 'model' },
            { argument: robotTypeDTO.taskTypes, argumentName: 'taskTypes' }
        ];
        const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail('Must provide a RobotType code, brand, model and a list of type of tasks');
        }
        else {
            const robotType = new RobotType({ code: code.getValue(), brand: brand.getValue(), model: model.getValue(), taskTypes: robotTypeDTO.taskTypes }, id);
            return Result_1.Result.ok(robotType);
        }
    }
}
exports.RobotType = RobotType;
//# sourceMappingURL=robotType.js.map