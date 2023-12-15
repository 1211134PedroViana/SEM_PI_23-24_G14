"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location = void 0;
const ValueObject_1 = require("../../core/domain/ValueObject");
const Result_1 = require("../../core/logic/Result");
const Guard_1 = require("../../core/logic/Guard");
class Location extends ValueObject_1.ValueObject {
    get positionX() {
        return this.props.positionX;
    }
    get positionY() {
        return this.props.positionY;
    }
    get direction() {
        return this.props.direction;
    }
    constructor(props) {
        super(props);
    }
    //Checks if the text has only a char in the range of [A-Z]
    static isValidPositions(num1, num2) {
        return num1 >= 0 && num2 >= 0;
    }
    static create(props) {
        const guardedProps = [
            { argument: props.positionX, argumentName: 'positionX' },
            { argument: props.positionY, argumentName: 'positionY' },
            { argument: props.direction, argumentName: 'direction' },
        ];
        const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail('Must provide Position-X, Position-Y and the Direction');
        }
        else if (!this.isValidPositions(props.positionX, props.positionY)) {
            return Result_1.Result.fail('Invalid positions values');
        }
        else {
            return Result_1.Result.ok(new Location(Object.assign({}, props)));
        }
    }
}
exports.Location = Location;
//# sourceMappingURL=location.js.map