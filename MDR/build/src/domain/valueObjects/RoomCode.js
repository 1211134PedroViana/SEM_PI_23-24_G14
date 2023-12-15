"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomCode = void 0;
const ValueObject_1 = require("../../core/domain/ValueObject");
const Result_1 = require("../../core/logic/Result");
const Guard_1 = require("../../core/logic/Guard");
class RoomCode extends ValueObject_1.ValueObject {
    get value() {
        return this.props.value;
    }
    constructor(props) {
        super(props);
    }
    //Checks if the text has only a char in the range of [A-Z]
    static isValidCode(text) {
        return new RegExp('^[a-zA-Z0-9]{1,4}$').test(text);
    }
    static create(code) {
        const guardResult = Guard_1.Guard.againstNullOrUndefined(code, 'code');
        const isCodeValid = RoomCode.isValidCode(code);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail('Room Code cannot be null or undefined');
        }
        else if (!isCodeValid) {
            return Result_1.Result.fail('Invalid Room Code format');
        }
        else {
            return Result_1.Result.ok(new RoomCode({ value: code }));
        }
    }
}
exports.RoomCode = RoomCode;
//# sourceMappingURL=RoomCode.js.map