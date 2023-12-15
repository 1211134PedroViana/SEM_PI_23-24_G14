"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Description = void 0;
const ValueObject_1 = require("../../core/domain/ValueObject");
const Result_1 = require("../../core/logic/Result");
class Description extends ValueObject_1.ValueObject {
    get value() {
        return this.props.value;
    }
    constructor(props) {
        super(props);
    }
    //Checks if the text has only a char in the range of [A-Z]
    static isValidDescription(text) {
        if (text === undefined) {
            return true;
        }
        return text.length <= 255;
    }
    static create(description) {
        if (!this.isValidDescription(description)) {
            return Result_1.Result.fail('Description exceeds the maximum characters(255)');
        }
        else {
            return Result_1.Result.ok(new Description({ value: description }));
        }
    }
}
exports.Description = Description;
//# sourceMappingURL=description.js.map