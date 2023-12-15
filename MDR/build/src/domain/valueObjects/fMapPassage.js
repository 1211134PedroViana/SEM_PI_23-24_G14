"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloorMapPassage = void 0;
const ValueObject_1 = require("../../core/domain/ValueObject");
const Result_1 = require("../../core/logic/Result");
const Guard_1 = require("../../core/logic/Guard");
class FloorMapPassage extends ValueObject_1.ValueObject {
    get passageId() {
        return this.props.passageId;
    }
    get location() {
        return this.props.location;
    }
    constructor(props) {
        super(props);
    }
    static create(props) {
        const guardedProps = [
            { argument: props.passageId, argumentName: 'passageId' },
            { argument: props.location, argumentName: 'location' }
        ];
        const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail('');
        }
        else {
            return Result_1.Result.ok(new FloorMapPassage({ passageId: props.passageId, location: props.location }));
        }
    }
}
exports.FloorMapPassage = FloorMapPassage;
//# sourceMappingURL=fMapPassage.js.map