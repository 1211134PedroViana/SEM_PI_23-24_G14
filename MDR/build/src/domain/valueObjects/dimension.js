"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dimension = void 0;
const ValueObject_1 = require("../../core/domain/ValueObject");
const Result_1 = require("../../core/logic/Result");
const Guard_1 = require("../../core/logic/Guard");
class Dimension extends ValueObject_1.ValueObject {
    get pos1() {
        return this.props.pos1;
    }
    get pos2() {
        return this.props.pos2;
    }
    get pos3() {
        return this.props.pos3;
    }
    get pos4() {
        return this.props.pos4;
    }
    constructor(props) {
        super(props);
    }
    static create(props) {
        const guardedProps = [
            { argument: props.pos1, argumentName: 'pos1' },
            { argument: props.pos2, argumentName: 'pos2' },
            { argument: props.pos3, argumentName: 'pos3' },
            { argument: props.pos4, argumentName: 'pos4' },
        ];
        const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail('');
        }
        else {
            return Result_1.Result.ok(new Dimension(Object.assign({}, props)));
        }
    }
}
exports.Dimension = Dimension;
//# sourceMappingURL=dimension.js.map