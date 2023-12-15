"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloorMapElevator = void 0;
const ValueObject_1 = require("../../core/domain/ValueObject");
const Result_1 = require("../../core/logic/Result");
const Guard_1 = require("../../core/logic/Guard");
class FloorMapElevator extends ValueObject_1.ValueObject {
    get elevatorId() {
        return this.props.elevatorId;
    }
    get location() {
        return this.props.location;
    }
    constructor(props) {
        super(props);
    }
    static create(props) {
        const guardedProps = [
            { argument: props.elevatorId, argumentName: 'elevatorId' },
            { argument: props.location, argumentName: 'location' }
        ];
        const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail('');
        }
        else {
            return Result_1.Result.ok(new FloorMapElevator({ elevatorId: props.elevatorId, location: props.location }));
        }
    }
}
exports.FloorMapElevator = FloorMapElevator;
//# sourceMappingURL=fMapElevator.js.map