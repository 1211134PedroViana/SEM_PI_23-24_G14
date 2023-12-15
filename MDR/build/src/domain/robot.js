"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Robot = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const robotId_1 = require("./robotId");
const description_1 = require("./valueObjects/description");
const Result_1 = require("../core/logic/Result");
const Guard_1 = require("../core/logic/Guard");
const robotCode_1 = require("./valueObjects/robotCode");
class Robot extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get robotId() {
        return new robotId_1.RobotId(this.robotId.toValue());
    }
    get code() {
        return this.props.code;
    }
    get nickname() {
        return this.props.nickname;
    }
    get robotType() {
        return this.props.robotType;
    }
    get serialNumber() {
        return this.props.serialNumber;
    }
    get description() {
        return this.props.description;
    }
    get isActive() {
        return this.props.isActive;
    }
    set robotType(value) {
        this.props.robotType = value;
    }
    set serialNumber(value) {
        this.props.serialNumber = value;
    }
    set description(value) {
        this.props.description = value;
    }
    set isActive(value) {
        this.props.isActive = value;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(robotDTO, id) {
        const code = robotCode_1.RobotCode.create(robotDTO.code).getValue();
        const description = description_1.Description.create(robotDTO.description).getValue();
        const guardedProps = [
            { argument: robotDTO.code, argumentName: 'code' },
            { argument: robotDTO.nickname, argumentName: 'nickname' },
            { argument: robotDTO.robotType, argumentName: 'robotType' },
            { argument: robotDTO.serialNumber, argumentName: 'serialNumber' },
            { argument: robotDTO.description, argumentName: 'description' },
            { argument: robotDTO.isActive, argumentName: 'isActive' },
        ];
        const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail('Robot data cant be null or undefined');
        }
        else {
            const robot = new Robot({
                code: code,
                nickname: robotDTO.nickname,
                robotType: robotDTO.robotType,
                serialNumber: robotDTO.serialNumber,
                description: description,
                isActive: robotDTO.isActive,
            }, id);
            return Result_1.Result.ok(robot);
        }
    }
}
exports.Robot = Robot;
//# sourceMappingURL=robot.js.map