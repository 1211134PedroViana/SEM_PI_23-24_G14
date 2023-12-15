"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloorMapRoom = void 0;
const ValueObject_1 = require("../../core/domain/ValueObject");
const Result_1 = require("../../core/logic/Result");
const Guard_1 = require("../../core/logic/Guard");
class FloorMapRoom extends ValueObject_1.ValueObject {
    get roomId() {
        return this.props.roomId;
    }
    get location() {
        return this.props.location;
    }
    get dimension() {
        return this.props.dimension;
    }
    constructor(props) {
        super(props);
    }
    static create(props) {
        const guardedProps = [
            { argument: props.roomId, argumentName: 'roomId' },
            { argument: props.location, argumentName: 'location' },
            { argument: props.dimension, argumentName: 'dimension' }
        ];
        const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail('');
        }
        else {
            return Result_1.Result.ok(new FloorMapRoom({ roomId: props.roomId, dimension: props.dimension, location: props.location }));
        }
    }
}
exports.FloorMapRoom = FloorMapRoom;
//# sourceMappingURL=fMapRoom.js.map